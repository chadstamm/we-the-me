/**
 * Gemini Image Generation Module
 *
 * Requirements:
 * npm install @google/generative-ai uuid dotenv
 *
 * Environment:
 * GEMINI_API_KEY - Your Google AI API key
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

// Free tier: 'gemini-2.5-flash-image' (~1,500 req/day, no billing required)
// Paid tier: 'gemini-3-pro-image-preview' (requires billing, higher quality)
const DEFAULT_MODEL = 'gemini-2.5-flash-image';

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
export type ImageSize = '1K' | '2K' | '4K';
export type GenerationMode = 'generate' | 'edit';

interface ReferenceImage {
  source: 'file' | 'base64' | 'url';
  path?: string;
  data?: string;
  url?: string;
  mimeType?: string;
}

export interface ImageOptions {
  mode: GenerationMode;
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: AspectRatio;
  imageSize?: ImageSize;
  referenceImages?: ReferenceImage[];
  outputFormat?: 'png' | 'webp';
  model?: string;
}

export interface ImageResult {
  buffer: Buffer;
  mimeType: string;
  width: number;
  height: number;
  model: string;
  aspectRatio: AspectRatio;
  imageSize: ImageSize;
}

function getDimensions(aspectRatio: AspectRatio, imageSize: ImageSize): { width: number; height: number } {
  const base: Record<ImageSize, number> = { '1K': 1024, '2K': 2048, '4K': 4096 };
  const b = base[imageSize];
  const ratios: Record<AspectRatio, { width: number; height: number }> = {
    '1:1': { width: b, height: b },
    '16:9': { width: b, height: Math.round(b * (9 / 16)) },
    '9:16': { width: Math.round(b * (9 / 16)), height: b },
    '4:3': { width: b, height: Math.round(b * (3 / 4)) },
    '3:4': { width: Math.round(b * (3 / 4)), height: b },
  };
  return ratios[aspectRatio];
}

async function loadReferenceImage(ref: ReferenceImage, basePath?: string): Promise<{ mimeType: string; data: string }> {
  if (ref.source === 'base64' && ref.data) {
    return { mimeType: ref.mimeType || 'image/png', data: ref.data };
  }

  if (ref.source === 'url' && ref.url) {
    const response = await fetch(ref.url);
    if (!response.ok) throw new Error(`Failed to fetch: ${ref.url}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    return { mimeType: response.headers.get('content-type') || 'image/png', data: buffer.toString('base64') };
  }

  if (ref.source === 'file' && ref.path) {
    const filePath = basePath ? path.resolve(basePath, ref.path) : path.resolve(ref.path);
    const buffer = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mimes: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
    return { mimeType: mimes[ext] || 'image/png', data: buffer.toString('base64') };
  }

  throw new Error('Invalid reference image configuration');
}

export async function generateImage(options: ImageOptions, basePath?: string): Promise<ImageResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const mode = options.mode || 'generate';
  const aspectRatio = options.aspectRatio || '1:1';
  const imageSize = options.imageSize || '1K';
  const { width, height } = getDimensions(aspectRatio, imageSize);

  const modelId = options.model || DEFAULT_MODEL;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelId });

  const parts: any[] = [];

  if (options.referenceImages && options.referenceImages.length > 0) {
    console.log(`Loading ${options.referenceImages.length} reference image(s)...`);
    for (const ref of options.referenceImages) {
      const { mimeType, data } = await loadReferenceImage(ref, basePath);
      parts.push({ inlineData: { mimeType, data } });
    }
  }

  let prompt = options.prompt;
  if (aspectRatio !== '1:1') prompt += `\n\nImage aspect ratio: ${aspectRatio}`;
  if (options.negativePrompt) prompt += `\n\nAvoid: ${options.negativePrompt}`;
  parts.push({ text: prompt });

  const generationConfig = { responseModalities: ['image', 'text'] };
  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  ];

  console.log(`Generating ${width}x${height} image...`);
  const startTime = Date.now();

  const response = await model.generateContent({ contents: [{ role: 'user', parts }], generationConfig, safetySettings });
  const candidate = response?.response?.candidates?.[0];

  if (!candidate?.content?.parts) throw new Error('No content returned');

  let imageBuffer: Buffer | null = null;
  let mimeType = 'image/png';

  for (const part of candidate.content.parts) {
    if (part.inlineData) {
      mimeType = part.inlineData.mimeType || mimeType;
      imageBuffer = Buffer.from(part.inlineData.data, 'base64');
      break;
    }
  }

  if (!imageBuffer) throw new Error('No image data returned');

  console.log(`Generated in ${Date.now() - startTime}ms (${imageBuffer.length} bytes)`);

  return { buffer: imageBuffer, mimeType, width, height, model: modelId, aspectRatio, imageSize };
}

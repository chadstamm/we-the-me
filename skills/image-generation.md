Image generation and editing skill using Google's Gemini image models (Nano Banana). Use when the user asks to: (1) generate images from text prompts, (2) edit or refine existing images, (3) create OG images, blog headers, icons, or visual assets, (4) do style transfer or aspect ratio changes, (5) iteratively refine generated images.

# Image Generation Skill (Gemini / Nano Banana)

Generate and edit images using Google's Gemini image models directly from the terminal. Supports text-to-image generation, image editing with reference images, multiple aspect ratios, and iterative refinement.

## Setup (One-Time Per Project)

### 1. Get an API Key
Get a free [Google AI API key](https://aistudio.google.com/apikey) and add it to your `.env`:
```
GEMINI_API_KEY=your_key_here
```

### 2. Install Dependencies
```bash
npm install @google/generative-ai uuid dotenv
```

### 3. Create the Image Generation Script
Create a file called `generate-image.ts` in your project root with the code from the "Source Code" section below.

Create a file called `gemini-image.ts` in your project root with the core module code from the "Source Code" section below.

---

## Usage

### Generate a new image
```bash
npx tsx generate-image.ts --prompt "A sunset over mountains, oil painting style" --output sunset.png --aspectRatio 16:9
```

### Edit an existing image
```bash
npx tsx generate-image.ts --prompt "Make it night time with stars" --output night.png --reference day.png --edit
```

### Iterative refinement (generate then refine)
```bash
# Step 1: Generate
npx tsx generate-image.ts -p "Two robots playing chess in a garden" -o v1.png

# Step 2: Refine
npx tsx generate-image.ts -p "Change the left robot to red, add more flowers" -o v2.png -r v1.png --edit
```

## CLI Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--prompt` | `-p` | Text prompt (required) | — |
| `--output` | `-o` | Output file path (required) | — |
| `--aspectRatio` | | `1:1`, `16:9`, `9:16`, `4:3`, `3:4` | `1:1` |
| `--imageSize` | | `1K`, `2K`, `4K` | `1K` |
| `--reference` | `-r` | Reference image path (repeatable for multiple) | — |
| `--negative` | | What to avoid in the image | — |
| `--format` | | `png` or `webp` | `png` |
| `--edit` | | Enable edit mode (requires `--reference`) | `false` |

## How Claude Should Use This Skill

When the user asks for image generation or editing:

1. Ensure `generate-image.ts` and `gemini-image.ts` exist in the project (create them from the source code below if not)
2. Ensure dependencies are installed (`@google/generative-ai`, `uuid`, `dotenv`)
3. Ensure `GEMINI_API_KEY` is set in `.env`
4. Run the CLI via Bash with appropriate options
5. Use `--reference` for brand consistency or iterative edits
6. Use `--edit` mode to refine previously generated images
7. After generating, use the Read tool to view the image and confirm it looks correct
8. If refinement is needed, use edit mode with the previous image as reference

### Prompt Engineering Tips
- Be specific about style: "watercolor", "oil painting", "flat vector illustration", "photorealistic"
- Specify lighting: "golden hour", "dramatic shadows", "soft diffused light"
- Include composition details: "centered", "rule of thirds", "birds-eye view"
- Use `--negative` to exclude unwanted elements: "blurry, text, watermark, low quality"
- For brand consistency, always pass previous images as `--reference`

### Common Use Cases
- **OG images**: `--aspectRatio 16:9 --imageSize 2K`
- **Social media**: `--aspectRatio 1:1` (Instagram) or `--aspectRatio 9:16` (Stories)
- **Blog headers**: `--aspectRatio 16:9`
- **App icons**: `--aspectRatio 1:1 --imageSize 1K`
- **Hero images**: `--aspectRatio 16:9 --imageSize 4K`

### Pricing
Approximately $0.008 per image with Gemini Flash, slightly more with Pro models.

---

## Source Code

### gemini-image.ts

```typescript
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

const MODEL_ID = 'gemini-3-pro-image-preview';

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

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_ID });

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

  return { buffer: imageBuffer, mimeType, width, height, model: MODEL_ID, aspectRatio, imageSize };
}
```

### generate-image.ts

```typescript
#!/usr/bin/env npx tsx

/**
 * CLI for Gemini Image Generation
 *
 * Usage:
 * npx tsx generate-image.ts --prompt "..." --output "path/to/output.png"
 *
 * Environment:
 * GEMINI_API_KEY - Your Google AI API key
 */

import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { parseArgs } from 'util';
import { generateImage, type AspectRatio, type ImageSize, type GenerationMode } from './gemini-image';

config();

async function main() {
  const { values } = parseArgs({
    options: {
      prompt: { type: 'string', short: 'p' },
      output: { type: 'string', short: 'o' },
      aspectRatio: { type: 'string', default: '1:1' },
      imageSize: { type: 'string', default: '1K' },
      reference: { type: 'string', short: 'r', multiple: true },
      negative: { type: 'string' },
      format: { type: 'string', default: 'png' },
      edit: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help || !values.prompt || !values.output) {
    console.log(`
Gemini Image Generator

Usage: npx tsx generate-image.ts --prompt "..." --output "output.png"

Options:
  --prompt, -p     Text prompt (required)
  --output, -o     Output path (required)
  --aspectRatio    1:1, 16:9, 9:16, 4:3, 3:4 (default: 1:1)
  --imageSize      1K, 2K, 4K (default: 1K)
  --reference, -r  Reference image (repeatable)
  --negative       What to avoid
  --format         png or webp (default: png)
  --edit           Edit mode
  --help, -h       Show help

Examples:
  npx tsx generate-image.ts -p "A sunset over mountains" -o sunset.png --aspectRatio 16:9
  npx tsx generate-image.ts -p "Make it night time" -o night.png -r day.png --edit
`);
    process.exit(values.help ? 0 : 1);
  }

  const aspectRatio = values.aspectRatio as AspectRatio;
  const imageSize = values.imageSize as ImageSize;
  const mode: GenerationMode = values.edit ? 'edit' : 'generate';

  if (mode === 'edit' && (!values.reference || values.reference.length === 0)) {
    console.error('Error: Edit mode requires at least one --reference image');
    process.exit(1);
  }

  const referenceImages = values.reference?.map((p: string) => ({ source: 'file' as const, path: p }));

  console.log(`Mode: ${mode}`);
  console.log(`Prompt: "${values.prompt.slice(0, 50)}${values.prompt.length > 50 ? '...' : ''}"`);
  console.log(`Aspect: ${aspectRatio}, Size: ${imageSize}`);

  try {
    const result = await generateImage({
      mode,
      prompt: values.prompt,
      negativePrompt: values.negative,
      aspectRatio,
      imageSize,
      referenceImages,
      outputFormat: values.format === 'webp' ? 'webp' : 'png',
    }, process.cwd());

    await mkdir(dirname(resolve(values.output)), { recursive: true });
    await writeFile(resolve(values.output), result.buffer);

    console.log(`\n✓ Saved: ${values.output}`);
    console.log(`  ${result.width}x${result.height}, ${result.mimeType}, ${result.buffer.length} bytes`);
  } catch (err: any) {
    console.error('\nError:', err.message);
    process.exit(1);
  }
}

main();
```

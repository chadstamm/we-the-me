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
      model: { type: 'string', short: 'm', default: 'gemini-2.5-flash-image' },
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
  --model, -m      Model: gemini-2.5-flash-image (free) or gemini-3-pro-image-preview (paid)
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

  console.log(`Model: ${values.model}`);
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
      model: values.model,
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

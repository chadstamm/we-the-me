import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const maxDuration = 300;

interface AnswerPayload {
  questionId: string;
  value: string | string[];
}

interface GenerateRequest {
  answers: AnswerPayload[];
  email: string;
  firstName: string;
  lastName: string;
}

const SYSTEM_PROMPT = `You are a masterful writer and personal development expert. Your task is to create a Personal Constitution — a guiding document that defines who a person is, what they stand for, and how they commit to living.

Based on the user's answers to guided reflection questions, craft a beautifully structured Personal Constitution document in Markdown format.

STRUCTURE:
1. **Title**: "The Personal Constitution of [Name]"
2. **Preamble**: An inspiring opening paragraph that captures the essence of who this person is and aspires to be
3. **Article I — Core Values**: Define their foundational values with brief explanations
4. **Article II — Purpose & Mission**: Their life's purpose and vision
5. **Article III — Commitments & Practices**: Daily commitments and habits they pledge to uphold
6. **Article IV — Growth & Evolution**: Areas of growth and their plan for continuous improvement
7. **Closing Declaration**: A powerful closing statement that ties it all together

GUIDELINES:
- Write in first person ("I believe...", "I commit to...")
- Be specific — use their actual words and examples where possible
- Be inspiring but authentic — avoid generic platitudes
- Use the structure of the U.S. Constitution as loose inspiration (articles, preamble) but make it deeply personal
- Keep the language elevated but accessible
- The document should be 800-1500 words
- Format in clean Markdown`;

function buildUserPrompt(data: GenerateRequest): string {
  const { answers, firstName, lastName } = data;
  const name = [firstName, lastName].filter(Boolean).join(' ');

  let prompt = `Please create a Personal Constitution for ${name}. Here are their responses to the guided reflection questions:\n\n`;

  for (const answer of answers) {
    const value = Array.isArray(answer.value)
      ? answer.value.join(', ')
      : answer.value;

    if (value.trim()) {
      prompt += `**${answer.questionId}**: ${value}\n\n`;
    }
  }

  prompt += `\nPlease generate their Personal Constitution now.`;
  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateRequest;

    if (!body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request: answers array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const userPrompt = buildUserPrompt(body);

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    const document = textBlock ? textBlock.text : '';

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate document content' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error('Generate API error:', error);

    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

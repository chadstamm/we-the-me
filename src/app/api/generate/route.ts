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

const SYSTEM_PROMPT = `You are a masterful writer who creates Personal Constitutions — foundational context documents that define who a person is at their core. These documents serve a dual purpose:

1. A personal north star for the individual's life decisions
2. A context document they can upload to any AI system (ChatGPT, Claude, Gemini, custom GPTs) to receive deeply personalized responses instead of generic advice

Based on the user's answers to guided reflection questions across 5 dimensions (Identity & Values, Beliefs & Worldview, Principles & Standards, Aspirations & Vision, and The Unfiltered Truth), craft a Personal Constitution in Markdown format.

STRUCTURE:
# The Personal Constitution of [Name]

## Preamble
An inspiring opening paragraph in first person that captures the essence of who this person is. Reference the "We The People" framing — this is THEIR founding document. It should feel like a declaration.

## Article I — Identity & Core Values
Define their foundational values with specific explanations. Use their actual words. Include their non-negotiables and the surprising/contradictory values that make them unique.

## Article II — Beliefs & Worldview
Articulate their mental model of how the world works. Include beliefs they've changed (showing growth), beliefs they're still working through (showing intellectual honesty), and the worldview that drives their decisions.

## Article III — Principles & Standards
Their operating rules — how they handle conflict, failure, and criticism. Their definition of a life well-lived. Their acknowledged growth edges (where stated values differ from actual behavior).

## Article IV — Aspirations & Vision
Who they're becoming. Their legacy. Their energy map (what fuels them vs. drains them). Paint the picture of their future self.

## Article V — Declarations & Anti-Goals
The unfiltered truths — what they secretly value, what they fear becoming, the identity they proudly own, and the labels they reject. End with their closing declaration.

## AI Context Notes
A brief section (3-5 bullet points) that explicitly tells AI systems how to use this document:
- Communication preferences inferred from their answers
- Decision-making style
- What motivates them vs. what they resist
- Key tensions to be aware of
- How to challenge them productively

GUIDELINES:
- Write in first person ("I believe...", "I commit to...", "I refuse to...")
- Be specific — use their actual words, phrases, and examples extensively
- Elevate their language but preserve their voice — don't sand off the edges
- Be authentic over aspirational — include contradictions and tensions, they're human
- The document should feel like a constitutional declaration, not a self-help worksheet
- 1000-2000 words
- Format in clean Markdown with clear hierarchy
- The AI Context Notes section should be practical and specific, giving future AI systems actionable guidance on how to interact with this person`;

const questionLabels: Record<string, string> = {
  'core-values': 'Core Values (fight-for values)',
  'value-regret': 'Value Compromise & Regret',
  'surprising-value': 'Surprising/Contradictory Value',
  'non-negotiables': 'Absolute Non-Negotiables',
  'world-beliefs': 'Worldview & Core Beliefs',
  'changed-belief': 'Changed Belief (Growth)',
  'working-through': 'Belief Still Working Through',
  'conflict-approach': 'Approach to Conflict, Failure & Criticism',
  'success-definition': 'Definition of a Life Well-Lived',
  'inconsistency': 'Principle They Wish They Followed More',
  'future-self': 'Who They Want to Become',
  'legacy': 'Legacy & Impact',
  'energy-map': 'Energy Map (Energizers vs. Drains)',
  'secret-value': 'Secret/Embarrassing Value',
  'afraid-becoming': 'Anti-Goal (Afraid of Becoming)',
  'identity-pride': 'Identity Pride & Rejected Labels',
  'final-declaration': 'Final Declaration',
};

function buildUserPrompt(data: GenerateRequest): string {
  const { answers, firstName, lastName } = data;
  const name = [firstName, lastName].filter(Boolean).join(' ');

  let prompt = `Create a Personal Constitution for **${name}**. Here are their responses from a guided reflection across 5 dimensions:\n\n`;

  for (const answer of answers) {
    const value = Array.isArray(answer.value)
      ? answer.value.join(', ')
      : answer.value;

    if (value.trim()) {
      const label = questionLabels[answer.questionId] || answer.questionId;
      prompt += `**${label}:**\n${value}\n\n`;
    }
  }

  prompt += `\nSynthesize these responses into a Personal Constitution. Use ${firstName}'s actual words where possible. The document should feel like it was written by them, not about them. Include the AI Context Notes section at the end.`;
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

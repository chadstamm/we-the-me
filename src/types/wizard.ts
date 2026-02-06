export interface WizardQuestion {
  id: string;
  phase: number;
  phaseName: string;
  question: string;
  subtext?: string;
  considerations?: string[];
  inputType: 'textarea' | 'text' | 'select' | 'multiselect';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  showWhen?: {
    questionId: string;
    includesAny?: string[];
  };
}

export interface WizardAnswer {
  questionId: string;
  value: string | string[];
}

export interface WizardState {
  currentStep: number;
  answers: WizardAnswer[];
  firstName: string;
  lastName: string;
  email: string;
  isComplete: boolean;
  isGenerating: boolean;
  generatedDocument: string | null;
  error: string | null;
}

export type WizardAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_ANSWER'; questionId: string; value: string | string[] }
  | { type: 'SET_FIRST_NAME'; firstName: string }
  | { type: 'SET_LAST_NAME'; lastName: string }
  | { type: 'SET_EMAIL'; email: string }
  | { type: 'START_GENERATING' }
  | { type: 'SET_DOCUMENT'; document: string }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'RESET' };

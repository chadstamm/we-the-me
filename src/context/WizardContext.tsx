'use client';

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
  type Dispatch,
} from 'react';
import { WizardState, WizardAction, WizardAnswer } from '@/types/wizard';
import { getActiveQuestions } from '@/utils/questionFlow';

const initialState: WizardState = {
  currentStep: 0,
  answers: [],
  firstName: '',
  lastName: '',
  email: '',
  isComplete: false,
  isGenerating: false,
  generatedDocument: null,
  error: null,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step, error: null };
    case 'SET_ANSWER': {
      const existing = state.answers.findIndex(
        (a) => a.questionId === action.questionId
      );
      const newAnswers = [...state.answers];
      const answer: WizardAnswer = {
        questionId: action.questionId,
        value: action.value,
      };
      if (existing >= 0) {
        newAnswers[existing] = answer;
      } else {
        newAnswers.push(answer);
      }
      return { ...state, answers: newAnswers };
    }
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.firstName };
    case 'SET_LAST_NAME':
      return { ...state, lastName: action.lastName };
    case 'SET_EMAIL':
      return { ...state, email: action.email };
    case 'START_GENERATING':
      return { ...state, isGenerating: true, error: null, generatedDocument: null };
    case 'SET_DOCUMENT':
      return {
        ...state,
        isGenerating: false,
        isComplete: true,
        generatedDocument: action.document,
      };
    case 'SET_ERROR':
      return { ...state, isGenerating: false, error: action.error };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface WizardContextValue {
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
  activeQuestions: ReturnType<typeof getActiveQuestions>;
  totalSteps: number;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const activeQuestions = useMemo(
    () => getActiveQuestions(state.answers),
    [state.answers]
  );

  // step 0 = intro, 1..N = questions, N+1 = email, N+2 = generating
  const totalSteps = activeQuestions.length + 3;

  const value = useMemo(
    () => ({ state, dispatch, activeQuestions, totalSteps }),
    [state, dispatch, activeQuestions, totalSteps]
  );

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return ctx;
}

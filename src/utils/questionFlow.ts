import { WizardQuestion, WizardAnswer } from '@/types/wizard';
import { questions } from '@/data/questions';

export function getActiveQuestions(answers: WizardAnswer[]): WizardQuestion[] {
  return questions.filter((q) => {
    if (!q.showWhen) return true;

    const dependentAnswer = answers.find(
      (a) => a.questionId === q.showWhen!.questionId
    );
    if (!dependentAnswer) return false;

    if (q.showWhen.includesAny) {
      const answerValues = Array.isArray(dependentAnswer.value)
        ? dependentAnswer.value
        : [dependentAnswer.value];
      return q.showWhen.includesAny.some((opt) => answerValues.includes(opt));
    }

    return true;
  });
}

export function getAnswerValue(
  answers: WizardAnswer[],
  questionId: string
): string | string[] | undefined {
  return answers.find((a) => a.questionId === questionId)?.value;
}

export function toggleMultiselectValue(
  current: string[],
  value: string
): string[] {
  return current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
}

export function calculateProgress(
  currentQuestionIndex: number,
  totalQuestions: number
): number {
  if (totalQuestions === 0) return 0;
  return Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
}

export function getPhaseInfo(activeQuestions: WizardQuestion[], questionIndex: number) {
  if (questionIndex < 0 || questionIndex >= activeQuestions.length) {
    return { phaseName: '', phaseNumber: 0, questionInPhase: 0, totalInPhase: 0 };
  }

  const currentQuestion = activeQuestions[questionIndex];
  const phaseQuestions = activeQuestions.filter(
    (q) => q.phase === currentQuestion.phase
  );
  const questionInPhase = phaseQuestions.indexOf(currentQuestion) + 1;

  return {
    phaseName: currentQuestion.phaseName,
    phaseNumber: currentQuestion.phase,
    questionInPhase,
    totalInPhase: phaseQuestions.length,
  };
}

export function getUniquePhases(activeQuestions: WizardQuestion[]): number[] {
  return [...new Set(activeQuestions.map((q) => q.phase))];
}

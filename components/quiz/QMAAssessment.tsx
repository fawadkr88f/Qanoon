'use client';

import { useState } from 'react';
import { INTAKE_QUESTIONS } from '@/lib/qma-engine/questions';
import { buildAssessmentResult } from '@/lib/qmaEngine';
import { QuestionStep } from '@/components/quiz/QuestionStep';
import { StepProgress } from '@/components/quiz/StepProgress';
import { AssessmentResultView } from '@/components/results/AssessmentResultView';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import type { AssessmentAnswers, AssessmentResult, OptionKey } from '@/types/qma';

export function QMAAssessment() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const currentQuestion = INTAKE_QUESTIONS[currentStepIndex];
  const totalSteps = INTAKE_QUESTIONS.length;

  const isCurrentAnswered = currentQuestion
    ? answers[currentQuestion.id] !== undefined
    : false;

  const handleSelectOption = (key: OptionKey) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Final step: calculate result instantly on the client
      try {
        const computed = buildAssessmentResult(answers);
        setResult(computed);
      } catch (err) {
        console.error('Calculation error:', err);
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setResult(null);
  };

  if (result) {
    return <AssessmentResultView result={result} onRetake={handleRetake} />;
  }

  if (!currentQuestion) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-4">
      {/* Progress Bar */}
      <StepProgress
        currentStep={currentStepIndex}
        totalSteps={totalSteps}
        currentSection={currentQuestion.section}
      />

      {/* Main Card with Question */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <QuestionStep
          question={currentQuestion}
          selectedOptionKey={answers[currentQuestion.id]}
          onSelect={handleSelectOption}
        />

        {/* Navigation Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleNext}
            disabled={!isCurrentAnswered}
          >
            {currentStepIndex === totalSteps - 1 ? 'Calculate Result' : 'Next Question'}
          </Button>
        </div>
      </div>

      {/* Privacy Callout */}
      <Callout tone="info" role="status">
        <strong>Client-side assessment:</strong> Your answers are calculated purely in your browser session.
        No responses, health indicators, or identifiers are transmitted to any database or external server.
      </Callout>
    </div>
  );
}

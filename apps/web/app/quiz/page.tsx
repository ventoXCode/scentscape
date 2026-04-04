"use client";

import { useState } from "react";
import { QuizAnswers, QUIZ_STEPS, QuizStep } from "@/lib/quiz/types";
import { GenderStep } from "@/components/quiz/steps/gender-step";
import { MoodStep } from "@/components/quiz/steps/mood-step";
import { FamilyStep } from "@/components/quiz/steps/family-step";
import { IntensityStep } from "@/components/quiz/steps/intensity-step";
import { QuizResults } from "@/components/quiz/quiz-results";

const initialAnswers: QuizAnswers = {
  gender: null,
  moods: [],
  families: [],
  intensity: null,
  occasions: [],
};

export default function QuizPage() {
  const [step, setStep] = useState<QuizStep>("gender");
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);

  const currentStepIndex = QUIZ_STEPS.indexOf(step);
  const progress = ((currentStepIndex + 1) / QUIZ_STEPS.length) * 100;

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < QUIZ_STEPS.length) {
      setStep(QUIZ_STEPS[nextIndex]);
    }
  };

  const goBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(QUIZ_STEPS[prevIndex]);
    }
  };

  const updateAnswers = (partial: Partial<QuizAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {step === "gender" && (
          <GenderStep
            value={answers.gender}
            onChange={(gender) => updateAnswers({ gender })}
            onNext={goNext}
          />
        )}

        {step === "mood" && (
          <MoodStep
            value={answers.moods}
            onChange={(moods) => updateAnswers({ moods })}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === "family" && (
          <FamilyStep
            value={answers.families}
            onChange={(families) => updateAnswers({ families })}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === "intensity" && (
          <IntensityStep
            value={answers.intensity}
            occasions={answers.occasions}
            onChange={(intensity, occasions) =>
              updateAnswers({ intensity, occasions })
            }
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === "results" && (
          <QuizResults
            answers={answers}
            onRetake={() => {
              setAnswers(initialAnswers);
              setStep("gender");
            }}
          />
        )}
      </div>
    </div>
  );
}

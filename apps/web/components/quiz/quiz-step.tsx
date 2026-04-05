"use client";

import { useState, useCallback } from "react";
import type { QuizQuestion } from "@/lib/quiz/types";

interface QuizStepProps {
  question: QuizQuestion;
  currentAnswer: string | string[] | undefined;
  stepNumber: number;
  totalSteps: number;
  onSingleSelect: (questionId: string, optionId: string) => void;
  onMultiSelect: (questionId: string, optionIds: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function QuizStep({
  question,
  currentAnswer,
  stepNumber,
  totalSteps,
  onSingleSelect,
  onMultiSelect,
  onNext,
  onBack,
  canGoBack,
}: QuizStepProps) {
  const [selectedSingle, setSelectedSingle] = useState<string | null>(
    typeof currentAnswer === "string" ? currentAnswer : null
  );
  const [selectedMulti, setSelectedMulti] = useState<string[]>(
    Array.isArray(currentAnswer) ? currentAnswer : []
  );
  const [animatingOut, setAnimatingOut] = useState(false);

  const handleSingleSelect = useCallback(
    (optionId: string) => {
      setSelectedSingle(optionId);
      onSingleSelect(question.id, optionId);
      // Auto-advance after brief visual feedback
      setAnimatingOut(true);
      setTimeout(() => {
        onNext();
      }, 350);
    },
    [question.id, onSingleSelect, onNext]
  );

  const handleMultiToggle = useCallback(
    (optionId: string) => {
      setSelectedMulti((prev) => {
        let next: string[];
        if (prev.includes(optionId)) {
          next = prev.filter((id) => id !== optionId);
        } else if (question.maxSelections && prev.length >= question.maxSelections) {
          // Replace oldest selection
          next = [...prev.slice(1), optionId];
        } else {
          next = [...prev, optionId];
        }
        onMultiSelect(question.id, next);
        return next;
      });
    },
    [question.id, question.maxSelections, onMultiSelect]
  );

  const isMulti = question.type === "multi";

  return (
    <div
      className={`flex flex-col min-h-[calc(100vh-4rem)] transition-all duration-300 ${
        animatingOut ? "opacity-0 translate-x-[-20px]" : "opacity-100 translate-x-0"
      }`}
    >
      {/* Step indicator */}
      <div className="text-center pt-8 pb-2">
        <span className="text-sm text-gray-400 tracking-wide">
          {stepNumber} of {totalSteps}
        </span>
      </div>

      {/* Question */}
      <div className="text-center px-4 pb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
          {question.title}
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          {question.subtitle}
        </p>
        {isMulti && question.maxSelections && (
          <p className="text-xs text-gray-400 mt-1">
            Select up to {question.maxSelections}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="flex-1 px-4 pb-8">
        <div
          className={`grid gap-3 max-w-2xl mx-auto ${
            question.options.length <= 3
              ? "grid-cols-1"
              : question.options.length === 4
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {question.options.map((option) => {
            const isSelected = isMulti
              ? selectedMulti.includes(option.id)
              : selectedSingle === option.id;

            return (
              <button
                key={option.id}
                onClick={() =>
                  isMulti
                    ? handleMultiToggle(option.id)
                    : handleSingleSelect(option.id)
                }
                className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-black bg-black/[0.03] shadow-md scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0 mt-0.5" role="presentation">
                    {option.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm md:text-base">
                      {option.label}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 pb-8 max-w-2xl mx-auto w-full">
        <div className="flex gap-3">
          {canGoBack && (
            <button
              onClick={onBack}
              className="px-5 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          {isMulti && (
            <button
              onClick={() => {
                setAnimatingOut(true);
                setTimeout(onNext, 300);
              }}
              disabled={selectedMulti.length === 0}
              className="flex-1 py-3 rounded-lg bg-black text-white text-sm font-medium disabled:opacity-40 hover:bg-gray-800 transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

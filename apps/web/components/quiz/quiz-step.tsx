"use client";

import { useState, useCallback } from "react";
import { useSwipe } from "@/hooks/use-swipe";
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

/** Fire-and-forget haptic tap — silent no-op on unsupported devices */
function hapticTap() {
  try {
    navigator?.vibrate?.(10);
  } catch {
    // Not available (desktop, iOS Safari, etc.)
  }
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
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  const isMulti = question.type === "multi";

  const animateAndAdvance = useCallback(() => {
    setSlideDirection("left");
    setAnimatingOut(true);
    setTimeout(onNext, 300);
  }, [onNext]);

  const animateAndGoBack = useCallback(() => {
    if (!canGoBack) return;
    setSlideDirection("right");
    setAnimatingOut(true);
    setTimeout(onBack, 300);
  }, [canGoBack, onBack]);

  // Swipe navigation: left = next (multi only if has selection), right = back
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (isMulti && selectedMulti.length > 0) {
        hapticTap();
        animateAndAdvance();
      }
      // Single-select auto-advances on tap, so swipe-left is a no-op there
    },
    onSwipeRight: () => {
      if (canGoBack) {
        hapticTap();
        animateAndGoBack();
      }
    },
  });

  const handleSingleSelect = useCallback(
    (optionId: string) => {
      hapticTap();
      setSelectedSingle(optionId);
      onSingleSelect(question.id, optionId);
      // Auto-advance after brief visual feedback
      setSlideDirection("left");
      setAnimatingOut(true);
      setTimeout(onNext, 350);
    },
    [question.id, onSingleSelect, onNext]
  );

  const handleMultiToggle = useCallback(
    (optionId: string) => {
      hapticTap();
      setSelectedMulti((prev) => {
        let next: string[];
        if (prev.includes(optionId)) {
          next = prev.filter((id) => id !== optionId);
        } else if (question.maxSelections && prev.length >= question.maxSelections) {
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

  const translateClass =
    slideDirection === "left" ? "-translate-x-5" : "translate-x-5";

  return (
    <div
      {...swipeHandlers}
      className={`flex flex-col min-h-[100dvh] transition-all duration-300 touch-pan-y ${
        animatingOut
          ? `opacity-0 ${translateClass}`
          : "opacity-100 translate-x-0"
      }`}
    >
      {/* Step indicator */}
      <div className="text-center pt-8 pb-2">
        <span className="text-sm text-text-muted tracking-wide">
          {stepNumber} of {totalSteps}
        </span>
      </div>

      {/* Question */}
      <div className="text-center px-4 pb-6 md:pb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 tracking-tight">
          {question.title}
        </h2>
        <p className="text-text-muted text-sm md:text-base">
          {question.subtitle}
        </p>
        {isMulti && question.maxSelections && (
          <p className="text-xs text-text-muted mt-1">
            Select up to {question.maxSelections}
          </p>
        )}
        {question.hint && (
          <p className="text-xs text-text-muted mt-3 max-w-md mx-auto leading-relaxed bg-surface-subtle rounded-lg px-4 py-2.5">
            {question.hint}
          </p>
        )}
      </div>

      {/* Options — min 44px touch target per WCAG, thumb-friendly spacing */}
      <div className="flex-1 px-4 pb-4 md:pb-8">
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
                className={`group relative min-h-[3.5rem] p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.97] ${
                  isSelected
                    ? "border-text-primary bg-text-primary/[0.03] shadow-card-hover scale-[1.02]"
                    : "border-border-default bg-surface-elevated hover:border-border-strong hover:shadow-sm"
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
                    <p className="text-xs md:text-sm text-text-muted mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-text-primary flex items-center justify-center">
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

      {/* Sticky bottom navigation — always within thumb reach */}
      <div className="sticky bottom-0 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-surface-elevated from-80% to-transparent max-w-2xl mx-auto w-full">
        <div className="flex gap-3">
          {canGoBack && (
            <button
              onClick={animateAndGoBack}
              className="min-h-[2.75rem] px-5 py-3 rounded-lg border border-border-default text-sm font-medium text-text-secondary hover:bg-surface-subtle active:scale-[0.97] transition-all"
            >
              Back
            </button>
          )}
          {isMulti && (
            <button
              onClick={() => {
                hapticTap();
                animateAndAdvance();
              }}
              disabled={selectedMulti.length === 0}
              className="flex-1 min-h-[2.75rem] py-3 rounded-lg bg-text-primary text-text-inverse text-sm font-medium disabled:opacity-40 hover:bg-text-secondary active:scale-[0.97] transition-all"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

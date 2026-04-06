"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { createEmptySession } from "@/lib/quiz/types";
import type { QuizSession } from "@/lib/quiz/types";
import {
  getActiveQuestions,
  getCurrentQuestion,
  getTotalSteps,
  isQuizComplete,
  applySingleAnswer,
  applyMultiAnswer,
  advanceStep,
  goBackStep,
  saveSession,
  loadSession,
  clearSession,
} from "@/lib/quiz/quiz-engine";
import { QuizStep } from "@/components/quiz/quiz-step";

const QuizResults = dynamic(
  () =>
    import("@/components/quiz/quiz-results").then((mod) => mod.QuizResults),
  {
    loading: () => (
      <div className="min-h-[60dvh] flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-surface-subtle" />
      </div>
    ),
  }
);

/** Compact dot-style progress indicator for mobile, thin bar on desktop */
function QuizProgress({
  currentStep,
  totalSteps,
  complete,
}: {
  currentStep: number;
  totalSteps: number;
  complete: boolean;
}) {
  const progress = complete
    ? 100
    : ((currentStep + 1) / (totalSteps + 1)) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop: thin progress bar */}
      <div className="hidden md:block h-1 bg-surface-subtle">
        <div
          className="h-full bg-text-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile: compact dot indicator */}
      <div className="flex md:hidden items-center justify-center gap-1.5 py-2 bg-surface-elevated/80 backdrop-blur-sm">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i < currentStep
                ? "w-2 h-2 bg-text-primary"
                : i === currentStep && !complete
                ? "w-6 h-2 rounded-full bg-text-primary"
                : "w-2 h-2 bg-border-default"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<QuizSession | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize session from localStorage or fresh start
  useEffect(() => {
    const stepParam = searchParams.get("step");
    const saved = loadSession();

    if (saved && !stepParam) {
      setSession(saved);
    } else if (saved && stepParam === "results" && isQuizComplete(saved)) {
      setSession(saved);
    } else if (stepParam === null || stepParam === "1") {
      const fresh = createEmptySession();
      setSession(fresh);
      saveSession(fresh);
    } else if (saved) {
      setSession(saved);
    } else {
      setSession(createEmptySession());
    }
    setMounted(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync URL with current step
  useEffect(() => {
    if (!session || !mounted) return;

    const activeQuestions = getActiveQuestions(session);
    const complete = isQuizComplete(session);
    const currentStepId = complete
      ? "results"
      : activeQuestions[session.currentStepIndex]?.id ?? "1";

    const currentParam = searchParams.get("step");
    if (currentParam !== currentStepId) {
      router.replace(`/quiz?step=${currentStepId}`, { scroll: false });
    }
  }, [session, mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle browser back/forward
  useEffect(() => {
    if (!session || !mounted) return;

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const stepId = params.get("step");
      if (!stepId || stepId === "1") {
        const fresh = createEmptySession();
        setSession(fresh);
        return;
      }

      const active = getActiveQuestions(session);
      const index = active.findIndex((q) => q.id === stepId);
      if (index >= 0 && index !== session.currentStepIndex) {
        setSession((prev) => {
          if (!prev) return prev;
          return { ...prev, currentStepIndex: index };
        });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [session, mounted]);

  const updateSession = useCallback((next: QuizSession) => {
    setSession(next);
    saveSession(next);
  }, []);

  const handleSingleSelect = useCallback(
    (questionId: string, optionId: string) => {
      if (!session) return;
      const updated = applySingleAnswer(session, questionId, optionId);
      updateSession(updated);
    },
    [session, updateSession]
  );

  const handleMultiSelect = useCallback(
    (questionId: string, optionIds: string[]) => {
      if (!session) return;
      const updated = applyMultiAnswer(session, questionId, optionIds);
      updateSession(updated);
    },
    [session, updateSession]
  );

  const handleNext = useCallback(() => {
    if (!session) return;
    const next = advanceStep(session);
    updateSession(next);

    const activeQuestions = getActiveQuestions(next);
    const complete = isQuizComplete(next);
    const stepId = complete
      ? "results"
      : activeQuestions[next.currentStepIndex]?.id ?? "results";
    router.push(`/quiz?step=${stepId}`, { scroll: false });
  }, [session, updateSession, router]);

  const handleBack = useCallback(() => {
    if (!session) return;
    const prev = goBackStep(session);
    updateSession(prev);
    router.back();
  }, [session, updateSession, router]);

  const handleRetake = useCallback(() => {
    clearSession();
    const fresh = createEmptySession();
    setSession(fresh);
    saveSession(fresh);
    router.push("/quiz?step=environment", { scroll: false });
  }, [router]);

  // SSR/hydration guard
  if (!mounted || !session) {
    return (
      <div className="min-h-[100dvh] bg-surface-elevated flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-surface-subtle" />
      </div>
    );
  }

  const complete = isQuizComplete(session);
  const totalSteps = getTotalSteps(session);

  if (complete) {
    return (
      <div className="min-h-[100dvh] bg-surface-elevated">
        <QuizProgress currentStep={totalSteps} totalSteps={totalSteps} complete />
        <QuizResults session={session} onRetake={handleRetake} />
      </div>
    );
  }

  const question = getCurrentQuestion(session);
  if (!question) return null;

  return (
    <div className="min-h-[100dvh] bg-surface-elevated">
      <QuizProgress
        currentStep={session.currentStepIndex}
        totalSteps={totalSteps}
        complete={false}
      />

      <QuizStep
        key={question.id}
        question={question}
        currentAnswer={session.answers[question.id]}
        stepNumber={session.currentStepIndex + 1}
        totalSteps={totalSteps}
        onSingleSelect={handleSingleSelect}
        onMultiSelect={handleMultiSelect}
        onNext={handleNext}
        onBack={handleBack}
        canGoBack={session.currentStepIndex > 0}
      />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-surface-elevated flex items-center justify-center">
          <div className="animate-pulse w-8 h-8 rounded-full bg-surface-subtle" />
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useOnboardingStore } from "@/store/onboarding-store";
import type {
  AvailabilityOption,
  CurrentLevelOption,
  RoleOption,
  TimelineOption,
} from "@/types/onboarding";

const missionExamples = [
  "Crack Google",
  "Become ML Engineer",
  "Learn Japanese",
  "Master React",
  "Prepare for GATE",
];

const roleOptions: RoleOption[] = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "AI / ML Engineer",
  "Cloud Engineer",
  "Data Scientist",
  "Other",
];

const availabilityOptions: AvailabilityOption[] = [
  "1-2 Hours",
  "2-4 Hours",
  "4-6 Hours",
  "6+ Hours",
];

const levelOptions: CurrentLevelOption[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const timelineOptions: TimelineOption[] = [
  "1 Month",
  "3 Months",
  "6 Months",
  "1 Year",
];

const stepLabels = [
  { number: "1", title: "Mission Discovery", emoji: "🎯" },
  { number: "2", title: "Career Direction", emoji: "💼" },
  { number: "3", title: "Skill Assessment", emoji: "📚" },
  { number: "4", title: "Time Commitment", emoji: "⏰" },
  { number: "5", title: "Mission Timeline", emoji: "🗓" },
];

const aiMessages = {
  step1: "Welcome to Zenix.\n\nI'm your AI academic strategist.\nTell me what you're trying to achieve.",
  step2: "Great choice.\n\nWhat role or outcome are you targeting?",
  step3: "How would you describe your current level?",
  step4: "How much time can you consistently invest each day?",
  step5: "When would you like to achieve this goal?",
  thinking: [
    "Analyzing mission...",
    "Building mission profile...",
    "Generating learning strategy...",
    "Preparing personalized workspace...",
  ],
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState(0);

  const mission = useOnboardingStore((state) => state.mission);
  const role = useOnboardingStore((state) => state.role);
  const availability = useOnboardingStore((state) => state.availability);
  const timeline = useOnboardingStore((state) => state.timeline);
  const currentLevel = useOnboardingStore((state) => state.currentLevel);

  const setMission = useOnboardingStore((state) => state.setMission);
  const setRole = useOnboardingStore((state) => state.setRole);
  const setAvailability = useOnboardingStore((state) => state.setAvailability);
  const setTimeline = useOnboardingStore((state) => state.setTimeline);
  const setCurrentLevel = useOnboardingStore((state) => state.setCurrentLevel);
  const reset = useOnboardingStore((state) => state.reset);

  const handleNext = async () => {
    if (step < stepLabels.length) {
      setIsThinking(true);
      setThinkingMessage(0);

      // Animate thinking messages
      let messageIndex = 0;
      const thinkingInterval = setInterval(() => {
        messageIndex++;
        if (messageIndex < aiMessages.thinking.length) {
          setThinkingMessage(messageIndex);
        } else {
          clearInterval(thinkingInterval);
        }
      }, 600);

      // Move to next step after 2-3 seconds
      await new Promise((resolve) => setTimeout(resolve, 2500));
      clearInterval(thinkingInterval);
      setIsThinking(false);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChipClick = (example: string) => {
    setMission(example);
  };

  const handleSubmit = async () => {
    setIsThinking(true);
    setThinkingMessage(0);

    let messageIndex = 0;
    const thinkingInterval = setInterval(() => {
      messageIndex++;
      if (messageIndex < aiMessages.thinking.length) {
        setThinkingMessage(messageIndex);
      } else {
        clearInterval(thinkingInterval);
      }
    }, 600);

    await new Promise((resolve) => setTimeout(resolve, 2500));
    clearInterval(thinkingInterval);
    setIsThinking(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    reset();
    setStep(1);
    setSubmitted(false);
  };

  const getStepMessage = () => {
    switch (step) {
      case 1:
        return aiMessages.step1;
      case 2:
        return aiMessages.step2;
      case 3:
        return aiMessages.step3;
      case 4:
        return aiMessages.step4;
      case 5:
        return aiMessages.step5;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_380px]">
        {/* Left Column: Conversation */}
        <section className="space-y-6">
          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-text-secondary">
                Step {step} of {stepLabels.length}
              </span>
              <span className="text-sm text-text-muted">•</span>
              <span className="text-sm text-text-secondary">
                {stepLabels[step - 1].emoji} {stepLabels[step - 1].title}
              </span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-border">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C766] transition-all duration-500 ${
                  step === 1
                    ? "w-[20%]"
                    : step === 2
                      ? "w-[40%]"
                      : step === 3
                        ? "w-[60%]"
                        : step === 4
                          ? "w-[80%]"
                          : "w-[100%]"
                }`}
              />
            </div>
          </div>

          {submitted ? (
            // Final Summary
            <Card className="border-border bg-card">
              <CardContent className="space-y-6 p-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-text-primary">
                    Mission Ready
                  </h2>
                  <p className="text-text-secondary">
                    Your AI strategist has analyzed your profile
                  </p>
                </div>

                {/* Profile Summary */}
                <div className="grid gap-4">
                  <div className="rounded-xl border border-border bg-card-elevated p-4">
                    <p className="text-xs uppercase tracking-widest text-text-muted">
                      🎯 Goal
                    </p>
                    <p className="mt-2 text-lg font-semibold text-text-primary">
                      {mission}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card-elevated p-4">
                    <p className="text-xs uppercase tracking-widest text-text-muted">
                      💼 Target Role
                    </p>
                    <p className="mt-2 text-lg font-semibold text-text-primary">
                      {role || "Not specified"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-border bg-card-elevated p-3">
                      <p className="text-xs uppercase tracking-widest text-text-muted">
                        📚 Level
                      </p>
                      <p className="mt-2 font-semibold text-text-primary">
                        {currentLevel}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card-elevated p-3">
                      <p className="text-xs uppercase tracking-widest text-text-muted">
                        ⏰ Daily
                      </p>
                      <p className="mt-2 text-sm font-semibold text-text-primary">
                        {availability}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card-elevated p-3">
                      <p className="text-xs uppercase tracking-widest text-text-muted">
                        🗓 Timeline
                      </p>
                      <p className="mt-2 font-semibold text-text-primary">
                        {timeline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Assessment */}
                <div className="space-y-3 rounded-xl border border-border bg-card-elevated p-4">
                  <p className="text-sm font-semibold text-[#D4AF37]">
                    AI Assessment
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Based on your profile, Zenix will generate a personalized
                    study plan, adaptive focus sessions, quizzes, and mission
                    tracking tailored to your goals.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex-1"
                  >
                    Start Again
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button className="w-full">Launch Workspace</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Conversation Flow
            <Card className="border-border bg-card">
              <CardContent className="space-y-6 p-8">
                {/* AI Message */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#D4AF37]">Zenix AI</p>
                  <p className="whitespace-pre-line text-text-secondary leading-relaxed">
                    {getStepMessage()}
                  </p>
                </div>

                {/* Thinking State */}
                {isThinking && (
                  <div className="space-y-3 rounded-lg border border-border/50 bg-card-elevated/50 p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-bounce delay-100" />
                        <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-bounce delay-200" />
                      </div>
                      <span className="text-sm text-text-secondary">
                        {aiMessages.thinking[thinkingMessage]}
                      </span>
                    </div>
                  </div>
                )}
                {/* Step Content */}
                {!isThinking && (
                  <div className="space-y-4">
                    {step === 1 && (
                      <>
                        <div className="space-y-3">
                          <Input
                            value={mission}
                            onChange={(e) => setMission(e.target.value)}
                            placeholder="e.g., Crack Google, Master React"
                            aria-label="Mission"
                          />
                        </div>

                        {/* Mission Chips */}
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-widest text-text-muted">
                            Popular missions
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {missionExamples.map((example) => (
                              <button
                                key={example}
                                onClick={() => handleChipClick(example)}
                                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                                  mission === example
                                    ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
                                    : "border border-border bg-card-elevated text-text-secondary hover:border-[#D4AF37]/50 hover:text-text-primary"
                                }`}
                              >
                                {example}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {roleOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => setRole(option)}
                            className={`rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                              role === option
                                ? "border-[#D4AF37] bg-[#D4AF37]/20 text-text-primary"
                                : "border-border bg-card-elevated text-text-secondary hover:border-[#D4AF37]/50 hover:text-text-primary"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 3 && (
                      <div className="grid gap-3 sm:grid-cols-3">
                        {levelOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => setCurrentLevel(option)}
                            className={`rounded-xl border p-4 text-center text-sm font-medium transition-all ${
                              currentLevel === option
                                ? "border-[#D4AF37] bg-[#D4AF37]/20 text-text-primary"
                                : "border-border bg-card-elevated text-text-secondary hover:border-[#D4AF37]/50 hover:text-text-primary"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 4 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {availabilityOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => setAvailability(option)}
                            className={`rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                              availability === option
                                ? "border-[#D4AF37] bg-[#D4AF37]/20 text-text-primary"
                                : "border-border bg-card-elevated text-text-secondary hover:border-[#D4AF37]/50 hover:text-text-primary"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 5 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {timelineOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => setTimeline(option)}
                            className={`rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                              timeline === option
                                ? "border-[#D4AF37] bg-[#D4AF37]/20 text-text-primary"
                                : "border-border bg-card-elevated text-text-secondary hover:border-[#D4AF37]/50 hover:text-text-primary"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                {!isThinking && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={step === 1}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    {step < stepLabels.length ? (
                      <Button onClick={handleNext} className="flex-1">
                        Next
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} className="flex-1">
                        Complete Setup
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </section>

        {/* Right Column: Mission Profile */}
        <aside className="space-y-4 lg:sticky lg:top-8 lg:h-fit">
          <Card className="border-border bg-card">
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted">
                  Mission Profile
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-card-elevated p-3">
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    🎯 Goal
                  </p>
                  <p className="mt-2 text-sm font-semibold text-text-primary">
                    {mission || "Your mission"}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card-elevated p-3">
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    💼 Target Role
                  </p>
                  <p className="mt-2 text-sm font-semibold text-text-primary">
                    {role || "Not selected"}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card-elevated p-3">
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    📚 Current Level
                  </p>
                  <p className="mt-2 text-sm font-semibold text-text-primary">
                    {currentLevel}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card-elevated p-3">
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    ⏰ Daily Availability
                  </p>
                  <p className="mt-2 text-sm font-semibold text-text-primary">
                    {availability}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card-elevated p-3">
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    🗓 Timeline
                  </p>
                  <p className="mt-2 text-sm font-semibold text-text-primary">
                    {timeline}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-border bg-card">
            <CardContent className="space-y-3 p-6">
              <p className="text-xs uppercase tracking-widest text-[#D4AF37]">
                Building
              </p>
              <ul className="space-y-2 text-xs text-text-secondary">
                <li>✓ Personalized plan</li>
                <li>✓ Adaptive sessions</li>
                <li>✓ Smart tracking</li>
                <li>✓ Mission guidance</li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

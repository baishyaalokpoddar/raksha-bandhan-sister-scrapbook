"use client";

import React from "react";
import { motion } from "framer-motion";

interface StoryProgressProps {
  totalSteps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
  unlockedStep?: number;
  className?: string;
}

export const StoryProgress: React.FC<StoryProgressProps> = ({
  totalSteps,
  currentStep,
  onStepClick,
  unlockedStep = totalSteps,
  className = "",
}) => {
  return (
    <div className={`w-full flex items-center gap-1.5 px-2 py-1 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUnlocked = index <= unlockedStep;

        return (
          <button
            key={index}
            disabled={!isUnlocked || !onStepClick}
            onClick={() => onStepClick && onStepClick(index)}
            className={`h-1.5 flex-1 rounded-full overflow-hidden transition-all relative ${
              isUnlocked && onStepClick ? "cursor-pointer hover:h-2" : "cursor-default"
            } bg-stone-300/60`}
          >
            {isCompleted && (
              <div className="w-full h-full bg-scrapbook-ginghamRed rounded-full" />
            )}
            {isCurrent && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-scrapbook-ginghamRed rounded-full shadow-sm"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

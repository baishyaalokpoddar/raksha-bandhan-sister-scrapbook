"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2, Sparkles, Home } from "lucide-react";
import Link from "next/link";
import { SisterGreeting } from "@/lib/types";
import { incrementSisterViews } from "@/lib/store";
import { soundFx } from "@/lib/soundFx";
import { StoryProgress } from "./StoryProgress";
import { SoundToggle } from "./SoundToggle";
import { SocialShareModal } from "./SocialShareModal";
import { Slide1TheTrap } from "../slides/Slide1TheTrap";
import { Slide2Rejection } from "../slides/Slide2Rejection";
import { Slide3Illusion } from "../slides/Slide3Illusion";
import { Slide4Gifts } from "../slides/Slide4Gifts";
import { Slide5RakhiGreeting } from "../slides/Slide5RakhiGreeting";
import { Slide6Certificate } from "../slides/Slide6Certificate";
import { Slide7PolaroidString } from "../slides/Slide7PolaroidString";
import { Slide8FunnyBreakdown } from "../slides/Slide8FunnyBreakdown";
import { Slide9Heartfelt } from "../slides/Slide9Heartfelt";

interface SisterExperienceViewerProps {
  sister: SisterGreeting;
  isPreview?: boolean;
}

export const SisterExperienceViewer: React.FC<SisterExperienceViewerProps> = ({
  sister,
  isPreview = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (!isPreview && sister?.id) {
      incrementSisterViews(sister.id);
    }
  }, [sister?.id, isPreview]);

  const goToStep = (step: number) => {
    if (step > maxUnlockedStep) {
      setMaxUnlockedStep(step);
    }
    setCurrentStep(step);
  };

  const handleNext = () => {
    const next = currentStep + 1;
    goToStep(next);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      soundFx.playPop();
      if (currentStep === 1) {
        setCurrentStep(0);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleOpenShare = () => {
    soundFx.playPop();
    setIsShareModalOpen(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentStep < 8 && currentStep !== 0 && currentStep !== 1 && currentStep !== 3) {
        handleNext();
      } else if (e.key === "ArrowLeft" && currentStep > 0) {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, maxUnlockedStep]);

  // Determine theme background class
  const themeBgClass = {
    "chibi-anime": "bg-chibi-pattern",
    "mandala-anime": "bg-mandala-pattern",
    "crimson-arch": "bg-crimson-arch-pattern",
    "dhaka-nepal": "bg-dhaka-pattern",
    "gingham-red": "bg-gingham-red",
    "royal-patan": "bg-patan-pattern",
    "cherry-blossom": "bg-blossom-pattern",
    "himalayan-green": "bg-himalaya-pattern",
  }[sister.theme || "chibi-anime"] || "bg-chibi-pattern";

  return (
    <div className={`relative min-h-[100dvh] ${themeBgClass} flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden`}>
      {/* Decorative Scrapbook Plaid Frame Container */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-scrapbook-parchment rounded-3xl shadow-2xl border-4 sm:border-8 border-white/95 overflow-hidden flex flex-col min-h-[640px] sm:min-h-[700px]">
        {/* Scrapbook Top Header Bar */}
        <div className="bg-gradient-to-r from-red-800 via-rose-800 to-amber-900 px-4 py-3 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            {!isPreview && (
              <Link
                href="/"
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                title="Go to Home"
              >
                <Home className="w-4 h-4 text-white" />
              </Link>
            )}
            <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-300 bg-white flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/rakhi_logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serifHeading font-bold text-sm tracking-wide flex items-center gap-1.5">
              <span className="truncate max-w-[130px] sm:max-w-[170px]">
                {sister.sisterName}&apos;s Surprise
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SoundToggle />
            {!isPreview && (
              <button
                onClick={handleOpenShare}
                aria-label="Share Link"
                title="Share via Social Media"
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Story Progress Bar */}
        {currentStep !== 1 && (
          <div className="bg-white/80 border-b border-stone-200/80 px-2 py-1.5">
            <StoryProgress
              totalSteps={8}
              currentStep={currentStep > 1 ? currentStep - 1 : currentStep}
              onStepClick={(stepIndex) => {
                const targetStep = stepIndex >= 1 ? stepIndex + 1 : stepIndex;
                if (targetStep <= maxUnlockedStep) {
                  soundFx.playPop();
                  setCurrentStep(targetStep);
                }
              }}
              unlockedStep={maxUnlockedStep > 1 ? maxUnlockedStep - 1 : maxUnlockedStep}
            />
          </div>
        )}

        {/* Main Interactive Slide Content Area */}
        <div className="flex-1 relative flex flex-col justify-center bg-paper-texture p-3 sm:p-5 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="slide1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide1TheTrap
                  sister={sister}
                  onYes={() => goToStep(2)}
                  onNo={() => goToStep(1)}
                />
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="slide2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide2Rejection
                  sister={sister}
                  onTryAgain={() => goToStep(0)}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="slide3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide3Illusion
                  sister={sister}
                  onNext={() => goToStep(3)}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="slide4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide4Gifts
                  sister={sister}
                  onNext={() => goToStep(4)}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="slide5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide5RakhiGreeting
                  sister={sister}
                  onNext={() => goToStep(5)}
                />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="slide6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide6Certificate
                  sister={sister}
                  onNext={() => goToStep(6)}
                />
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div
                key="slide7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide7PolaroidString
                  sister={sister}
                  onNext={() => goToStep(7)}
                />
              </motion.div>
            )}

            {currentStep === 7 && (
              <motion.div
                key="slide8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide8FunnyBreakdown
                  sister={sister}
                  onNext={() => goToStep(8)}
                />
              </motion.div>
            )}

            {currentStep === 8 && (
              <motion.div
                key="slide9"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full my-auto"
              >
                <Slide9Heartfelt
                  sister={sister}
                  onReplay={() => {
                    setCurrentStep(0);
                    setMaxUnlockedStep(0);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Prev / Next Navigation Arrows */}
        {currentStep > 1 && currentStep !== 3 && (
          <div className="bg-white/60 backdrop-blur-xs px-4 py-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-sans">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 hover:text-stone-800 transition-colors p-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="font-handwriting font-bold text-stone-600 text-sm">
              Page {currentStep > 1 ? currentStep : 1} of 8
            </span>

            {currentStep < 8 && currentStep <= maxUnlockedStep ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 hover:text-stone-800 transition-colors p-1 font-semibold text-red-700"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="w-12" />
            )}
          </div>
        )}
      </div>

      {/* Social Media Share Modal */}
      <SocialShareModal
        sister={sister}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

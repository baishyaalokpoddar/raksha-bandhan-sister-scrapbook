"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, ExternalLink } from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { SisterExperienceViewer } from "../scrapbook/SisterExperienceViewer";

interface LivePreviewModalProps {
  sister: SisterGreeting;
  isOpen: boolean;
  onClose: () => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  sister,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-lg w-full bg-stone-900 rounded-3xl p-3 sm:p-4 shadow-2xl border border-stone-700 max-h-[95vh] flex flex-col"
        >
          {/* Top Bar with Dismiss */}
          <div className="flex items-center justify-between px-2 pb-2 text-white border-b border-stone-800 mb-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span className="font-display text-sm font-bold">
                Live Experience Simulation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1 text-stone-400 hover:text-white rounded-full bg-stone-800 hover:bg-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embedded Interactive Viewer */}
          <div className="flex-1 overflow-y-auto rounded-2xl">
            <SisterExperienceViewer sister={sister} isPreview={true} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

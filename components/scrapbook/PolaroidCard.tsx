"use client";

import React from "react";
import { motion } from "framer-motion";
import { WashiTape } from "./WashiTape";

interface PolaroidCardProps {
  photoUrl: string;
  caption?: string;
  date?: string;
  rotation?: number;
  tapeVariant?: "yellow" | "red" | "green" | "gold";
  tapePosition?: "top-left" | "top-center" | "top-right" | "none";
  className?: string;
  onClick?: () => void;
  priority?: boolean;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  photoUrl,
  caption,
  date,
  rotation = 0,
  tapeVariant = "yellow",
  tapePosition = "top-center",
  className = "",
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ rotate: `${rotation}deg` }}
      onClick={onClick}
      className={`relative bg-white p-3 pb-5 rounded-sm shadow-polaroid border border-stone-200 cursor-pointer transition-shadow hover:shadow-2xl max-w-xs ${className}`}
    >
      {/* Optional Washi Tape */}
      {tapePosition === "top-center" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <WashiTape variant={tapeVariant} rotation={-2} />
        </div>
      )}
      {tapePosition === "top-left" && (
        <div className="absolute -top-3 -left-3">
          <WashiTape variant={tapeVariant} rotation={-20} />
        </div>
      )}
      {tapePosition === "top-right" && (
        <div className="absolute -top-3 -right-3">
          <WashiTape variant={tapeVariant} rotation={20} />
        </div>
      )}

      {/* Photo area with subtle film grain/border */}
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden border border-stone-200/80 rounded-xs">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt={caption || "Memory"}
          className="w-full h-full object-cover select-none pointer-events-none"
          loading="lazy"
          onError={(e) => {
            // Fallback to cheerful placeholder if image fails
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80";
          }}
        />
        {/* Vintage photo glare effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
      </div>

      {/* Handwritten Caption */}
      {(caption || date) && (
        <div className="mt-3 px-1 text-center">
          {caption && (
            <p className="font-handwriting text-base sm:text-lg font-bold text-scrapbook-darkText leading-tight">
              {caption}
            </p>
          )}
          {date && (
            <p className="font-handwriting text-xs text-stone-500 mt-1">
              ~ {date} ~
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

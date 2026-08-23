"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { soundFx } from "@/lib/soundFx";
import { PolaroidCard } from "../scrapbook/PolaroidCard";
import { WashiTape } from "../scrapbook/WashiTape";

interface Slide5Props {
  sister: SisterGreeting;
  onNext: () => void;
}

export const Slide5RakhiGreeting: React.FC<Slide5Props> = ({
  sister,
  onNext,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] sm:min-h-[540px] px-3 sm:px-4 text-center select-none">
      {/* Decorative Washi Tape */}
      <div className="relative mb-2">
        <WashiTape variant="red" rotation={-2} className="w-36 sm:w-48" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Festive Rakhi Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-red-600 text-white text-xs font-bold shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" style={{ animationDuration: "5s" }} />
          <span>Shubh Raksha Bandhan 2024</span>
          <span>🧵✨</span>
        </div>

        {/* Big Festive Heading */}
        <h1 className="font-serifHeading text-3xl sm:text-4xl font-black text-scrapbook-ginghamRed tracking-tight leading-none drop-shadow-sm">
          Happy Rakhi, {sister.nickname || sister.sisterName}!
        </h1>

        {/* Central Polaroid Photo */}
        <div className="my-5 flex justify-center">
          <PolaroidCard
            photoUrl={sister.rakhiPhoto || sister.heroPhoto}
            caption={`To my favorite sister ❤️`}
            date="Rakhi Special"
            rotation={-2}
            tapeVariant="gold"
            tapePosition="top-center"
            className="w-56 sm:w-64"
          />
        </div>

        {/* Sibling Chaos Greeting Note */}
        <div className="bg-white/90 rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 text-scrapbook-darkText">
          <p className="font-handwriting text-lg sm:text-xl font-bold leading-snug">
            &quot;Here&apos;s to more laughs, random fights, inside jokes, and endless sibling chaos!&quot;
          </p>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-stone-500 font-sans">
            <span>From your brother</span>
            <span className="font-bold text-scrapbook-ginghamRed">{sister.brotherName || "Your Bhai"}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundFx.playChime();
              onNext();
            }}
            className="px-7 py-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-display font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2 mx-auto"
          >
            <span>Check Out Your Official Award</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

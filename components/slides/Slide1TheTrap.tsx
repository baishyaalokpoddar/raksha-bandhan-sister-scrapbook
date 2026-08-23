"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Gift, Smile } from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { soundFx } from "@/lib/soundFx";
import { WashiTape } from "../scrapbook/WashiTape";

interface Slide1Props {
  sister: SisterGreeting;
  onYes: () => void;
  onNo: () => void;
}

export const Slide1TheTrap: React.FC<Slide1Props> = ({
  sister,
  onYes,
  onNo,
}) => {
  const [noHoverCount, setNoHoverCount] = useState(0);

  const handleYes = () => {
    soundFx.playChime();
    onYes();
  };

  const handleNo = () => {
    soundFx.playBuzzer();
    onNo();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[480px] sm:min-h-[520px] px-4 text-center select-none">
      {/* Decorative scrap tape at top */}
      <div className="relative mb-6">
        <WashiTape variant="red" rotation={-3} className="w-28 sm:w-36" />
      </div>

      {/* Greeting Envelope / Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative bg-white/95 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-scrapbook border-2 border-dashed border-stone-300"
      >
        {/* Cute Floating Pins/Badges */}
        <div className="absolute -top-4 -left-3 bg-scrapbook-ginghamRed text-white text-xs px-3 py-1 rounded-full font-bold shadow-md transform -rotate-6 flex items-center gap-1">
          <Gift className="w-3.5 h-3.5" /> For {sister.nickname || sister.sisterName}!
        </div>

        <div className="absolute -top-3 -right-2 text-2xl animate-bounce">
          💌
        </div>

        {/* Hero question */}
        <div className="my-4">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 uppercase tracking-wider">
            A Top Secret Rakhi Message
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-scrapbook-darkText leading-tight">
            I have made something special for you...
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-scrapbook-ginghamRed font-bold mt-3">
            Do you wanna see it? 👀✨
          </p>
        </div>

        {/* Interactive Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-bold text-lg rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 border-b-4 border-red-800 transition-transform"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: "4s" }} />
            YES PLEASE! 💖
          </motion.button>

          {/* NO Button (Triggers Slide 2 Rejection) */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setNoHoverCount((c) => c + 1)}
            onClick={handleNo}
            className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-800 font-sans font-semibold text-sm rounded-xl border border-stone-300 shadow-sm transition-colors"
          >
            {noHoverCount > 0 ? "No, I'm boring 😒" : "NO 😒"}
          </motion.button>
        </div>

        {/* Sibling playful disclaimer */}
        <p className="font-handwriting text-xs text-stone-500 mt-5 italic">
          * Warning: High levels of emotional sibling blackmail inside.
        </p>
      </motion.div>
    </div>
  );
};

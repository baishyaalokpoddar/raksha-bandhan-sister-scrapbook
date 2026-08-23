"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Laugh } from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { soundFx } from "@/lib/soundFx";
import { WashiTape } from "../scrapbook/WashiTape";

interface Slide3Props {
  sister: SisterGreeting;
  onNext: () => void;
}

export const Slide3Illusion: React.FC<Slide3Props> = ({
  sister,
  onNext,
}) => {
  const [clickedWhich, setClickedWhich] = useState<string | null>(null);

  const handleClick = (choice: string) => {
    setClickedWhich(choice);
    soundFx.playChime();
    setTimeout(() => {
      onNext();
    }, 450);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[480px] sm:min-h-[520px] px-4 text-center select-none">
      {/* Decorative washi tape */}
      <div className="relative mb-5">
        <WashiTape variant="gold" rotation={2} className="w-32 sm:w-40" />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative bg-white/95 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-scrapbook border-2 border-stone-200"
      >
        {/* Playful sticker */}
        <div className="absolute -top-3.5 -right-2 bg-amber-400 text-stone-900 text-xs px-3 py-1 rounded-full font-bold shadow transform rotate-6 flex items-center gap-1">
          <Laugh className="w-3.5 h-3.5" /> 100% Democracy
        </div>

        <div className="my-3">
          <span className="text-3xl sm:text-4xl block mb-2 animate-bounce">
            🧐✨
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-scrapbook-darkText leading-tight">
            Are you really, REALLY excited?
          </h2>
          <p className="font-handwriting text-xl text-scrapbook-ginghamRed font-bold mt-2">
            Choose wisely, {sister.nickname || "sis"}... 😏
          </p>
        </div>

        {/* The Two Identical YES Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick("Option 1")}
            className="py-3.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2 border-b-4 border-red-800"
          >
            <CheckCircle2 className="w-4 h-4 text-yellow-300" />
            YES! 🥳
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick("Option 2")}
            className="py-3.5 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-display font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2 border-b-4 border-amber-800"
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            Also YES! 😎
          </motion.button>
        </div>

        {/* Micro-humor subtext */}
        <div className="mt-6 pt-4 border-t border-stone-200">
          <p className="font-handwriting text-sm text-stone-600">
            &quot;In this house, all votes lead to brotherly love.&quot; 🤝
          </p>
        </div>
      </motion.div>
    </div>
  );
};

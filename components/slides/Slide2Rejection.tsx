"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, AlertTriangle, RefreshCw, XCircle } from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { soundFx } from "@/lib/soundFx";

interface Slide2Props {
  sister: SisterGreeting;
  onTryAgain: () => void;
}

export const Slide2Rejection: React.FC<Slide2Props> = ({
  sister,
  onTryAgain,
}) => {
  useEffect(() => {
    soundFx.playBuzzer();
  }, []);

  const handleRetry = () => {
    soundFx.playPop();
    onTryAgain();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[480px] sm:min-h-[520px] px-4 text-center select-none">
      {/* Sassy Card with dramatic red-alert theme */}
      <motion.div
        initial={{ scale: 0.8, rotate: -4 }}
        animate={{
          scale: [0.8, 1.05, 1],
          rotate: [-4, 3, 0],
          x: [-6, 6, -4, 4, 0],
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative bg-red-50 rounded-2xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border-4 border-red-600 overflow-hidden"
      >
        {/* Top Warning Banner */}
        <div className="bg-red-600 text-white font-mono text-xs font-bold py-1 px-4 -mx-7 -mt-7 mb-4 flex items-center justify-center gap-2 uppercase tracking-widest animate-pulse">
          <AlertTriangle className="w-4 h-4 text-yellow-300" />
          VIOLATION DETECTED
          <AlertTriangle className="w-4 h-4 text-yellow-300" />
        </div>

        {/* Dramatic Header */}
        <div className="relative mb-4">
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="font-display text-3xl sm:text-4xl font-black text-red-600 tracking-tight drop-shadow-sm flex items-center justify-center gap-2"
          >
            <Flame className="w-8 h-8 text-orange-500 animate-bounce" />
            HOW DARE YOU!?
            <Flame className="w-8 h-8 text-orange-500 animate-bounce" />
          </motion.h1>
          <p className="font-handwriting text-lg text-red-700 font-bold mt-1">
            Did you seriously just click &quot;NO&quot; to your loving brother?! 😱
          </p>
        </div>

        {/* Goofy / Grumpy Center Photo Frame */}
        <div className="relative my-3 mx-auto w-40 h-40 sm:w-48 sm:h-48 bg-white p-2 rounded-lg shadow-md border-2 border-red-400 rotate-2">
          <div className="w-full h-full overflow-hidden rounded-sm bg-stone-200 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sister.heroPhoto}
              alt="Grumpy/Goofy Sister"
              className="w-full h-full object-cover grayscale contrast-125"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80";
              }}
            />
            {/* Sassy sticker stamp overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-red-950/20">
              <span className="border-4 border-red-600 text-red-600 bg-white/90 font-black text-sm uppercase px-2 py-1 rounded -rotate-12 shadow-lg tracking-wider">
                BLOCKED 🚫
              </span>
            </div>
          </div>
          <div className="absolute -bottom-2 -left-2 bg-yellow-300 text-red-900 font-handwriting font-bold text-xs px-2 py-0.5 rounded shadow">
            The Audacity! 😤
          </div>
        </div>

        {/* Humorous consequences text */}
        <div className="my-4 bg-white/80 rounded-lg p-2.5 border border-red-200 text-xs sm:text-sm text-stone-700 font-sans">
          <p className="font-semibold text-red-800">
            Penalty applied:
          </p>
          <p className="mt-0.5 text-stone-600">
            • 50% cut in Rakhi Shagun 💸<br />
            • TV Remote privileges revoked for 1 month 📺
          </p>
        </div>

        {/* Pulsing Try Again Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={handleRetry}
          className="w-full py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-display font-black text-base sm:text-lg rounded-xl shadow-lg border-2 border-white hover:brightness-110 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
          🥺 OKAY I APOLOGIZE, TRY AGAIN!
        </motion.button>
      </motion.div>
    </div>
  );
};

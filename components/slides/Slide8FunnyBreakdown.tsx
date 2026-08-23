"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Tag, Heart } from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { soundFx } from "@/lib/soundFx";
import { WashiTape } from "../scrapbook/WashiTape";

interface Slide8Props {
  sister: SisterGreeting;
  onNext: () => void;
}

export const Slide8FunnyBreakdown: React.FC<Slide8Props> = ({
  sister,
  onNext,
}) => {
  const labels = sister.funnyLabels && sister.funnyLabels.length > 0
    ? sister.funnyLabels
    : [
        { id: "1", title: "Momo & Khaja Raider", subtitle: "Eats 4 momos straight from my plate", emoji: "🥟", position: "top-left" as const },
        { id: "2", title: "Personal eSewa / ATM", subtitle: "Calls only when balance is exactly 0", emoji: "📱", position: "top-right" as const },
        { id: "3", title: "Free Pathao & Driver", subtitle: "24/7 personal scooter cab service", emoji: "🛵", position: "left" as const },
        { id: "4", title: "Ghar ko Supreme CCTV", subtitle: "Threatens 'Mummy lai bhandinchhu' daily", emoji: "🚨", position: "right" as const },
        { id: "5", title: "Drama Queen 3000", subtitle: "Cries at movies, laughs at my misery", emoji: "🎭", position: "bottom-left" as const },
        { id: "6", title: "Mero Mutu ko Tukra", subtitle: "Most annoying, but forever best friend", emoji: "❤️", position: "bottom-right" as const },
      ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[520px] sm:min-h-[560px] px-2 sm:px-4 text-center select-none">
      {/* Decorative Washi Tape */}
      <div className="relative mb-2">
        <WashiTape variant="green" rotation={2} className="w-36 sm:w-48" />
      </div>

      <div className="max-w-md w-full">
        {/* Title */}
        <div className="mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Official Sister Breakdown</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-scrapbook-darkText leading-tight">
            &quot;YOU ARE MY...&quot;
          </h2>
          <p className="font-handwriting text-sm text-scrapbook-ginghamRed font-bold">
            An accurate scientific sibling breakdown 🔬
          </p>
        </div>

        {/* Breakdown Diagram Container */}
        <div className="relative my-3 bg-white/95 rounded-2xl p-3.5 sm:p-4 shadow-scrapbook border-2 border-stone-200">
          {/* Central Cutout Photo */}
          <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-rose-400 to-red-500 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-stone-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sister.breakdownPhoto || sister.rakhiPhoto || sister.heroPhoto}
                alt={sister.sisterName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            {/* Center crown badge */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xl animate-bounce">
              👑
            </div>
          </div>

          {/* Sibling Pointer Tags Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3.5 text-left">
            {labels.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={`p-2 rounded-xl border transition-all ${
                  item.title.includes("Mutu") || item.title.includes("Best Friend") || item.title.includes("Lifeline")
                    ? "bg-rose-50 border-rose-300 shadow-xs"
                    : "bg-amber-50/80 border-amber-200 shadow-xs"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{item.emoji || "👉"}</span>
                  <span className="font-display font-bold text-xs text-stone-900 leading-tight">
                    {item.title}
                  </span>
                </div>
                {item.subtitle && (
                  <p className="font-handwriting text-[11px] text-stone-600 mt-0.5 pl-5 leading-tight">
                    {item.subtitle}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundFx.playChime();
              onNext();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 mx-auto"
          >
            <span>Read My Heartfelt Letter</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

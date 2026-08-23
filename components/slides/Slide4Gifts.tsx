"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, ArrowRight, Check, PartyPopper } from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { soundFx } from "@/lib/soundFx";
import { triggerSmallCelebration } from "@/lib/confetti";
import { WashiTape } from "../scrapbook/WashiTape";

interface Slide4Props {
  sister: SisterGreeting;
  onNext: () => void;
}

export const Slide4Gifts: React.FC<Slide4Props> = ({
  sister,
  onNext,
}) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const currency = sister.currencySymbol || "रू.";
  const gifts = sister.gifts && sister.gifts.length > 0 ? sister.gifts : [
    { id: 1, title: "Gift #1", perk: "My Eternal Respect (100% Free & Tax-Free)", emoji: "👑", color: "#B91C1C" },
    { id: 2, title: "Gift #2", perk: "1x TV Remote Pass (Valid for 1 Night)", emoji: "📺", color: "#D97706" },
    { id: 3, title: "Gift #3", perk: `${currency} १० Dakshina (Don't spend it all at once!)`, emoji: "💵", color: "#059669" },
  ];

  const handleOpenGift = (id: number, event: React.MouseEvent) => {
    if (openedGifts.includes(id)) return;

    soundFx.playGiftOpen();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerSmallCelebration(x, y);

    const updated = [...openedGifts, id];
    setOpenedGifts(updated);

    if (updated.length === gifts.length) {
      setTimeout(() => {
        soundFx.playFanfare();
      }, 500);
    }
  };

  const allOpened = openedGifts.length === gifts.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[480px] sm:min-h-[520px] px-3 sm:px-4 text-center select-none">
      {/* Decorative Washi Tape */}
      <div className="relative mb-2">
        <WashiTape variant="yellow" rotation={-1} className="w-32 sm:w-44" />
      </div>

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-1.5">
            <Gift className="w-3.5 h-3.5" />
            <span>Interactive Sibling Mystery</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-scrapbook-darkText leading-tight">
            Each box has a special perk for you
          </h2>
          <p className="font-handwriting text-base sm:text-lg text-scrapbook-ginghamRed font-bold mt-1">
            Tap each gift box to unwrap your perks
          </p>
        </div>

        {/* Counter Pill */}
        <div className="mb-3 inline-flex items-center gap-2 bg-white px-3.5 py-1 rounded-full shadow-xs border border-stone-200 text-xs font-bold text-stone-700">
          <span>Unwrapped:</span>
          <span className="text-scrapbook-ginghamRed font-mono font-black text-sm">
            {openedGifts.length} / {gifts.length}
          </span>
          {allOpened && <Check className="w-4 h-4 text-emerald-600 animate-bounce" />}
        </div>

        {/* Dynamic Gift Boxes Grid */}
        <div className={`grid ${gifts.length <= 2 ? "grid-cols-2" : gifts.length === 4 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"} gap-2.5 my-2`}>
          {gifts.map((gift, index) => {
            const isOpened = openedGifts.includes(gift.id);

            return (
              <motion.div
                key={gift.id}
                initial={{ scale: 0.85, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={(e) => handleOpenGift(gift.id, e)}
                className={`relative rounded-2xl p-3.5 transition-all cursor-pointer ${
                  isOpened
                    ? "bg-amber-50/90 border-2 border-amber-300 shadow-xs"
                    : "bg-white/95 border-2 border-stone-300 shadow-polaroid hover:shadow-lg hover:-translate-y-1 hover:border-red-400"
                }`}
              >
                {!isOpened ? (
                  // Closed Gift Box View
                  <div className="flex flex-col items-center justify-center py-2.5">
                    <motion.div
                      animate={{
                        rotate: [0, -3, 3, -3, 0],
                        scale: [1, 1.04, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2 + index * 0.4,
                      }}
                      className="text-4xl sm:text-5xl mb-2 drop-shadow-xs"
                    >
                      🎁
                    </motion.div>
                    <span className="font-display font-bold text-xs text-stone-800">
                      {gift.title || `Gift #${index + 1}`}
                    </span>
                    <span className="font-handwriting text-[11px] text-scrapbook-ginghamRed font-bold mt-0.5 animate-pulse">
                      Tap to Open
                    </span>
                  </div>
                ) : (
                  // Opened Gift View with revealed perk
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-1.5"
                  >
                    <div className="text-2xl sm:text-3xl mb-1">
                      {gift.emoji || "✨"}
                    </div>
                    <span className="font-display font-black text-[11px] text-amber-900 uppercase tracking-wide">
                      {gift.title}
                    </span>
                    <p className="font-handwriting text-xs sm:text-sm font-bold text-scrapbook-darkText mt-1 leading-snug">
                      {gift.perk}
                    </p>
                    <div className="mt-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Claimed
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Continue Next Button */}
        <div className="mt-4 min-h-[48px] flex items-center justify-center">
          <AnimatePresence>
            {allOpened ? (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  soundFx.playChime();
                  onNext();
                }}
                className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-black text-sm sm:text-base rounded-xl shadow-lg border-b-4 border-red-900 flex items-center justify-center gap-2"
              >
                <PartyPopper className="w-4 h-4 text-yellow-300" />
                <span>Continue to Rakhi Magic</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <p className="font-handwriting text-xs sm:text-sm text-stone-500 italic">
                * Please open all {gifts.length} gift boxes to unlock the next surprise!
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

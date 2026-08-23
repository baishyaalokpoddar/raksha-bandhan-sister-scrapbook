"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, MessageCircle, RotateCcw, PartyPopper, Share2 } from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { triggerRakhiConfetti } from "@/lib/confetti";
import { generateWhatsAppReplyLink } from "@/lib/store";
import { soundFx } from "@/lib/soundFx";
import { WashiTape } from "../scrapbook/WashiTape";
import { SocialShareModal } from "../scrapbook/SocialShareModal";

interface Slide9Props {
  sister: SisterGreeting;
  onReplay: () => void;
}

export const Slide9Heartfelt: React.FC<Slide9Props> = ({
  sister,
  onReplay,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    triggerRakhiConfetti();
  }, []);

  const letter = sister.letter || {
    title: "To my favorite headache & forever confidante,",
    paragraphs: [
      "Happy Raksha Bandhan! Even though you steal my hoodies, eat the last plate of momos, and snitch on me whenever it suits you, life would be dreadfully boring without you.",
      "Thank you for always listening to my endless rants and being the strongest pillar in my life.",
      "No matter how old we get or how much we argue, remember that I've always got your back. Always and forever.",
    ],
    signoff: `With endless love,\nYour Brother ${sister.brotherName || ""} ❤️`,
    ps: "P.S. You still owe me रू ५०० from last week! 🥟",
  };

  const whatsappReplyUrl = generateWhatsAppReplyLink(sister);

  return (
    <div className="flex flex-col items-center justify-center min-h-[520px] sm:min-h-[560px] px-2 sm:px-4 text-center select-none">
      {/* Decorative Washi Tape */}
      <div className="relative mb-2">
        <WashiTape variant="gold" rotation={-1} className="w-36 sm:w-48" />
      </div>

      <div className="max-w-md w-full">
        {/* Heartfelt Vintage Letter Paper */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className="relative bg-[#FFFDF8] rounded-2xl p-4 sm:p-6 shadow-scrapbook border-2 border-stone-200 text-left text-scrapbook-darkText"
        >
          {/* Top corner stickers */}
          <div className="absolute -top-3.5 -left-2 text-2xl animate-float-gentle">
            💐
          </div>
          <div className="absolute -top-3.5 -right-2 text-2xl animate-float-gentle" style={{ animationDelay: "1s" }}>
            🌸
          </div>

          {/* Letter Title */}
          <h2 className="font-handwriting text-lg sm:text-xl font-bold text-red-900 leading-snug mb-2.5">
            {letter.title}
          </h2>

          {/* Letter Body Paragraphs */}
          <div className="space-y-2.5 font-handwriting text-sm sm:text-base text-stone-800 leading-relaxed">
            {letter.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Brother Sign-off */}
          <div className="mt-4 pt-2.5 border-t border-stone-200 text-right">
            <p className="font-handwriting text-base sm:text-lg font-bold text-red-900 whitespace-pre-line">
              {letter.signoff}
            </p>
            {letter.ps && (
              <p className="font-handwriting text-xs text-stone-500 mt-1.5 italic text-left">
                {letter.ps}
              </p>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2.5">
          {/* Confetti Explosion Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerRakhiConfetti}
            className="w-full py-3 bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-display font-black text-sm sm:text-base rounded-xl shadow-md border-b-4 border-red-900 flex items-center justify-center gap-2"
          >
            <PartyPopper className="w-4 h-4 text-yellow-200" />
            <span>Burst Rakhi Confetti!</span>
          </motion.button>

          {/* WhatsApp Hug / Reply & Share */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={whatsappReplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playPop()}
              className="col-span-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send Hug to Brother</span>
            </a>

            <button
              onClick={() => {
                soundFx.playPop();
                setIsShareModalOpen(true);
              }}
              className="py-2.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-sans font-bold text-xs rounded-xl border border-stone-300 flex items-center justify-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <button
            onClick={() => {
              soundFx.playPop();
              onReplay();
            }}
            className="w-full py-2 bg-white hover:bg-stone-50 text-stone-600 font-sans font-semibold text-xs rounded-xl border border-stone-200 flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Experience from Start</span>
          </button>
        </div>
      </div>

      {/* Social Share Modal */}
      <SocialShareModal
        sister={sister}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

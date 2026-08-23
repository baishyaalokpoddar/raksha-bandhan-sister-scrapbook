"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, Image as ImageIcon } from "lucide-react";
import { SisterGreeting, PolaroidMemory } from "@/lib/types";
import { soundFx } from "@/lib/soundFx";
import { PolaroidCard } from "../scrapbook/PolaroidCard";
import { WashiTape } from "../scrapbook/WashiTape";

interface Slide7Props {
  sister: SisterGreeting;
  onNext: () => void;
}

export const Slide7PolaroidString: React.FC<Slide7Props> = ({
  sister,
  onNext,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidMemory | null>(null);

  const memories =
    sister.polaroids && sister.polaroids.length > 0
      ? sister.polaroids
      : [
          {
            id: "m1",
            photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
            caption: "Partners in crime since Day 1 🤜🤛",
            date: "Forever Memory",
            rotation: -4,
          },
          {
            id: "m2",
            photoUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80",
            caption: "Late night gossip & snacks 🍨",
            date: "Midnight",
            rotation: 3,
          },
          {
            id: "m3",
            photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
            caption: "When we actually posed nicely 😂",
            date: "Rare moment",
            rotation: -2,
          },
          {
            id: "m4",
            photoUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80",
            caption: "Judging my life choices 🙄❤️",
            date: "Everyday",
            rotation: 3,
          },
        ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[520px] sm:min-h-[560px] px-2 sm:px-4 text-center select-none">
      {/* Decorative Washi Tape */}
      <div className="relative mb-2">
        <WashiTape variant="yellow" rotation={-2} className="w-36 sm:w-48" />
      </div>

      <div className="max-w-md w-full">
        {/* Title */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Sibling Memory String</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-scrapbook-darkText leading-tight">
            Our Hall of Fame 📸
          </h2>
          <p className="font-handwriting text-sm sm:text-base text-scrapbook-ginghamRed font-bold">
            (Tap any photo to zoom in!)
          </p>
        </div>

        {/* Realistic Clothesline / String Header */}
        <div className="relative my-4 px-2">
          {/* Wire */}
          <div className="w-full h-1 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-full shadow-sm" />

          {/* Fairy light nodes */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-3 pointer-events-none">
            {["🟡", "🔴", "🟢", "🟡", "🔴"].map((bulb, i) => (
              <span key={i} className="text-xs drop-shadow animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                {bulb}
              </span>
            ))}
          </div>
        </div>

        {/* Polaroid Clothesline Hanging Grid / Carousel */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 my-2 px-1">
          {memories.slice(0, 4).map((memory, index) => {
            const rot = memory.rotation ?? (index % 2 === 0 ? -3 : 3);
            return (
              <motion.div
                key={memory.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="relative flex flex-col items-center cursor-pointer group"
                onClick={() => {
                  soundFx.playPop();
                  setSelectedPhoto(memory);
                }}
              >
                {/* Wooden Clothespin clip */}
                <div className="absolute -top-3.5 z-20 w-4 h-6 bg-gradient-to-b from-amber-700 to-amber-900 rounded-xs shadow-xs border border-amber-950 flex flex-col justify-between items-center py-0.5 pointer-events-none">
                  <div className="w-2.5 h-0.5 bg-stone-300 rounded-full" />
                  <div className="w-2.5 h-0.5 bg-stone-300 rounded-full" />
                </div>

                {/* Polaroid Frame */}
                <PolaroidCard
                  photoUrl={memory.photoUrl}
                  caption={memory.caption}
                  date={memory.date}
                  rotation={rot}
                  tapePosition="none"
                  className="w-full bg-white p-2 pb-3 shadow-md group-hover:shadow-xl transition-all"
                />
              </motion.div>
            );
          })}
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
            className="px-7 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2 mx-auto"
          >
            <span>The Real Truth: &quot;You Are My...&quot;</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Lightbox Modal for enlarged photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 z-30 bg-white text-stone-800 p-2 rounded-full shadow-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
              <PolaroidCard
                photoUrl={selectedPhoto.photoUrl}
                caption={selectedPhoto.caption}
                date={selectedPhoto.date}
                rotation={0}
                tapePosition="top-center"
                tapeVariant="gold"
                className="w-full shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

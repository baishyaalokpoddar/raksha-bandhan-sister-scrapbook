"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Check,
  Share2,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { getShareUrls } from "@/lib/store";
import { soundFx } from "@/lib/soundFx";

interface SocialShareModalProps {
  sister: SisterGreeting;
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  sister,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const shareUrls = getShareUrls(sister, mounted && origin ? origin : "");

  const handleCopyLink = () => {
    soundFx.playPop();
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}/sister/${sister.id}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative max-w-sm sm:max-w-md w-full bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serifHeading font-bold text-lg text-stone-900 leading-tight">
                  Share Sibling Surprise
                </h3>
                <p className="text-[11px] text-stone-500">
                  Send to {sister.nickname || sister.sisterName}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1-Click Copy Link Box */}
          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 mb-4 flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-stone-600 truncate" suppressHydrationWarning>
              {mounted && origin ? `${origin}/sister/${sister.id}` : `/sister/${sister.id}`}
            </span>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 transition-all flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Social Media Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 my-2">
            {/* WhatsApp */}
            <a
              href={shareUrls.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playPop()}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-lg">
                💬
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1.5">
                WhatsApp
              </span>
            </a>

            {/* Facebook */}
            <a
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playPop()}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform font-bold text-base">
                f
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1.5">
                Facebook
              </span>
            </a>

            {/* Instagram */}
            <button
              onClick={() => {
                handleCopyLink();
                alert("Link copied! Open Instagram and paste in your Story or DM 📸");
              }}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-base">
                📷
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1.5">
                Instagram
              </span>
            </button>

            {/* TikTok */}
            <button
              onClick={() => {
                handleCopyLink();
                alert("Link copied! Ready to paste on TikTok video bio or chat 🎵");
              }}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-base">
                🎵
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1.5">
                TikTok
              </span>
            </button>

            {/* Snapchat */}
            <a
              href={shareUrls.snapchat}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playPop()}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-stone-900 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-base">
                👻
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1.5">
                Snapchat
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playPop()}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-sky-700 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform font-bold text-xs">
                in
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1.5">
                LinkedIn
              </span>
            </a>

            {/* Twitter / X */}
            <a
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playPop()}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform font-bold text-sm">
                𝕏
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1.5">
                X / Twitter
              </span>
            </a>

            {/* Telegram */}
            <a
              href={shareUrls.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playPop()}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-sm">
                ✈️
              </div>
              <span className="text-[11px] font-bold text-stone-800 mt-1.5">
                Telegram
              </span>
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-center">
            <p className="text-[11px] text-stone-500">
              100% Free • No login needed • Works in all mobile browsers
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, Award, Check, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";
import { SisterGreeting } from "@/lib/types";
import { soundFx } from "@/lib/soundFx";
import { CertificateBadge } from "../scrapbook/CertificateBadge";
import { WashiTape } from "../scrapbook/WashiTape";

interface Slide6Props {
  sister: SisterGreeting;
  onNext: () => void;
}

export const Slide6Certificate: React.FC<Slide6Props> = ({
  sister,
  onNext,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const certData = sister.certificate || {
    title: "Best Sister in the Entire Universe",
    subtitle:
      "You are the most precious person I have ever had... and the only one officially certified to listen to all my 2 AM rants.",
    date: "Raksha Bandhan 2024",
    signature: sister.brotherName ? `Signed by ${sister.brotherName}` : "Her Loving Brother",
    sealText: "OFFICIAL SIBLING AWARD • 100% GENUINE",
  };

  const handleDownload = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    soundFx.playPop();

    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FAF6E9",
      });

      const link = document.createElement("a");
      link.download = `Best-Sister-Certificate-${sister.sisterName.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      soundFx.playFanfare();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error("Certificate download error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] sm:min-h-[560px] px-2 sm:px-4 text-center select-none">
      {/* Decorative Washi Tape */}
      <div className="relative mb-2">
        <WashiTape variant="gold" rotation={1} className="w-36 sm:w-48" />
      </div>

      {/* Outer Diploma Container */}
      <div className="max-w-md w-full">
        <motion.div
          ref={certRef}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className="relative bg-[#FFFDF7] p-5 sm:p-6 rounded-xl shadow-diploma diploma-border text-scrapbook-darkText overflow-hidden"
        >
          {/* Subtle Vintage Watermark */}
          <div className="absolute inset-0 bg-radial from-amber-100/40 via-transparent to-transparent pointer-events-none" />

          {/* Certificate Header */}
          <div className="mb-2">
            <div className="flex items-center justify-center gap-1.5 text-amber-700 text-[10px] sm:text-xs uppercase font-serif tracking-widest font-black">
              <Award className="w-3.5 h-3.5" />
              Official Recognition of Excellence
              <Award className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-serifHeading text-2xl sm:text-3xl font-black text-amber-900 mt-1 uppercase tracking-tight">
              Best Sister Award
            </h2>
            <div className="w-24 h-0.5 bg-amber-400 mx-auto mt-1 mb-2" />
          </div>

          {/* Recipient details */}
          <p className="font-serif italic text-xs sm:text-sm text-stone-600">
            This prestigious certificate is proudly presented to:
          </p>

          {/* Sister's Name Banner */}
          <div className="my-2 bg-gradient-to-r from-amber-100/80 via-amber-200/80 to-amber-100/80 py-1.5 px-4 rounded-lg border border-amber-300">
            <h3 className="font-serifHeading text-xl sm:text-2xl font-black text-red-900 tracking-wide">
              {sister.sisterName || "My Wonderful Sister"}
            </h3>
            {sister.nickname && (
              <span className="font-handwriting text-sm text-amber-800 font-bold block -mt-1">
                (A.K.A. &quot;{sister.nickname}&quot;)
              </span>
            )}
          </div>

          {/* Recipient Cute Photo & Humorous Subtext */}
          <div className="my-3 flex items-center gap-3 text-left bg-white/70 p-2.5 rounded-lg border border-amber-200/80 shadow-xs">
            <div className="w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 rounded-full overflow-hidden border-2 border-amber-400 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sister.certificatePhoto || sister.rakhiPhoto || sister.heroPhoto}
                alt={sister.sisterName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-handwriting text-xs sm:text-sm font-bold text-stone-800 leading-snug">
                &quot;{certData.subtitle}&quot;
              </p>
            </div>
          </div>

          {/* Footer Seals & Signature */}
          <div className="mt-3 pt-3 border-t border-amber-200 flex items-center justify-between px-2">
            {/* Seal */}
            <CertificateBadge
              text={certData.sealText || "100% GENUINE SIBLING"}
              className="scale-90 sm:scale-100 origin-left"
            />

            {/* Date & Signature */}
            <div className="text-right">
              <div className="font-handwriting text-base sm:text-lg font-bold text-red-900">
                {certData.signature || `Signed, ${sister.brotherName || "Your Bhai"}`}
              </div>
              <div className="w-28 h-0.5 bg-stone-400 ml-auto my-0.5" />
              <div className="text-[9px] sm:text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                Date: {certData.date || "Raksha Bandhan"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons: Download + Next */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-800 font-sans font-bold text-xs sm:text-sm rounded-xl shadow-sm border border-stone-300 flex items-center justify-center gap-2"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Certificate Saved! 🏆</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-700" />
                <span>{downloading ? "Generating PNG..." : "Download Certificate (PNG)"}</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundFx.playChime();
              onNext();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <span>See Memory Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

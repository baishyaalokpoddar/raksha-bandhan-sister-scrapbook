"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundFx } from "@/lib/soundFx";

export const SoundToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundFx.getIsMuted());
  }, []);

  const handleToggle = () => {
    const newState = soundFx.toggleMute();
    setIsMuted(newState);
    if (!newState) {
      soundFx.playPop();
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      title={isMuted ? "Sound is OFF (Click to turn ON)" : "Sound is ON (Click to Mute)"}
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-stone-300/80 text-xs font-medium text-stone-700 shadow-sm hover:shadow-md hover:bg-white transition-all transform active:scale-95 ${className}`}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-4 h-4 text-red-500" />
          <span className="text-stone-500 font-mono text-[11px]">Sound OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse-slow" />
          <span className="text-stone-700 font-mono text-[11px]">Sound ON</span>
          <span className="flex space-x-0.5 items-end h-2.5 ml-0.5">
            <span className="w-0.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </>
      )}
    </button>
  );
};

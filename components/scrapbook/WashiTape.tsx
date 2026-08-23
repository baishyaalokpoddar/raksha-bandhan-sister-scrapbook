import React from "react";

interface WashiTapeProps {
  variant?: "yellow" | "red" | "green" | "gold";
  className?: string;
  rotation?: number;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  variant = "yellow",
  className = "",
  rotation = 0,
}) => {
  const variantClass = {
    yellow: "washi-tape-yellow",
    red: "washi-tape-red",
    green: "washi-tape-green",
    gold: "washi-tape-gold",
  }[variant];

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`h-5 w-20 sm:w-24 z-20 pointer-events-none rounded-xs opacity-90 shadow-sm ${variantClass} ${className}`}
    >
      <div className="w-full h-full flex justify-between items-center opacity-30 text-[7px] font-mono px-1">
        <span>|||</span>
        <span>|||</span>
      </div>
    </div>
  );
};

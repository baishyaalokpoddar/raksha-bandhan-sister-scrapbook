import React from "react";
import { Award } from "lucide-react";

interface CertificateBadgeProps {
  text?: string;
  className?: string;
}

export const CertificateBadge: React.FC<CertificateBadgeProps> = ({
  text = "OFFICIAL SIBLING SEAL",
  className = "",
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Golden Wax Seal Medallion */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-1 shadow-lg flex items-center justify-center border-2 border-amber-200">
        {/* Outer serrated ring */}
        <div className="w-full h-full rounded-full border-2 border-dashed border-amber-100 flex flex-col items-center justify-center p-1 text-center bg-gradient-to-b from-amber-600 to-amber-800 text-amber-100 shadow-inner">
          <Award className="w-7 h-7 sm:w-8 sm:h-8 text-amber-200 drop-shadow-sm mb-0.5 animate-pulse-slow" />
          <span className="text-[7px] sm:text-[8px] font-bold tracking-wider uppercase font-serif">
            {text}
          </span>
        </div>

        {/* Ribbons hanging below */}
        <div className="absolute -bottom-5 -left-1 w-6 h-10 bg-gradient-to-b from-red-600 to-red-800 -rotate-12 -z-10 shadow-md [clip-path:polygon(0%_0%,100%_0%,100%_100%,50%_75%,0%_100%)]" />
        <div className="absolute -bottom-5 -right-1 w-6 h-10 bg-gradient-to-b from-red-600 to-red-800 rotate-12 -z-10 shadow-md [clip-path:polygon(0%_0%,100%_0%,100%_100%,50%_75%,0%_100%)]" />
      </div>
    </div>
  );
};

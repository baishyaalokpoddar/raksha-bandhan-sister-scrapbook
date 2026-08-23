"use client";

import React, { useRef } from "react";
import { Upload, Link as LinkIcon, Image as ImageIcon, Check } from "lucide-react";

interface PhotoUploaderProps {
  label: string;
  description?: string;
  photoUrl: string;
  onChange: (url: string) => void;
  presetAvatars?: string[];
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  label,
  description,
  photoUrl,
  onChange,
  presetAvatars = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
  ],
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use FileReader to convert to Base64 image
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result;
      if (typeof result === "string") {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <label className="block text-sm font-bold text-stone-900 font-sans">
            {label}
          </label>
          {description && (
            <p className="text-xs text-stone-500 font-sans mt-0.5">{description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Photo Preview */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border-2 border-stone-300 bg-stone-200 flex-shrink-0 shadow-inner group">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80";
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
              <ImageIcon className="w-6 h-6 mb-1" />
              <span className="text-[10px]">No Photo</span>
            </div>
          )}
        </div>

        {/* Inputs & Actions */}
        <div className="flex-1 w-full space-y-2.5">
          {/* File Upload Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 rounded-lg text-xs font-bold border border-stone-300 shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-stone-600" />
              <span>Upload from Device</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span className="text-xs text-stone-400 font-sans">or paste image URL below</span>
          </div>

          {/* Direct URL Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-stone-400">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="url"
              placeholder="https://..."
              value={photoUrl.startsWith("data:") ? "[Uploaded Image]" : photoUrl}
              onChange={(e) => onChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white rounded-lg text-xs border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-400 font-mono text-stone-800"
            />
          </div>

          {/* Quick Preset Avatars */}
          {presetAvatars.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] font-semibold text-stone-400 uppercase">Presets:</span>
              <div className="flex gap-1.5">
                {presetAvatars.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange(avatar)}
                    className={`w-6 h-6 rounded-full overflow-hidden border transition-all ${
                      photoUrl === avatar ? "ring-2 ring-red-500 scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatar} alt="Preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

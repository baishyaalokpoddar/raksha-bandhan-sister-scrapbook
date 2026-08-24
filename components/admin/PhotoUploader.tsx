"use client";

import React, { useRef, useState } from "react";
import { Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { compressImageFile, uploadImageToCloudflare } from "@/lib/imageUtils";
import { soundFx } from "@/lib/soundFx";

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
    "/assets/rakhi_chibi_anime.jpg",
    "/assets/rakhi_mandala_anime.jpg",
    "/assets/rakhi_crimson_arch.png",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
  ],
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Auto compress and upload to Cloudflare server
      const serverUrl = await uploadImageToCloudflare(file);
      soundFx.playChime();
      onChange(serverUrl);
    } catch (err) {
      console.error("Error uploading image:", err);
      // Fallback to basic file reader
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (typeof result === "string") {
          onChange(result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200 shadow-xs">
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
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-stone-300 bg-stone-200 flex-shrink-0 shadow-inner group">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/rakhi_chibi_anime.jpg";
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
              <ImageIcon className="w-6 h-6 mb-1" />
              <span className="text-[10px]">No Photo</span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs gap-1">
              <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
              <span>Optimizing...</span>
            </div>
          )}
        </div>

        {/* Inputs & Actions */}
        <div className="flex-1 w-full space-y-2.5">
          {/* File Upload Button */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from Device / Gallery</span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span className="text-[11px] text-stone-400 font-sans">Auto-optimizes size 📱</span>
          </div>

          {/* Direct URL Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-stone-400">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Paste Image URL or /assets/..."
              value={photoUrl.startsWith("data:") ? "[Uploaded Photo Saved]" : photoUrl}
              onChange={(e) => onChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl text-xs border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-400 font-mono text-stone-800"
            />
          </div>

          {/* Quick Preset Avatars */}
          {presetAvatars.length > 0 && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-[10px] font-semibold text-stone-400 uppercase">Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {presetAvatars.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundFx.playPop();
                      onChange(avatar);
                    }}
                    className={`w-7 h-7 rounded-lg overflow-hidden border transition-all ${
                      photoUrl === avatar ? "ring-2 ring-red-500 scale-110 shadow-xs" : "opacity-75 hover:opacity-100"
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

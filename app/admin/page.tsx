"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Share2,
  Copy,
  Edit3,
  Trash2,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Eye,
  Check,
  Heart,
  Home,
  ShieldCheck,
} from "lucide-react";
import { SisterGreeting } from "@/lib/types";
import { getStoredSisters, deleteSisterGreeting } from "@/lib/store";
import { SocialShareModal } from "@/components/scrapbook/SocialShareModal";
import { soundFx } from "@/lib/soundFx";

export default function AdminDashboard() {
  const [sisters, setSisters] = useState<SisterGreeting[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSisterForShare, setSelectedSisterForShare] = useState<SisterGreeting | null>(null);

  useEffect(() => {
    setSisters(getStoredSisters());
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the greeting for ${name}?`)) {
      deleteSisterGreeting(id);
      setSisters(getStoredSisters());
      soundFx.playPop();
    }
  };

  const handleCopy = (id: string) => {
    soundFx.playPop();
    const url = `${window.location.origin}/sister/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 p-4 sm:p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md border-2 border-amber-300 flex-shrink-0 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/rakhi_logo.jpg" alt="Rakhi Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serifHeading text-2xl sm:text-3xl font-black text-scrapbook-darkText">
                  Sibling Greeting Studio
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Free & Instant
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Create, customize, and share humorous scrapbook greeting links with your sisters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href="/"
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-4 h-4 text-stone-500" />
              <span>Home</span>
            </Link>

            <Link
              href="/admin/create"
              onClick={() => soundFx.playPop()}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Surprise</span>
            </Link>
          </div>
        </div>

        {/* Feature Badges Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h4 className="text-xs font-bold text-stone-900">No Sign-In Required</h4>
              <p className="text-[11px] text-stone-500">Create & share in under 60 seconds</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs flex items-center gap-3">
            <span className="text-2xl">🇳🇵</span>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Nepali Vibes & Currency</h4>
              <p className="text-[11px] text-stone-500">Dhaka prints, Nepali roasts, NPR (रू.)</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <h4 className="text-xs font-bold text-stone-900">All Socials Ready</h4>
              <p className="text-[11px] text-stone-500">WhatsApp, Facebook, Insta, TikTok</p>
            </div>
          </div>
        </div>

        {/* Greetings Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sisters.map((sister) => {
            const isCopied = copiedId === sister.id;

            return (
              <div
                key={sister.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200/90 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Sister Info & Avatar */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-stone-100">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-100 flex-shrink-0 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sister.heroPhoto || sister.rakhiPhoto}
                        alt={sister.sisterName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/rakhi_chibi_anime.jpg";
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serifHeading font-bold text-lg text-stone-900 truncate">
                          {sister.sisterName}
                        </h3>
                        {sister.nickname && (
                          <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full truncate">
                            &quot;{sister.nickname}&quot;
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5 truncate">
                        Brother: <span className="font-semibold text-stone-700">{sister.brotherName || "Brother"}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-stone-400 font-mono">
                        <span className="truncate">/sister/{sister.id}</span>
                        <span>•</span>
                        <span>{sister.views || 0} views</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Highlights */}
                  <div className="py-3 text-xs text-stone-600 space-y-1">
                    <p className="truncate">
                      🎨 <strong>Theme:</strong> {sister.theme || "dhaka-nepal"}
                    </p>
                    <p className="truncate">
                      🎁 <strong>Gifts:</strong> {sister.gifts?.length || 3} Mystery Boxes ({sister.currencySymbol || "रू."})
                    </p>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(sister.id)}
                      className="flex-1 py-2 px-3 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold rounded-lg border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playPop();
                        setSelectedSisterForShare(sister);
                      }}
                      className="py-2 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-lg shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Socials</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/sister/${sister.id}`}
                      target="_blank"
                      className="flex-1 py-1.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-500" />
                      <span>Open Greeting</span>
                    </Link>

                    <Link
                      href={`/admin/edit/${sister.id}`}
                      className="py-1.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(sister.id, sister.sisterName)}
                      className="py-1.5 px-2.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete greeting"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Add Card for quick creation */}
        <div className="p-6 bg-gradient-to-r from-red-50 via-amber-50 to-rose-50 rounded-3xl border-2 border-dashed border-red-300 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-sm text-xl">
            🎁
          </div>
          <div>
            <h3 className="font-serifHeading font-bold text-lg text-stone-900">
              Want to add another sister?
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto mt-0.5">
              Customize photos, roasts, memes, and heartfelt letters for as many sisters as you have.
            </p>
          </div>
          <Link
            href="/admin/create"
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Another Sister Scrapbook</span>
          </Link>
        </div>
      </div>

      {/* Social Share Drawer */}
      {selectedSisterForShare && (
        <SocialShareModal
          sister={selectedSisterForShare}
          isOpen={!!selectedSisterForShare}
          onClose={() => setSelectedSisterForShare(null)}
        />
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Gift,
  Award,
  Heart,
  Image as ImageIcon,
  ArrowRight,
  Share2,
  Lock,
  Smile,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Palette,
  ExternalLink,
  Mail,
  Zap,
} from "lucide-react";
import { getStoredSisters } from "@/lib/store";
import { SisterGreeting } from "@/lib/types";
import { THEME_OPTIONS } from "@/lib/defaultData";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { SoundToggle } from "@/components/scrapbook/SoundToggle";
import { soundFx } from "@/lib/soundFx";

export default function HomePage() {
  const [sisters, setSisters] = useState<SisterGreeting[]>([]);

  useEffect(() => {
    setSisters(getStoredSisters());
  }, []);

  return (
    <div className="min-h-screen bg-dhaka-pattern flex flex-col items-center justify-between text-scrapbook-darkText selection:bg-scrapbook-ginghamRed selection:text-white">
      {/* Top Navbar */}
      <header className="w-full max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-red-700 text-white flex items-center justify-center shadow-md text-xl border border-amber-300">
            🧵
          </div>
          <div>
            <span className="font-serifHeading font-black text-xl text-white tracking-tight drop-shadow-xs">
              Rakhi Sibling Scrapbook
            </span>
            <span className="block text-[10px] text-amber-200 font-sans -mt-0.5">
              Nepal & Anime Edition • 100% Free
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SoundToggle />
          <Link
            href="/create"
            className="px-4 py-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1.5 transition-all transform active:scale-95 border border-white/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Create Scrapbook</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
        {/* Washi tape decoration */}
        <div className="relative mb-3">
          <WashiTape variant="gold" rotation={-2} className="w-36 sm:w-48" />
        </div>

        {/* Feature Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 text-red-900 text-xs font-bold shadow-md mb-4 border border-amber-300 backdrop-blur-xs"
        >
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>100% Free • No Sign-In Needed • Instant Shareable Link</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="font-serifHeading text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl drop-shadow-md"
        >
          A Funny, Scrapbook Greeting for Your Sister! 🧵✨
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-amber-200 font-bold mt-4 max-w-xl drop-shadow-xs"
        >
          &quot;Cute Anime Chibi styles, Nepali roasts, eSewa perks, funny diplomas, and heartwarming memories in a shareable link!&quot;
        </motion.p>

        {/* Main CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center max-w-md"
        >
          <Link
            href="/create"
            onClick={() => soundFx.playPop()}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-black text-base sm:text-lg rounded-2xl shadow-xl border-b-4 border-red-950 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
          >
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>Create For Your Sister</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/sister/simran-khadka"
            onClick={() => soundFx.playPop()}
            className="w-full sm:w-auto px-6 py-4 bg-white/95 hover:bg-white text-stone-800 font-sans font-bold text-sm sm:text-base rounded-2xl shadow-md border-2 border-stone-300 flex items-center justify-center gap-2 transition-all"
          >
            <span>Try Demo Greeting</span>
            <span>👀</span>
          </Link>
        </motion.div>

        {/* Visual Theme Selector Showcase (8 Themes including Anime Reference Styles) */}
        <div className="mt-14 w-full bg-white/95 rounded-3xl p-5 sm:p-7 shadow-xl border border-stone-200 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full">
                Anime & Nepali Aesthetics
              </span>
              <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                Choose from 8 Authentic Visual Themes
              </h3>
            </div>
            <Link
              href="/create"
              className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1"
            >
              <span>Custom Theme in Creator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {THEME_OPTIONS.map((th) => (
              <div
                key={th.id}
                className="p-3 rounded-2xl border border-stone-200 bg-stone-50/70 flex flex-col items-center text-center hover:border-red-400 transition-colors"
              >
                <div className="w-full h-16 rounded-xl mb-2 shadow-2xs border border-stone-300 overflow-hidden relative">
                  {th.bannerImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={th.bannerImg} alt={th.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full ${th.bgClass}`} />
                  )}
                </div>
                <h4 className="font-serifHeading font-bold text-xs text-stone-900 leading-tight">
                  {th.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Ready-Made Demo Sister Greetings */}
        <div className="mt-12 w-full bg-white/95 rounded-3xl p-5 sm:p-7 shadow-xl border border-stone-200 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full">
                Brother: Alok Poddar Baishya
              </span>
              <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                Ready-Made Demo Sister Greetings
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Click any profile to test the interactive experience immediately (All 100% customizable):
              </p>
            </div>
            <Link
              href="/admin"
              className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1"
            >
              <span>Manage Greetings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {sisters.map((s) => (
              <Link
                key={s.id}
                href={`/sister/${s.id}`}
                onClick={() => soundFx.playPop()}
                className="group p-3.5 rounded-2xl border border-stone-200 hover:border-red-400 bg-stone-50/70 hover:bg-red-50/40 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-300 bg-stone-200 group-hover:scale-[1.02] transition-transform mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.heroPhoto} alt={s.sisterName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serifHeading font-bold text-base text-stone-900 truncate">
                        {s.sisterName}
                      </span>
                    </div>
                    {s.nickname && (
                      <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                        &quot;{s.nickname}&quot;
                      </span>
                    )}
                    <p className="text-xs text-stone-500 font-sans mt-1.5">
                      Brother: <span className="font-bold text-stone-700">{s.brotherName}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-red-700">
                  <span>Launch Storybook 🚀</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-red-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Interactive 9-Step Story Flow Preview Showcase */}
        <div className="mt-12 w-full text-left">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-black/40 px-3 py-1 rounded-full border border-amber-400/30">
              Interactive Storybook Journey
            </span>
            <h2 className="font-serifHeading text-2xl sm:text-3xl font-black text-white mt-2 drop-shadow-sm">
              The 9-Slide Sibling Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {[
              {
                step: "Slide 1",
                title: "The Trap 🪤",
                desc: "Do you wanna see it? [YES] advances, while [NO] triggers an immediate violation alert!",
                icon: "💌",
                bg: "bg-white/95",
              },
              {
                step: "Slide 2",
                title: "Sassy Rejection 😡",
                desc: "HOW DARE YOU!? Sassy meme photo screen with buzzer and dramatic apology retry!",
                icon: "🔥",
                bg: "bg-white/95",
              },
              {
                step: "Slide 3",
                title: "Illusion of Choice 🧐",
                desc: "Are you really excited? Two identical buttons: [YES] and [Also YES]!",
                icon: "🗳️",
                bg: "bg-white/95",
              },
              {
                step: "Slide 4",
                title: "Mystery Gift Boxes 🎁",
                desc: "Customizable 3D gift boxes that pop open with funny perks (Momo Treat, Remote pass, Dakshina).",
                icon: "🎁",
                bg: "bg-white/95",
              },
              {
                step: "Slide 5",
                title: "Rakhi Greeting 🧵",
                desc: "Festive celebration frame with glowing lights, polaroid photo, and sibling chaos note.",
                icon: "✨",
                bg: "bg-white/95",
              },
              {
                step: "Slide 6",
                title: "Best Sister Award 🏆",
                desc: "Formal vintage diploma with wax seal badge and downloadable PNG certificate!",
                icon: "📜",
                bg: "bg-white/95",
              },
              {
                step: "Slide 7",
                title: "Memory Clothesline 📸",
                desc: "Fairy lights clothesline holding swinging polaroids with click-to-zoom modal.",
                icon: "🧷",
                bg: "bg-white/95",
              },
              {
                step: "Slide 8",
                title: "'YOU ARE MY...' Tags 🔬",
                desc: "Centered photo with pointer arrows: Momo Raider, eSewa ATM, Free Pathao Driver, etc.",
                icon: "🥟",
                bg: "bg-white/95",
              },
              {
                step: "Slide 9",
                title: "Heartfelt Climax 🎊",
                desc: "Emotional letter card, multi-cannon Rakhi confetti shower, and WhatsApp reply!",
                icon: "🌸",
                bg: "bg-white/95",
              },
            ].map((slide, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className={`p-4 rounded-2xl border border-stone-200/90 shadow-sm ${slide.bg} transition-all`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">
                    {slide.step}
                  </span>
                  <span className="text-lg">{slide.icon}</span>
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-stone-900">
                  {slide.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                  {slide.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-8 border-t border-white/20 mt-12 text-center text-xs text-white/90 font-sans space-y-3">
        {/* Main Features Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-amber-200">
          <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">
            ✨ No sign-in required
          </span>
          <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">
            🎁 Completely free forever
          </span>
          <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">
            🎨 Anime Chibi & Nepali Themes
          </span>
          <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">
            📱 Works in all mobile browsers
          </span>
        </div>

        {/* Copyright and Contact Links */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-stone-200">
          <p>
            Copyright ©{" "}
            <a
              href="https://alokpoddarbaishya.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-white font-bold underline decoration-amber-400 underline-offset-2 transition-colors"
            >
              alokpoddaarbaishya
            </a>
          </p>

          <span className="hidden sm:inline text-white/40">•</span>

          <a
            href="mailto:info@alokpoddarbaishya.com.np"
            className="flex items-center gap-1 text-amber-200 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>info@alokpoddarbaishya.com.np</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

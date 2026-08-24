"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SisterClient } from "./sister/[id]/SisterClient";
import { EditClient } from "./admin/edit/[id]/EditClient";

export default function NotFound() {
  const [dynamicType, setDynamicType] = useState<"sister" | "edit" | "404" | "loading">("loading");
  const [dynamicId, setDynamicId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;

      if (pathname.includes("/sister/")) {
        const parts = pathname.split("/sister/")[1]?.split("/")[0]?.split("?")[0] || "sister-surprise";
        setDynamicId(parts);
        setDynamicType("sister");
        return;
      }

      if (pathname.includes("/admin/edit/")) {
        const parts = pathname.split("/admin/edit/")[1]?.split("/")[0]?.split("?")[0] || "sister-surprise";
        setDynamicId(parts);
        setDynamicType("edit");
        return;
      }

      setDynamicType("404");
    }
  }, []);

  if (dynamicType === "sister" && dynamicId) {
    return <SisterClient id={dynamicId} />;
  }

  if (dynamicType === "edit" && dynamicId) {
    return <EditClient id={dynamicId} />;
  }

  if (dynamicType === "loading") {
    return (
      <div className="min-h-screen bg-gingham-red flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-stone-200 flex flex-col items-center gap-3 max-w-xs w-full">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-300 shadow-md animate-pulse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/rakhi_logo.jpg" alt="Loading" className="w-full h-full object-cover" />
          </div>
          <p className="font-handwriting text-lg font-bold text-scrapbook-ginghamRed">
            Loading your surprise... 🧵✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gingham-red flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white max-w-sm w-full p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-stone-300">
        <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border-2 border-amber-300 shadow-sm mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/rakhi_logo.jpg" alt="Rakhi Logo" className="w-full h-full object-cover" />
        </div>
        <h2 className="font-serifHeading text-2xl font-bold text-stone-800">
          Page Not Found
        </h2>
        <p className="font-sans text-xs text-stone-600 mt-2 leading-relaxed">
          The greeting page or link you are looking for might have been moved or is not available.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <Link
            href="/sister/simran-khadka"
            className="py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-bold text-xs shadow-md hover:from-red-500 hover:to-rose-500 transition-all flex items-center justify-center gap-2"
          >
            <span>View Simran Khadka Greeting 🎁</span>
          </Link>
          <Link
            href="/create"
            className="py-2.5 px-4 bg-stone-100 text-stone-700 rounded-xl font-bold text-xs hover:bg-stone-200 transition-colors"
          >
            Create New Sister Scrapbook ✨
          </Link>
          <Link
            href="/"
            className="py-2 px-4 text-stone-500 text-xs hover:text-stone-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

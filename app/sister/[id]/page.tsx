"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getSisterById } from "@/lib/store";
import { SisterGreeting } from "@/lib/types";
import { SisterExperienceViewer } from "@/components/scrapbook/SisterExperienceViewer";
import { Sparkles, Home, ArrowLeft } from "lucide-react";

export default function SisterPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "";
  const [sister, setSister] = useState<SisterGreeting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const found = getSisterById(id);
    if (found) {
      setSister(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gingham-red flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-stone-200 flex flex-col items-center gap-3">
          <div className="text-4xl animate-bounce">🧵🎁</div>
          <p className="font-handwriting text-xl font-bold text-scrapbook-ginghamRed">
            Opening your Rakhi surprise...
          </p>
        </div>
      </div>
    );
  }

  if (!sister) {
    return (
      <div className="min-h-screen bg-gingham-red flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white max-w-sm w-full p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-stone-300">
          <div className="text-4xl mb-2">🔍💔</div>
          <h2 className="font-display text-2xl font-bold text-stone-800">
            Surprise Not Found
          </h2>
          <p className="font-sans text-sm text-stone-600 mt-2">
            We couldn&apos;t find this specific Rakhi greeting link. It may have been renamed or removed.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/sister/chiku"
              className="py-2.5 px-4 bg-scrapbook-ginghamRed text-white rounded-xl font-bold text-sm shadow hover:bg-red-700 transition-colors"
            >
              View Sample Greeting (Chiku) 🎁
            </Link>
            <Link
              href="/"
              className="py-2.5 px-4 bg-stone-100 text-stone-700 rounded-xl font-semibold text-sm hover:bg-stone-200 transition-colors"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <SisterExperienceViewer sister={sister} />;
}

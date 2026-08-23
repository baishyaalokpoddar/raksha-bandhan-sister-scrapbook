"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { createNewBlankSister } from "@/lib/store";
import { SisterForm } from "@/components/admin/SisterForm";

export default function CreateSisterPage() {
  const [initialData] = useState(() => createNewBlankSister());

  return (
    <div className="min-h-screen bg-stone-100/70 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto mb-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>

      <SisterForm initialData={initialData} isEditing={false} />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSisterById } from "@/lib/store";
import { SisterGreeting } from "@/lib/types";
import { SisterForm } from "@/components/admin/SisterForm";

export function EditClient({ id }: { id: string }) {
  const [sister, setSister] = useState<SisterGreeting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const found = getSisterById(id);
    if (found) {
      setSister(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="text-center font-bold text-stone-600">Loading editor...</div>
      </div>
    );
  }

  if (!sister) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow border border-stone-200 text-center max-w-sm">
          <h2 className="font-bold text-lg text-stone-800">Sister Not Found</h2>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Could not find greeting data for ID &quot;{id}&quot;.
          </p>
          <Link
            href="/admin"
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

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

      <SisterForm initialData={sister} isEditing={true} />
    </div>
  );
}

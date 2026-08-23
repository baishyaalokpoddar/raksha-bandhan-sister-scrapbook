"use client";

import React from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { FunnyLabel } from "@/lib/types";

interface LabelEditorProps {
  labels: FunnyLabel[];
  onChange: (labels: FunnyLabel[]) => void;
}

const PRESET_SUGGESTIONS = [
  { title: "Food/Clothes Stealer", subtitle: "Takes 50% of everything in the house", emoji: "🍕👗" },
  { title: "Personal Bank Account", subtitle: "Only msgs when GPay hits zero", emoji: "💳💸" },
  { title: "Free Google Maps", subtitle: "Calls me for directions 24/7", emoji: "🗺️🧭" },
  { title: "Crybaby 3000", subtitle: "Drama queen champion since birth", emoji: "😭🎭" },
  { title: "24/7 Entertainment", subtitle: "Free daily comedy sitcom", emoji: "🍿🎬" },
  { title: "My Lifeline ❤️", subtitle: "Wouldn't trade you for anything", emoji: "✨💖" },
  { title: "Remote Hijacker", subtitle: "Refuses to surrender the TV remote", emoji: "📺🥊" },
  { title: "Snitch Master", subtitle: "Threatens to tell mom about everything", emoji: "📢🚨" },
];

export const LabelEditor: React.FC<LabelEditorProps> = ({ labels, onChange }) => {
  const handleUpdate = (index: number, field: keyof FunnyLabel, value: string) => {
    const updated = [...labels];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    const newLabel: FunnyLabel = {
      id: "label-" + Date.now(),
      title: "New Sibling Title",
      subtitle: "Funny description goes here",
      emoji: "🤪",
      position: "left",
    };
    onChange([...labels, newLabel]);
  };

  const handleRemove = (index: number) => {
    const updated = labels.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleAddPreset = (preset: { title: string; subtitle: string; emoji: string }) => {
    const newLabel: FunnyLabel = {
      id: "label-" + Date.now(),
      title: preset.title,
      subtitle: preset.subtitle,
      emoji: preset.emoji,
      position: "left",
    };
    onChange([...labels, newLabel]);
  };

  return (
    <div className="space-y-4">
      {/* Quick Suggestions Bar */}
      <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Sibling Tag Suggestions (Click to Add):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_SUGGESTIONS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddPreset(preset)}
              className="text-xs bg-white hover:bg-amber-100 text-stone-700 px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs flex items-center gap-1 transition-colors"
            >
              <span>{preset.emoji}</span>
              <span>{preset.title}</span>
              <Plus className="w-3 h-3 text-amber-700" />
            </button>
          ))}
        </div>
      </div>

      {/* Label List */}
      <div className="space-y-3">
        {labels.map((item, index) => (
          <div
            key={item.id || index}
            className="flex items-center gap-2 bg-white p-3 rounded-xl border border-stone-200 shadow-xs"
          >
            {/* Emoji */}
            <input
              type="text"
              value={item.emoji}
              onChange={(e) => handleUpdate(index, "emoji", e.target.value)}
              className="w-12 text-center text-lg p-1.5 bg-stone-50 rounded-lg border border-stone-300"
              title="Emoji"
            />

            {/* Title & Subtitle */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={item.title}
                placeholder="Tag title (e.g. Food Stealer)"
                onChange={(e) => handleUpdate(index, "title", e.target.value)}
                className="w-full text-xs font-bold p-2 bg-stone-50 rounded-lg border border-stone-300"
              />
              <input
                type="text"
                value={item.subtitle}
                placeholder="Funny subtitle/roast"
                onChange={(e) => handleUpdate(index, "subtitle", e.target.value)}
                className="w-full text-xs p-2 bg-stone-50 rounded-lg border border-stone-300"
              />
            </div>

            {/* Delete button */}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove tag"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Custom Button */}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-2.5 bg-white hover:bg-stone-50 border-2 border-dashed border-stone-300 hover:border-red-400 text-stone-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <Plus className="w-4 h-4 text-red-600" />
        <span>Add Custom Breakdown Tag</span>
      </button>
    </div>
  );
};

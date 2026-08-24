"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Eye,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Copy,
  Gift,
  Award,
  FileText,
  Image as ImageIcon,
  Smile,
  Palette,
  Plus,
  Trash2,
  Trash,
  HardDrive,
  CheckCircle2,
  Upload,
  Loader2,
} from "lucide-react";
import { SisterGreeting, PolaroidMemory, MysteryGift, ScrapbookTheme } from "@/lib/types";
import { THEME_OPTIONS } from "@/lib/defaultData";
import {
  saveSisterGreeting,
  clearTemporaryCacheAndCookies,
  getStorageUsageKB,
  buildUniversalShareUrl,
} from "@/lib/store";
import { compressImageFile, uploadImageToCloudflare } from "@/lib/imageUtils";
import { PhotoUploader } from "./PhotoUploader";
import { LabelEditor } from "./LabelEditor";
import { LivePreviewModal } from "./LivePreviewModal";
import { SocialShareModal } from "../scrapbook/SocialShareModal";
import { soundFx } from "@/lib/soundFx";

interface SisterFormProps {
  initialData: SisterGreeting;
  isEditing?: boolean;
}

const POLAROID_PRESETS = [
  "/assets/rakhi_chibi_anime.jpg",
  "/assets/rakhi_mandala_anime.jpg",
  "/assets/rakhi_crimson_arch.png",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
];

interface PolaroidRowProps {
  polaroid: PolaroidMemory;
  index: number;
  onUpdate: (field: keyof PolaroidMemory, value: string) => void;
  onRemove: () => void;
}

const PolaroidRow: React.FC<PolaroidRowProps> = ({ polaroid, index, onUpdate, onRemove }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const serverUrl = await uploadImageToCloudflare(file);
      soundFx.playChime();
      onUpdate("photoUrl", serverUrl);
    } catch (err) {
      console.error("Failed to upload polaroid image:", err);
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === "string") {
          onUpdate("photoUrl", ev.target.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row gap-3.5 items-start sm:items-center">
      {/* Preview */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-stone-300 bg-stone-200 flex-shrink-0 shadow-inner group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={polaroid.photoUrl}
          alt="Polaroid Memory"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/rakhi_chibi_anime.jpg";
          }}
        />
        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-[10px] gap-1">
            <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            <span>Saving...</span>
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="flex-1 w-full space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo #{index + 1}</span>
              </>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <span className="text-[11px] text-stone-400 font-sans">or paste URL below</span>
        </div>

        <input
          type="text"
          placeholder="Image URL or /assets/..."
          value={polaroid.photoUrl.startsWith("data:") ? "[Uploaded Photo Saved]" : polaroid.photoUrl}
          onChange={(e) => onUpdate("photoUrl", e.target.value)}
          className="w-full px-2.5 py-1.5 bg-white rounded-lg text-xs border border-stone-300 font-mono"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Caption (e.g. Partner in crime always)"
            value={polaroid.caption}
            onChange={(e) => onUpdate("caption", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white rounded-lg text-xs border border-stone-300 font-bold"
          />
          <input
            type="text"
            placeholder="Date / Memory tag (e.g. Childhood Memory)"
            value={polaroid.date || ""}
            onChange={(e) => onUpdate("date", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white rounded-lg text-xs border border-stone-300"
          />
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="text-[10px] font-semibold text-stone-400 uppercase">Presets:</span>
          <div className="flex flex-wrap gap-1">
            {POLAROID_PRESETS.map((preset, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => {
                  soundFx.playPop();
                  onUpdate("photoUrl", preset);
                }}
                className={`w-6 h-6 rounded-md overflow-hidden border transition-all ${
                  polaroid.photoUrl === preset ? "ring-2 ring-red-500 scale-110 shadow-xs" : "opacity-75 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preset} alt="Preset" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={onRemove}
        title="Remove this photo"
        className="p-2 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 self-end sm:self-center transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

const GIFT_SUGGESTIONS = [
  { title: "Momo Treat", perk: "Unlimited Momo Treat at Dalle / Bota (My treat!) 🥟", emoji: "🥟" },
  { title: "Dakshina #1", perk: "रू. १० Dakshina (Don't spend it all at Bhatbhateni!) 💵", emoji: "💵" },
  { title: "eSewa Shagun", perk: "रू. ५०० Special Shagun on eSewa / Khalti 📱", emoji: "📱" },
  { title: "Remote Pass", perk: "1x TV & Music Remote Control Pass (No fighting tonight) 📺", emoji: "📺" },
  { title: "Free Pathao", perk: "Free Pathao / Scooter Ride whenever you need to go out 🛵", emoji: "🛵" },
  { title: "Roast Immunity", perk: "24-Hour Immunity from Sibling Roasting & Pranks 🛡️", emoji: "🛡️" },
  { title: "Chocolate Box", perk: "Special Chocolate Box + Secret Sweet Treats 🍫", emoji: "🍫" },
];

export const SisterForm: React.FC<SisterFormProps> = ({
  initialData,
  isEditing = false,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<SisterGreeting>(initialData);
  const [activeTab, setActiveTab] = useState<"basics" | "theme" | "photos" | "tags" | "gifts" | "certificate" | "letter">("basics");
  const [autoClearCache, setAutoClearCache] = useState(true);
  const [storageUsageKB, setStorageUsageKB] = useState(0);
  const [cleanedNotice, setCleanedNotice] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [origin, setOrigin] = useState("");
  const clotheslineUploadRef = useRef<HTMLInputElement>(null);
  const [isAddingClotheslinePhoto, setIsAddingClotheslinePhoto] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
      setStorageUsageKB(getStorageUsageKB());
      // On client mount only, generate random slug if it was a default placeholder
      if (formData.id === "sister-surprise" && !isEditing) {
        const randomId = "sister-" + Math.random().toString(36).substring(2, 7);
        setFormData((prev) => ({ ...prev, id: randomId }));
      }
    }
  }, [isEditing]);

  const handleManualClean = () => {
    soundFx.playPop();
    const { freedKB, clearedItems } = clearTemporaryCacheAndCookies();
    setStorageUsageKB(getStorageUsageKB());
    setCleanedNotice(`Cleared ${clearedItems} temporary cache items & freed storage! 🧹`);
    setTimeout(() => setCleanedNotice(null), 3000);
  };

  const handleFieldChange = (field: keyof SisterGreeting, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePolaroidChange = (index: number, field: keyof PolaroidMemory, value: string) => {
    const updated = [...formData.polaroids];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, polaroids: updated }));
  };

  const handleAddPolaroid = () => {
    const newPol: PolaroidMemory = {
      id: "p-" + Date.now(),
      photoUrl: "/assets/rakhi_chibi_anime.jpg",
      caption: "New memory with my sister",
      date: "Special Day",
      rotation: (Math.random() - 0.5) * 6,
    };
    setFormData((prev) => ({ ...prev, polaroids: [...prev.polaroids, newPol] }));
  };

  const handleDirectClotheslineUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsAddingClotheslinePhoto(true);
      const serverUrl = await uploadImageToCloudflare(file);
      soundFx.playChime();
      const newPol: PolaroidMemory = {
        id: "p-" + Date.now(),
        photoUrl: serverUrl,
        caption: `Special Memory #${formData.polaroids.length + 1}`,
        date: "Janai Purnima / Rakhi Memory",
        rotation: (Math.random() - 0.5) * 6,
      };
      setFormData((prev) => ({ ...prev, polaroids: [...prev.polaroids, newPol] }));
    } catch (err) {
      console.error("Clothesline direct upload error:", err);
    } finally {
      setIsAddingClotheslinePhoto(false);
      if (clotheslineUploadRef.current) {
        clotheslineUploadRef.current.value = "";
      }
    }
  };

  const handleRemovePolaroid = (index: number) => {
    const updated = formData.polaroids.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, polaroids: updated }));
  };

  const handleGiftChange = (index: number, field: keyof MysteryGift, value: string) => {
    const updated = [...formData.gifts];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, gifts: updated }));
  };

  const handleAddGift = () => {
    const nextId = (formData.gifts?.length || 0) + 1;
    const newGift: MysteryGift = {
      id: nextId,
      title: `Gift Box #${nextId}`,
      perk: "Special Surprise Sibling Perk",
      emoji: "🎁",
      color: "#B91C1C",
    };
    setFormData((prev) => ({ ...prev, gifts: [...(prev.gifts || []), newGift] }));
  };

  const handleAddGiftPreset = (preset: { title: string; perk: string; emoji: string }) => {
    const nextId = (formData.gifts?.length || 0) + 1;
    const newGift: MysteryGift = {
      id: nextId,
      title: preset.title,
      perk: preset.perk,
      emoji: preset.emoji,
      color: "#B91C1C",
    };
    setFormData((prev) => ({ ...prev, gifts: [...(prev.gifts || []), newGift] }));
  };

  const handleRemoveGift = (index: number) => {
    const updated = formData.gifts.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, gifts: updated }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.sisterName.trim()) {
      alert("Please enter your Sister's Name!");
      setActiveTab("basics");
      return;
    }

    let slug = formData.id;
    if (!slug || slug === "sister-surprise" || slug.startsWith("sister-")) {
      slug = (formData.nickname || formData.sisterName)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      if (!slug) slug = "sister-" + Math.random().toString(36).substring(2, 6);
    }

    const toSave = {
      ...formData,
      id: slug,
      theme: formData.theme || "chibi-anime",
      currencySymbol: formData.currencySymbol || "रू.",
    };
    saveSisterGreeting(toSave, autoClearCache);
    setFormData(toSave);
    setStorageUsageKB(getStorageUsageKB());
    soundFx.playChime();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const displayShareUrl = mounted && origin ? buildUniversalShareUrl(formData, origin) : buildUniversalShareUrl(formData, "");

  const handleCopyLink = () => {
    soundFx.playPop();
    if (typeof window !== "undefined") {
      const fullUrl = buildUniversalShareUrl(formData, window.location.origin);
      navigator.clipboard.writeText(fullUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Top Header Actions Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-stone-200 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block bg-red-100 text-red-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {isEditing ? "Edit Sibling Scrapbook" : "Greeting Creator Studio"}
            </span>
            <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
              100% Free • No Sign-In
            </span>
            <span className="inline-block bg-sky-100 text-sky-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <HardDrive className="w-3 h-3" /> Auto-Clean Storage
            </span>
          </div>
          <h1 className="font-serifHeading text-2xl sm:text-3xl font-black text-scrapbook-darkText">
            {formData.sisterName ? `${formData.sisterName}'s Scrapbook` : "Create Sibling Greeting"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleManualClean}
            title="Clear temporary image cache, draft session data, and cookies to save storage"
            className="px-3.5 py-2 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-bold border border-stone-200 flex items-center gap-1.5 transition-colors"
          >
            <Trash className="w-3.5 h-3.5 text-stone-500" />
            <span>Clean Cache</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-stone-600" />
            <span>Live Preview</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="px-5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Saved & Cleaned!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Experience</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cleaned Storage Feedback Notice */}
      {cleanedNotice && (
        <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-2xl mb-4 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{cleanedNotice}</span>
          </div>
          <span className="text-[11px] text-emerald-700">Storage optimized 🧹</span>
        </div>
      )}

      {/* Shareable Link Box */}
      <div className="bg-gradient-to-r from-red-50 via-amber-50 to-rose-50 rounded-2xl p-4 border-2 border-red-200 mb-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">
              Unique Shareable Link:
            </div>
            <div className="text-xs text-stone-600 font-mono break-all" suppressHydrationWarning>
              {displayShareUrl}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3.5 py-2 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold rounded-lg border border-stone-300 shadow-2xs flex items-center gap-1.5"
          >
            {linkCopied ? (
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
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share to Socials</span>
          </button>
        </div>
      </div>

      {/* Auto-Clear Cache & Save Storage Settings Banner */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
            <HardDrive className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900">
              Auto-Clear Temporary Cache & Cookies on Save
            </div>
            <div className="text-[11px] text-stone-500">
              Deletes temporary session buffers and clears cookies after link creation to save device storage.
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer self-end sm:self-center">
          <input
            type="checkbox"
            checked={autoClearCache}
            onChange={(e) => setAutoClearCache(e.target.checked)}
            className="w-4 h-4 text-red-600 rounded border-stone-300 focus:ring-red-500"
          />
          <span className="text-xs font-bold text-stone-700">Auto-Clean Active</span>
        </label>
      </div>

      {/* Form Tabs Navigation */}
      <div className="flex overflow-x-auto gap-1 p-1 bg-stone-200/80 rounded-xl mb-6 scrollbar-none">
        {[
          { id: "basics", label: "1. Info & Names", icon: Smile },
          { id: "theme", label: "2. Anime & Nepali Themes", icon: Palette },
          { id: "photos", label: "3. Photo Gallery", icon: ImageIcon },
          { id: "tags", label: "4. Sibling Roasts", icon: Sparkles },
          { id: "gifts", label: "5. Mystery Gift Perks", icon: Gift },
          { id: "certificate", label: "6. Award Diploma", icon: Award },
          { id: "letter", label: "7. Heartfelt Letter", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundFx.playPop();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-white text-scrapbook-ginghamRed shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-white/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Contents */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-stone-200">
        {/* TAB 1: BASIC INFO & NAMES */}
        {activeTab === "basics" && (
          <div className="space-y-5">
            <h3 className="font-serifHeading text-xl font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">
              Sister & Brother Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Sister&apos;s Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Simran Khadka, Bhawana Parsai, शिवाङ्गी शाह कार्की"
                  value={formData.sisterName}
                  onChange={(e) => handleFieldChange("sisterName", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-red-400 font-sans font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Nickname / Funny Moniker
                </label>
                <input
                  type="text"
                  placeholder="e.g. Simu, Chiku, Drama Queen, Chhuchhi, Shivu"
                  value={formData.nickname}
                  onChange={(e) => handleFieldChange("nickname", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-red-400 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Brother&apos;s Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alok Poddar Baishya"
                  value={formData.brotherName}
                  onChange={(e) => handleFieldChange("brotherName", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-red-400 font-sans font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Currency Symbol
                </label>
                <select
                  value={formData.currencySymbol || "रू."}
                  onChange={(e) => handleFieldChange("currencySymbol", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold bg-white focus:ring-2 focus:ring-red-400"
                >
                  <option value="रू.">रू. (Nepali Rupees - NPR)</option>
                  <option value="Rs.">Rs. (Rupees)</option>
                  <option value="NPR">NPR</option>
                  <option value="$">$ (USD)</option>
                  <option value="₹">₹ (INR)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Custom Slug / Link ID
                </label>
                <div className="flex items-center">
                  <span className="bg-stone-100 border border-r-0 border-stone-300 px-2.5 py-2.5 rounded-l-xl text-xs text-stone-500 font-mono">
                    /sister/
                  </span>
                  <input
                    type="text"
                    placeholder="simran-khadka"
                    value={formData.id}
                    onChange={(e) => handleFieldChange("id", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="w-full px-2.5 py-2.5 rounded-r-xl border border-stone-300 text-sm font-mono focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANIME & NEPALI THEME PICKER */}
        {activeTab === "theme" && (
          <div className="space-y-4">
            <h3 className="font-serifHeading text-xl font-bold text-stone-900 mb-2 pb-2 border-b border-stone-200">
              Select Visual Theme & Anime Character Style
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Choose an aesthetic theme featuring cute anime chibi artwork, festive mandalas, or Nepali traditional designs:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {THEME_OPTIONS.map((theme) => {
                const isSelected = (formData.theme || "chibi-anime") === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => {
                      soundFx.playPop();
                      handleFieldChange("theme", theme.id);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? "border-red-600 bg-red-50/50 shadow-md ring-2 ring-red-300"
                        : "border-stone-200 hover:border-stone-400 bg-white"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl flex-shrink-0 shadow-xs border border-stone-300 overflow-hidden relative">
                      {theme.bannerImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={theme.bannerImg} alt={theme.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full ${theme.bgClass}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serifHeading font-bold text-sm text-stone-900">
                          {theme.name}
                        </h4>
                        {isSelected && (
                          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 font-sans mt-0.5 leading-snug">
                        {theme.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PHOTO GALLERY */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            <h3 className="font-serifHeading text-xl font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">
              Interactive & Polaroid Photos
            </h3>

            <PhotoUploader
              label="1. Hero / Goofy Meme Photo"
              description="Shown on Slide 2 'HOW DARE YOU!?' if she clicks 'NO'."
              photoUrl={formData.heroPhoto}
              onChange={(url) => handleFieldChange("heroPhoto", url)}
              presetAvatars={[
                "/assets/rakhi_chibi_anime.jpg",
                "/assets/rakhi_mandala_anime.jpg",
                "/assets/rakhi_crimson_arch.png",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
              ]}
            />

            <PhotoUploader
              label="2. Main Rakhi Greeting Photo"
              description="Framed on Slide 5 in a vintage Polaroid with festive greetings."
              photoUrl={formData.rakhiPhoto}
              onChange={(url) => handleFieldChange("rakhiPhoto", url)}
              presetAvatars={[
                "/assets/rakhi_mandala_anime.jpg",
                "/assets/rakhi_chibi_anime.jpg",
                "/assets/rakhi_crimson_arch.png",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
              ]}
            />

            <PhotoUploader
              label="3. Best Sister Award Photo"
              description="Shown inside the official diploma badge on Slide 6."
              photoUrl={formData.certificatePhoto}
              onChange={(url) => handleFieldChange("certificatePhoto", url)}
              presetAvatars={[
                "/assets/rakhi_chibi_anime.jpg",
                "/assets/rakhi_mandala_anime.jpg",
                "/assets/rakhi_crimson_arch.png",
              ]}
            />

            <PhotoUploader
              label="4. 'You Are My...' Central Breakdown Photo"
              description="The centerpiece on Slide 8 with animated sibling pointer tags."
              photoUrl={formData.breakdownPhoto}
              onChange={(url) => handleFieldChange("breakdownPhoto", url)}
              presetAvatars={[
                "/assets/rakhi_crimson_arch.png",
                "/assets/rakhi_chibi_anime.jpg",
                "/assets/rakhi_mandala_anime.jpg",
              ]}
            />

            {/* Clothesline Polaroid Memories */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <span>5. Clothesline Polaroid Memories (Slide 7)</span>
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {formData.polaroids.length} Photos
                    </span>
                  </h4>
                  <p className="text-xs text-stone-500">
                    Memories hanging on the fairy lights clothesline. Upload photos directly from your phone or PC.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isAddingClotheslinePhoto}
                    onClick={() => clotheslineUploadRef.current?.click()}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {isAddingClotheslinePhoto ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading Photo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </>
                    )}
                  </button>
                  <input
                    ref={clotheslineUploadRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleDirectClotheslineUpload}
                  />

                  <button
                    type="button"
                    onClick={handleAddPolaroid}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl border border-stone-200 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Blank Card
                  </button>
                </div>
              </div>

              <div className="space-y-3.5">
                {formData.polaroids.map((polaroid, index) => (
                  <PolaroidRow
                    key={polaroid.id || index}
                    polaroid={polaroid}
                    index={index}
                    onUpdate={(field, val) => handlePolaroidChange(index, field, val)}
                    onRemove={() => handleRemovePolaroid(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SIBLING TAGS */}
        {activeTab === "tags" && (
          <div className="space-y-4">
            <h3 className="font-serifHeading text-xl font-bold text-stone-900 mb-2 pb-2 border-b border-stone-200">
              Slide 8: &quot;YOU ARE MY...&quot; Sibling Breakdown
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              These roasts and nicknames pop up around her photo on Slide 8:
            </p>

            <LabelEditor
              labels={formData.funnyLabels}
              onChange={(labels) => handleFieldChange("funnyLabels", labels)}
            />
          </div>
        )}

        {/* TAB 5: MYSTERY GIFTS */}
        {activeTab === "gifts" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <div>
                <h3 className="font-serifHeading text-xl font-bold text-stone-900">
                  Slide 4: Interactive Mystery Gift Perks
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Customize the funny perks and promises revealed when she clicks each 3D gift box:
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddGift}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg border border-red-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Gift Box
              </button>
            </div>

            {/* Quick Sibling Perk Suggestions */}
            <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block mb-2">
                💡 Quick Perk Ideas (Click to Add as a Gift):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {GIFT_SUGGESTIONS.map((sugg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddGiftPreset(sugg)}
                    className="text-xs bg-white hover:bg-amber-100 text-stone-700 px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs flex items-center gap-1 transition-colors"
                  >
                    <span>{sugg.emoji}</span>
                    <span>{sugg.title}</span>
                    <Plus className="w-3 h-3 text-amber-700" />
                  </button>
                ))}
              </div>
            </div>

            {/* Gift List */}
            <div className="space-y-3.5">
              {formData.gifts.map((gift, index) => (
                <div key={gift.id || index} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-stone-700">
                      Gift Box #{index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={gift.emoji || "🎁"}
                        onChange={(e) => handleGiftChange(index, "emoji", e.target.value)}
                        className="w-12 text-center text-base p-1 bg-white rounded border border-stone-300"
                        title="Emoji"
                      />
                      {formData.gifts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveGift(index)}
                          className="p-1 text-stone-400 hover:text-red-600 rounded"
                          title="Remove gift"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={gift.title}
                      placeholder="Title (e.g. Gift Box #1)"
                      onChange={(e) => handleGiftChange(index, "title", e.target.value)}
                      className="text-xs font-bold p-2 bg-white rounded-lg border border-stone-300"
                    />
                    <input
                      type="text"
                      value={gift.perk}
                      placeholder="Perk description (e.g. Unlimited Momo Treat)"
                      onChange={(e) => handleGiftChange(index, "perk", e.target.value)}
                      className="sm:col-span-2 text-xs p-2 bg-white rounded-lg border border-stone-300 font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CERTIFICATE */}
        {activeTab === "certificate" && (
          <div className="space-y-4">
            <h3 className="font-serifHeading text-xl font-bold text-stone-900 mb-2 pb-2 border-b border-stone-200">
              Slide 6: &apos;Best Sister Award&apos; Diploma
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Award Title
              </label>
              <input
                type="text"
                value={formData.certificate?.title || ""}
                onChange={(e) =>
                  handleFieldChange("certificate", {
                    ...formData.certificate,
                    title: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm font-bold font-serifHeading"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Humorous Citation / Subtext
              </label>
              <textarea
                rows={3}
                value={formData.certificate?.subtitle || ""}
                onChange={(e) =>
                  handleFieldChange("certificate", {
                    ...formData.certificate,
                    subtitle: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm font-handwriting text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Sign-off
                </label>
                <input
                  type="text"
                  value={formData.certificate?.signature || ""}
                  onChange={(e) =>
                    handleFieldChange("certificate", {
                      ...formData.certificate,
                      signature: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm font-handwriting text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Wax Seal Text
                </label>
                <input
                  type="text"
                  value={formData.certificate?.sealText || ""}
                  onChange={(e) =>
                    handleFieldChange("certificate", {
                      ...formData.certificate,
                      sealText: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs uppercase font-serif font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: HEARTFELT LETTER */}
        {activeTab === "letter" && (
          <div className="space-y-4">
            <h3 className="font-serifHeading text-xl font-bold text-stone-900 mb-2 pb-2 border-b border-stone-200">
              Slide 9: Heartfelt Climax Letter
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Greeting Salutation
              </label>
              <input
                type="text"
                value={formData.letter?.title || ""}
                onChange={(e) =>
                  handleFieldChange("letter", {
                    ...formData.letter,
                    title: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm font-handwriting text-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Letter Paragraphs (1 per line)
              </label>
              <textarea
                rows={6}
                value={formData.letter?.paragraphs?.join("\n\n") || ""}
                onChange={(e) =>
                  handleFieldChange("letter", {
                    ...formData.letter,
                    paragraphs: e.target.value.split("\n\n").filter((p) => p.trim()),
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm font-handwriting text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Sign-off
                </label>
                <textarea
                  rows={2}
                  value={formData.letter?.signoff || ""}
                  onChange={(e) =>
                    handleFieldChange("letter", {
                      ...formData.letter,
                      signoff: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm font-handwriting text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Postscript (P.S.)
                </label>
                <input
                  type="text"
                  value={formData.letter?.ps || ""}
                  onChange={(e) =>
                    handleFieldChange("letter", {
                      ...formData.letter,
                      ps: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm font-handwriting text-base"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div className="mt-8 pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Preview All 9 Slides</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-display font-bold text-sm rounded-xl shadow-lg border-b-4 border-red-900 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Auto-Clean Storage</span>
          </button>
        </div>
      </form>

      {/* Live Preview Modal */}
      <LivePreviewModal
        sister={formData}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* Social Media Share Modal */}
      <SocialShareModal
        sister={formData}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

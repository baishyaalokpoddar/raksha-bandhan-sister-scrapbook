import { SisterGreeting, ScrapbookTheme } from "./types";
import { DEMO_SISTERS, DEFAULT_NEPALI_LABELS, DEFAULT_NEPALI_GIFTS } from "./defaultData";

const STORAGE_KEY = "rakhi_sister_scrapbooks_v3";
const DRAFT_KEY = "rakhi_scrapbook_draft";

export const getStoredSisters = (): SisterGreeting[] => {
  if (typeof window === "undefined") {
    return DEMO_SISTERS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_SISTERS));
      return DEMO_SISTERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEMO_SISTERS;
  } catch (err) {
    console.error("Error reading stored sisters:", err);
    return DEMO_SISTERS;
  }
};

export const getSisterById = (id: string): SisterGreeting | null => {
  const all = getStoredSisters();
  const found = all.find((s) => s.id.toLowerCase() === id.toLowerCase());
  if (found) return found;

  const demoFound = DEMO_SISTERS.find((s) => s.id.toLowerCase() === id.toLowerCase());
  return demoFound || null;
};

export const saveSisterGreeting = (
  sister: SisterGreeting,
  autoClearCache: boolean = true
): SisterGreeting => {
  const all = getStoredSisters();
  const existingIndex = all.findIndex((s) => s.id.toLowerCase() === sister.id.toLowerCase());

  const updatedSister: SisterGreeting = {
    ...sister,
    theme: sister.theme || "chibi-anime",
    currencySymbol: sister.currencySymbol || "रू.",
    updatedAt: new Date().toISOString(),
  };

  let newArray: SisterGreeting[];
  if (existingIndex >= 0) {
    newArray = [...all];
    newArray[existingIndex] = updatedSister;
  } else {
    newArray = [updatedSister, ...all];
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newArray));
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      console.warn("LocalStorage save warning:", err);
    }

    if (autoClearCache) {
      clearTemporaryCacheAndCookies();
    }
  }

  if (typeof window !== "undefined") {
    fetch("/api/sisters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSister),
    }).catch(() => {});
  }

  return updatedSister;
};

export const deleteSisterGreeting = (id: string): boolean => {
  const all = getStoredSisters();
  const filtered = all.filter((s) => s.id.toLowerCase() !== id.toLowerCase());

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    fetch(`/api/sisters/${id}`, { method: "DELETE" }).catch(() => {});
  }
  return true;
};

export const incrementSisterViews = (id: string): void => {
  const all = getStoredSisters();
  const sister = all.find((s) => s.id.toLowerCase() === id.toLowerCase());
  if (sister) {
    sister.views = (sister.views || 0) + 1;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch {}
    }
  }
};

/* Auto-clear temporary cache, drafts, sessionStorage and cookies */
export const clearTemporaryCacheAndCookies = (): { freedKB: number; clearedItems: number } => {
  let clearedItems = 0;
  let estimatedBytesBefore = 0;

  if (typeof window === "undefined") {
    return { freedKB: 0, clearedItems: 0 };
  }

  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        estimatedBytesBefore += (sessionStorage.getItem(key) || "").length * 2;
        clearedItems++;
      }
    }
    sessionStorage.clear();

    const draftKeys = [DRAFT_KEY, "temp_uploaded_img", "canvas_cache", "rakhi_temp_blob", "rakhi_sister_scrapbooks_v1", "rakhi_sister_scrapbooks_v2"];
    draftKeys.forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        estimatedBytesBefore += item.length * 2;
        localStorage.removeItem(key);
        clearedItems++;
      }
    });

    if (typeof document !== "undefined" && document.cookie) {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        clearedItems++;
      }
    }

    if ("caches" in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }
  } catch (err) {
    console.error("Cache cleanup error:", err);
  }

  const freedKB = Math.max(1, Math.round(estimatedBytesBefore / 1024));
  return { freedKB, clearedItems };
};

export const getStorageUsageKB = (): number => {
  if (typeof window === "undefined") return 0;
  let totalBytes = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        totalBytes += (localStorage.getItem(key) || "").length * 2;
      }
    }
  } catch {}
  return Math.round(totalBytes / 1024);
};

export const createNewBlankSister = (selectedTheme: ScrapbookTheme = "chibi-anime"): SisterGreeting => {
  const randomSlug = "sister-" + Math.random().toString(36).substring(2, 7);
  return {
    id: randomSlug,
    sisterName: "",
    nickname: "",
    brotherName: "Alok Poddar Baishya",
    heroPhoto: "/assets/rakhi_chibi_anime.jpg",
    rakhiPhoto: "/assets/rakhi_mandala_anime.jpg",
    certificatePhoto: "/assets/rakhi_chibi_anime.jpg",
    breakdownPhoto: "/assets/rakhi_crimson_arch.png",
    polaroids: [
      {
        id: "p1",
        photoUrl: "/assets/rakhi_chibi_anime.jpg",
        caption: "Partners in crime always",
        date: "Childhood Anime Memory",
        rotation: -3,
      },
      {
        id: "p2",
        photoUrl: "/assets/rakhi_mandala_anime.jpg",
        caption: "Late night Momo & street food runs",
        date: "Special Day",
        rotation: 2,
      },
      {
        id: "p3",
        photoUrl: "/assets/rakhi_crimson_arch.png",
        caption: "Festive Rakhi blessings",
        date: "Janai Purnima / Rakhi",
        rotation: -2,
      },
      {
        id: "p4",
        photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
        caption: "Forever judging my fashion sense",
        date: "Road Trip",
        rotation: 3,
      },
    ],
    funnyLabels: DEFAULT_NEPALI_LABELS,
    gifts: DEFAULT_NEPALI_GIFTS,
    certificate: {
      title: "Best Sister in Nepal Award",
      subtitle: "Presented for listening to all my 2 AM rants and being the sweetest (and most annoying) sister alive.",
      date: "Raksha Bandhan / Janai Purnima",
      signature: "Your Loving Brother, Alok Poddar Baishya",
      sealText: "OFFICIAL RAKHI SIBLING CERTIFICATE",
    },
    letter: {
      title: "To my dearest sister & forever confidante,",
      paragraphs: [
        "Happy Raksha Bandhan! Even though we fight over silly things, life without your chaos would be super boring.",
        "Thank you for always having my back, giving honest advice, and being the best sister anyone could ask for.",
        "Wishing you all the joy, success, and delicious treats today!"
      ],
      signoff: "With all my love,\nAlok Poddar Baishya ❤️",
      ps: "P.S. Don't forget my Rakhi gift! 🎁",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    theme: selectedTheme,
    currencySymbol: "रू.",
  };
};

/* Social Media Share URL Generators */
export const getShareUrls = (sister: SisterGreeting, baseUrl: string) => {
  const greetingUrl = `${baseUrl}/sister/${sister.id}`;
  const sisterName = sister.nickname || sister.sisterName || "Sister";
  const shareText = `Happy Raksha Bandhan ${sisterName}! ✨ I created a personalized, humorous scrapbook greeting for you. Open your surprise here:`;

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${greetingUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(greetingUrl)}&quote=${encodeURIComponent(shareText)}`,
    messenger: `fb-messenger://share/?link=${encodeURIComponent(greetingUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(greetingUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(greetingUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(greetingUrl)}&text=${encodeURIComponent(shareText)}`,
    snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(greetingUrl)}`,
    directUrl: greetingUrl,
  };
};

export const generateWhatsAppShareLink = (sister: SisterGreeting, baseUrl: string): string => {
  return getShareUrls(sister, baseUrl).whatsapp;
};

export const generateWhatsAppReplyLink = (sister: SisterGreeting): string => {
  const message = `Aww ${sister.brotherName || "bhai"}! Just saw my Raksha Bandhan scrapbook surprise! ❤️ That was hilarious and so sweet! Happy Raksha Bandhan! 🧵✨`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
};

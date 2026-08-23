export type ScrapbookTheme = 
  | "chibi-anime"     // Cute Chibi Anime Sunset & Clouds (Ref Image 3)
  | "mandala-anime"   // Festive Mandala & Diya Vector (Ref Image 1)
  | "crimson-arch"    // Royal Crimson Arch & Temple Gold (Ref Image 2)
  | "dhaka-nepal"     // Traditional Nepali Dhaka pattern & festive marigold/crimson
  | "gingham-red"     // Classic red-and-cream gingham plaid
  | "royal-patan"     // Deep royal navy & temple gold
  | "cherry-blossom"  // Soft rose & pastel pink
  | "himalayan-green";// Mountain pine green & kraft paper

export interface PolaroidMemory {
  id: string;
  photoUrl: string;
  caption: string;
  date?: string;
  rotation?: number;
}

export interface FunnyLabel {
  id: string;
  title: string;
  subtitle: string;
  emoji?: string;
  position: "top-left" | "top-right" | "left" | "right" | "bottom-left" | "bottom-right";
}

export interface MysteryGift {
  id: number;
  title: string;
  perk: string;
  emoji?: string;
  color?: string;
  revealed?: boolean;
}

export interface CertificateData {
  title: string;
  subtitle: string;
  date: string;
  signature: string;
  sealText: string;
}

export interface LetterData {
  title: string;
  paragraphs: string[];
  signoff: string;
  ps?: string;
}

export interface SisterGreeting {
  id: string;
  sisterName: string;
  nickname: string;
  brotherName: string;
  heroPhoto: string;
  rakhiPhoto: string;
  certificatePhoto: string;
  breakdownPhoto: string;
  polaroids: PolaroidMemory[];
  funnyLabels: FunnyLabel[];
  gifts: MysteryGift[];
  certificate: CertificateData;
  letter: LetterData;
  createdAt: string;
  updatedAt: string;
  views: number;
  theme: ScrapbookTheme;
  currencySymbol?: string; // default "रू." (NPR)
}

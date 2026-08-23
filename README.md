# 🧵 Raksha Bandhan Sibling Scrapbook (Anime & Nepal Edition) ✨

An interactive, responsive, and animated scrapbook greeting web application designed for a brother to send customized, humorous, anime-styled greeting experiences to his sisters via unique shareable links.

---

## ☁️ Cloudflare Pages Deployment Settings

When connecting this repository to **Cloudflare Pages**, configure the build settings as follows:

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | `Next.js (Static HTML Export)` *(or None)* |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `out` |
| **Root Directory** | `/` *(or leave blank)* |
| **Node.js Version** (Environment Variable) | `NODE_VERSION: 18.18.0` *(or 20.x)* |

> [!NOTE]
> The project uses `output: 'export'` in `next.config.mjs` to generate a pure static HTML build in `out/`, ensuring ultra-fast global edge distribution on Cloudflare CDN with zero serverless cold starts.

---

## 🌟 Key Highlights & Features

### 1. 📖 The 9-Slide Interactive Humorous Storybook Flow
* **Slide 1: The Trap** — *"I have made something special for you... Do you wanna see it?"* with `[ YES ]` and `[ NO ]`.
* **Slide 2: Sassy Rejection (Triggered on 'NO')** — *"HOW DARE YOU!?"* dramatic warning screen, failure buzzer sound, sister's grumpy meme photo, and a pulsing `[ 🥺 OKAY I APOLOGIZE, TRY AGAIN ]` button redirecting to Slide 1.
* **Slide 3: The Illusion of Choice** — *"Are you really excited?"* with two identical `[ YES! 🥳 ]` and `[ Also YES! 😎 ]` buttons.
* **Slide 4: Interactive Mystery Gifts** — 3D animated bouncing gift boxes that pop open with custom sound & confetti to reveal hilarious sibling perks (Unlimited Momo treat, TV Remote control pass, रू. १० Dakshina, eSewa balance).
* **Slide 5: Happy Rakshabandhan Greeting** — Festive framed Polaroid photo, floating diyas, and sibling chaos quotes.
* **Slide 6: 'Best Sister Award' Diploma** — Formal vintage certificate with gold wax seal, humorous subtext, and a `[ 📥 Download Certificate (PNG) ]` button powered by `html2canvas`.
* **Slide 7: Polaroid Memory String** — Fairy lights clothesline holding swinging polaroids with physics swing animations and click-to-zoom modal lightbox.
* **Slide 8: "YOU ARE MY..." Funny Breakdown** — Centered sister photo with animated pointer arrows to hilarious roasts (Momo Raider, Personal eSewa ATM, Free Pathao Driver, Ghar ko Supreme CCTV, Drama Queen 3000, Mero Mutu ko Tukra).
* **Slide 9: Heartfelt Climax** — Vintage emotional letter, multi-cannon celebratory Rakhi confetti shower, and WhatsApp hug reply button.

---

### 2. 🎨 8 Anime Character & Nepali Visual Themes
1. 🎨 **Cute Chibi Sibling Anime (`chibi-anime`)** — Warm sunset gradient, cute anime chibi characters tying Rakhi, soft clouds, and Devanagari calligraphy.
2. 🪔 **Festive Mandala & Diya Vector (`mandala-anime`)** — Gold mandala vector art, marigold garlands, gifts, and anime brother-sister Rakhi tying.
3. 🏛️ **Royal Crimson Temple Arch (`crimson-arch`)** — Deep maroon temple archway with gold mandala glow and Devanagari calligraphy.
4. 🇳🇵 **Nepali Dhaka & Marigold (`dhaka-nepal`)** — Traditional woven geometric Dhaka pattern with saffron and crimson tones.
5. 🍓 **Classic Picnic Gingham (`gingham-red`)** — Timeless red-and-cream plaid scrapbook aesthetic.
6. 👑 **Royal Patan & Gold (`royal-patan`)** — Regal temple gold and deep heritage blue border.
7. 🌸 **Gulabi / Rose Bloom (`cherry-blossom`)** — Soft rose pastel and floral paper textures.
8. 🌿 **Himalayan Pine & Kraft (`himalayan-green`)** — Mountain pine greenery and rustic craft paper.

---

### 3. 🧹 Auto-Clear Cache, Storage Cleanup & Cookie Pruning
* Automatically purges temporary working draft buffers, uploaded canvas blobs, and non-essential cookies immediately upon saving a greeting to keep your browser storage ultra-light.
* 1-Click *"Clean Cache"* button in the Creator Studio to free storage on demand.

---

### 4. 📱 Multi-Platform Social Media Sharing
Integrated one-click sharing modal supporting:
* **WhatsApp** (Preformatted emoji message & direct link)
* **Facebook** (Share dialog)
* **Instagram** (Copy link with Story/DM guidance)
* **TikTok** (Copy link for video bio/chat)
* **Snapchat** (Attachment link)
* **LinkedIn** (Post share)
* **X / Twitter** (Instant tweet intent)
* **Telegram** (Direct message share)
* **1-Click Copy Link**

---

### 5. ⚡ 100% Free & No Sign-In Required
* Anyone can create, edit, preview, and share greetings in under 60 seconds without creating an account or logging in.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router, Static HTML Export)
* **Language:** TypeScript
* **Styling:** Tailwind CSS with custom scrapbook, gingham, and Dhaka CSS patterns
* **Animations:** Framer Motion (Page transitions, 3D gift box bounce, clothesline physics)
* **Effects:** Canvas-Confetti (Multi-cannon festive fireworks)
* **Audio:** Web Audio API Pure Synthesizer Sound Engine (Zero external MP3 dependencies)
* **Certificate Export:** html2canvas (High-resolution PNG download)
* **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/baishyaalokpoddar/raksha-bandhan-sister-scrapbook.git
cd raksha-bandhan-sister-scrapbook
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 👭 Demo Profiles (Brother: Alok Poddar Baishya)

* **Simran Khadka:** `/sister/simran-khadka` (Theme: Cute Chibi Anime)
* **Bhawana Parsai:** `/sister/bhawana-parsai` (Theme: Mandala Diya Vector)
* **शिवाङ्गी शाह कार्की:** `/sister/shivangi-shah-karki` (Theme: Royal Crimson Arch)
* **Aayusha Thapa:** `/sister/aayusha-thapa` (Theme: Nepali Dhaka Topi)

---

## 📄 License & Credits

* **Author:** [alokpoddaarbaishya](https://alokpoddarbaishya.com.np)
* **Email:** [info@alokpoddarbaishya.com.np](mailto:info@alokpoddarbaishya.com.np)
* **License:** MIT License • Built with love for Raksha Bandhan & Janai Purnima 🧵❤️

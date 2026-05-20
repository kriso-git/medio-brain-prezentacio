# Medio Brain Architektúra Weboldal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `Medio Brain.html` (1920×1080 fixed deck) átalakítása hibrid reszponzív, max-overdrive animációkkal ellátott Next.js 15 weboldallá; deploy Vercel-re GitHub auto-deploy-val.

**Architecture:** Egyetlen `app/page.tsx` rendereli mind a 12 dia-szekciót statikusan. Desktopon (≥1024px) `scroll-snap-type: y mandatory` ad deck-érzést oldalsó dia-indikátorral; mobilon natural long-scroll, grid-ek auto-stack. Framer Motion intézi a scroll-driven parallax, count-up, SVG path tracing animációkat; egy custom magnetikus kurzor desktop-only. Tartalom statikus TS objektumokban (`lib/content.ts`).

**Tech Stack:** Next.js 15 (App Router) · React 19 · TypeScript 5.6 · Tailwind CSS v4 · Framer Motion 11 · GSAP 3.12 · clsx · next/font (Outfit + JetBrains Mono).

**Forrás:** `e:/Website Biz/.design-import/medio-brain/project/Medio Brain.html` (eredeti deck, 2234 sor), `chat1.md` transcript (776 sor).

---

## Task 1: Projekt scaffolding + függőségek

**Files:**
- Create: `package.json` (Next.js generálta)
- Create: `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Scaffold a Next.js projekt**

Az `e:/Website Biz/MedioBrainPrezentacio/` mappa már létezik (docs/ ben van benne a spec). A `create-next-app` nem írja felül a `docs/` mappát, de ütközhet, ha nem üres a könyvtár. Ezért egy időleges almappába generálunk, majd átmozgatunk.

Run (PowerShell, az `e:/Website Biz/` mappából):
```powershell
cd "e:/Website Biz"
npx create-next-app@latest MedioBrainPrezentacio-init --typescript --tailwind --app --no-src-dir --eslint --import-alias "@/*" --use-npm
```

Várt prompt-válaszok: alapértelmezések, ha valami kérdez (Turbopack: igen).

Expected: új mappa `MedioBrainPrezentacio-init/` minden Next.js fájllal.

- [ ] **Step 2: Mozgasd át a generált fájlokat a végleges mappába**

Run (PowerShell):
```powershell
cd "e:/Website Biz"
Move-Item -Path "MedioBrainPrezentacio-init/*" -Destination "MedioBrainPrezentacio/" -Force
Move-Item -Path "MedioBrainPrezentacio-init/.*" -Destination "MedioBrainPrezentacio/" -Force -ErrorAction SilentlyContinue
Remove-Item "MedioBrainPrezentacio-init" -Recurse -Force
```

Expected: `e:/Website Biz/MedioBrainPrezentacio/` tartalmaz package.json-t, app/-ot, és megőrzi a docs/ mappát.

- [ ] **Step 3: Telepítsd a plusz függőségeket**

Run:
```powershell
cd "e:/Website Biz/MedioBrainPrezentacio"
npm install framer-motion gsap clsx
```

Expected: új sorok a `package.json` `dependencies`-ben.

- [ ] **Step 4: Verifikáció — dev server indul**

Run:
```powershell
cd "e:/Website Biz/MedioBrainPrezentacio"
npm run dev
```

Várt: `Local: http://localhost:3000` üzenet. Nyiss böngészőt, a default Next.js welcome látható. Állítsd le `Ctrl+C`-vel.

- [ ] **Step 5: Commit**

```powershell
cd "e:/Website Biz/MedioBrainPrezentacio"
git init
git add .
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 + framer-motion project"
```

---

## Task 2: Globális design tokenek és fonts

**Files:**
- Modify: `app/layout.tsx` (font setup)
- Modify: `app/globals.css` (CSS custom properties, light/dark token-rendszer)

- [ ] **Step 1: Cseréld le az `app/layout.tsx`-et next/font import-tal**

Cseréld le a teljes `app/layout.tsx` tartalmát:

```tsx
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Medio Brain — Architektúra",
  description:
    "Jelenleg lokális, GDPR-tudatos AI tudásbázis architektúra. Egyetlen bootstrap session alatt épült.",
  openGraph: {
    title: "Medio Brain — Architektúra",
    description:
      "Jelenleg lokális, GDPR-tudatos AI tudásbázis architektúra.",
    type: "website",
    locale: "hu_HU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Cseréld le az `app/globals.css`-t a teljes design-rendszerre**

Cseréld le a teljes tartalmat (a Tailwind v4 `@import "tailwindcss"` direktívával):

```css
@import "tailwindcss";

@theme {
  --color-blue: #00a8e1;
  --color-blue-dark: #0090c4;
  --color-blue-deep: #0078a8;
  --color-blue-tint: #edf6fb;
  --color-amber: #ff7849;
  --color-purple: #b7a8f0;
  --color-pink: #f0b8e0;
  --font-sans: var(--font-outfit), "Inter", system-ui, sans-serif;
  --font-mono: var(--font-mono), "JetBrains Mono", monospace;
}

:root {
  /* Brand */
  --blue: #00a8e1;
  --blue-dark: #0090c4;
  --blue-deep: #0078a8;
  --blue-soft: rgba(0, 168, 225, 0.08);
  --blue-tint: #edf6fb;
  --amber: #ff7849;
  --purple: #b7a8f0;
  --pink: #f0b8e0;

  /* Fluid type scale */
  --type-display: clamp(56px, 7.5vw, 144px);
  --type-title: clamp(40px, 4vw, 76px);
  --type-subtitle: clamp(22px, 2vw, 38px);
  --type-body: clamp(16px, 1.5vw, 28px);
  --type-small: clamp(14px, 1.25vw, 24px);
  --type-mono: clamp(14px, 1.25vw, 24px);
  --type-num: clamp(48px, 5vw, 92px);

  /* Fluid spacing */
  --pad-top: clamp(48px, 6vw, 110px);
  --pad-bottom: clamp(40px, 5vw, 80px);
  --pad-x: clamp(24px, 6vw, 110px);
  --gap-title: clamp(24px, 3vw, 48px);
  --gap-item: clamp(16px, 2vw, 24px);

  /* Light theme tokens */
  --bg: #ffffff;
  --bg-tint: linear-gradient(180deg, #f4fafd 0%, #ffffff 45%, #ecf5fa 100%);
  --bg-card: #ffffff;
  --bg-card-2: #f7fbfd;
  --ink: #0a1929;
  --ink-2: #1f3548;
  --muted: #5a6b7c;
  --muted-2: #8fa0b0;
  --border: rgba(10, 25, 41, 0.08);
  --border-strong: rgba(10, 25, 41, 0.14);
  --shadow-sm: 0 2px 12px rgba(10, 25, 41, 0.04);
  --shadow-md: 0 12px 36px rgba(10, 25, 41, 0.07);
  --shadow-lg: 0 20px 60px rgba(10, 25, 41, 0.1);
  --shadow-blue: 0 16px 48px rgba(0, 168, 225, 0.16);
}

[data-theme="dark"] {
  --bg: #0a1929;
  --bg-tint: radial-gradient(
    ellipse at 30% 0%,
    #14304b 0%,
    #0a1929 55%,
    #050f1a 100%
  );
  --bg-card: #14233a;
  --bg-card-2: #18293f;
  --ink: #ffffff;
  --ink-2: rgba(255, 255, 255, 0.85);
  --muted: rgba(255, 255, 255, 0.6);
  --muted-2: rgba(255, 255, 255, 0.4);
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.18);
  --shadow-sm: 0 2px 12px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 12px 36px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
  --shadow-blue: 0 16px 48px rgba(0, 168, 225, 0.25);
}

html,
body {
  margin: 0;
  padding: 0;
  background: #e8eef3;
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Desktop deck mode: scroll-snap */
@media (min-width: 1024px) {
  html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Verifikáció**

Run:
```powershell
npm run dev
```

Nyisd meg `http://localhost:3000`-t. A Next.js default oldal Outfit fontba van rendezve (látható: vékonyabb betűk a default Geistnél). Állítsd le.

- [ ] **Step 4: Commit**

```powershell
git add app/layout.tsx app/globals.css
git commit -m "feat: add design tokens, Outfit + JetBrains Mono fonts, dark theme support"
```

---

## Task 3: Tartalom adatfájl (lib/content.ts)

**Files:**
- Create: `lib/content.ts`

- [ ] **Step 1: Hozd létre a `lib/content.ts`-t az összes szöveggel**

Hozd létre a fájlt ezzel a tartalommal:

```typescript
export type SlideId =
  | "01-cover"
  | "02-stack"
  | "03-folders"
  | "04-flow"
  | "05-gpu"
  | "06-web"
  | "07-gdpr"
  | "08-dictionary"
  | "09-compare"
  | "10-timeline"
  | "11-features"
  | "12-future";

export type SlideMeta = {
  id: SlideId;
  num: string;
  total: string;
  tag: string;
  dark?: boolean;
};

export const SLIDES_META: SlideMeta[] = [
  { id: "01-cover", num: "01", total: "12", tag: "Bevezetés", dark: true },
  { id: "02-stack", num: "02", total: "12", tag: "Technológiai stack" },
  { id: "03-folders", num: "03", total: "12", tag: "Mappa architektúra" },
  { id: "04-flow", num: "04", total: "12", tag: "Workflow", dark: true },
  { id: "05-gpu", num: "05", total: "12", tag: "GPU pipeline" },
  { id: "06-web", num: "06", total: "12", tag: "Web ingeszt" },
  { id: "07-gdpr", num: "07", total: "12", tag: "GDPR-tudat" },
  { id: "08-dictionary", num: "08", total: "12", tag: "Céges szótár" },
  { id: "09-compare", num: "09", total: "12", tag: "Cloud vs lokális", dark: true },
  { id: "10-timeline", num: "10", total: "12", tag: "Bootstrap" },
  { id: "11-features", num: "11", total: "12", tag: "Képességek" },
  { id: "12-future", num: "12", total: "12", tag: "Roadmap", dark: true },
];

export const COVER = {
  eyebrow: "MEDIO MEDTECH · 2026",
  display1: "Medio",
  display2: "Brain",
  lead: "Jelenleg lokális, GDPR-tudatos AI tudásbázis architektúra",
  tagline:
    "Egyetlen bootstrap session alatt épült. Az asztalomon fut. A saját adatai felett rendelkezik.",
  orbiters: ["Obsidian", "Claude", "RTX 3090", "Trello", "Google Drive"],
  signoff: "Petrik Kristóf · Medio Delivery Expert · 2026",
};

export const STACK = {
  title: "A technológiai stack",
  subtitle: "Három réteg, mindegyik a maga feladatára optimalizálva.",
  columns: [
    {
      layer: "01 · Tudás-réteg",
      name: "Obsidian vault",
      body: "9 hierarchikus mappa, 200+ Markdown jegyzet, YAML frontmatter mindenütt.",
      stats: [
        { k: "9", v: "fő mappa" },
        { k: "200+", v: "jegyzet" },
      ],
      featured: false,
    },
    {
      layer: "02 · AI agy-réteg",
      name: "Claude Code",
      body: "Anthropic Claude Opus 4.7, 12 érvényesített szabály a mediobrain.md-ben, beszélgetés-vezérelt workflow.",
      stats: [
        { k: "12", v: "szabály" },
        { k: "1", v: "agent" },
      ],
      featured: false,
    },
    {
      layer: "03 · Compute-réteg",
      name: "NVIDIA RTX 3090",
      body: "Lokális CUDA inferencia, faster-whisper large-v3, semmilyen cloud API hívás hanghoz.",
      stats: [
        { k: "24 GB", v: "VRAM" },
        { k: "0", v: "cloud API" },
      ],
      featured: true,
    },
  ],
  supportRow: {
    label: "Támogató eszközök",
    items: ["ffmpeg", "Python 3.10", "Trello REST API", "Google Drive MCP", "Jina Reader"],
  },
};

export const FOLDERS = {
  title: "A struktúra mint memória",
  subtitle: "Kilenc fő mappa, egy központi brain, kanonikus útvonalak.",
  list: [
    { num: "00", path: "Inbox_Feldolgozando", count: "intake" },
    { num: "01", path: "Dokumentaciok", count: "általános" },
    { num: "02", path: "Folyamatok", count: "SOP-k" },
    { num: "03", path: "Tablazatok_CSV", count: "adat-táblák" },
    { num: "04", path: "Video_Atiratok", count: "átiratok" },
    { num: "05", path: "Web_Cikkek_Tudastar", count: "158 cikk" },
    { num: "06", path: "Kifejezesek_Jelentesek", count: "szótár" },
    { num: "07", path: "Intezmenyek", count: "66 intézmény" },
    { num: "99", path: "Rendszer_Scriptek", count: "11 script" },
  ],
  annotations: ["158 cikk", "80 Trello kártya", "49 feltöltőtába", "66 intézmény"],
};

export const FLOW = {
  title: "Drop · Sort · Learn",
  subtitle: "Egy fájl bedobása ötlépéses pipeline-on fut át.",
  steps: [
    {
      num: "01",
      verb: "DROP",
      body: "Fájl vagy URL kerül a 00_Inbox_Feldolgozando mappába, vagy URL paste a chatbe.",
      mono: "*.docx · *.pdf · *.mp4 · URL",
    },
    {
      num: "02",
      verb: "DETECT",
      body: "Claude beolvassa a mediobrain.md szabályokat, felismeri a fájltípust.",
      mono: "12 rule · pattern match",
    },
    {
      num: "03",
      verb: "PROCESS",
      body: "A megfelelő Python script fut: markitdown, web_ingest, video_ingest, trello_ingest.",
      mono: "11 ingest script",
    },
    {
      num: "04",
      verb: "STORE",
      body: "Output a kanonikus mappába YAML frontmatter-rel, GDPR-strippelve ahol szükséges.",
      mono: "+ frontmatter",
    },
    {
      num: "05",
      verb: "CROSS-LINK",
      body: "Intézmény _Index.md auto-regen, szótár bővül új kifejezésekkel.",
      mono: "auto-link · auto-glossary",
    },
  ],
  meta: {
    left: "Átlagos feldolgozási idő",
    right: "8 másodperc / dokumentum",
  },
};

export const GPU = {
  title: "Az orvos meetingje az irodában marad",
  subtitle: "Lokális CUDA pipeline, nulla cloud API hívás.",
  gpu: {
    label: "NVIDIA RTX 3090",
    specs: [
      { k: "VRAM", v: "24 GB" },
      { k: "Precision", v: "float16" },
      { k: "Backend", v: "CUDA" },
      { k: "Model", v: "whisper-l-v3" },
    ],
  },
  pipeline: [
    { tag: "INPUT", val: "meeting.mp4", sub: "MP4 audio" },
    { tag: "FFMPEG", val: "extract", sub: "16 kHz mono WAV", color: "amber" },
    { tag: "CUDA INFERENCE", val: "faster-whisper", sub: "large-v3", featured: true },
    { tag: "OUTPUT", val: "transcript.md", sub: "időbélyeges Markdown" },
  ],
  metrics: {
    big: "33 perc · 2,4 perc alatt",
    items: ["15-25× realtime", "5-7 GB VRAM peak", "0 külső API hívás"],
  },
  callout: "Az adat nem hagyja el a workstation-t. Nincs cloud API. Nem kell compliance review.",
};

export const WEB = {
  title: "Az internet olvasása, tisztán",
  subtitle: "Jina Reader proxy, csak a cikkszöveg jut a vault-ba.",
  flow: [
    { label: "URL", sub: "weboldal címe" },
    { label: "Jina Reader Proxy", sub: "r.jina.ai", mid: true },
    { label: "Tiszta Markdown", sub: "vault-ba mentve" },
  ],
  stats: [
    { num: "158", label: "Medio Akadémia cikk" },
    { num: "45", label: "mymedio.hu oldal" },
    { num: "10", label: "perces batch" },
  ],
  code: `url = "https://medio.hu/akademia/x"
response = requests.get(f"https://r.jina.ai/{url}")
markdown = response.text`,
  side: "Jina kiszedi a navigációt, hirdetéseket, scripteket. Csak a cikkszöveg jut el a vault-ba.",
};

export const GDPR = {
  title: "Amit tudunk anélkül, hogy tárolnánk",
  subtitle: "Strukturális tudat, automatikus placeholder-csere ingeszt során.",
  tableNote: "Feltöltőtábla mockup · 22 oszlop · 3 amber-kiemelt placeholder",
  columns: [
    { name: "intezmeny_neve", type: "szöveg", masked: false },
    { name: "orvos_neve", type: "szöveg", masked: false },
    { name: "orvos_eeszt_azonosito", type: "kód", masked: false },
    { name: "orvos_szig_szama", type: "ID", masked: true, placeholder: "[ID]" },
    { name: "ojote_username", type: "username", masked: false },
    { name: "orvos_email", type: "email", masked: true, placeholder: "[MAIL]" },
    { name: "orvos_telefon", type: "tel", masked: true, placeholder: "[TEL]" },
    { name: "szakteruletek", type: "lista", masked: false },
    { name: "ar_tartomany", type: "szám", masked: false },
  ],
  bullets: [
    "A rendszer TUDJA hol kellene strukturálisan lennie ezeknek az oszlopoknak.",
    "Az ingeszt során automatikusan placeholder-re cseréli a partneri adatokat.",
    "A Medio-belsős emailek (@mymedio.hu, @mediomedtech.com, @kardi-soft.hu whitelist) érintetlenek maradnak.",
    "Személyes adat soha nem jut el az AI prompt-kontextusába.",
  ],
  footer: "29 Medio munkatárs + 3 megbízható domain a whitelisten. Minden más: strippelve.",
};

export const DICTIONARY = {
  title: "A cég nyelvét beszélni",
  subtitle: "Glosszárium, auto-bővülő kontextus.",
  entries: [
    { short: "EESZT", long: "Elektronikus Egészségügyi Szolgáltatási Tér" },
    { short: "HIS", long: "Healthcare Information System" },
    { short: "MIS", long: "Management Information System" },
    { short: "NEAK", long: "Nemzeti Egészségbiztosítási Alapkezelő" },
    { short: "OKFŐ", long: "Országos Kórházi Főigazgatóság" },
    { short: "Kardi-Soft", long: "MediRex fejlesztő partner" },
    { short: "MediCall", long: "Medio 2017-es elődje" },
  ],
  side: "Amikor a Claude egy OJOTE-t említő Trello kártyát olvas, nem találgat. Először megnézi a definíciót.",
  footer: "Auto-bővíthető: 'Mentsd el ezt új kifejezésként' parancs a chatben.",
};

export const COMPARE = {
  title: "Adatvédelem, sebesség, költség. Mind a három.",
  subtitle: "Hat dimenzió, két oszlop. Egyértelmű döntési mátrix.",
  rows: [
    { dim: "Adat lokáció", cloud: "Vendor data center", local: "Workstation SSD" },
    { dim: "Sebesség (video átirat)", cloud: "Hálózat + API queue", local: "15-25× realtime" },
    { dim: "GDPR review", cloud: "Igen, vendor-specifikus", local: "Nem szükséges" },
    { dim: "Költség taskonként", cloud: "$0.01 - $1.00", local: "$0 (csak villany)" },
    { dim: "Audit nyomvonal", cloud: "Vendor logok", local: "Git + filesystem timestamps" },
    { dim: "Testreszabhatóság", cloud: "Per-feature kérelmek", local: "Python file módosítása" },
  ],
};

export const TIMELINE = {
  title: "Egyetlen session-ben bootstrap-elve",
  subtitle: "Tizenkét mérföldkő, egy hét aktív munka.",
  milestones: [
    "Mappa-struktúra létrehozása + mediobrain.md 5 alap szabállyal",
    "Web ingeszt (web_ingest.py) Jina Reader proxy-val",
    "Video pipeline (video_ingest.py) RTX 3090 + faster-whisper",
    "Trello JSON ingeszt (trello_ingest.py) + GDPR strip whitelist",
    "Céges szótár + csapat-jegyzék",
    "Excel feltöltőtábla processzor template detektálással",
    "GDPR Rule 10 kodifikálva: oszlop-pozíció tudat",
    "Trello REST API integráció Power-Up-on keresztül",
    "Google Drive MCP feltöltőtábla letöltéshez",
    "Cross-institution aggregáció + duplikált mappa merge",
    "SOP_Medirex_Onboarding írva egy kanonikus kártyából",
    "12 szabály a mediobrain.md-ben, feature-complete v1",
  ],
  stats: {
    big: "1 hét",
    label: "aktív munka",
    items: [
      "11 Python script",
      "0 külső dependency a pip-en túl",
      "0 cloud vendor",
    ],
  },
};

export const FEATURES = {
  title: "Pattern Recognition, Decision Support, Auto-Fill",
  subtitle: "Három képesség, három absztrakciós szinten.",
  cards: [
    {
      tag: "01 · Pattern Recognition",
      title: "Mintázat-felismerés",
      body: "Kérdezz: 'Mik a tipikus Belgyógyász vizsgálatok és ár-tartományok?' A Brain 70+ intézmény valós adatából válaszol.",
    },
    {
      tag: "02 · Decision Support",
      title: "Döntés-támogatás",
      body: "Új klinika onboardingja? A Brain javasol tipikus szolgáltatás-katalógust hasonló intézmények mintái alapján.",
    },
    {
      tag: "03 · Auto-Fill (tervezett)",
      title: "Auto-kitöltés",
      body: "Tervezett API: POST egy intézmény-profillal, vissza egy előre kitöltött, GDPR-biztonságos Excel feltöltőtábla template.",
    },
  ],
  arch: {
    label: "Tervezett API-architektúra",
    boxes: ["Szolgáltatások DB", "Orvosok DB", "Medikai lekérdezések DB", "FastAPI server", "JSON vagy Excel válasz"],
  },
  footer: "Nem egy halucináló chatbot. Egy ground truth-on alapuló tudásgráf.",
};

export const FUTURE = {
  title: "Tudástól a cselekvésig",
  subtitle: "Az emlékezéstől a végrehajtásig.",
  split: {
    left: { label: "MOST", body: "Manuális prompt, Claude futtat scriptet, eredmény." },
    right: { label: "TERVEZETT", body: "Ütemezett ágensek, auto-ingeszt, auto-merge, auto-riasztás." },
  },
  list: [
    { freq: "Heti", body: "Minden Trello RELEASED kártya leírás re-fetch, változások detektálása." },
    { freq: "Napi", body: "IN PROGRESS feltöltőtáblák partneri frissítések ellenőrzése." },
    { freq: "Igény szerint", body: "'Generálj Q3 cross-institution árazási riportot.'" },
    { freq: "Reaktív", body: "Új kártya RELEASED-be kerül, auto-trigger teljes ingeszt + index regen." },
  ],
  signoff: "Az emlékezéstől a végrehajtásig.",
  contact: "Készítette: Petrik Kristóf · Medio Delivery Expert · petrik.kristof@mymedio.hu",
};
```

- [ ] **Step 2: Verifikáció**

Run:
```powershell
npm run build
```

Expected: build sikeres, nincs TypeScript error. A `lib/content.ts` típus-tiszta.

- [ ] **Step 3: Commit**

```powershell
git add lib/content.ts
git commit -m "feat: add static content data for all 12 slides"
```

---

## Task 4: Hooks (useDeckMode, useInViewOnce, useCountUp)

**Files:**
- Create: `hooks/useDeckMode.ts`
- Create: `hooks/useInViewOnce.ts`
- Create: `hooks/useCountUp.ts`

- [ ] **Step 1: Hozd létre a `hooks/useDeckMode.ts`-t**

```typescript
"use client";
import { useEffect, useState } from "react";

export function useDeckMode(): boolean {
  const [isDeck, setIsDeck] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDeck(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDeck;
}
```

- [ ] **Step 2: Hozd létre a `hooks/useInViewOnce.ts`-t**

```typescript
"use client";
import { useEffect, useRef, useState } from "react";

export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.25,
): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}
```

- [ ] **Step 3: Hozd létre a `hooks/useCountUp.ts`-t**

```typescript
"use client";
import { useEffect, useState } from "react";

export function useCountUp(
  target: number,
  durationMs: number,
  active: boolean,
  respectReducedMotion = true,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (
      respectReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, active, respectReducedMotion]);

  return value;
}
```

- [ ] **Step 4: Verifikáció**

Run:
```powershell
npm run build
```

Expected: TypeScript build sikeres.

- [ ] **Step 5: Commit**

```powershell
git add hooks/
git commit -m "feat: add useDeckMode, useInViewOnce, useCountUp hooks"
```

---

## Task 5: Primitív komponensek (Card, Pill, Callout, Hairline, ButtonPill, StatNumber)

**Files:**
- Create: `components/primitives/Card.tsx`
- Create: `components/primitives/Pill.tsx`
- Create: `components/primitives/Callout.tsx`
- Create: `components/primitives/Hairline.tsx`
- Create: `components/primitives/ButtonPill.tsx`
- Create: `components/primitives/StatNumber.tsx`
- Create: `components/primitives/CodeBlock.tsx`

- [ ] **Step 1: Card.tsx**

```tsx
import clsx from "clsx";
import type { ReactNode } from "react";

export function Card({
  children,
  dense = false,
  featured = false,
  className,
}: {
  children: ReactNode;
  dense?: boolean;
  featured?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden border",
        dense ? "rounded-3xl p-8" : "rounded-[28px] p-10",
        className,
      )}
      style={{
        background: featured
          ? "linear-gradient(180deg, rgba(0,168,225,0.06), var(--bg-card) 50%)"
          : "var(--bg-card)",
        borderColor: featured ? "rgba(0,168,225,0.30)" : "var(--border)",
        boxShadow: featured ? "var(--shadow-blue)" : "var(--shadow-md)",
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Pill.tsx**

```tsx
import clsx from "clsx";
import type { ReactNode } from "react";

export function Pill({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "amber" | "tag";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2.5 rounded-full border",
        variant === "tag" ? "px-6 py-3 text-sm uppercase tracking-widest" : "px-5 py-2.5",
        className,
      )}
      style={{
        background: variant === "tag" ? "var(--blue-tint)" : "var(--bg-card)",
        borderColor: variant === "tag" ? "rgba(0,168,225,0.18)" : "var(--border)",
        color: variant === "tag" ? "var(--blue-dark)" : "var(--ink-2)",
        boxShadow: variant === "tag" ? "none" : "var(--shadow-sm)",
        fontSize: variant === "tag" ? "var(--type-small)" : "var(--type-small)",
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: variant === "amber" ? "var(--amber)" : "var(--blue)",
        }}
      />
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Callout.tsx**

```tsx
import clsx from "clsx";
import type { ReactNode } from "react";

export function Callout({
  children,
  variant = "blue",
  className,
}: {
  children: ReactNode;
  variant?: "blue" | "amber";
  className?: string;
}) {
  const isAmber = variant === "amber";
  return (
    <div
      className={clsx("rounded-3xl border p-8", className)}
      style={{
        borderColor: isAmber ? "rgba(255,120,73,0.4)" : "rgba(0,168,225,0.35)",
        background: isAmber
          ? "linear-gradient(135deg, rgba(255,120,73,0.08), var(--bg-card))"
          : "linear-gradient(135deg, rgba(0,168,225,0.08), var(--bg-card))",
        color: "var(--ink)",
        fontSize: "var(--type-body)",
        lineHeight: 1.35,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Hairline.tsx**

```tsx
export function Hairline({ full = false }: { full?: boolean }) {
  if (full) {
    return (
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, var(--border-strong), transparent)",
        }}
      />
    );
  }
  return (
    <div
      className="h-0.5 w-14 rounded-sm"
      style={{ background: "var(--blue)" }}
    />
  );
}
```

- [ ] **Step 5: ButtonPill.tsx**

```tsx
import type { ReactNode } from "react";

export function ButtonPill({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  const className =
    "inline-flex items-center gap-3.5 rounded-full px-8 py-4 text-white font-medium transition-transform hover:scale-105";
  const style = {
    background: "var(--blue)",
    boxShadow: "var(--shadow-blue)",
    fontSize: "var(--type-small)",
  };
  if (href) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className} style={style}>
      {children}
    </button>
  );
}
```

- [ ] **Step 6: StatNumber.tsx**

```tsx
"use client";
import { useCountUp } from "@/hooks/useCountUp";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export function StatNumber({
  value,
  suffix = "",
  label,
  size = "default",
}: {
  value: number;
  suffix?: string;
  label?: string;
  size?: "default" | "large";
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3);
  const current = useCountUp(value, 1500, inView);
  return (
    <div ref={ref}>
      <div
        style={{
          fontSize: size === "large" ? "var(--type-num)" : "var(--type-title)",
          color: "var(--blue)",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          fontFamily: "var(--font-sans)",
        }}
      >
        {current.toLocaleString("hu-HU")}
        {suffix}
      </div>
      {label ? (
        <div
          style={{
            fontSize: "var(--type-small)",
            color: "var(--ink-2)",
            marginTop: "12px",
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 7: CodeBlock.tsx**

```tsx
export function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="overflow-hidden rounded-2xl border"
      style={{
        background: "#0A1929",
        borderColor: "rgba(255,255,255,0.06)",
        padding: "28px 32px",
        margin: 0,
        color: "rgba(255,255,255,0.85)",
        lineHeight: 1.6,
        fontSize: "var(--type-mono)",
        fontFamily: "var(--font-mono)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <code>{code}</code>
    </pre>
  );
}
```

- [ ] **Step 8: Verifikáció**

Run:
```powershell
npm run build
```

Expected: sikeres build, nincs lint/type error.

- [ ] **Step 9: Commit**

```powershell
git add components/primitives/
git commit -m "feat: add primitive components (Card, Pill, Callout, StatNumber, CodeBlock)"
```

---

## Task 6: Layout komponensek (SlideSection, SlideMeta, SlideIndicator, DeckShell)

**Files:**
- Create: `components/layout/SlideSection.tsx`
- Create: `components/layout/SlideMeta.tsx`
- Create: `components/layout/SlideIndicator.tsx`
- Create: `components/layout/DeckShell.tsx`
- Create: `components/layout/ParallaxBlob.tsx`

- [ ] **Step 1: ParallaxBlob.tsx**

```tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxBlob({
  position,
  color,
  size = 720,
  intensity = 1,
}: {
  position: "top-right" | "bottom-left";
  color: string;
  size?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-50 * intensity, 80 * intensity],
  );
  const top = position === "top-right" ? -240 : "auto";
  const bottom = position === "bottom-left" ? -300 : "auto";
  const left = position === "bottom-left" ? -200 : "auto";
  const right = position === "top-right" ? -200 : "auto";

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        top,
        right,
        bottom,
        left,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        pointerEvents: "none",
        zIndex: 0,
        y,
      }}
    />
  );
}
```

- [ ] **Step 2: SlideMeta.tsx**

```tsx
export function SlideMeta({ num, total }: { num: string; total: string }) {
  return (
    <div
      className="absolute z-30"
      style={{
        top: 48,
        right: "var(--pad-x)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--type-small)",
        color: "var(--muted-2)",
        letterSpacing: "0.04em",
        fontWeight: 400,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "var(--blue)", fontWeight: 500 }}>{num}</span> /{" "}
      {total}
    </div>
  );
}
```

- [ ] **Step 3: SlideIndicator.tsx**

```tsx
"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SLIDES_META } from "@/lib/content";

export function SlideIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = SLIDES_META.map((s) =>
      document.getElementById(`slide-${s.id}`),
    ).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: [0.5] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Dia navigáció"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {SLIDES_META.map((s, i) => (
        <a
          key={s.id}
          href={`#slide-${s.id}`}
          aria-label={`Dia ${s.num}: ${s.tag}`}
          className={clsx(
            "block rounded-full transition-all duration-300",
            i === active ? "h-8 w-2.5" : "h-2.5 w-2.5",
          )}
          style={{
            background:
              i === active ? "var(--blue)" : "rgba(10, 25, 41, 0.25)",
            boxShadow:
              i === active ? "0 0 12px rgba(0,168,225,0.6)" : "none",
          }}
        />
      ))}
    </nav>
  );
}
```

- [ ] **Step 4: SlideSection.tsx**

```tsx
"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SlideMeta as SlideMetaType } from "@/lib/content";
import { ParallaxBlob } from "./ParallaxBlob";
import { SlideMeta } from "./SlideMeta";

export function SlideSection({
  meta,
  children,
  className,
}: {
  meta: SlideMetaType;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={`slide-${meta.id}`}
      data-theme={meta.dark ? "dark" : undefined}
      className={clsx(
        "relative flex w-full snap-start overflow-hidden",
        "min-h-screen lg:h-screen",
        className,
      )}
      style={{
        background: "var(--bg-tint)",
        color: "var(--ink)",
        scrollSnapAlign: "start",
      }}
    >
      <ParallaxBlob
        position="top-right"
        color={meta.dark ? "rgba(0,168,225,0.18)" : "rgba(0,168,225,0.10)"}
      />
      <ParallaxBlob
        position="bottom-left"
        color={meta.dark ? "rgba(183,168,240,0.12)" : "rgba(183,168,240,0.10)"}
        size={800}
      />

      <span
        className="absolute z-30 inline-flex items-center gap-3 rounded-full border uppercase tracking-widest"
        style={{
          top: 40,
          left: "var(--pad-x)",
          padding: "10px 22px",
          background: meta.dark ? "rgba(0,168,225,0.12)" : "var(--blue-tint)",
          borderColor: meta.dark
            ? "rgba(0,168,225,0.3)"
            : "rgba(0,168,225,0.18)",
          color: meta.dark ? "var(--blue)" : "var(--blue-dark)",
          fontSize: "var(--type-small)",
          fontWeight: 500,
        }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "var(--blue)" }}
        />
        {meta.tag}
      </span>

      <SlideMeta num={meta.num} total={meta.total} />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col"
        style={{
          padding:
            "var(--pad-top) var(--pad-x) var(--pad-bottom) var(--pad-x)",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 5: DeckShell.tsx**

```tsx
import type { ReactNode } from "react";
import { SlideIndicator } from "./SlideIndicator";

export function DeckShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative">
      <SlideIndicator />
      {children}
    </main>
  );
}
```

- [ ] **Step 6: Verifikáció**

Run:
```powershell
npm run build
```

Expected: TypeScript build sikeres.

- [ ] **Step 7: Commit**

```powershell
git add components/layout/
git commit -m "feat: add layout components (DeckShell, SlideSection, SlideIndicator, ParallaxBlob)"
```

---

## Task 7: Magnetikus kurzor (MagneticCursor)

**Files:**
- Create: `components/primitives/MagneticCursor.tsx`

- [ ] **Step 1: MagneticCursor.tsx**

```tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(supportsHover && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("a, button, [role='button'], [data-magnetic]")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full mix-blend-difference"
      style={{
        translateX: springX,
        translateY: springY,
        x: "-50%",
        y: "-50%",
        width: hovering ? 56 : 14,
        height: hovering ? 56 : 14,
        background: hovering
          ? "rgba(0,168,225,0.85)"
          : "rgba(0,168,225,0.95)",
        transition: "width 200ms ease, height 200ms ease, background 200ms ease",
      }}
    />
  );
}
```

- [ ] **Step 2: Verifikáció**

Run:
```powershell
npm run build
```

Expected: sikeres.

- [ ] **Step 3: Commit**

```powershell
git add components/primitives/MagneticCursor.tsx
git commit -m "feat: add MagneticCursor primitive (hover-supporting devices only)"
```

---

## Task 8: SVG dekoratív komponensek (BrainNetwork, NetmapDiagram, Gpu3D)

**Files:**
- Create: `components/svg/BrainNetwork.tsx`
- Create: `components/svg/NetmapDiagram.tsx`
- Create: `components/svg/Gpu3D.tsx`

- [ ] **Step 1: BrainNetwork.tsx**

```tsx
"use client";
import { motion } from "framer-motion";

export function BrainNetwork() {
  return (
    <svg
      viewBox="0 0 640 640"
      fill="none"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="brain-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,168,225,0.35)" />
          <stop offset="100%" stopColor="rgba(0,168,225,0)" />
        </radialGradient>
      </defs>
      <circle cx="320" cy="320" r="240" fill="url(#brain-glow)" />
      <motion.circle
        cx="320"
        cy="320"
        r="160"
        stroke="rgba(0,168,225,0.45)"
        strokeWidth="1.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="320"
        cy="320"
        r="110"
        stroke="rgba(0,168,225,0.7)"
        strokeWidth="1.5"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <circle cx="320" cy="320" r="60" fill="rgba(0,168,225,0.15)" stroke="var(--blue)" strokeWidth="2" />
      {[
        [320, 100],
        [540, 280],
        [460, 520],
        [180, 520],
        [100, 280],
      ].map(([cx, cy], i) => (
        <motion.g key={i}>
          <line
            x1="320"
            y1="320"
            x2={cx}
            y2={cy}
            stroke="rgba(0,168,225,0.35)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r="14"
            fill="var(--blue)"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        </motion.g>
      ))}
    </svg>
  );
}
```

- [ ] **Step 2: NetmapDiagram.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { FOLDERS } from "@/lib/content";

const positions = [
  { x: 50, y: 14 },
  { x: 82, y: 28 },
  { x: 92, y: 56 },
  { x: 80, y: 82 },
  { x: 50, y: 92 },
  { x: 20, y: 82 },
  { x: 8, y: 56 },
  { x: 18, y: 28 },
  { x: 50, y: 50 },
];

export function NetmapDiagram() {
  return (
    <div className="relative aspect-[640/720] w-full max-w-[720px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 720"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {positions.slice(0, 8).map((p, i) => (
          <motion.line
            key={i}
            x1="320"
            y1="360"
            x2={(p.x / 100) * 640}
            y2={(p.y / 100) * 720}
            stroke="rgba(0,168,225,0.30)"
            strokeWidth="1.2"
            strokeDasharray="500"
            initial={{ strokeDashoffset: 500 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
          />
        ))}
      </svg>

      {FOLDERS.list.map((folder, i) => {
        const p = positions[i];
        const isCenter = i === FOLDERS.list.length - 1;
        return (
          <motion.div
            key={folder.path}
            className="absolute flex flex-col items-center justify-center rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
              width: isCenter ? 188 : 132,
              height: isCenter ? 188 : 132,
              background: isCenter
                ? "linear-gradient(135deg, var(--blue), var(--blue-deep))"
                : "var(--bg-card)",
              border: isCenter
                ? "none"
                : "1.5px solid rgba(0,168,225,0.35)",
              color: isCenter ? "#FFFFFF" : "var(--ink)",
              boxShadow: "var(--shadow-md)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.4,
              delay: isCenter ? 0.9 : i * 0.08,
              ease: "backOut",
            }}
          >
            {isCenter ? (
              <>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 38,
                    fontWeight: 400,
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  Brain
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginTop: 6,
                  }}
                >
                  vault root
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "var(--blue)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                  }}
                >
                  {folder.num}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "center",
                    padding: "0 8px",
                  }}
                >
                  {folder.path.split("_")[0].slice(0, 10)}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Gpu3D.tsx**

```tsx
"use client";
import { motion } from "framer-motion";

export function Gpu3D() {
  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "2 / 1",
        perspective: "1200px",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #14304B 0%, #050F1A 60%, #0A1929 100%)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)",
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateY: -25, rotateX: 8, opacity: 0 }}
        whileInView={{ rotateY: -15, rotateX: 6, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Fan circles */}
        {[0.25, 0.75].map((cx, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${cx * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "32%",
              aspectRatio: "1",
              border: "2px solid rgba(0,168,225,0.35)",
              background:
                "radial-gradient(circle, rgba(0,168,225,0.18) 0%, rgba(0,0,0,0) 60%)",
            }}
          >
            <motion.div
              className="absolute inset-3 rounded-full border"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: "45%",
                    height: 2,
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.25), transparent)",
                    transform: `rotate(${deg}deg)`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        ))}
        {/* Top edge highlight */}
        <div
          className="absolute left-0 right-0 top-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,168,225,0.6), transparent)",
          }}
        />
        {/* Label */}
        <div
          className="absolute bottom-3 left-4 font-mono"
          style={{
            fontSize: 14,
            color: "rgba(0,168,225,0.7)",
            letterSpacing: "0.2em",
          }}
        >
          RTX 3090 · 24GB
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 4: Verifikáció**

Run:
```powershell
npm run build
```

- [ ] **Step 5: Commit**

```powershell
git add components/svg/
git commit -m "feat: add SVG components (BrainNetwork, NetmapDiagram, Gpu3D)"
```

---

## Task 9: Slide 01 — Cover

**Files:**
- Create: `components/slides/Slide01Cover.tsx`

- [ ] **Step 1: Slide01Cover.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { COVER, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { BrainNetwork } from "@/components/svg/BrainNetwork";

export function Slide01Cover() {
  const meta = SLIDES_META[0];
  return (
    <SlideSection meta={meta}>
      <div className="grid h-full w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div
            className="mb-10 inline-flex items-center gap-3 rounded-full border px-6 py-3 uppercase"
            style={{
              background: "rgba(0,168,225,0.14)",
              borderColor: "rgba(0,168,225,0.30)",
              color: "var(--blue)",
              fontSize: "var(--type-small)",
              fontWeight: 500,
              letterSpacing: "0.10em",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--blue)" }}
            />
            {COVER.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "var(--type-display)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            <span style={{ display: "block", color: "var(--ink)" }}>
              {COVER.display1}
            </span>
            <span
              style={{
                display: "block",
                color: "var(--blue)",
                fontWeight: 400,
              }}
            >
              {COVER.display2}
            </span>
          </h1>
          <p
            className="mt-12"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-subtitle)",
              fontWeight: 300,
              color: "var(--ink-2)",
              lineHeight: 1.3,
              maxWidth: 740,
            }}
          >
            {COVER.lead}
          </p>
          <div
            className="mt-9 border-t pt-7"
            style={{
              borderColor: "var(--border-strong)",
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              maxWidth: 740,
              lineHeight: 1.5,
            }}
          >
            {COVER.tagline}
          </div>
          <div
            className="mt-10"
            style={{
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.06em",
            }}
          >
            {COVER.signoff}
          </div>
        </div>

        <div className="relative flex h-full items-center justify-center">
          <div className="relative aspect-square w-full max-w-[640px]">
            <BrainNetwork />
            {COVER.orbiters.map((label, i) => {
              const positions = [
                { top: "8%", left: "0%" },
                { top: "22%", right: "0%" },
                { bottom: "30%", left: "-6%" },
                { bottom: "12%", right: "4%" },
                { top: "50%", right: "-12%", transform: "translateY(-50%)" },
              ];
              const p = positions[i];
              return (
                <motion.div
                  key={label}
                  className="absolute inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3"
                  data-magnetic
                  style={{
                    ...p,
                    background: meta.dark
                      ? "rgba(255,255,255,0.06)"
                      : "var(--bg-card)",
                    backdropFilter: "blur(10px)",
                    borderColor: "var(--border-strong)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--type-small)",
                    color: meta.dark ? "#FFFFFF" : "var(--ink)",
                    fontWeight: 500,
                    boxShadow: "var(--shadow-md)",
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: "var(--blue)" }}
                  />
                  {label}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 2: Verifikáció**

Run:
```powershell
npm run build
```

- [ ] **Step 3: Commit**

```powershell
git add components/slides/Slide01Cover.tsx
git commit -m "feat: add Slide 01 Cover with brain network and orbiter pills"
```

---

## Task 10: Slide 02 — Stack és Slide 03 — Folders

**Files:**
- Create: `components/slides/Slide02Stack.tsx`
- Create: `components/slides/Slide03Folders.tsx`

- [ ] **Step 1: Slide02Stack.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { STACK, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { Card } from "@/components/primitives/Card";

export function Slide02Stack() {
  return (
    <SlideSection meta={SLIDES_META[1]}>
      <div className="flex h-full flex-col gap-9">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {STACK.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
              lineHeight: 1.3,
            }}
          >
            {STACK.subtitle}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
          {STACK.columns.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <Card featured={col.featured} className="h-full">
                <div className="flex h-full flex-col gap-6">
                  <div
                    style={{
                      color: "var(--blue)",
                      letterSpacing: "0.12em",
                      fontSize: "var(--type-small)",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {col.layer}
                  </div>
                  <div
                    style={{
                      fontSize: "calc(var(--type-title) * 0.6)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {col.name}
                  </div>
                  <p
                    style={{
                      fontSize: "var(--type-body)",
                      color: "var(--ink-2)",
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {col.body}
                  </p>
                  <div
                    className="mt-auto flex flex-col gap-3 pt-2"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--type-small)",
                      color: "var(--muted)",
                    }}
                  >
                    {col.stats.map((s) => (
                      <div key={s.k} className="flex items-baseline gap-3.5">
                        <span
                          style={{
                            color: "var(--blue)",
                            fontWeight: 500,
                            minWidth: 90,
                          }}
                        >
                          {s.k}
                        </span>
                        <span>{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center gap-4 rounded-full border px-7 py-5"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            style={{
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginRight: 12,
            }}
          >
            {STACK.supportRow.label}
          </span>
          {STACK.supportRow.items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: "var(--blue-tint)",
                color: "var(--blue-dark)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-small)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 2: Slide03Folders.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { FOLDERS, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { NetmapDiagram } from "@/components/svg/NetmapDiagram";

export function Slide03Folders() {
  return (
    <SlideSection meta={SLIDES_META[2]}>
      <div className="grid h-full grid-cols-1 gap-12 lg:grid-cols-[0.55fr_0.45fr]">
        <div className="flex flex-col gap-7">
          <header>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--type-title)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {FOLDERS.title}
            </h2>
            <p
              className="mt-3"
              style={{
                fontSize: "var(--type-subtitle)",
                color: "var(--muted)",
                fontWeight: 300,
              }}
            >
              {FOLDERS.subtitle}
            </p>
          </header>

          <div className="flex flex-col gap-2.5">
            {FOLDERS.list.map((f, i) => (
              <motion.div
                key={f.path}
                className="grid items-center gap-4 rounded-2xl border px-6 py-4"
                style={{
                  gridTemplateColumns: "56px 1fr auto",
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--type-small)",
                  boxShadow: "var(--shadow-sm)",
                }}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <span
                  style={{
                    color: "var(--blue)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                  }}
                >
                  {f.num}
                </span>
                <span
                  style={{
                    color: "var(--ink)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {f.path}
                </span>
                <span style={{ color: "var(--muted)" }}>{f.count}</span>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-2 flex flex-wrap gap-3 text-sm"
            style={{ color: "var(--muted)" }}
          >
            {FOLDERS.annotations.map((a) => (
              <span
                key={a}
                className="rounded-full border px-4 py-1.5"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-card)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-small)",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <NetmapDiagram />
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 3: Verifikáció**

Run:
```powershell
npm run build
```

- [ ] **Step 4: Commit**

```powershell
git add components/slides/Slide02Stack.tsx components/slides/Slide03Folders.tsx
git commit -m "feat: add Slide 02 (Stack) and Slide 03 (Folders)"
```

---

## Task 11: Slide 04 — Drop Sort Learn

**Files:**
- Create: `components/slides/Slide04Flow.tsx`

- [ ] **Step 1: Slide04Flow.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { FLOW, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide04Flow() {
  return (
    <SlideSection meta={SLIDES_META[3]}>
      <div className="flex h-full flex-col gap-12">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {FLOW.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {FLOW.subtitle}
          </p>
        </header>

        <div className="relative grid flex-1 grid-cols-1 items-stretch gap-4 md:grid-cols-5 md:gap-3">
          {/* Connector line (desktop only) */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 md:block"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="var(--blue)"
              strokeWidth="1.5"
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>

          {FLOW.steps.map((step, i) => (
            <motion.div
              key={step.verb}
              className="relative flex flex-col gap-4 rounded-3xl border p-7"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                style={{
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  fontSize: "var(--type-small)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "calc(var(--type-title) * 0.55)",
                  fontWeight: 400,
                  color: "var(--blue)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                {step.verb}
              </div>
              <p
                style={{
                  fontSize: "var(--type-body)",
                  color: "var(--ink-2)",
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                {step.body}
              </p>
              <div
                className="mt-auto border-t pt-4"
                style={{
                  borderColor: "var(--border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-small)",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                {step.mono}
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 rounded-full border px-8 py-5"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            style={{
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "var(--type-small)",
              fontWeight: 500,
            }}
          >
            {FLOW.meta.left}
          </span>
          <span
            style={{
              color: "var(--blue)",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "var(--type-body)",
            }}
          >
            {FLOW.meta.right}
          </span>
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 2: Verifikáció**

Run:
```powershell
npm run build
```

- [ ] **Step 3: Commit**

```powershell
git add components/slides/Slide04Flow.tsx
git commit -m "feat: add Slide 04 Drop Sort Learn with path-tracing connector"
```

---

## Task 12: Slide 05 — GPU pipeline

**Files:**
- Create: `components/slides/Slide05Gpu.tsx`

- [ ] **Step 1: Slide05Gpu.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { GPU, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { Gpu3D } from "@/components/svg/Gpu3D";
import { Callout } from "@/components/primitives/Callout";

export function Slide05Gpu() {
  return (
    <SlideSection meta={SLIDES_META[4]}>
      <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-[0.45fr_0.55fr]">
        <div className="flex flex-col gap-7">
          <header>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--type-title)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {GPU.title}
            </h2>
            <p
              className="mt-3"
              style={{
                fontSize: "var(--type-subtitle)",
                color: "var(--muted)",
                fontWeight: 300,
              }}
            >
              {GPU.subtitle}
            </p>
          </header>
          <div
            className="rounded-3xl border p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,168,225,0.06), var(--bg-card) 60%)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Gpu3D />
            <div className="mt-5 grid grid-cols-2 gap-3.5">
              {GPU.gpu.specs.map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border px-4 py-3.5"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontSize: 13,
                      fontWeight: 500,
                      marginBottom: 4,
                    }}
                  >
                    {s.k}
                  </div>
                  <div
                    style={{
                      color: "var(--blue)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--type-small)",
                      fontWeight: 500,
                    }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Callout>{GPU.callout}</Callout>
        </div>

        <div className="flex flex-col gap-6">
          {GPU.pipeline.map((box, i) => {
            const isAmber = box.color === "amber";
            const isFeatured = box.featured;
            return (
              <div key={box.tag} className="flex flex-col items-center">
                <motion.div
                  className="w-full rounded-2xl border px-6 py-5"
                  style={{
                    background: isFeatured
                      ? "linear-gradient(135deg, rgba(0,168,225,0.10), var(--bg-card))"
                      : "var(--bg-card)",
                    borderColor: isFeatured
                      ? "var(--blue)"
                      : isAmber
                        ? "rgba(255,120,73,0.4)"
                        : "var(--border)",
                    boxShadow: isFeatured
                      ? "var(--shadow-blue)"
                      : "var(--shadow-sm)",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      letterSpacing: "0.08em",
                      color: isAmber
                        ? "var(--amber)"
                        : isFeatured
                          ? "var(--blue)"
                          : "var(--muted)",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {box.tag}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--type-body)",
                      color: "var(--ink)",
                      marginTop: 6,
                    }}
                  >
                    {box.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--type-small)",
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    {box.sub}
                  </div>
                </motion.div>
                {i < GPU.pipeline.length - 1 && (
                  <motion.div
                    className="my-2 flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: i * 0.15 + 0.2 }}
                  >
                    <svg width="24" height="36" viewBox="0 0 24 36" aria-hidden>
                      <line
                        x1="12"
                        y1="0"
                        x2="12"
                        y2="28"
                        stroke="var(--blue)"
                        strokeWidth="2"
                      />
                      <polyline
                        points="6,22 12,32 18,22"
                        fill="none"
                        stroke="var(--blue)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            );
          })}
          <div
            className="rounded-2xl border px-6 py-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(183,168,240,0.10), rgba(0,168,225,0.06))",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                fontSize: "calc(var(--type-title) * 0.45)",
                color: "var(--blue)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                marginBottom: 8,
              }}
            >
              {GPU.metrics.big}
            </div>
            <ul
              className="flex flex-col gap-1"
              style={{
                color: "var(--ink-2)",
                fontSize: "var(--type-small)",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {GPU.metrics.items.map((m) => (
                <li key={m}>· {m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 2: Verifikáció**

Run:
```powershell
npm run build
```

- [ ] **Step 3: Commit**

```powershell
git add components/slides/Slide05Gpu.tsx
git commit -m "feat: add Slide 05 GPU pipeline with 3D RTX card and arrow flow"
```

---

## Task 13: Slide 06 (Web) és Slide 07 (GDPR)

**Files:**
- Create: `components/slides/Slide06Web.tsx`
- Create: `components/slides/Slide07Gdpr.tsx`

- [ ] **Step 1: Slide06Web.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { WEB, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { CodeBlock } from "@/components/primitives/CodeBlock";
import { StatNumber } from "@/components/primitives/StatNumber";

export function Slide06Web() {
  return (
    <SlideSection meta={SLIDES_META[5]}>
      <div className="flex h-full flex-col gap-9">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {WEB.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {WEB.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {WEB.flow.map((box, i) => (
            <div key={box.label} className="contents">
              <motion.div
                className="rounded-2xl border p-7 text-center"
                style={{
                  background: box.mid
                    ? "linear-gradient(135deg, rgba(0,168,225,0.08), var(--bg-card))"
                    : "var(--bg-card)",
                  borderColor: box.mid ? "var(--blue)" : "var(--border)",
                  boxShadow: box.mid ? "var(--shadow-blue)" : "var(--shadow-md)",
                  minHeight: 160,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 8,
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <div
                  style={{
                    fontSize: "var(--type-subtitle)",
                    color: box.mid ? "var(--blue)" : "var(--ink)",
                    fontWeight: 400,
                  }}
                >
                  {box.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-small)",
                    color: "var(--muted)",
                  }}
                >
                  {box.sub}
                </div>
              </motion.div>
              {i < WEB.flow.length - 1 && (
                <div
                  className="hidden items-center justify-center md:flex"
                  style={{ color: "var(--blue)", fontSize: 28 }}
                  aria-hidden
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {WEB.stats.map((s) => (
            <div key={s.label}>
              <StatNumber value={parseInt(s.num)} label={s.label} size="large" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <CodeBlock code={WEB.code} />
          <div
            className="rounded-2xl border p-6"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              color: "var(--ink-2)",
              fontSize: "var(--type-small)",
              lineHeight: 1.5,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {WEB.side}
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 2: Slide07Gdpr.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { GDPR, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide07Gdpr() {
  return (
    <SlideSection meta={SLIDES_META[6]}>
      <div className="flex h-full flex-col gap-8">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {GDPR.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {GDPR.subtitle}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="overflow-hidden rounded-3xl border"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div
              className="border-b px-6 py-4"
              style={{
                borderColor: "var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-small)",
                color: "var(--muted)",
              }}
            >
              {GDPR.tableNote}
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {GDPR.columns.map((col, i) => (
                <motion.div
                  key={col.name}
                  className="grid items-center gap-4 px-6 py-3.5"
                  style={{
                    gridTemplateColumns: "1.5fr 0.8fr 1fr",
                    background: col.masked
                      ? "rgba(255,120,73,0.06)"
                      : "transparent",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-small)",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <span
                    style={{
                      color: col.masked ? "var(--amber)" : "var(--ink)",
                      fontWeight: col.masked ? 500 : 400,
                    }}
                  >
                    {col.name}
                  </span>
                  <span style={{ color: "var(--muted)" }}>{col.type}</span>
                  <span
                    style={{
                      color: col.masked ? "var(--amber)" : "var(--muted)",
                      fontWeight: col.masked ? 500 : 400,
                    }}
                  >
                    {col.placeholder ?? "—"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <ul
            className="flex flex-col gap-4"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "var(--type-body)",
              color: "var(--ink-2)",
              lineHeight: 1.45,
            }}
          >
            {GDPR.bullets.map((b, i) => (
              <motion.li
                key={b}
                className="flex gap-4"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <span
                  className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--blue)" }}
                />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-3xl border p-6"
          style={{
            borderColor: "rgba(255,120,73,0.4)",
            background:
              "linear-gradient(135deg, rgba(255,120,73,0.08), var(--bg-card))",
            fontSize: "var(--type-body)",
            color: "var(--ink)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {GDPR.footer}
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 3: Verifikáció**

Run:
```powershell
npm run build
```

- [ ] **Step 4: Commit**

```powershell
git add components/slides/Slide06Web.tsx components/slides/Slide07Gdpr.tsx
git commit -m "feat: add Slide 06 (Web ingest) and Slide 07 (GDPR table)"
```

---

## Task 14: Slide 08 (Dictionary) és Slide 09 (Compare)

**Files:**
- Create: `components/slides/Slide08Dictionary.tsx`
- Create: `components/slides/Slide09Compare.tsx`

- [ ] **Step 1: Slide08Dictionary.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { DICTIONARY, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide08Dictionary() {
  return (
    <SlideSection meta={SLIDES_META[7]}>
      <div className="flex h-full flex-col gap-9">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {DICTIONARY.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {DICTIONARY.subtitle}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {DICTIONARY.entries.map((entry, i) => (
              <motion.div
                key={entry.short}
                className="rounded-2xl border p-6"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-subtitle)",
                    color: "var(--blue)",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    marginBottom: 6,
                  }}
                >
                  {entry.short}
                </div>
                <div
                  style={{
                    fontSize: "var(--type-small)",
                    color: "var(--ink-2)",
                    lineHeight: 1.4,
                  }}
                >
                  {entry.long}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-7">
            <p
              style={{
                fontSize: "var(--type-body)",
                color: "var(--ink-2)",
                lineHeight: 1.5,
              }}
            >
              {DICTIONARY.side}
            </p>
            <div
              className="rounded-2xl border p-5"
              style={{
                background: "var(--blue-tint)",
                borderColor: "rgba(0,168,225,0.18)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-small)",
                color: "var(--blue-dark)",
              }}
            >
              {DICTIONARY.footer}
            </div>
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 2: Slide09Compare.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { COMPARE, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide09Compare() {
  return (
    <SlideSection meta={SLIDES_META[8]}>
      <div className="flex h-full flex-col gap-9">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {COMPARE.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {COMPARE.subtitle}
          </p>
        </header>

        <div
          className="overflow-hidden rounded-3xl border"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div
            className="grid items-center gap-4 border-b px-7 py-5"
            style={{
              gridTemplateColumns: "1.2fr 1fr 1fr",
              borderColor: "var(--border)",
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            <span>Dimenzió</span>
            <span>Cloud AI</span>
            <span style={{ color: "var(--blue)" }}>Medio Brain</span>
          </div>
          {COMPARE.rows.map((r, i) => (
            <motion.div
              key={r.dim}
              className="grid items-center gap-4 border-b px-7 py-5"
              style={{
                gridTemplateColumns: "1.2fr 1fr 1fr",
                borderColor: "var(--border)",
                fontSize: "var(--type-body)",
              }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              <span style={{ color: "var(--ink)" }}>{r.dim}</span>
              <span style={{ color: "var(--muted)" }}>{r.cloud}</span>
              <span style={{ color: "var(--blue)", fontWeight: 500 }}>
                {r.local}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 3: Verifikáció**

Run:
```powershell
npm run build
```

- [ ] **Step 4: Commit**

```powershell
git add components/slides/Slide08Dictionary.tsx components/slides/Slide09Compare.tsx
git commit -m "feat: add Slide 08 (Dictionary) and Slide 09 (Compare)"
```

---

## Task 15: Slide 10 (Timeline), Slide 11 (Features), Slide 12 (Future)

**Files:**
- Create: `components/slides/Slide10Timeline.tsx`
- Create: `components/slides/Slide11Features.tsx`
- Create: `components/slides/Slide12Future.tsx`

- [ ] **Step 1: Slide10Timeline.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { TIMELINE, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide10Timeline() {
  return (
    <SlideSection meta={SLIDES_META[9]}>
      <div className="flex h-full flex-col gap-9">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {TIMELINE.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {TIMELINE.subtitle}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative pl-12">
            <motion.div
              className="absolute left-3 top-0 w-0.5"
              style={{ background: "var(--blue)" }}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            {TIMELINE.milestones.map((m, i) => (
              <motion.div
                key={i}
                className="relative mb-6 pl-6"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <span
                  className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full"
                  style={{
                    background: "var(--blue)",
                    boxShadow: "0 0 0 4px var(--bg-tint)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-small)",
                    color: "var(--muted)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: "var(--type-body)",
                    color: "var(--ink)",
                    lineHeight: 1.45,
                    marginTop: 2,
                  }}
                >
                  {m}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className="flex flex-col gap-6 rounded-3xl border p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,168,225,0.06), var(--bg-card))",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-md)",
              height: "fit-content",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "calc(var(--type-num) * 0.85)",
                  color: "var(--blue)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {TIMELINE.stats.big}
              </div>
              <div
                style={{
                  fontSize: "var(--type-subtitle)",
                  color: "var(--ink-2)",
                  marginTop: 6,
                  fontWeight: 400,
                }}
              >
                {TIMELINE.stats.label}
              </div>
            </div>
            <ul
              className="flex flex-col gap-2"
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                color: "var(--ink-2)",
                fontSize: "var(--type-small)",
                lineHeight: 1.5,
              }}
            >
              {TIMELINE.stats.items.map((it) => (
                <li key={it}>· {it}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 2: Slide11Features.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { FEATURES, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";
import { Card } from "@/components/primitives/Card";

export function Slide11Features() {
  return (
    <SlideSection meta={SLIDES_META[10]}>
      <div className="flex h-full flex-col gap-9">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {FEATURES.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {FEATURES.subtitle}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex h-full flex-col gap-5">
                  <div
                    style={{
                      color: "var(--blue)",
                      letterSpacing: "0.12em",
                      fontSize: "var(--type-small)",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {c.tag}
                  </div>
                  <div
                    style={{
                      fontSize: "calc(var(--type-title) * 0.55)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {c.title}
                  </div>
                  <p
                    style={{
                      fontSize: "var(--type-body)",
                      color: "var(--ink-2)",
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div
          className="rounded-3xl border p-7"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 12,
            }}
          >
            {FEATURES.arch.label}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {FEATURES.arch.boxes.map((b, i) => (
              <div key={b} className="flex items-center gap-3">
                <span
                  className="rounded-full border px-4 py-2"
                  style={{
                    background: "var(--blue-tint)",
                    borderColor: "rgba(0,168,225,0.18)",
                    color: "var(--blue-dark)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--type-small)",
                  }}
                >
                  {b}
                </span>
                {i < FEATURES.arch.boxes.length - 1 && (
                  <span style={{ color: "var(--muted)" }} aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            fontSize: "var(--type-small)",
            color: "var(--muted)",
            fontStyle: "italic",
          }}
        >
          {FEATURES.footer}
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 3: Slide12Future.tsx**

```tsx
"use client";
import { motion } from "framer-motion";
import { FUTURE, SLIDES_META } from "@/lib/content";
import { SlideSection } from "@/components/layout/SlideSection";

export function Slide12Future() {
  return (
    <SlideSection meta={SLIDES_META[11]}>
      <div className="flex h-full flex-col gap-9">
        <header>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--type-title)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {FUTURE.title}
          </h2>
          <p
            className="mt-3"
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            {FUTURE.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[FUTURE.split.left, FUTURE.split.right].map((side, i) => (
            <motion.div
              key={side.label}
              className="rounded-3xl border p-8"
              style={{
                background:
                  i === 1
                    ? "linear-gradient(135deg, rgba(0,168,225,0.10), var(--bg-card))"
                    : "var(--bg-card)",
                borderColor: i === 1 ? "var(--blue)" : "var(--border)",
                boxShadow: i === 1 ? "var(--shadow-blue)" : "var(--shadow-md)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <div
                style={{
                  color: i === 1 ? "var(--blue)" : "var(--muted)",
                  letterSpacing: "0.12em",
                  fontSize: "var(--type-small)",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {side.label}
              </div>
              <div
                style={{
                  fontSize: "var(--type-subtitle)",
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  fontWeight: 400,
                }}
              >
                {side.body}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {FUTURE.list.map((item, i) => (
            <motion.div
              key={item.body}
              className="grid items-center gap-5 rounded-2xl border px-6 py-4"
              style={{
                gridTemplateColumns: "140px 1fr",
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                fontSize: "var(--type-body)",
                boxShadow: "var(--shadow-sm)",
              }}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <span
                className="rounded-full text-center"
                style={{
                  background: "var(--blue-tint)",
                  color: "var(--blue-dark)",
                  padding: "6px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--type-small)",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {item.freq}
              </span>
              <span style={{ color: "var(--ink)" }}>{item.body}</span>
            </motion.div>
          ))}
        </div>

        <div
          className="mt-auto flex flex-col gap-4 border-t pt-7"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <div
            style={{
              fontSize: "var(--type-subtitle)",
              color: "var(--blue)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {FUTURE.signoff}
          </div>
          <div
            style={{
              fontSize: "var(--type-small)",
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            {FUTURE.contact}
          </div>
        </div>
      </div>
    </SlideSection>
  );
}
```

- [ ] **Step 4: Verifikáció**

Run:
```powershell
npm run build
```

- [ ] **Step 5: Commit**

```powershell
git add components/slides/Slide10Timeline.tsx components/slides/Slide11Features.tsx components/slides/Slide12Future.tsx
git commit -m "feat: add Slide 10 (Timeline), 11 (Features), 12 (Future)"
```

---

## Task 16: Fő oldal (app/page.tsx)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Cseréld le az `app/page.tsx`-et**

```tsx
import { DeckShell } from "@/components/layout/DeckShell";
import { MagneticCursor } from "@/components/primitives/MagneticCursor";
import { Slide01Cover } from "@/components/slides/Slide01Cover";
import { Slide02Stack } from "@/components/slides/Slide02Stack";
import { Slide03Folders } from "@/components/slides/Slide03Folders";
import { Slide04Flow } from "@/components/slides/Slide04Flow";
import { Slide05Gpu } from "@/components/slides/Slide05Gpu";
import { Slide06Web } from "@/components/slides/Slide06Web";
import { Slide07Gdpr } from "@/components/slides/Slide07Gdpr";
import { Slide08Dictionary } from "@/components/slides/Slide08Dictionary";
import { Slide09Compare } from "@/components/slides/Slide09Compare";
import { Slide10Timeline } from "@/components/slides/Slide10Timeline";
import { Slide11Features } from "@/components/slides/Slide11Features";
import { Slide12Future } from "@/components/slides/Slide12Future";

export default function Home() {
  return (
    <>
      <MagneticCursor />
      <DeckShell>
        <Slide01Cover />
        <Slide02Stack />
        <Slide03Folders />
        <Slide04Flow />
        <Slide05Gpu />
        <Slide06Web />
        <Slide07Gdpr />
        <Slide08Dictionary />
        <Slide09Compare />
        <Slide10Timeline />
        <Slide11Features />
        <Slide12Future />
      </DeckShell>
    </>
  );
}
```

- [ ] **Step 2: Verifikáció — build**

Run:
```powershell
npm run build
```

Expected: minden 12 slide importable, sikeres build.

- [ ] **Step 3: Verifikáció — dev preview**

Run:
```powershell
npm run dev
```

Nyiss böngészőt `http://localhost:3000`-re.
Ellenőrzés:
- Mind a 12 dia látható egymás után
- Desktop (≥1024px): scroll-snap, jobb oldalt dia-indikátor látható, snap-pel a következő szekcióra
- Mobil (DevTools 375×667): natural scroll, indikátor nem látszik
- Magnetikus kurzor mozog, pill-eken megnő
- Count-up animációk indulnak slide 6-on (158, 45, 10)
- SVG path-tracing animálódik slide 3 netmap nyilain és slide 4 horizontal connector-on
- Brain SVG slide 1-en pulzál, orbiterek lebegnek
- Dark slide-ok (1, 4, 9, 12) háttere sötét gradiens

Ha bármi nem stimmel, javítsd, mielőtt commit-olsz.

- [ ] **Step 4: Commit**

```powershell
git add app/page.tsx
git commit -m "feat: assemble all 12 slides into responsive home page"
```

---

## Task 17: Reszponzív finomhangolás és reduced-motion teszt

**Files:**
- Modify: `app/globals.css` (kis kiegészítések, ha kellene)

- [ ] **Step 1: Dev server indítása**

Run:
```powershell
npm run dev
```

- [ ] **Step 2: Manuális reszponzív teszt minden viewportban**

DevTools → Toggle device toolbar. Tesztelj:
- 1920×1080 (desktop deck) — minden grid 3 oszlopos, snap aktív, jobb-oldali indikátor látszik
- 1280×800 — kompakt deck, snap aktív
- 1024×768 — még deck mód, snap aktív
- 1023×768 — long-scroll mód (átkapcsol), indikátor eltűnik
- 768×1024 (tablet portrait) — 3 oszlopos grid-ek 2 oszlopra mennek (lg breakpoint alatti md), netmap látszik
- 375×667 (iPhone SE) — minden 1 oszlop, brain SVG kisebb, netmap "központi + lista" fallback (auto-stack a Tailwind grid `grid-cols-1` miatt)

Ha valamelyik slide-ban overlap, túlcsordulás van, jegyezd fel és javítsd.

- [ ] **Step 3: `prefers-reduced-motion` teszt**

DevTools → Cmd+Shift+P (vagy Ctrl+Shift+P) → "Show Rendering" → "Emulate CSS media feature `prefers-reduced-motion`" → `reduce`.

Várt viselkedés:
- Count-up számok azonnal megjelennek a végértékkel (nem animálnak)
- SVG path-tracing path-ek azonnal kirajzolódnak
- Magnetikus kurzor eltűnik
- Brain pulzus megáll
- Parallax statikus

A `app/globals.css` már tartalmazza a global animation-duration override-ot, ez minden CSS animációt megöl. A Framer Motion-höz a `useCountUp` hook már respektálja, a magnetikus kurzor enabled flag-je is letiltja. Ellenőrizd, hogy ez tényleg igaz.

- [ ] **Step 4: Build és Lighthouse score**

Run:
```powershell
npm run build
npm run start
```

Másik terminálban (vagy DevTools → Lighthouse):
- Performance: célzott >90
- Accessibility: célzott >95
- Best Practices: célzott >95
- SEO: célzott >90

Ha 90 alatt van valami, jegyezd fel. Tipikus issue-k:
- LCP magas: a `lib/content.ts` `next/font` `display: swap` és preconnect rendben van; ha mégis lassú, csökkentsd a Framer Motion overhead-et critical path-on (a SlideSection initial `whileInView` már `once: true`)
- Accessibility: alt-text, aria-label-ek megléte (a navigációban van `aria-label`, az SVG-ken `aria-hidden`)

- [ ] **Step 5: Commit (ha volt változtatás)**

```powershell
git add .
git commit -m "fix: responsive tuning and reduced-motion verification"
```

---

## Task 18: GitHub repo létrehozás és push

**Files:** —

- [ ] **Step 1: gh CLI ellenőrzés**

Run:
```powershell
gh --version
gh auth status
```

Expected: gh telepítve és authenticated. Ha nem: lépj át **manual GitHub UI flow**-ra (Step 2b).

- [ ] **Step 2a: Repo létrehozás gh CLI-vel (ha auth OK)**

Run:
```powershell
cd "e:/Website Biz/MedioBrainPrezentacio"
gh repo create medio-brain-prezentacio --public --source=. --remote=origin --description "Medio Brain architecture — responsive presentation website"
git branch -M main
git push -u origin main
```

Expected: `https://github.com/<your-user>/medio-brain-prezentacio` létrejön, kód feltöltve.

- [ ] **Step 2b: Manual GitHub UI flow (ha gh nem elérhető)**

Tutorial:
1. Nyisd meg: https://github.com/new
2. "Repository name": `medio-brain-prezentacio`
3. Description: `Medio Brain architecture — responsive presentation website`
4. Visibility: **Public** (vagy Private, ha úgy szeretnéd)
5. **NE** pipáld a "Add a README" / ".gitignore" / "license" — már megvannak lokálisan
6. Kattints a **Create repository** zöld gombra
7. A következő képernyőn másold ki a "push an existing repository" parancsokat
8. Futtasd lokálisan:

```powershell
cd "e:/Website Biz/MedioBrainPrezentacio"
git remote add origin https://github.com/<your-user>/medio-brain-prezentacio.git
git branch -M main
git push -u origin main
```

Cseréld `<your-user>`-t a saját GitHub felhasználónevedre.

- [ ] **Step 3: Verifikáció**

Nyisd meg a repo URL-jét böngészőben. Várt: lásd a fájlokat, a `docs/superpowers/specs/` és `docs/superpowers/plans/` mappákat, a `app/`, `components/`, `lib/`, `hooks/` mappákat.

---

## Task 19: Vercel deploy

**Files:** —

- [ ] **Step 1: Vercel import flow**

Tutorial:
1. Nyisd meg: https://vercel.com/new
2. Ha még nem vagy bejelentkezve, jelentkezz be (GitHub OAuth-tal a legegyszerűbb)
3. "Import Git Repository" szekció: keresd ki a `medio-brain-prezentacio` repó-t
   - Ha nem jelenik meg, kattints a **Configure GitHub App** linkre és add hozzá a repo elérést a Vercel GitHub App-nak
4. Kattints az **Import** gombra a repo melletti

- [ ] **Step 2: Projekt konfiguráció**

A "Configure Project" képernyőn:
1. **Project Name**: `medio-brain-prezentacio` (vagy hagyd default-on)
2. **Framework Preset**: Next.js (auto-detect)
3. **Root Directory**: `./` (default)
4. **Build & Output Settings**: hagyd default (Vercel a Next.js detektálásból tudja)
5. **Environment Variables**: nincs (most semmilyen ENV nem kell)
6. Kattints a **Deploy** zöld gombra

- [ ] **Step 3: Deploy várakozás**

Várj 60-90 másodpercet, amíg a build és deploy lefut. A logok élőben láthatóak.

Várt: "Congratulations" képernyő a preview screenshot-tal és egy `https://medio-brain-prezentacio-<hash>.vercel.app` URL-lel.

- [ ] **Step 4: Live URL teszt**

Nyisd meg az URL-t. Ellenőrzés:
- Mind a 12 dia élesben látható
- Asztalon scroll-snap deck mód
- Mobilon (telefonról nyitva) long-scroll
- Animációk működnek (count-up, SVG path tracing, brain pulse)
- Lighthouse score elfogadható

- [ ] **Step 5: Auto-deploy verifikáció**

Lokálisan futtasd:
```powershell
cd "e:/Website Biz/MedioBrainPrezentacio"
git commit --allow-empty -m "test: trigger Vercel auto-deploy"
git push
```

Vercel dashboard (`https://vercel.com/<your-user>/medio-brain-prezentacio`) → Deployments tab. Várt: új deployment automatikusan elindul a push hatására. 1-2 perc múlva új preview URL.

Ha ez megtörtént, az auto-deploy működik. Készen vagyunk.

- [ ] **Step 6: Custom domain (opcionális, később)**

A `mediobrain.mymedio.hu` vagy más custom domain a Vercel dashboard → Settings → Domains menüben adható hozzá. Igényli a DNS CNAME / A record beállítást a domain registrar-nál. Most kihagyjuk, mert nincs explicit kérés.

---

## Self-Review

**1. Spec coverage:**
- §2 Architektúra-döntések → Task 1 (Next.js scaffolding), Task 2 (Tailwind v4 + design tokens), Task 18-19 (GitHub + Vercel)
- §3 Design system → Task 2 (CSS változók, fluid clamp() típus-skála, light/dark theme), Task 5 (primitív komponensek)
- §4 Komponens-bontás → Task 4 (hooks), Task 5 (primitives), Task 6 (layout), Task 7 (cursor), Task 8 (SVG), Task 9-15 (12 slide)
- §5 Animációk → Task 6 (ParallaxBlob, SlideSection fade), Task 7 (MagneticCursor), Task 8 (BrainNetwork pulse, NetmapDiagram stagger, Gpu3D rotation), Task 11 (Slide04 path-tracing), Task 13 (Slide06 count-up), Task 15 (Slide10 stroke fill)
- §6 Reszponzív viselkedés → Task 2 (scroll-snap media query), Task 6 (SlideSection `min-h-screen lg:h-screen`), Task 9-15 (`grid-cols-1 md:grid-cols-X lg:grid-cols-Y` minden slide-on), Task 17 (manuális reszponzív teszt)
- §7 Tartalom → Task 3 (lib/content.ts — összes szöveg, számok, em-dash mentes, "29 munkatárs", "1 hét", "Jelenleg lokális", "Az emlékezéstől a végrehajtásig")
- §8 Tech stack → Task 1 (npm install függőségek)
- §9 Deploy → Task 18 (GitHub repo + push), Task 19 (Vercel import + auto-deploy)
- §10 Tesztelés → Task 16 Step 3 (dev preview), Task 17 (reszponzív + reduced-motion + Lighthouse), Task 19 Step 4 (live URL teszt)
- §11 Kockázatok → kezelve: magnetikus kurzor `(hover: hover)` only (Task 7), parallax intensity prop (Task 6), reduced-motion respect (globals + useCountUp + MagneticCursor)
- §12 Sikerkritériumok → mind 10 pont fedett

✅ Spec coverage teljes.

**2. Placeholder scan:**
- Nincs "TBD", "TODO", "implement later"
- Nincs "add appropriate error handling" — minden konkrét kód
- Minden code block teljes
- Nincs "similar to Task N" hivatkozás

✅ Tiszta.

**3. Type consistency:**
- `SlideMeta` típus a `lib/content.ts`-ben definiálva, használva: SlideSection, SlideMeta, SlideIndicator, minden Slide0X komponens (`SLIDES_META[i]`)
- `useInViewOnce<T>` generikus — használat: `useInViewOnce<HTMLDivElement>()` a StatNumber-ben. Konzisztens.
- `useCountUp(target, durationMs, active, respectReducedMotion?)` — használat: `useCountUp(value, 1500, inView)`. ✅
- `Card({ children, dense?, featured?, className? })` — használat slide 2, 11. ✅
- `Pill` variant `"default" | "amber" | "tag"` — definiált, használat: Stack support row pill-ek (de inline span-ekkel csinálta a Task 10, mert a Pill primitív túlspecifikus volt — ez OK)
- `ParallaxBlob({ position, color, size?, intensity? })` — SlideSection meghívja `position` és `color` kötelező paraméterekkel. ✅

✅ Konzisztens.

A plan kész.

---

**Plan complete and saved to `e:/Website Biz/MedioBrainPrezentacio/docs/superpowers/plans/2026-05-20-medio-brain-website-implementation.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**

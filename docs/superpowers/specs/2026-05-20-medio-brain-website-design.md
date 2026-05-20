# Medio Brain Architektúra — Reszponzív Weboldal Design Spec

**Dátum:** 2026-05-20
**Forrás:** Claude Design bundle (`medio-brain-architecture`) — `Medio Brain.html` (1920×1080 deck) + `chat1.md` transcript
**Target deploy:** Vercel (GitHub auto-deploy)
**Projekt root:** `e:/Website Biz/MedioBrainPrezentacio/`

---

## 1. Cél és kontextus

Az eredeti design egy **fixed 1920×1080 16:9 prezentációs deck** 12 diával, amely a Medio Brain (GDPR-tudatos lokális AI tudásbázis architektúra) történetét meséli el. A `deck-stage` web-component letterboxos skálázást, billentyűzet-navigációt és print-to-PDF támogatást ad neki.

**A user kérése:** ezt alakítsuk át **reszponzív, animált weboldallá**, és telepítsük Vercel-re. A tartalom 1:1 átvétel (a felhasználó által korábban kért finomításokkal együtt: "Jelenleg lokális", "29 munkatárs", "1 hét aktív munka", em-dash-mentes szövegek, stb.).

A célközönség változatlan: technikailag affinis döntéshozók (CTO-k, healthcare-tech alapítók) és mérnökök, akik privát AI architektúrák iránt érdeklődnek. Magyar nyelvű.

---

## 2. Architektúra-döntések (a brainstorm eredménye)

| Kérdés | Választás |
|---|---|
| Layout mód | **Hibrid:** ≥1024px-en scroll-snap deck (full-viewport szekciók), <1024px-en folyamatos long-scroll |
| Tech stack | **Next.js 15** App Router + Tailwind v4 + TypeScript |
| Animációk | **Maximum overdrive** — Framer Motion + GSAP, parallax, magnetikus kurzor, count-up, SVG path tracing, slide-átmeneti morfok |
| Deploy | **GitHub repo + Vercel auto-deploy** (push-on-main triggert) |
| Tartalom | **1:1 átvétel** a chat transcript végállapotából |
| Projekt root | `e:/Website Biz/MedioBrainPrezentacio/` |

**Layout-architektúra (Opció A — egyforrás, breakpoint-vezérelt):**
Egyetlen `app/page.tsx` rendereli statikusan mind a 12 dia-szekciót. CSS media query (`@media (min-width: 1024px)`) kapcsol scroll-snap és long-scroll között. A scroll-snap módban a desktopon hat:
- `scroll-snap-type: y mandatory` a html/body-n
- `scroll-snap-align: start` minden szekción
- `min-height: 100vh` per szekció
- Fix dia-indikátor jobb oldalt (oldal-pontok 1–12), aktuális dia kiemelve neon kékkel
- Felül `slide-meta` overlay: "01 / 12"

Mobilon (<1024px): natural scroll, `min-height: auto`, dia-indikátor elrejtve. Az `s1`–`s12` 3-oszlopos grid-jei `grid-template-columns: 1fr` (auto-stack). Az SVG hálózati ábrák (slide 3 netmap, slide 1 brain orbit) aspect-ratio konténerben skálázódnak.

---

## 3. Design system (vizuálisan változatlan az eredetihez képest)

### Színpaletta (Medio brand)
```
--blue: #00A8E1            (elsődleges)
--blue-dark: #0090C4
--blue-deep: #0078A8
--blue-tint: #EDF6FB
--amber: #FF7849            (GDPR callout-ok, figyelmeztetés)
--purple: #B7A8F0           (lágy gradient háttér-blob)
--pink: #F0B8E0             (alternatív blob)

/* Light theme (default) */
--bg: #FFFFFF
--bg-tint: linear-gradient(180deg, #F4FAFD 0%, #FFFFFF 45%, #ECF5FA 100%)
--ink: #0A1929
--muted: #5A6B7C

/* Dark theme (slide 1, 4, 9, 12) */
--bg: #0A1929
--bg-tint: radial-gradient(ellipse at 30% 0%, #14304B 0%, #0A1929 55%, #050F1A 100%)
--ink: #FFFFFF
```

A `.dark` class (slide 1, 4, 9, 12) felülírja a CSS-változókat. Tailwind v4-ben `data-theme="dark"` attribútumon keresztül.

### Tipográfia
- **Outfit** (Google Fonts) — 200, 300, 400, 500, 600, 700 — főszöveg, címek
- **JetBrains Mono** — 400, 500, 600 — kódblokkok, file útvonalak, számok

### Típus-skála (fluid clamp() — eredeti 1920×1080 értékek a felső határ)
```css
--type-display: clamp(56px, 7.5vw, 144px);  /* slide 1 cím */
--type-title:   clamp(40px, 4vw, 76px);     /* dia címek */
--type-subtitle:clamp(22px, 2vw, 38px);
--type-body:    clamp(16px, 1.5vw, 28px);
--type-small:   clamp(14px, 1.25vw, 24px);
--type-num:     clamp(48px, 5vw, 92px);     /* count-up számok */
```

### Spacing (fluid)
```css
--pad-top:    clamp(48px, 6vw, 110px);
--pad-bottom: clamp(40px, 5vw, 80px);
--pad-x:      clamp(24px, 6vw, 110px);
```

### Komponens-rendszer (Tailwind v4 + CSS layer + custom utilities)
- `.card` — fehér háttér, 28px border-radius, soft shadow, light theme. Dark theme felülírja
- `.pill` — round chip a tag-ekhez
- `.btn-pill` — kék CTA gomb
- `.callout` — szegélyes kiemelő doboz (kék vagy amber variáns)
- `.hairline` — 56px x 2px kék elválasztó, vagy 100% x 1px halvány gradiens
- `.stat-num` + `.stat-label` — nagy szám + címke pár

Háttér-effekt: minden light slide-on két soft floating blob (`::before` jobbra-fent kék, `::after` balra-lent purple). Dark slide-okon erősebb glow. Parallax: blob-ok lassan mozognak scroll közben (`transform: translateY()` `useScroll` + `useTransform` Framer Motion).

---

## 4. Komponens-bontás (Next.js)

A "Design for isolation and clarity" elv szerint kis, jól-határolt egységek. Minden slide saját komponens, közös primitívekkel.

```
app/
  layout.tsx              — root layout, fonts (next/font: Outfit + JetBrains Mono)
  page.tsx                — fő oldal, 12 <Slide*/> egymás után
  globals.css             — Tailwind v4 + CSS változók (light/dark token-rendszer)

components/
  layout/
    DeckShell.tsx         — scroll-snap container (desktop), natural (mobile)
    SlideMeta.tsx         — "01 / 12" overlay top-right, aktuális szám
    SlideIndicator.tsx    — oldalsó dot-nav, desktop-only (>=1024px)
    SlideSection.tsx      — wrapper minden slide-hoz: .dark támogatás, slide-tag,
                            slide-meta integration, blob háttér, useInView trigger

  primitives/
    Card.tsx, Pill.tsx, ButtonPill.tsx, Callout.tsx, Hairline.tsx
    StatNumber.tsx        — count-up animáció (useMotionValue + useInView)
    CodeBlock.tsx         — szintaktikus highlight (Prism inline vagy custom span-ek)
    MagneticCursor.tsx    — desktop-only globális kurzor-effekt
    ParallaxBlob.tsx      — soft floating háttér-blob, scroll-driven Y eltolás

  slides/
    Slide01Cover.tsx      — agy SVG + 5 orbiter pill (Obsidian/Claude/RTX/Trello/Drive)
    Slide02Stack.tsx      — 3 oszlopos technológiai stack (mobil: stack vertikálisan)
    Slide03Folders.tsx    — bal: 9 mappa lista; jobb: netmap SVG + 9 csomópont (radial)
    Slide04DropSortLearn.tsx — 5 lépéses horizontális flow (mobil: 5 vertikális kártya)
    Slide05GpuPipeline.tsx — bal: 3D GPU card + spec; jobb: vertikális pipeline + arrow
    Slide06WebIngest.tsx   — flow + kódblokk
    Slide07Gdpr.tsx        — feltöltőtábla mockup + bullet lista
    Slide08Dictionary.tsx  — szótár-bejegyzések kártya-stack
    Slide09Comparison.tsx  — összehasonlító tábla (Cloud vs Lokális), dark
    Slide10Timeline.tsx    — függőleges idővonal 12 mérföldkővel + élő stat
    Slide11ThreeFeatures.tsx — 3 nagy feature kártya
    Slide12Future.tsx      — Most vs Tervezett split + automatizáció lista, dark

  svg/
    BrainNetwork.tsx       — slide 1 központi agy + neurális csomópontok (path stroke anim)
    NetmapDiagram.tsx      — slide 3 sugaras hálózat (9 node + center brain)
    Gpu3D.tsx              — slide 5 perspektivikus GPU illusztráció (CSS 3D transform)
    Arrows.tsx              — pipeline nyilak (stroke-dashoffset animáció)

hooks/
  useDeckMode.ts           — matchMedia('(min-width: 1024px)') reactive boolean
  useCountUp.ts            — szám-animáció helper
  useInViewOnce.ts         — Intersection Observer wrapper, csak első triggernél

lib/
  content.ts               — összes statikus szöveg (TS objektumok per slide)
                             — közvetlenül szerkeszthető, type-safe
  motion.ts                — közös Framer Motion variants (fadeUp, stagger, glow)

public/
  fonts/                   — opcionális self-host (initial: next/font)
  og.png                   — Open Graph image (1200×630, Medio Brain branding)
```

**Miért ez a bontás:**
- Egy slide = egy komponens. Bárki tudja módosítani egyetlen slide-ot anélkül, hogy mást érintene
- Primitívek (Card, Pill, Callout) konzisztens vizuálist garantálnak
- SVG-k saját fájlban, mert komplexek és újrahasználhatóak (BrainNetwork pl. a slide 1-en és kis változatban a meta-indikátoron is megjelenhetne)
- A `content.ts` szétválasztja a tartalmat a layouttól — könnyű i18n-be ágyazni, ha kell később (most magyar-only)

---

## 5. Animációk és interaktivitás ("Maximum overdrive")

A "max overdrive" választás konkrét manifesztációi:

### Globális
- **Magnetikus kurzor** (desktop, >=1024px): egy custom kurzor követi az egeret 50ms easing-gel, interaktív elemek fölött (pill, btn-pill, card) megnő és pulse-ol
- **Parallax háttér-blob-ok**: minden szekcióban a `::before`/`::after` blob-ok `transform: translateY(progress * 100px)` scroll-driven, Framer Motion `useScroll` + `useTransform`
- **Scroll-snap átmeneti morf** (csak desktop deck módban): mikor egy szekció viewport-ba snap-pel, a tartalom finom 3D rotateX(2deg) → 0 swing-elés, 800ms ease

### Slide-szintű (Intersection Observer triggerelt, csak első megjelenéskor)
- **Cím + subtitle**: `fadeUp` (opacity 0→1, y 24→0, 600ms, stagger 80ms gyermekek között)
- **Count-up számok**: `useMotionValue` 0-ról a célértékre 1500ms cubic-out, csak akkor indul, ha a komponens `useInView` true. Mindenhol ahol szám van (158 cikk, 80 kártya, 29 munkatárs, 24 GB VRAM, 15-25× realtime, 8 mp/dok, 11 Python script, 66 intézmény, 49 feltöltőtábla)
- **SVG path tracing**: minden folyamatábra vonala (slide 3 netmap nyilak, slide 4 horizontal flow arrows, slide 5 pipeline nyilak, slide 10 timeline stroke) `stroke-dasharray + stroke-dashoffset` animáció, balról-jobbra vagy fentről-lefelé rajzolódás 1200ms
- **Kártya hover**: scale 1.0 → 1.02, box-shadow elmélyül, kék glow (`box-shadow: 0 20px 60px rgba(0,168,225,0.20)`), 200ms ease. Desktop-only
- **Brain network (slide 1)**: a központi agy SVG belső path-jei loop-pulzálnak (opacity 0.6 ↔ 1.0, 2s), az 5 orbiter pill lebeg (yoyo `translateY` ±8px különböző fázisokkal)
- **Netmap (slide 3)**: 9 csomópont radial pop-in (scale 0→1, stagger 100ms), központi brain utoljára 1.2-ből 1.0-ra easing-back
- **Timeline (slide 10)**: függőleges stroke fentről-lefelé rajzolódik, minden mérföldkő nodepont időzítve

### Akadálymentesség
- `prefers-reduced-motion`: minden non-essential animáció letiltva (count-up azonnali végérték, parallax statikus, hover-glow marad ferritálható)
- `useReducedMotion()` hook globálisan ellenőrzi

---

## 6. Reszponzív viselkedés

### Breakpoint-ok
| Breakpoint | Mód | Layout-változások |
|---|---|---|
| `≥1280px` (xl) | Deck (1920×1080-szerű) | 3-oszlopos grid-ek 3 oszloppal, full viewport-os snap |
| `1024px-1279px` (lg) | Deck (kompakt) | 3-oszlopos még 3 oszlop, kicsit kisebb fonts (clamp() automatikus), snap aktív |
| `768px-1023px` (md) | Long-scroll | 3-oszlopos grid → 2 oszlopra; netmap/brain SVG marad de scaled |
| `<768px` (sm) | Long-scroll | Minden grid 1 oszlopra; nagy SVG-k (slide 1 brain, slide 3 netmap) egyszerűsített változatra cserélődnek |

### Slide-specifikus mobil-fallback
- **Slide 1 (Cover)**: 2-oszlopos (szöveg/brain) → vertikális stack, brain SVG kisebb (320×320), orbiter pill-ek alulra rendezve flex-wrap-pel
- **Slide 2 (Stack)**: 3 oszlop → 1 oszlop, "Compute-réteg" feature card megmarad gradient-jével
- **Slide 3 (Folders)**: bal (lista) + jobb (netmap) → lista először, alatta netmap. <640px alatt a netmap egy egyszerűsített "központi brain csomópont + alatta 9 mappa-pill" elrendezésre vált (vertikális, mert a sugaras radial layout kis viewportra olvashatatlan)
- **Slide 4 (Drop Sort Learn)**: 5 vízszintes kártya → 5 vertikális kártya, közötte függőleges nyíl
- **Slide 5 (GPU pipeline)**: bal (GPU card) + jobb (pipeline) → felül GPU, alatta pipeline; a 3D GPU perspektíva mobilon kevésbé "döntött" (CSS `transform: perspective(800px) rotateY(0)` mobilon helyett `rotateY(-15deg)` desktopon)
- **Slide 9 (Comparison)**: 6-soros tábla → kártya-pár (cloud vs lokális) felváltva soronként, vagy egyszerű 2-oszlopos compact tábla
- **Slide 10 (Timeline)**: jobb oldali "élő stat" oszlop a timeline alá kerül

### Touch targets
Minden interaktív elem (pill, btn-pill, slide-indicator dot) min. 44×44px érintési felület mobilon (Tailwind `min-h-[44px]`).

---

## 7. Tartalom (kanonikus snapshot a chat transcript végéből)

A tartalom 1:1 az eredeti `Medio Brain.html` végállapotából. Itt a kulcs-elemek dokumentálva (a `lib/content.ts` ezt tükrözi):

**Slide 1 — Cover**
- Eyebrow: "MEDIO MEDTECH · 2026"
- Display: "Medio" / "Brain"
- Lead: "Jelenleg lokális, GDPR-tudatos AI tudásbázis architektúra"
- Tagline: "Egyetlen bootstrap session alatt épült. Az asztalomon fut. A saját adatai felett rendelkezik."
- Orbiter pill-ek: Obsidian, Claude, RTX 3090, Trello, Google Drive
- Footer: "Petrik Kristóf · Medio Delivery Expert · 2026"

**Slide 2 — Stack**
- 3 oszlop: Tudás-réteg (Obsidian), AI Agy-réteg (Claude), Compute-réteg (RTX 3090, kiemelt)
- Support row: ffmpeg, Python 3.10, Trello REST API, Google Drive MCP, Jina Reader

**Slide 3 — Folder Architecture**
- Cím: "A struktúra mint memória"
- Bal: 9 mappa lista (`00_Inbox_Feldolgozando` ... `99_Rendszer_Scriptek`), file-count metrikákkal
- Jobb: netmap diagram 9 csomóponttal, centrális "brain" node
- Annotációk: "158 cikk", "80 Trello kártya", "49 feltöltőtába", "66 intézmény"

**Slide 4 — Drop → Sort → Learn**
- 5 fázis: DROP, DETECT, PROCESS, STORE, CROSS-LINK
- Footer: "Átlagos feldolgozási idő: 8 másodperc dokumentumonként"

**Slide 5 — Local GPU Video Transcript**
- Cím: "Az orvos meetingje az irodában marad"
- Bal: 3D GPU card + spec callout-ok (24 GB VRAM, CUDA float16)
- Jobb: vertikális pipeline (meeting.mp4 → ffmpeg → WAV → faster-whisper → Markdown), CUDA INFERENCE doboz alatt a nyíl mutat le az OUTPUT-ra (NEM mellette balra). Az ffmpeg eltérő színű (amber) mert "lebeg" a kettő között
- Callout: "Az adat nem hagyja el a workstation-t."

**Slide 6 — Web Ingest**
- 3 dobozos flow: URL → Jina Reader Proxy → Tiszta Markdown
- Stats: 158 cikk, 45 mymedio.hu oldal, 10 perces batch
- Kódblokk Python példa

**Slide 7 — GDPR**
- Cím: "Amit tudunk anélkül, hogy tárolnánk"
- Feltöltőtábla mockup 22 oszloppal, 3 amber-kiemelt oszlop placeholder-rel (`[MAIL]`, `[TEL]`, `[ID]`)
- Bullet: "A rendszer TUDJA hol KELLENE strukturálisan lennie..."
- Footer: "29 Medio munkatárs + 3 megbízható domain a whitelisten"

**Slide 8 — Dictionary**
- Glosszárium kártya-stack: EESZT, HIS, MIS, NEAK, OKFŐ, Kardi-Soft, MediCall
- Side text: "Amikor a Claude egy 'OJOTE'-t említő Trello kártyát olvas, nem találgat."

**Slide 9 — Comparison (dark)**
- 6 dimenzió × 2 oszlop (Cloud AI vs Medio Brain)
- Adat lokáció, Sebesség, GDPR review, Költség, Audit nyomvonal, Testreszabhatóság

**Slide 10 — Timeline**
- 12 mérföldkő függőleges stroke fill-lel
- Jobb: "1 hét aktív munka · 11 Python script · 0 külső dependency · 0 cloud vendor"

**Slide 11 — Three Features**
- 3 kártya: Pattern Recognition, Decision Support, Auto-Fill (vízió)
- Subtitle: NINCS "ma" vagy "holnap" — "Három képesség, három absztrakciós szinten."
- Architektúra-vázlat: 3 lookup DB → FastAPI → JSON/Excel

**Slide 12 — Future (dark)**
- "Most vs Tervezett" split (NEM "Ma vs Holnap")
- Automatizáció lista (heti, napi, igény szerint, reaktív)
- Záró tagline: "Az emlékezéstől a végrehajtásig." (NEM "amíg én alszom")
- Kontakt: "Készítette: Petrik Kristóf · Medio Delivery Expert · petrik.kristof@mymedio.hu"

**Em-dash mentes — minden em-dash kötőjelre vagy más írásjelre cserélve.**

---

## 8. Tech stack és függőségek

```jsonc
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "typescript": "^5.6.0",
  "tailwindcss": "^4.0.0",       // Tailwind v4 (CSS-first config)
  "framer-motion": "^11.0.0",    // animációk, scroll-driven, count-up
  "gsap": "^3.12.0",             // SVG path tracing, complex timeline animáció (opcionális, ha FM kevés)
  "clsx": "^2.0.0"               // conditional className
}
```

**Fonts:** `next/font/google` az Outfit és JetBrains Mono betöltéséhez (subset: latin + latin-ext, mert magyar speciális karakterek). Display swap.

**Nincs:** állapot-menedzsment library (zustand/redux), form library, i18n library (most magyar-only). Egyszerű, minimal dependency surface.

---

## 9. Deploy: GitHub + Vercel auto-deploy

### Lépések (a write-plan részletezi pontosan)
1. Lokális projekt init: `npx create-next-app@latest MedioBrainPrezentacio --typescript --tailwind --app --no-src-dir`
2. Repo init: `git init`, `.gitignore` ellenőrzés
3. GitHub repo létrehozás: a felhasználó hozza létre a `medio-brain-prezentacio` repót a github.com-on (vagy `gh repo create medio-brain-prezentacio --public --source=. --remote=origin` ha a `gh` CLI elérhető és authenticated)
4. Első commit + push
5. Vercel dashboard (vercel.com/new) → Import GitHub repo → auto-detect Next.js → Deploy
6. Custom domain (későbbre): pl. `mediobrain.mymedio.hu`

A felhasználó instructions szerint (`feedback_include_tutorials.md`): minden manuális (GitHub repo create, Vercel import) lépéshez tutorial-blokk a write-plan-ben, exact URL-ekkel és kattintásokkal.

### Build és preview
- Lokális: `npm run dev` (Next dev server, hot reload)
- Lokális produkciós build: `npm run build && npm run start`
- Vercel preview: minden PR-re saját preview URL
- Production: push main-re → vercel deploy

---

## 10. Tesztelés és verifikáció

A "verification-before-completion" elv szerint:

1. **Lokális dev futtatás**: `npm run dev`, megnyitása `http://localhost:3000`, mind a 12 dia bejárása
2. **Reszponzív teszt**: DevTools → 1920×1080 (deck mód), 1280×720 (kompakt deck), 768×1024 (tablet long-scroll), 375×667 (mobil)
3. **Animáció-teszt**: count-up számok, SVG path rajzolódás, parallax blob, magnetikus kurzor
4. **`prefers-reduced-motion` teszt**: DevTools → Rendering → Emulate `prefers-reduced-motion`, ellenőrizni, hogy az animációk letiltódnak
5. **Production build teszt**: `npm run build` futtatása, type errors és lint check
6. **Lighthouse score**: target >90 mind Performance / Accessibility / Best Practices / SEO
7. **Vercel preview deploy**: a feature branch push után az auto-preview URL ellenőrzése

A user-facing "kész" üzenet csak akkor mehet ki, ha mind a 12 dia élesben látható és a számok animálnak.

---

## 11. Kockázatok és YAGNI-döntések

### Kockázatok
- **Touch device-en parallax + magnetikus kurzor**: a magnetikus kurzor csak `(hover: hover)` media query-vel aktív (érintős eszközön nem érvényes). Parallax mobilon enyhébb (max 30px Y eltolás)
- **SVG netmap mobil**: a 9-csomópontos sugaras hálózat mobilon olvashatatlanná zsugorodna, ezért <640px alatt "központi brain + 9 pill vertikálisan" fallback-re vált (l. §6)
- **Font loading shift**: `next/font` `display: swap` minimalizálja, de első nézetnél lehet rövid FOUT. Acceptable

### YAGNI — explicit kihagyások
- **Nincs CMS** (statikus tartalom, `lib/content.ts`)
- **Nincs i18n** (csak magyar; a user-base hazai)
- **Nincs analytics** (most). Később Vercel Analytics 1-soros adhozzáadással
- **Nincs PDF export** (a deck-stage skill print-to-PDF-jét NEM portoljuk; ez weboldal, nem prezentáció)
- **Nincs speaker notes** (üres notes array volt az eredetiben)
- **Nincs kontakt-form / CTA szekció** (a user az "1:1 átvétel" opciót választotta, nem a "1:1 + CTA"-t)

---

## 12. Sikerkritériumok

1. ✅ Mind a 12 dia tartalma 1:1 a `Medio Brain.html` végállapotából, em-dash mentesen
2. ✅ Desktop (≥1024px): scroll-snap deck-érzés full-viewport szekciókkal, oldalsó dia-indikátor működik
3. ✅ Mobil (<1024px): long-scroll, minden grid 1 oszlopra, SVG-k arányosan skálázódnak vagy fallback-elnek
4. ✅ Count-up animációk indulnak viewport-ba érkezéskor (Intersection Observer)
5. ✅ SVG path tracing (slide 3, 4, 5, 10) animálódik
6. ✅ Hover glow a kártyákon desktopon, magnetikus kurzor működik
7. ✅ `prefers-reduced-motion` tisztelt
8. ✅ Lighthouse Performance ≥90, Accessibility ≥95
9. ✅ Vercel production deploy elérhető URL-en
10. ✅ GitHub auto-deploy működik: új commit a main-en automatikusan kiveszi

---

## Függelék: forrásfájlok

- `e:/Website Biz/.design-import/medio-brain/project/Medio Brain.html` — eredeti deck (2234 sor)
- `e:/Website Biz/.design-import/medio-brain/project/deck-stage.js` — web component (1748 sor) — **NEM portoljuk**, csak referencia
- `e:/Website Biz/.design-import/medio-brain/chats/chat1.md` — teljes design-iteráció transcript (776 sor)
- `e:/Website Biz/.design-import/medio-brain/README.md` — handoff bundle leírás

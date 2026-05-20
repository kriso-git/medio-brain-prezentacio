# Mac Setup — Medio Brain Prezentacio

A projekt folytatása macOS-en. Lépésről lépésre.

---

## 1. Előfeltételek a Mac-en

**Node.js >= 20.19**
```bash
node --version
```
Ha hiányzik vagy régi: telepítsd `nvm`-mel (ajánlott) vagy a [nodejs.org](https://nodejs.org/) installerével.

```bash
# nvm-mel
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# Új terminál indítása után:
nvm install 22 && nvm use 22
```

**Git**
```bash
git --version
```
Ha hiányzik: `xcode-select --install` (Xcode Command Line Tools — git is benne van).

**Opcionális CLI-k** (csak ha szeretnél a Mac-ről is push-olni / deploy-olni):
- **GitHub CLI:** `brew install gh && gh auth login`
- **Vercel CLI:** `npm install -g vercel && vercel login`

---

## 2. Repo klónozása

```bash
cd ~/Projects        # vagy bárhova szeretnéd
git clone https://github.com/kriso-git/medio-brain-prezentacio.git
cd medio-brain-prezentacio
```

## 3. Függőségek telepítése

```bash
npm install
```

Vár ~30-60 másodpercet.

## 4. Dev server indítása

```bash
npm run dev
```

Megnyitja `http://localhost:3000`. Hot reload aktív — minden szerkesztés azonnal frissül a böngészőben.

## 5. Production build teszt (opcionális, deploy előtt)

```bash
npm run build
npm run start
```

Lokálisan szimulálja a Vercel production build-jét.

---

## 6. Workflow a Mac-en

A Vercel **auto-deploy** be van kapcsolva a GitHub repo-ra. Ami azt jelenti:

```bash
# Szerkesztés (pl. lib/content.ts vagy bármelyik komponens)
git add .
git commit -m "content: ..."
git push
```

→ Vercel 60-90 másodpercen belül új deploy-t indít, és a `https://medio-brain-prezentacio.vercel.app` URL frissül.

---

## 7. Projekt struktúra emlékeztető

```
app/
  layout.tsx           # fonts, metadata, <html lang="hu">
  page.tsx             # fő oldal — 12 slide rendering
  globals.css          # CSS változók, design tokens, scroll-behavior

components/
  primitives/          # Card, Pill, Callout, StatNumber, SlideHeader, MagneticCursor, CodeBlock, ButtonPill, Hairline
  layout/              # DeckShell, SlideSection, SlideMeta, SlideIndicator, ParallaxBlob
  svg/                 # BrainNetwork, NetmapDiagram, Gpu3D
  slides/              # Slide01Cover.tsx ... Slide12Future.tsx

hooks/                 # useDeckMode, useInViewOnce, useCountUp

lib/
  content.ts           # ⭐ minden szöveg, szám, dia-tartalom itt van — KÉZZEL szerkesztheted

docs/superpowers/
  specs/               # design spec
  plans/               # implementation plan
```

**Szövegmódosítás helye:** a 12 dia minden szövege a `lib/content.ts`-ben van (`COVER`, `STACK`, `FOLDERS`, ... `FUTURE` const-okban). Egy szöveg módosítása = egy sor edit + commit + push.

---

## 8. Vercel CLI deploy a Mac-ről (ha CLI-vel akarsz deploy-olni)

A `.vercel/` mappa **NINCS** a repóban (és kell is, hogy így legyen — gitignored). Mac-en első futtatáskor újra kell linkelni:

```bash
vercel link --yes --project medio-brain-prezentacio
```

(Auth: `vercel login` → ugyanaz a `petrikkristof89-6846` account.)

Ezután:
```bash
vercel deploy --prod
```

De **valójában nem kell** — a `git push` magától indít deploy-t a Vercel oldalon. A CLI csak manuális trigger.

---

## 9. Eszközök linkek

- **Élő site:** https://medio-brain-prezentacio.vercel.app
- **GitHub repo:** https://github.com/kriso-git/medio-brain-prezentacio
- **Vercel dashboard:** https://vercel.com/petrikkristof89-6846s-projects/medio-brain-prezentacio
- **Design spec:** `docs/superpowers/specs/2026-05-20-medio-brain-website-design.md`
- **Implementation plan:** `docs/superpowers/plans/2026-05-20-medio-brain-website-implementation.md`

---

## 10. Gyakori hibák

**"Module not found: 'next/font/google'"** — `npm install` újra.

**"Type error in .next/dev/types/validator.ts"** — `rm -rf .next && npm run build` (stale Turbopack cache).

**Dev server befagy** — `Ctrl+C` és újra `npm run dev`. Ha portfoglalt: `lsof -ti:3000 | xargs kill -9`.

**"engines: required: node >=20.19"** — frissítsd Node-ot 22-re (lásd 1. pont).

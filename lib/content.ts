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

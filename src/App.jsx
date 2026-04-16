import { useState, useEffect, useRef } from "react";
import {
  Mountain, MapPin, Moon, Star, AlertTriangle, Fuel, Wifi, Heart,
  ChevronDown, Route, ArrowUpDown, Navigation, Shield, Compass,
  Tent, Home, Plane, Droplets, Wind, Waves, ChevronRight, ArrowUp,
} from "lucide-react";

// ─── THEME COLORS PER TRIP ───────────────────────────────────────────────────
const THEMES = {
  "sahyadri-2023": { accent: "#059669", bg: "#05966918", border: "#05966933" },
  "sahyadri-2024": { accent: "#0891b2", bg: "#0891b218", border: "#0891b233" },
  "zanskar-2025":  { accent: "#7c3aed", bg: "#7c3aed18", border: "#7c3aed33" },
  "ladakh-2026":   { accent: "#e11d48", bg: "#e11d4818", border: "#e11d4833" },
};

// ─── SAHYADRI 2023 ───────────────────────────────────────────────────────────
const SAHYADRI_2023 = {
  id: "sahyadri-2023",
  name: "Sahyadri 2023",
  route: "Mangalore → Pune",
  dates: "16–22 Sep 2023",
  tagline: "Coast to Cloud Forest · 7 days",
  nights: 6,
  distance: "~900 km",
  highlights: "5 waterfalls · 4 states · Coastal + Ghats",
  stops: [
    { num: 1, name: "Gokarna",  date: "16 Sep", nights: "1N", stay: "Guesthouse in Gokarna",  enroute: ["Murudeshwar Temple"], note: null },
    { num: 2, name: "Goa",      date: "17 Sep", nights: "1N", stay: "Hotel in Goa",           enroute: ["Butterfly Beach"],    note: null },
    { num: 3, name: "Amboli",   date: "18 Sep", nights: "1N", stay: "Stay in Amboli",         enroute: ["Amboli Waterfalls"],  note: null },
    { num: 4, name: "Mahad",    date: "19 Sep", nights: "1N", stay: "Stay in Mahad",          enroute: ["Mahabaleshwar"],      note: null },
    { num: 5, name: "Bhagad",   date: "20–21 Sep", nights: "2N", stay: "Bhagad camp / homestay",
      enroute: ["Nanemachi Waterfalls (Day 1)", "Kumbhe Waterfalls (Day 1)", "Devkund Waterfalls (Day 2)"], note: null },
    { num: 6, name: "Pune",     date: "22 Sep", nights: "Arrival", stay: "End of trip",       enroute: [], note: null },
  ],
  attractions: [
    { name: "Murudeshwar Temple",  type: "Temple",       day: "Day 1 en route" },
    { name: "Butterfly Beach",     type: "Beach",        day: "Day 2 en route" },
    { name: "Amboli Waterfalls",   type: "Waterfall",    day: "Day 3 en route" },
    { name: "Mahabaleshwar",       type: "Hill Station", day: "Day 4 en route" },
    { name: "Nanemachi Waterfalls",type: "Waterfall",    day: "Day 5" },
    { name: "Kumbhe Waterfalls",   type: "Waterfall",    day: "Day 5" },
    { name: "Devkund Waterfalls",  type: "Waterfall",    day: "Day 6" },
  ],
};

// ─── SAHYADRI 2024 ───────────────────────────────────────────────────────────
const SAHYADRI_2024 = {
  id: "sahyadri-2024",
  name: "Sahyadri 2024",
  route: "Mumbai → Mumbai",
  dates: "21–29 Sep 2024",
  tagline: "Monsoon Loop · 9 days",
  nights: 8,
  distance: "~700 km",
  highlights: "6 waterfalls · Jungle trails · Full Sahyadri circuit",
  stops: [
    { num: 1, name: "Bhandardara", date: "21 Sep",     nights: "1N",      stay: "Stay in Bhandardara",
      enroute: ["Vasundhara Waterfalls"], note: null },
    { num: 2, name: "Malshej Ghat", date: "22–23 Sep", nights: "2N",     stay: "Stay at Malshej Ghat",
      enroute: ["Aadrai Jungle Trail (Day 2)", "Kalu Top View Trek (Day 2)"], note: null },
    { num: 3, name: "Lonavala",    date: "24 Sep",     nights: "1N",      stay: "Stay in Lonavala",
      enroute: ["Kalu Waterfall Base Trek (en route)"], note: null },
    { num: 4, name: "Bhagad",      date: "25–28 Sep",  nights: "4N",     stay: "Bhagad camp / homestay",
      enroute: [
        "Kataldhar Waterfalls (Day 1 en route)",
        "Devkund Waterfalls (Day 2)",
        "Nanemachi Waterfalls + Kumbhe Waterfalls (Day 3)",
        "Savlya Ghat Viewpoint (Day 4)",
      ], note: null },
    { num: 5, name: "Mumbai",      date: "29 Sep",     nights: "Return",  stay: "End of trip",
      enroute: [], note: null },
  ],
  attractions: [
    { name: "Vasundhara Waterfalls",    type: "Waterfall",       day: "Day 1" },
    { name: "Aadrai Jungle Trail",      type: "Trek",            day: "Day 3" },
    { name: "Kalu Top View Trek",       type: "Trek",            day: "Day 3" },
    { name: "Kalu Waterfall Base Trek", type: "Waterfall + Trek",day: "Day 4 en route" },
    { name: "Kataldhar Waterfalls",     type: "Waterfall",       day: "Day 5 en route" },
    { name: "Devkund Waterfalls",       type: "Waterfall",       day: "Day 6" },
    { name: "Nanemachi Waterfalls",     type: "Waterfall",       day: "Day 7" },
    { name: "Kumbhe Waterfalls",        type: "Waterfall",       day: "Day 7" },
    { name: "Savlya Ghat Viewpoint",    type: "Viewpoint",       day: "Day 8" },
  ],
};

// ─── ZANSKAR 2025 ────────────────────────────────────────────────────────────
const ZANSKAR_2025 = {
  id: "zanskar-2025",
  name: "Zanskar 2025",
  route: "Srinagar → Srinagar",
  dates: "2025",
  tagline: "Kashmir to Spiti · The Great Zanskar Loop · 1,884 km",
  nights: 9,
  distance: "1,884 km",
  highlights: "5 passes · 6 valleys · 7 rivers",
  stops: [
    { num: 1, name: "Kargil",         nights: "1N", alt: "~2,676m", valley: "Dras Valley",    river: "Dras River",    stay: "Hotel in Kargil",          passes: [{ name: "Zoji La", alt: "3,528m" }], passNote: null, note: null },
    { num: 2, name: "Leh",            nights: "1N", alt: "3,524m",  valley: "—",              river: "Indus River",   stay: "Hotel in Leh",             passes: [], passNote: "NH1 through Suru Valley", note: null },
    { num: 3, name: "Padum",          nights: "1N", alt: "~3,657m", valley: "Zanskar Valley", river: "Suru + Zanskar Rivers", stay: "Guesthouse in Padum",
      passes: [{ name: "Sir Sir La", alt: "~4,800m" }, { name: "Singe La", alt: "~5,090m" }],
      passNote: "Via Lamayuru → Sir Sir La → Singe La", note: null },
    { num: 4, name: "Tandi",          nights: "1N", alt: "~2,700m", valley: "Chenab Valley",  river: "Tsarap River",  stay: "Stay in Tandi",            passes: [{ name: "Shinku La", alt: "5,091m" }], passNote: null, note: null },
    { num: 5, name: "Kaza",           nights: "1N", alt: "~3,800m", valley: "Spiti Valley",   river: "Spiti River",   stay: "Guesthouse in Kaza",       passes: [], passNote: "Lahaul valley road into Spiti", note: null },
    { num: 6, name: "Losar",          nights: "1N", alt: "~4,079m", valley: "Spiti Valley",   river: "Spiti River",   stay: "Stay in Losar",            passes: [{ name: "Kunzum La", alt: "4,590m" }], passNote: null, note: null },
    { num: 7, name: "Hudan Bhatori",  nights: "1N", alt: "~2,800m", valley: "Pangi Valley",   river: "Chenab River",  stay: "Remote village stay",      passes: [], passNote: "Pangi Valley road — one of India's most remote", note: "Sister hill range to Sural Bhatori. Extremely remote — limited facilities." },
    { num: 8, name: "Kishtwar",       nights: "1N", alt: "~1,680m", valley: "Chenab Valley",  river: "Chenab River",  stay: "Hotel in Kishtwar",        passes: [], passNote: null, note: null },
    { num: 9, name: "Srinagar",       nights: "Return", alt: "~1,585m", valley: "Kashmir Valley", river: "Jhelum River", stay: "End of trip",            passes: [], passNote: null, note: null },
  ],
  passes: [
    { name: "Zoji La",    alt: 3528, display: "3,528m", feet: "11,575ft", leg: "Srinagar → Kargil" },
    { name: "Sir Sir La", alt: 4800, display: "~4,800m",feet: "~15,748ft",leg: "Leh → Padum (via Lamayuru)" },
    { name: "Singe La",   alt: 5090, display: "~5,090m",feet: "~16,699ft",leg: "Leh → Padum" },
    { name: "Shinku La",  alt: 5091, display: "5,091m", feet: "16,703ft", leg: "Padum → Tandi" },
    { name: "Kunzum La",  alt: 4590, display: "4,590m", feet: "15,059ft", leg: "Losar → Hudan Bhatori" },
  ],
  valleys: ["Dras", "Suru", "Zanskar", "Spiti", "Pangi", "Chenab"],
  rivers:  ["Dras", "Suru", "Indus", "Zanskar", "Tsarap", "Spiti", "Chenab"],
};

// ─── LADAKH 2026 ─────────────────────────────────────────────────────────────
const LADAKH_STOPS = [
  { num: 1, name: "Leh",    date: "3 Oct",     nights: "Arrival",   alt: "3,524m",  sleep: "Hotel in Leh",   activities: "Arrive, rest, acclimatise. Leh Palace, Shanti Stupa, Hall of Fame. Collect all permits (ILP for Nubra, Pangong, Hanle, Karzok/Chumur) from DC office.", passes: [], passNote: null, notes: ["Spend day collecting permits. No exertion on day 1."] },
  { num: 2, name: "Diskit", date: "4–5 Oct",   nights: "1N",        alt: "3,072m",  sleep: "Guesthouse or camp in Diskit / Hunder", activities: "Diskit Monastery, 106ft Maitreya Buddha statue, Hunder sand dunes, Bactrian camel safari.", passes: [{ name: "Khardung La", alt: "5,359m" }], passNote: null, notes: ["Fill fuel fully at Diskit — last reliable petrol pump for days."] },
  { num: 3, name: "Merak",  date: "5–6 Oct",   nights: "1N",        alt: "~4,350m", sleep: "Village homestay — book via driver in advance, very basic", activities: "Pangong south shore walk, nomadic Changpa culture, raw lake views beyond Spangmik.", passes: [], passNote: "No high pass — Shyok valley road via Khalsar → Agham → Durbuk → Tangtse", notes: ["Indians only beyond Merak. Foreigners not permitted."] },
  { num: 4, name: "Rhongo", date: "6–7 Oct",   nights: "1N",        alt: "~4,200m", sleep: "Basic homestay", activities: "Rest after brutal Merak–Chusul dirt track. Indus valley views. Optional Mig La recce with driver.", passes: [{ name: "Chusul La", alt: "~4,350m" }, { name: "Rezang La", alt: "~4,650m" }, { name: "Tsaga La", alt: "4,635m" }], passNote: null, notes: ["Dirt track Merak→Chusul. Army checkposts throughout. Submit photography equipment at Loma checkpoint.", "Mig La contingency: if army permits civilian access, detour Rhongo → Likaru → Mig La 5,913m → Fukche → Hanle is possible — confirm in Leh."] },
  { num: 5, name: "Hanle",  date: "7–9 Oct",   nights: "2N",        alt: "4,300m",  sleep: "Padma Homestay recommended — book in advance. BSNL network only.", activities: "Night 1 — rest, stargazing (one of Asia's darkest skies, Milky Way visible), Hanle Monastery. Day 2 — Umling La loop: Hanle → Photi La 5,524m → Nurbu La ~5,400m → Umling La 5,799m (world's 2nd highest motorable road) → back to Hanle (~216km full day).", passes: [], passNote: "Direct road from Rhongo via Loma junction (~48km, 1hr)", notes: ["No ATMs in Hanle — carry sufficient cash.", "Carry oxygen cylinder. Max 15 min at Umling La summit. Acclimatise first night fully before attempting Umling La."] },
  { num: 6, name: "Karzok", date: "9–10 Oct",  nights: "1N",        alt: "4,522m",  label: "Tso Moriri", sleep: "Hotel or homestay in Karzok village", activities: "Walk on Tso Moriri shore, Korzok Monastery (17th century), bar-headed geese and black-necked cranes still present in October.", passes: [{ name: "Namashang La", alt: "~4,800m" }], passNote: "Route: Hanle → Loma → Nyoma → Mahe → Sumdo → Namashang La → Karzok (~150km).", notes: [] },
  { num: 7, name: "Thukje", date: "10–11 Oct", nights: "1N",        alt: "~4,100m", sleep: "Basic guesthouse — decompression night before Leh", activities: "Thukje Monastery, Indus River valley views, relative warmth after high altitude days.", passes: [{ name: "Polo Kongka La", alt: "~4,900m" }, { name: "Taglang La", alt: "5,328m" }], passNote: "Route: Karzok → Sumdo → Polo Kongka La → Tso Kar → Debring → Taglang La → Rumtse → Pang → Thukje (~145km)", notes: ["Sumdo–Polo Kongka La road extremely rough. Taglang La can have early snow in October."] },
  { num: 8, name: "Leh",    date: "11–12 Oct", nights: "Departure", alt: "3,524m",  sleep: "Hotel in Leh", activities: "Thiksey Monastery, Shey Palace en route from Thukje. Leh market for souvenirs. Rest.", passes: [], passNote: "NH3 → Upshi → NH1 Indus valley road — smooth, no major pass (~200km, 4–5hrs)", notes: [] },
];

const LADAKH_PASSES = [
  { name: "Khardung La",   alt: 5359, display: "5,359m", feet: "17,582ft", leg: "Leh → Diskit",           type: "high" },
  { name: "Chusul La",     alt: 4350, display: "~4,350m",feet: "~14,272ft",leg: "Merak → Rhongo",         type: "default" },
  { name: "Rezang La",     alt: 4650, display: "~4,650m",feet: "~15,256ft",leg: "Merak → Rhongo",         type: "default" },
  { name: "Tsaga La",      alt: 4635, display: "4,635m", feet: "15,207ft", leg: "Merak → Rhongo",         type: "default" },
  { name: "Mig La",        alt: 5913, display: "5,913m", feet: "19,400ft", leg: "Rhongo → Hanle (contingency)", type: "record", note: "World's highest motorable road*" },
  { name: "Photi La",      alt: 5524, display: "5,524m", feet: "18,124ft", leg: "Hanle → Umling La loop", type: "high" },
  { name: "Nurbu La",      alt: 5400, display: "~5,400m",feet: "~17,717ft",leg: "Hanle → Umling La loop", type: "default" },
  { name: "Umling La",     alt: 5799, display: "5,799m", feet: "19,024ft", leg: "Hanle → Umling La loop", type: "record", note: "World's 2nd highest motorable road" },
  { name: "Namashang La",  alt: 4800, display: "~4,800m",feet: "~15,748ft",leg: "Hanle → Karzok",         type: "default" },
  { name: "Polo Kongka La",alt: 4900, display: "~4,900m",feet: "~16,076ft",leg: "Karzok → Thukje",        type: "default" },
  { name: "Taglang La",    alt: 5328, display: "5,328m", feet: "17,480ft", leg: "Karzok → Thukje",        type: "high" },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(26px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── STARFIELD ───────────────────────────────────────────────────────────────
function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let stars = [];
    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight * 0.7,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random(),
        spd: Math.random() * 0.007 + 0.002,
        ph: Math.random() * Math.PI * 2,
      }));
    }
    function draw(t) {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      stars.forEach(s => {
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * s.spd + s.ph));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${tw * s.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />;
}

function MountainSVG() {
  return (
    <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 1, height: "38%" }}>
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,400 L0,280 Q60,220 120,260 Q180,200 240,230 Q320,140 400,200 Q440,170 500,210 Q560,120 640,180 Q700,90 760,160 Q820,80 880,140 Q940,60 1020,130 Q1080,70 1140,120 Q1200,90 1280,160 Q1340,110 1400,180 L1440,150 L1440,400 Z" fill="#1a1a2e" opacity="0.7"/>
        <path d="M0,400 L0,320 Q80,270 160,300 Q240,240 340,280 Q400,220 480,270 Q560,190 660,250 Q740,170 820,230 Q900,160 980,220 Q1060,170 1140,200 Q1220,160 1300,210 Q1360,180 1440,220 L1440,400 Z" fill="#12121f" opacity="0.85"/>
        <path d="M0,400 L0,350 Q100,310 200,340 Q300,290 420,330 Q520,280 620,320 Q720,270 840,310 Q940,280 1060,320 Q1160,290 1260,330 Q1340,300 1440,340 L1440,400 Z" fill="#0f1117"/>
      </svg>
    </div>
  );
}

// ─── PORTFOLIO HERO ──────────────────────────────────────────────────────────
const TRIP_CARDS = [
  { id: "sahyadri-2023", year: "'23", name: "Sahyadri 2023", route: "Mangalore → Pune",       km: "~900 km",  nights: 6, tag: "Coast + Ghats" },
  { id: "sahyadri-2024", year: "'24", name: "Sahyadri 2024", route: "Mumbai → Mumbai",         km: "~700 km",  nights: 8, tag: "Monsoon Loop" },
  { id: "zanskar-2025",  year: "'25", name: "Zanskar 2025",  route: "Srinagar → Srinagar",     km: "1,884 km", nights: 9, tag: "5 Passes · 6 Valleys" },
  { id: "ladakh-2026",   year: "'26", name: "Ladakh 2026",   route: "Leh → Leh",               km: "~1,400 km",nights: 8, tag: "UPCOMING · 11 Passes", upcoming: true },
];

function PortfolioHero() {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", background: "linear-gradient(180deg,#050810 0%,#0f1117 100%)" }}>
      <Starfield />
      <MountainSVG />
      <div className="relative text-center px-6 pb-16" style={{ zIndex: 2 }}>
        <Reveal>
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#e11d48" }}>
            Vinoth · Road Trip Chronicles
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-bold" style={{ fontSize: "clamp(2.8rem,7vw,6rem)", lineHeight: 1.08, color: "#f1f1f1" }}>
            4 Trips.<br /><span style={{ color: "#e11d48" }}>One Obsession.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-base max-w-lg mx-auto" style={{ color: "#64748b" }}>
            Sahyadri '23 · Sahyadri '24 · Zanskar '25 · Ladakh '26
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            {[{ label: "Total KMs", value: "~4,984" }, { label: "Total Nights", value: "31" }, { label: "Passes", value: "16" }].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#f1f1f1" }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.42}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 max-w-4xl mx-auto">
            {TRIP_CARDS.map(t => {
              const th = THEMES[t.id];
              return (
                <a key={t.id} href={`#${t.id}`}
                  className="rounded-xl p-4 text-left transition-all duration-300 hover:scale-105"
                  style={{ background: t.upcoming ? th.bg : "#181b25", border: `1px solid ${t.upcoming ? th.border : "#1e2230"}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: th.bg, color: th.accent, border: `1px solid ${th.border}` }}>
                      {t.year}
                    </span>
                    {t.upcoming && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#e11d48", color: "#fff" }}>
                        UPCOMING
                      </span>
                    )}
                  </div>
                  <p className="font-bold mt-2 text-sm" style={{ color: "#f1f1f1" }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{t.route}</p>
                  <p className="text-xs mt-2 font-medium" style={{ color: th.accent }}>{t.tag}</p>
                  <p className="text-xs mt-1.5" style={{ color: "#374151" }}>{t.km} · {t.nights}N</p>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── SHARED: TRIP HEADER ──────────────────────────────────────────────────────
function TripHeader({ id, name, route, dates, tagline, nights, distance, highlights, color, bg, border, badge }) {
  return (
    <div id={id} className="w-full py-20 px-4" style={{ background: "#0b0e15", borderTop: `2px solid ${border}` }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: bg, color, border: `1px solid ${border}` }}>{name}</span>
            <span className="text-xs" style={{ color: "#475569" }}>{dates}</span>
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#f1f1f1" }}>{route}</h2>
          <p className="text-lg mt-3" style={{ color }}>{tagline}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="flex flex-wrap gap-8 mt-8">
            {[{ l: "Distance", v: distance }, { l: "Nights", v: `${nights}N` }, { l: "Highlights", v: highlights }].map(s => (
              <div key={s.l}>
                <p className="text-xl font-bold" style={{ color: "#f1f1f1" }}>{s.v}</p>
                <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── SHARED: SECTION LABEL ────────────────────────────────────────────────────
function SLabel({ color, children }) {
  return <p className="text-xs tracking-[0.3em] uppercase mb-2 font-semibold" style={{ color }}>{children}</p>;
}

// ─── SHARED: WARNING BOX ──────────────────────────────────────────────────────
function Warning({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-lg p-3" style={{ background: "#92400e12", border: "1px solid #92400e33" }}>
      <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
      <p className="text-xs" style={{ color: "#fbbf24" }}>{text}</p>
    </div>
  );
}

// ─── SAHYADRI STOP CARD ───────────────────────────────────────────────────────
function SahyadriStop({ stop, color, bg, border }) {
  const isEnd = stop.nights === "Arrival" || stop.nights === "Return";
  return (
    <Reveal className="relative pl-10 md:pl-16 pb-10">
      <div className="absolute left-0 md:left-4 top-2 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: color, boxShadow: `0 0 10px ${color}55` }}>
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
      <div className="rounded-xl overflow-hidden" style={{ background: "#181b25", border: "1px solid #1e2230" }}>
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3" style={{ borderBottom: "1px solid #1e2230" }}>
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl font-bold" style={{ color }}>{String(stop.num).padStart(2, "0")}</span>
            <div>
              <h3 className="text-lg font-bold" style={{ color: "#f1f1f1" }}>{stop.name}</h3>
              {stop.date && <p className="text-xs" style={{ color: "#64748b" }}>{stop.date}</p>}
            </div>
          </div>
          {!isEnd && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: bg, color, border: `1px solid ${border}` }}>
              <Moon size={11} /> {stop.nights}
            </span>
          )}
        </div>
        <div className="p-4 md:p-5 space-y-3">
          {stop.enroute.length > 0 && (
            <div className="flex items-start gap-3">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color }}>Visited</p>
                <div className="flex flex-wrap gap-2">
                  {stop.enroute.map(e => (
                    <span key={e} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                      style={{ background: bg, color, border: `1px solid ${border}` }}>
                      <Droplets size={10} /> {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Home size={14} className="flex-shrink-0" style={{ color: "#475569" }} />
            <p className="text-sm" style={{ color: "#94a3b8" }}>{stop.stay}</p>
          </div>
          {stop.note && <Warning text={stop.note} />}
        </div>
      </div>
    </Reveal>
  );
}

function SahyadriSection({ data, nextId }) {
  const { accent: color, bg, border } = THEMES[data.id];
  return (
    <>
      <TripJumpStrip currentId={data.id} />
      <TripHeader id={data.id} name={data.name} route={data.route} dates={data.dates}
        tagline={data.tagline} nights={data.nights} distance={data.distance}
        highlights={data.highlights} color={color} bg={bg} border={border} />

      {/* Timeline */}
      <div className="w-full py-16 px-4" style={{ background: "#0f1117" }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="mb-10">
            <SLabel color={color}>Itinerary</SLabel>
            <h3 className="text-2xl font-bold" style={{ color: "#f1f1f1" }}>Stop by Stop</h3>
          </Reveal>
          <div className="relative">
            <div className="absolute left-2 md:left-6 top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(180deg,${color}00,${color},${color},${color}00)` }} />
            {data.stops.map(s => <SahyadriStop key={s.num} stop={s} color={color} bg={bg} border={border} />)}
          </div>
        </div>
      </div>

      {/* Attractions */}
      <div className="w-full py-16 px-4" style={{ background: "#0b0e15" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-10">
            <SLabel color={color}>Highlights</SLabel>
            <h3 className="text-2xl font-bold" style={{ color: "#f1f1f1" }}>Places Visited</h3>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {data.attractions.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.04}>
                <div className="rounded-xl p-4 transition-all duration-300 hover:scale-[1.04]"
                  style={{ background: "#181b25", border: "1px solid #1e2230" }}>
                  <Droplets size={18} className="mb-2" style={{ color }} />
                  <p className="text-sm font-semibold" style={{ color: "#f1f1f1" }}>{a.name}</p>
                  <p className="text-xs mt-1 font-medium" style={{ color }}>{a.type}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{a.day}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <NextTripButton nextId={nextId} />
    </>
  );
}

// ─── ZANSKAR STOP CARD ────────────────────────────────────────────────────────
function ZanskarStop({ stop, color, bg, border }) {
  const isReturn = stop.nights === "Return";
  return (
    <Reveal className="relative pl-10 md:pl-16 pb-10">
      <div className="absolute left-0 md:left-4 top-2 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: color, boxShadow: `0 0 10px ${color}55` }}>
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
      <div className="rounded-xl overflow-hidden" style={{ background: "#181b25", border: "1px solid #1e2230" }}>
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3" style={{ borderBottom: "1px solid #1e2230" }}>
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl font-bold" style={{ color }}>{String(stop.num).padStart(2, "0")}</span>
            <div>
              <h3 className="text-lg font-bold" style={{ color: "#f1f1f1" }}>{stop.name}</h3>
              <p className="text-xs" style={{ color: "#64748b" }}>{stop.alt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
              style={{ background: "#1e2230", color: "#94a3b8", border: "1px solid #2a2e3d" }}>
              <Mountain size={10} /> {stop.alt}
            </span>
            {!isReturn && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                style={{ background: bg, color, border: `1px solid ${border}` }}>
                <Moon size={10} /> {stop.nights}
              </span>
            )}
          </div>
        </div>
        <div className="p-4 md:p-5 space-y-3">
          {(stop.passes.length > 0 || stop.passNote) && (
            <div className="flex items-start gap-3">
              <Mountain size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color }}>Passes</p>
                {stop.passes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-1.5">
                    {stop.passes.map(p => (
                      <span key={p.name} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                        style={{ background: bg, color, border: `1px solid ${border}` }}>
                        {p.name} {p.alt}
                      </span>
                    ))}
                  </div>
                )}
                {stop.passNote && <p className="text-xs italic" style={{ color: "#64748b" }}>{stop.passNote}</p>}
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <Waves size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#475569" }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#475569" }}>Valley · River</p>
              <p className="text-sm" style={{ color: "#94a3b8" }}>{stop.valley} · {stop.river}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Home size={14} className="flex-shrink-0" style={{ color: "#374151" }} />
            <p className="text-sm" style={{ color: "#94a3b8" }}>{stop.stay}</p>
          </div>
          {stop.note && <Warning text={stop.note} />}
        </div>
      </div>
    </Reveal>
  );
}

function ZanskarSection() {
  const d = ZANSKAR_2025;
  const { accent: color, bg, border } = THEMES["zanskar-2025"];
  return (
    <>
      <TripJumpStrip currentId="zanskar-2025" />
      <TripHeader id="zanskar-2025" name={d.name} route={d.route} dates={d.dates}
        tagline={d.tagline} nights={d.nights} distance={d.distance}
        highlights={d.highlights} color={color} bg={bg} border={border} />

      {/* Valleys & Rivers */}
      <div className="w-full py-12 px-4" style={{ background: "#0f1117" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal>
            <div className="rounded-xl p-5" style={{ background: "#181b25", border: "1px solid #1e2230" }}>
              <div className="flex items-center gap-2 mb-4">
                <Wind size={16} style={{ color }} />
                <p className="text-sm font-semibold" style={{ color }}>Valleys Traversed</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {d.valleys.map(v => (
                  <span key={v} className="px-3 py-1 rounded-full text-sm" style={{ background: bg, color, border: `1px solid ${border}` }}>{v}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl p-5" style={{ background: "#181b25", border: "1px solid #1e2230" }}>
              <div className="flex items-center gap-2 mb-4">
                <Waves size={16} style={{ color }} />
                <p className="text-sm font-semibold" style={{ color }}>Rivers Followed</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {d.rivers.map(r => (
                  <span key={r} className="px-3 py-1 rounded-full text-sm" style={{ background: "#1e2230", color: "#94a3b8", border: "1px solid #2a2e3d" }}>{r}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full py-16 px-4" style={{ background: "#0b0e15" }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="mb-10">
            <SLabel color={color}>Itinerary</SLabel>
            <h3 className="text-2xl font-bold" style={{ color: "#f1f1f1" }}>Stop by Stop</h3>
          </Reveal>
          <div className="relative">
            <div className="absolute left-2 md:left-6 top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(180deg,${color}00,${color},${color},${color}00)` }} />
            {d.stops.map(s => <ZanskarStop key={s.num} stop={s} color={color} bg={bg} border={border} />)}
          </div>
        </div>
      </div>

      {/* Passes */}
      <div className="w-full py-16 px-4" style={{ background: "#0f1117" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-10">
            <SLabel color={color}>High Altitude</SLabel>
            <h3 className="text-2xl font-bold" style={{ color: "#f1f1f1" }}>5 Passes Crossed</h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...d.passes].sort((a, b) => b.alt - a.alt).map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <div className="rounded-xl p-5 transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: "#181b25", border: `1px solid ${border}` }}>
                  <Mountain size={18} className="mb-3" style={{ color }} />
                  <p className="font-bold" style={{ color: "#f1f1f1" }}>{p.name}</p>
                  <p className="text-2xl font-bold mt-1" style={{ color }}>{p.display}</p>
                  <p className="text-xs mb-2" style={{ color: "#64748b" }}>{p.feet}</p>
                  <p className="text-xs" style={{ color: "#475569" }}>{p.leg}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <NextTripButton nextId="ladakh-2026" />
    </>
  );
}

// ─── LADAKH SECTION ───────────────────────────────────────────────────────────
function LadakhStop({ stop }) {
  const color = "#e11d48";
  const isEnd = stop.nights === "Arrival" || stop.nights === "Departure";
  const Icon = isEnd ? Plane : stop.nights === "2N" ? Tent : Home;
  return (
    <Reveal className="relative pl-10 md:pl-16 pb-10">
      <div className="absolute left-0 md:left-4 top-2 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: color, boxShadow: "0 0 12px #e11d4866" }}>
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
      <div className="rounded-xl overflow-hidden" style={{ background: "#181b25", border: "1px solid #1e2230" }}>
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3" style={{ borderBottom: "1px solid #1e2230" }}>
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl font-bold" style={{ color }}>{String(stop.num).padStart(2, "0")}</span>
            <div>
              <h3 className="text-lg font-bold" style={{ color: "#f1f1f1" }}>
                {stop.name}
                {stop.label && <span className="font-normal text-sm ml-2" style={{ color: "#64748b" }}>({stop.label})</span>}
              </h3>
              <p className="text-xs" style={{ color: "#64748b" }}>{stop.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
              style={{ background: "#1e2230", color: "#94a3b8", border: "1px solid #2a2e3d" }}>
              <Mountain size={10} /> {stop.alt}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
              style={{ background: stop.nights === "2N" ? "#e11d4818" : "#7c3aed18", color: stop.nights === "2N" ? "#e11d48" : "#7c3aed", border: `1px solid ${stop.nights === "2N" ? "#e11d4833" : "#7c3aed33"}` }}>
              <Moon size={10} /> {stop.nights}
            </span>
          </div>
        </div>
        <div className="p-4 md:p-5 space-y-3">
          <div className="flex items-start gap-3">
            <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#7c3aed" }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7c3aed" }}>Sleep</p>
              <p className="text-sm" style={{ color: "#cbd5e1" }}>{stop.sleep}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Compass size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#0ea5e9" }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#0ea5e9" }}>Activities</p>
              <p className="text-sm" style={{ color: "#cbd5e1" }}>{stop.activities}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mountain size={14} className="mt-0.5 flex-shrink-0" style={{ color }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color }}>Passes</p>
              {stop.passes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {stop.passes.map(p => (
                    <span key={p.name} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                      style={{ background: p.name === "Mig La" ? "#92400e22" : "#e11d4818", color: p.name === "Mig La" ? "#fbbf24" : "#fb7185", border: `1px solid ${p.name === "Mig La" ? "#92400e44" : "#e11d4833"}` }}>
                      {p.name} {p.alt}{p.name === "Mig La" && "*"}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm italic" style={{ color: "#64748b" }}>{stop.passNote || "None"}</p>
              )}
              {stop.passes.length > 0 && stop.passNote && (
                <p className="text-xs mt-1.5 italic" style={{ color: "#64748b" }}>{stop.passNote}</p>
              )}
            </div>
          </div>
          {stop.notes.map((n, i) => <Warning key={i} text={n} />)}
        </div>
      </div>
    </Reveal>
  );
}

function LadakhSection() {
  const [sortByAlt, setSortByAlt] = useState(false);
  const sorted = sortByAlt ? [...LADAKH_PASSES].sort((a, b) => b.alt - a.alt) : LADAKH_PASSES;
  const color = "#e11d48";
  const bg = "#e11d4818";
  const border = "#e11d4833";

  return (
    <>
      <TripJumpStrip currentId="ladakh-2026" />
      <div id="ladakh-2026" className="w-full py-20 px-4" style={{ background: "#0b0e15", borderTop: `2px solid ${border}` }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: bg, color, border: `1px solid ${border}` }}>Ladakh 2026</span>
              <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: color, color: "#fff" }}>UPCOMING</span>
              <span className="text-xs" style={{ color: "#475569" }}>3–12 Oct 2026</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#f1f1f1" }}>Leh → Leh</h2>
            <p className="text-lg mt-3" style={{ color }}>11 passes. 2 world records. 9 days.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { icon: Route,      label: "Distance",      value: "~1,400 km" },
                { icon: Mountain,   label: "Highest Point", value: "Mig La 5,913m*", sub: "Umling La 5,799m if closed" },
                { icon: Moon,       label: "Nights",        value: "8" },
                { icon: Navigation, label: "Passes",        value: "11" },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "#181b25", border: "1px solid #1e2230" }}>
                    <Icon size={22} className="mx-auto mb-2" style={{ color }} />
                    <p className="text-lg font-bold" style={{ color: "#f1f1f1" }}>{s.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{s.label}</p>
                    {s.sub && <p className="text-xs mt-0.5 italic" style={{ color: "#475569" }}>{s.sub}</p>}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full py-16 px-4" style={{ background: "#0f1117" }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="mb-10">
            <SLabel color={color}>The Route</SLabel>
            <h3 className="text-2xl font-bold" style={{ color: "#f1f1f1" }}>Day-by-Day Itinerary</h3>
          </Reveal>
          <div className="relative">
            <div className="absolute left-2 md:left-6 top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(180deg,${color}00,${color},${color},${color}00)` }} />
            {LADAKH_STOPS.map(s => <LadakhStop key={s.num} stop={s} />)}
          </div>
        </div>
      </div>

      {/* Passes */}
      <div className="w-full py-16 px-4" style={{ background: "#0b0e15" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-6">
            <SLabel color={color}>High Altitude</SLabel>
            <h3 className="text-2xl font-bold" style={{ color: "#f1f1f1" }}>All 11 Passes</h3>
          </Reveal>
          <div className="flex justify-center mb-8">
            <button onClick={() => setSortByAlt(v => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{ background: "#1e2230", color: "#94a3b8", border: "1px solid #2a2e3d" }}>
              <ArrowUpDown size={13} />
              {sortByAlt ? "Sort by route order" : "Sort by altitude"}
            </button>
          </div>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#fbbf24" }}><Star size={11} /> World record</span>
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#fb7185" }}><Mountain size={11} /> High / challenging</span>
            <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#64748b" }}>● Standard</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((p, i) => {
              const pbg = p.type === "record" ? "#92400e15" : p.type === "high" ? "#e11d4812" : "#181b25";
              const pbd = p.type === "record" ? "#92400e44" : p.type === "high" ? "#e11d4833" : "#1e2230";
              const pac = p.type === "record" ? "#fbbf24" : p.type === "high" ? "#fb7185" : "#94a3b8";
              return (
                <Reveal key={p.name} delay={i * 0.05}>
                  <div className="rounded-xl p-5 transition-all duration-300 hover:scale-[1.03]" style={{ background: pbg, border: `1px solid ${pbd}` }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm" style={{ color: "#f1f1f1" }}>
                        {p.name}{p.name === "Mig La" && <span style={{ color: "#fbbf24" }}>*</span>}
                      </h4>
                      {p.type === "record" && <Star size={14} style={{ color: "#fbbf24" }} />}
                      {p.type === "high" && <Mountain size={14} style={{ color: "#fb7185" }} />}
                    </div>
                    <p className="text-xl font-bold mb-0.5" style={{ color: pac }}>{p.display}</p>
                    <p className="text-xs mb-2" style={{ color: "#64748b" }}>{p.feet}</p>
                    <p className="text-xs" style={{ color: "#475569" }}>{p.leg}</p>
                    {p.note && <p className="text-xs mt-2 italic font-medium" style={{ color: pac }}>{p.note}</p>}
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="text-center text-xs mt-8 italic" style={{ color: "#475569" }}>
            * Mig La access subject to army clearance — confirm on ground in Leh
          </p>
        </div>
      </div>

      {/* Practical */}
      <div className="w-full py-16 px-4" style={{ background: "#0f1117" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-10">
            <SLabel color={color}>Be Prepared</SLabel>
            <h3 className="text-2xl font-bold" style={{ color: "#f1f1f1" }}>Practical Info</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Shield, title: "Permits",      c: "#7c3aed", text: "ILP required for Nubra, Pangong, Hanle, Karzok/Chumur — collect from DC office Leh on Day 1." },
              { icon: Fuel,   title: "Fuel",         c: "#f59e0b", text: "Fill at Leh and Diskit (last pump). Carry extra jerry can from Diskit onwards." },
              { icon: Wifi,   title: "Connectivity", c: "#0ea5e9", text: "Airtel/Jio postpaid works most of Nubra and Shyok. BSNL only in Hanle. No network at Tso Moriri." },
              { icon: Heart,  title: "Health",       c: "#ef4444", text: "Carry oxygen cylinders from Leh. AMS risk above 4,500m. Max 15 min at Umling La. Acclimatise 1 full day in Leh before driving." },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="rounded-xl p-5 h-full" style={{ background: "#181b25", border: "1px solid #1e2230" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: p.c + "18" }}>
                        <Icon size={18} style={{ color: p.c }} />
                      </div>
                      <h4 className="font-bold" style={{ color: "#f1f1f1" }}>{p.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TRIP JUMP NAV (inline strip between sections) ───────────────────────────
const JUMP_LINKS = [
  { id: "sahyadri-2023", label: "Sahyadri '23" },
  { id: "sahyadri-2024", label: "Sahyadri '24" },
  { id: "zanskar-2025",  label: "Zanskar '25"  },
  { id: "ladakh-2026",   label: "Ladakh '26"   },
];

function TripJumpStrip({ currentId }) {
  return (
    <div className="w-full py-4 px-4 overflow-x-auto" style={{ background: "#080b11", borderBottom: "1px solid #1e2230" }}>
      <div className="flex items-center gap-2 min-w-max mx-auto w-fit">
        <a href="#home" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
          style={{ background: "#1e2230", color: "#64748b", border: "1px solid #2a2e3d" }}>
          <ArrowUp size={11} /> All Trips
        </a>
        <span style={{ color: "#1e2230" }}>|</span>
        {JUMP_LINKS.map(l => {
          const th = THEMES[l.id];
          const active = l.id === currentId;
          return (
            <a key={l.id} href={`#${l.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: active ? th.accent : th.bg,
                color: active ? "#fff" : th.accent,
                border: `1px solid ${active ? th.accent : th.border}`,
              }}>
              {l.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function NextTripButton({ nextId }) {
  if (!nextId) return null;
  const th = THEMES[nextId];
  const label = JUMP_LINKS.find(l => l.id === nextId)?.label;
  return (
    <div className="w-full py-10 flex justify-center" style={{ background: "#080b11" }}>
      <a href={`#${nextId}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ background: th.bg, color: th.accent, border: `1px solid ${th.border}` }}>
        Next: {label} <ChevronRight size={16} />
      </a>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Home",          href: "#home",          color: "#64748b" },
    { label: "Sahyadri '23", href: "#sahyadri-2023", color: THEMES["sahyadri-2023"].accent },
    { label: "Sahyadri '24", href: "#sahyadri-2024", color: THEMES["sahyadri-2024"].accent },
    { label: "Zanskar '25",  href: "#zanskar-2025",  color: THEMES["zanskar-2025"].accent },
    { label: "Ladakh '26",   href: "#ladakh-2026",   color: THEMES["ladakh-2026"].accent },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? "#0f1117ee" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1e2230" : "1px solid transparent",
      }}>
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <a href="#home" className="text-sm font-bold tracking-wide" style={{ color: "#e11d48" }}>ROAD TRIPS</a>
        <div className="hidden md:flex items-center gap-5">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-xs tracking-wider uppercase transition-colors duration-200 hover:opacity-100 opacity-70 hover:opacity-100"
              style={{ color: l.color }}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex md:hidden items-center gap-2">
          {[["#sahyadri-2023","'23"],["#sahyadri-2024","'24"],["#zanskar-2025","'25"],["#ladakh-2026","'26"]].map(([href, yr], i) => {
            const c = Object.values(THEMES)[i].accent;
            return (
              <a key={href} href={href} className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: c + "22", color: c }}>{yr}</a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="w-full py-12 px-4 text-center" style={{ background: "#0f1117", borderTop: "1px solid #1e2230" }}>
      <p className="text-sm font-semibold" style={{ color: "#f1f1f1" }}>Road Trip Chronicles · Vinoth</p>
      <p className="text-xs mt-2" style={{ color: "#475569" }}>Sahyadri '23 · Sahyadri '24 · Zanskar '25 · Ladakh '26</p>
      <p className="text-xs mt-3 italic" style={{ color: "#374151" }}>Ladakh '26 · Mig La access subject to army clearance — confirm on ground in Leh</p>
      <div className="flex justify-center gap-2 mt-6">
        {[Mountain, Star, MapPin, Droplets, Waves].map((Icon, i) => (
          <Icon key={i} size={13} style={{ color: "#1e2230" }} />
        ))}
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.background = "#0f1117";
    document.body.style.margin = "0";
  }, []);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: "#e2e8f0", background: "#0f1117", minHeight: "100vh" }}>
      <Nav />
      <PortfolioHero />
      <SahyadriSection data={SAHYADRI_2023} nextId="sahyadri-2024" />
      <SahyadriSection data={SAHYADRI_2024} nextId="zanskar-2025" />
      <ZanskarSection />
      <LadakhSection />
      <Footer />
    </div>
  );
}

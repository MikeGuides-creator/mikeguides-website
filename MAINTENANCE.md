import React, { useMemo, useRef, useState } from "react";

/**
 * MikeGuides Tools — Single-file React prototype
 * - Tool 1: Profit Price Calculator (tiered pricing + margin/markup views)
 * - Tool 2: Image Resizer/Versioner (site-friendly filenames + HTML snippets)
 *
 * Styling: Tailwind (provided by the host environment)
 * Components: plain JSX + utility classes
 */

export default function App() {
  const [tab, setTab] = useState("calculator");
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">MikeGuides Tools</h1>
          <nav className="inline-flex rounded-2xl bg-white p-1 shadow">
            {[
              { id: "calculator", label: "💰 Profit Calculator" },
              { id: "images", label: "🖼️ Image Versioner" },
            ].map((t) => (
              <button
                key={t.id}
                className={
                  "px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition " +
                  (tab === t.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100")
                }
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="grid gap-6">
          {tab === "calculator" ? <ProfitCalculator /> : <ImageVersioner />}
        </div>

        <footer className="pt-6 text-xs text-slate-500">
          <p>
            Prototype — no server required. Exports and advanced features can be added next.
          </p>
        </footer>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Tool 1: Profit Price Calculator
// -----------------------------------------------------------------------------

function ProfitCalculator() {
  const [cost, setCost] = useState(0);
  const [overheadPct, setOverheadPct] = useState(10); // percent of price
  const [targetMarginPct, setTargetMarginPct] = useState(65); // desired margin on price
  const [rounding, setRounding] = useState(".99"); // rounding rule for tiers
  const [tiers, setTiers] = useState(3);

  const results = useMemo(() => {
    const c = Math.max(0, Number(cost) || 0);
    const oh = Math.max(0, Number(overheadPct) || 0) / 100; // of price
    const m = Math.min(0.999, Math.max(0, Number(targetMarginPct) || 0) / 100);

    // Price when margin is on price and overhead is % of price:
    // price = (cost) / (1 - margin - overhead)
    const denom = 1 - m - oh;
    const basePrice = denom > 0 ? c / denom : 0;

    const computed = computeKPIs(basePrice, c, oh, m);

    // tiers around basePrice: -1 step, +0 step, +1 step ... with rounding
    const outTiers = [] as Tier[];
    const step = basePrice * 0.08; // 8% steps for illustration
    const start = basePrice - step * Math.floor(tiers / 2);

    for (let i = 0; i < tiers; i++) {
      const p = start + step * i;
      const rounded = applyRounding(p, rounding);
      outTiers.push(makeTier(rounded, c, oh, m, i === Math.floor(tiers / 2)));
    }

    return { basePrice: applyRounding(basePrice, rounding), kpis: computed, outTiers };
  }, [cost, overheadPct, targetMarginPct, rounding, tiers]);

  return (
    <section className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Inputs">
          <div className="grid gap-4">
            <NumberInput label="Unit cost ($)" value={cost} onChange={setCost} step={0.01} />
            <RangeWithNumber
              label="Overhead (% of price)"
              value={overheadPct}
              onChange={setOverheadPct}
              min={0}
              max={40}
              step={1}
            />
            <RangeWithNumber
              label="Target margin (% of price)"
              value={targetMarginPct}
              onChange={setTargetMarginPct}
              min={10}
              max={95}
              step={1}
            />
            <div className="grid sm:grid-cols-3 gap-3">
              <Select label="Rounding" value={rounding} onChange={setRounding} options={[
                { value: ".00", label: "xx.00" },
                { value: ".49", label: "xx.49" },
                { value: ".95", label: "xx.95" },
                { value: ".99", label: "xx.99" },
              ]} />
              <NumberInput label="# Tiers" value={tiers} onChange={setTiers} min={1} max={7} />
            </div>
          </div>
        </Card>

        <Card title="Result (base)">
          <KPI label="Recommended price" value={fmtCurrency(results.basePrice)} big />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <KPI label="Margin" value={fmtPct(results.kpis.margin)} />
            <KPI label="Overhead" value={fmtPct(results.kpis.overhead)} />
            <KPI label="Unit cost share" value={fmtPct(results.kpis.costShare)} />
            <KPI label="Markup on cost" value={fmtPct(results.kpis.markupOnCost)} />
          </div>
        </Card>
      </div>

      <Card title="Tiered prices (choose one)">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.outTiers.map((t, i) => (
            <div key={i} className={"rounded-2xl border p-4 " + (t.isBase ? "border-slate-900" : "border-slate-200") }>
              <div className="text-sm text-slate-500">Tier {i + 1}{t.isBase && " • base"}</div>
              <div className="text-2xl font-bold mt-1">{fmtCurrency(t.price)}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Margin</div><div className="text-right font-semibold">{fmtPct(t.margin)}</div>
                <div>Markup</div><div className="text-right font-semibold">{fmtPct(t.markupOnCost)}</div>
                <div>Overhead</div><div className="text-right font-semibold">{fmtPct(t.overhead)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Notes">
        <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
          <li>Margin is computed on selling price; overhead is treated as a percentage of price.</li>
          <li>Use rounding to keep prices human-friendly (e.g., .99 endings).</li>
          <li>We can add PDF quote export, tax, shipping, and breakeven charts next.</li>
        </ul>
      </Card>
    </section>
  );
}

// Helpers for calculator
function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n || 0);
}
function fmtPct(n: number) { return `${(n * 100).toFixed(1)}%`; }

type KPISet = { margin: number; overhead: number; costShare: number; markupOnCost: number };
function computeKPIs(price: number, cost: number, overheadRate: number, marginRate: number): KPISet {
  const overhead = price * overheadRate;
  const profit = price - cost - overhead;
  const margin = price > 0 ? profit / price : 0;
  const markupOnCost = cost > 0 ? profit / cost : 0;
  const costShare = price > 0 ? cost / price : 0;
  return { margin, overhead: overheadRate, costShare, markupOnCost };
}
function applyRounding(price: number, rule: string) {
  // snap to whole dollars then add ending like .99
  const whole = Math.max(0, Math.round(price));
  const ending = Number(rule);
  return whole + ending;
}
function makeTier(price: number, cost: number, ohRate: number, mRate: number, isBase: boolean) {
  const k = computeKPIs(price, cost, ohRate, mRate);
  return { price, ...k, isBase } as Tier;
}

type Tier = ReturnType<typeof makeTier>;

// -----------------------------------------------------------------------------
// Tool 2: Image Resizer/Versioner
// -----------------------------------------------------------------------------

function ImageVersioner() {
  const [file, setFile] = useState<File | null>(null);
  const [slug, setSlug] = useState("ai-marketing-toolkit");
  const [version, setVersion] = useState("20251023a");
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [quality, setQuality] = useState(0.92);
  const [square, setSquare] = useState(true);

  const [log, setLog] = useState<string>("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  const presets: Preset[] = [
    { label: "Product card 960×960", w: 960, h: 960, key: "960x960" },
    { label: "OG/Share 1200×630", w: 1200, h: 630, key: "1200x630" },
  ];

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setLog(`Loaded ${f.name} (${img.width}×${img.height})`);
    };
    img.onerror = () => setLog("Could not load this image file.");
    img.src = url;
  }

  async function generate() {
    if (!imgRef.current) { setLog("Pick an image first."); return; }
    const img = imgRef.current;
    const out: Generated[] = [];

    for (const p of presets) {
      const canvas = document.createElement("canvas");
      canvas.width = p.w;
      canvas.height = p.h;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff"; // white background for JPEG
      ctx.fillRect(0, 0, p.w, p.h);

      // Fit image to rect (cover)
      const ratio = Math.max(p.w / img.width, p.h / img.height);
      const dw = Math.round(img.width * ratio);
      const dh = Math.round(img.height * ratio);
      const dx = Math.round((p.w - dw) / 2);
      const dy = Math.round((p.h - dh) / 2);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, dx, dy, dw, dh);

      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), format, quality)
      );

      const baseName = square
        ? `${slug}.v${version}.${p.key}`
        : `${slug}.v${version}.${p.w}`;
      const filename = `${baseName}.${format === "image/jpeg" ? "jpg" : "png"}`;

      out.push({ filename, blob, preset: p });
    }

    // Offer downloads
    out.forEach(({ filename, blob }) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    setLog(
      `Generated ${out.length} files for slug "${slug}" v${version}.\n` +
        out.map((g) => ` • ${g.filename}`).join("\n")
    );
  }

  const htmlSnippet = useMemo(() => {
    const cardName = `${slug}.v${version}.960x960.${format === "image/jpeg" ? "jpg" : "png"}`;
    return `<!-- Product card -->\n<img data-seasonal\n  alt="${humanize(slug)}" width="960" height="960" loading="lazy"\n  class="rounded-xl object-cover w-full"\n  data-src-default="/assets/images/products/${slug}/${slug}.v${version}.960.png"/>\n\n<!-- Halloween override example -->\n<!-- data-src-halloween=\"/assets/images/products/card_hallow_${slug.replace(/-/g, "")}.v${version}.960x960.jpg\" -->`;
  }, [slug, version, format]);

  return (
    <section className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Image & Settings" className="md:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Pick image</label>
              <input type="file" accept="image/*" onChange={onPick} className="block w-full" />
              <p className="text-xs text-slate-500">Large, square-ish source recommended (≥ 1200px).</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="Slug" value={slug} onChange={setSlug} placeholder="ai-marketing-toolkit" />
              <TextInput label="Version token" value={version} onChange={setVersion} placeholder="20251023a" />
              <Select label="Format" value={format} onChange={(v)=>setFormat(v as any)} options={[
                { value: "image/jpeg", label: "JPEG (.jpg)" },
                { value: "image/png", label: "PNG (.png)" },
              ]} />
              <RangeWithNumber label="Quality" value={Math.round(quality*100)} onChange={(n)=>setQuality(n/100)} min={60} max={100} step={1} />
            </div>
          </div>

          <div className="mt-4">
            <button onClick={generate} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 font-semibold hover:opacity-90">
              Generate presets
            </button>
            <p className="mt-3 text-xs text-slate-500 whitespace-pre-line">{log}</p>
          </div>
        </Card>

        <Card title="Preview">
          <div className="aspect-square rounded-xl bg-white border grid place-items-center overflow-hidden">
            {file ? (
              <img alt="preview" className="max-w-full max-h-full" src={file ? URL.createObjectURL(file) : ""} />
            ) : (
              <div className="text-slate-400 text-sm">No image selected</div>
            )}
          </div>
        </Card>
      </div>

      <Card title="HTML snippet (copy-paste)">
        <pre className="text-xs bg-white rounded-xl p-4 border overflow-auto">{htmlSnippet}</pre>
      </Card>
    </section>
  );
}

// -----------------------------------------------------------------------------
// UI primitives
// -----------------------------------------------------------------------------

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={"rounded-2xl border border-slate-200 bg-white p-5 shadow-sm " + className}>
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      {children}
    </section>
  );
}

function KPI({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="grid">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={"font-bold " + (big ? "text-2xl" : "text-base")}>{value}</div>
    </div>
  );
}

function NumberInput({ label, value, onChange, min, max, step = 1 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-semibold">{label}</span>
      <input
        type="number"
        className="rounded-xl border px-3 py-2"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function RangeWithNumber({ label, value, onChange, min, max, step = 1 }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number }) {
  return (
    <div className="grid gap-1 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{label}</span>
        <span className="text-slate-500">{value}</span>
      </div>
      <input type="range" className="w-full" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-semibold">{label}</span>
      <select className="rounded-xl border px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function TextInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-semibold">{label}</span>
      <input className="rounded-xl border px-3 py-2" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

// -----------------------------------------------------------------------------
// Types & helpers
// -----------------------------------------------------------------------------

type Preset = { label: string; w: number; h: number; key: string };

type Generated = { filename: string; blob: Blob; preset: Preset };

function humanize(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

// -----------------------------------------------------------------------------
// Self-tests (non-fatal): run once in dev console
// -----------------------------------------------------------------------------
(function runSelfTests() {
  try {
    const approx = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps;
    // Test 1: Pricing identity — cost=50, overhead=10% of price, margin target 40% → price = 50/(1-0.4-0.1)=100
    const price = 100, cost = 50, oh = 0.1, m = 0.4;
    const k = computeKPIs(price, cost, oh, m);
    if (!approx(k.margin, 0.4)) console.error("[TEST] Margin expected 0.4, got", k.margin);
    // Test 2: Rounding rule .99
    const r = applyRounding(12.32, ".99");
    if (!approx(r, 12.99)) console.error("[TEST] Rounding .99 failed, got", r);
    // Test 3: humanize
    const h = humanize("ai-marketing-toolkit");
    if (h !== "Ai Marketing Toolkit") console.error("[TEST] humanize failed, got", h);
    // Test 4: KPI component exists
    if (typeof KPI !== "function") console.error("[TEST] KPI not defined");
  } catch (e) {
    console.error("[SelfTests] Unexpected error", e);
  }
})();

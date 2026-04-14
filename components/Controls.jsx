"use client";
import { useState } from "react";
import { getMetalGroups, getStoneGroups } from "@/utils/materials";

const METAL_GROUPS = getMetalGroups();
const STONE_GROUPS = getStoneGroups();

const ENVIRONMENTS = [
  { key: "studio",     label: "Studio"     },
  { key: "sunset",     label: "Sunset"     },
  { key: "warehouse",  label: "Warehouse"  },
  { key: "night",      label: "Night"      },
  { key: "city",       label: "City"       },
  { key: "apartment",  label: "Apartment"  },
  { key: "lobby",      label: "Lobby"      },
  { key: "park",       label: "Park"       },
  { key: "forest",     label: "Forest"     },
  { key: "dawn",       label: "Dawn"       },
];

export default function Controls(props) {
  const {
    setFile, materialType, setMaterialType,
    bg, setBg,
    captureImage, selectedViews, setSelectedViews,
    includeCurrent, setIncludeCurrent,
    autoRotate, setAutoRotate,
    rotateSpeed, setRotateSpeed,
    environment, setEnvironment,
    lightIntensity, setLightIntensity,
    applyPreset, stoneType, setStoneType,
  } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("materials"); // materials | scene | export

  const isLight = bg === "white";
  const T = buildTheme(isLight);

  const queueCount = selectedViews.length + (includeCurrent ? 1 : 0);

  return (
    <>
      {/* ── MOBILE TOGGLE ───────────────────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen(v => !v)}
        className={`fixed top-3 right-3 z-[60] lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] border backdrop-blur-xl transition-all ${T.panelBg} ${T.border}`}
        aria-label="Toggle controls"
      >
        <span className={`w-4 h-px transition-all bg-current ${T.textPrimary} ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
        <span className={`w-4 h-px bg-current ${T.textPrimary} ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`w-4 h-px transition-all bg-current ${T.textPrimary} ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
      </button>

      <div className={`fixed inset-0 pointer-events-none z-50 flex flex-col ${T.textPrimary}`}>

        {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
        <div className={`pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-2.5 border-b backdrop-blur-xl ${T.panelBg} ${T.border}`}>
          <div className="flex items-center gap-4 min-w-0">
            <div>
              <div className={`hidden sm:block text-[7px] tracking-[0.45em] uppercase ${T.textMuted}`}>Terminal / Atelier</div>
              <h1 className={`text-[10px] sm:text-[11px] font-black tracking-tight uppercase ${T.textPrimary}`}>Jewelry_Studio_Pro</h1>
            </div>
            {/* Preset pills */}
            <div className="hidden sm:flex gap-1">
              {["ecommerce","luxury","dark","studio"].map(p => (
                <button key={p} onClick={() => applyPreset(p)}
                  className={`text-[7px] uppercase tracking-widest px-2 py-1 border transition-all ${T.border} ${T.textMuted} hover:${T.textPrimary} ${T.presetHover}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <label className={`text-[8px] tracking-widest px-4 py-2 font-bold cursor-pointer transition-all uppercase ${T.loadBtn}`}>
            Load_Model
            <input type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
          </label>
        </div>

        {/* ── BODY ─────────────────────────────────────────────────────────── */}
        <div className="flex-1 flex items-stretch overflow-hidden">

          {/* LEFT PANEL */}
          <div className={`pointer-events-auto w-56 lg:w-64 hidden lg:flex flex-col border-r backdrop-blur-xl ${T.panelBg} ${T.border}`}>

            {/* Tab switcher */}
            <div className={`grid grid-cols-3 border-b ${T.border}`}>
              {[["materials","MAT"],["scene","SCN"],["export","EXP"]].map(([tab, short]) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-2 text-[7px] uppercase tracking-widest transition-all border-b-2 ${activeTab === tab ? `${T.textPrimary} border-current` : `${T.textMuted} border-transparent hover:${T.textSecondary}`}`}>
                  {short}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
              {activeTab === "materials" && (
                <>
                  {/* Background */}
                  <Section title="Background" T={T}>
                    <div className="grid grid-cols-3 gap-1">
                      {[{val:"black",label:"Dark"},{val:"white",label:"Light"},{val:"transparent",label:"Alpha"}].map(({val,label}) => (
                        <BgButton key={val} val={val} label={label} active={bg===val} onClick={() => setBg(val)} T={T} />
                      ))}
                    </div>
                  </Section>

                  {/* Metal */}
                  <Section title="Metal_Finish" T={T}>
                    <div className="mb-1">
                      <SwatchButton active={materialType==="original"} label="Original" color={null} onClick={() => setMaterialType("original")} T={T} />
                    </div>
                    {Object.entries(METAL_GROUPS).map(([group, items]) => (
                      <div key={group} className="mb-3">
                        <div className={`text-[7px] uppercase tracking-widest mb-1.5 ${T.textMuted}`}>{group}</div>
                        <div className="grid grid-cols-2 gap-1">
                          {items.map(({key, label, color}) => (
                            <SwatchButton key={key} active={materialType===key} label={label} color={color} onClick={() => setMaterialType(key)} T={T} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </Section>

                  {/* Stone */}
                  <Section title="Gemstone_Type" T={T}>
                    <div className="mb-1">
                      <SwatchButton active={stoneType==="original"} label="Original" color={null} onClick={() => setStoneType("original")} T={T} />
                    </div>
                    {Object.entries(STONE_GROUPS).map(([group, items]) => (
                      <div key={group} className="mb-3">
                        <div className={`text-[7px] uppercase tracking-widest mb-1.5 ${T.textMuted}`}>{group}</div>
                        <div className="grid grid-cols-2 gap-1">
                          {items.map(({key, label, color}) => (
                            <SwatchButton key={key} active={stoneType===key} label={label} color={color} onClick={() => setStoneType(key)} T={T} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {activeTab === "scene" && (
                <>
                  <Section title="Environment" T={T}>
                    <div className="grid grid-cols-2 gap-1">
                      {ENVIRONMENTS.map(({key, label}) => (
                        <button key={key} onClick={() => setEnvironment(key)}
                          className={`py-1.5 text-[8px] uppercase tracking-tight border transition-all ${environment===key ? T.tabActive : T.tabInactive}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </Section>
                  <Section title="Lighting" T={T}>
                    <Slider label="Intensity" val={lightIntensity} min={0} max={5} step={0.1} onChange={setLightIntensity} T={T} />
                  </Section>
                  <Section title="Rotation" T={T}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[8px] uppercase tracking-widest ${T.textSecondary}`}>Auto_Orbit</span>
                      <Toggle on={autoRotate} onToggle={() => setAutoRotate(v => !v)} T={T} />
                    </div>
                    <Slider label="Speed" val={rotateSpeed} min={0} max={5} step={0.1} onChange={setRotateSpeed} T={T} />
                  </Section>
                </>
              )}

              {activeTab === "export" && (
                <Section title="Output_Sequence" T={T}>
                  <div className="space-y-3">
                    <Checkbox label="Current_Frame" checked={includeCurrent} onChange={() => setIncludeCurrent(v => !v)} T={T} />
                    <div className={`h-px ${T.divider}`} />
                    {["front","side","top"].map(v => (
                      <Checkbox key={v} label={`${v}_View`}
                        checked={selectedViews.includes(v)}
                        onChange={() => setSelectedViews(prev => prev.includes(v) ? prev.filter(x=>x!==v) : [...prev,v])}
                        T={T} />
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* Status footer */}
            <div className={`p-3 border-t ${T.border} flex items-center justify-between`}>
              <div>
                <div className={`text-[7px] uppercase tracking-widest ${T.textMuted}`}>Metal</div>
                <div className={`text-[9px] font-bold truncate max-w-[80px] ${T.textPrimary}`}>{materialType}</div>
              </div>
              <div className="text-right">
                <div className={`text-[7px] uppercase tracking-widest ${T.textMuted}`}>Stone</div>
                <div className={`text-[9px] font-bold truncate max-w-[80px] ${T.textPrimary}`}>{stoneType}</div>
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex-1" />

          {/* RIGHT PANEL (mobile drawer or always-on sidebar) */}
          <div className={`pointer-events-auto w-64 sm:w-72 transition-all duration-300 ${mobileOpen ? "flex" : "hidden lg:flex"} flex-col border-l backdrop-blur-xl ${T.panelBg} ${T.border}`}>

            {/* Mobile tabs */}
            <div className={`lg:hidden grid grid-cols-3 border-b ${T.border}`}>
              {[["materials","MAT"],["scene","SCN"],["export","EXP"]].map(([tab, short]) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`py-2 text-[7px] uppercase tracking-widest transition-all border-b-2 ${activeTab === tab ? `${T.textPrimary} border-current` : `${T.textMuted} border-transparent`}`}>
                  {short}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">

              {/* On desktop right panel always shows scene + env; left panel shows materials */}
              <div className="hidden lg:block space-y-5">
                <Section title="Environment" T={T}>
                  <div className="grid grid-cols-2 gap-1">
                    {ENVIRONMENTS.map(({key, label}) => (
                      <button key={key} onClick={() => setEnvironment(key)}
                        className={`py-1.5 text-[8px] uppercase tracking-tight border transition-all ${environment===key ? T.tabActive : T.tabInactive}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </Section>

                <Section title="Lighting" T={T}>
                  <Slider label="Intensity" val={lightIntensity} min={0} max={5} step={0.1} onChange={setLightIntensity} T={T} />
                </Section>

                <Section title="Rotation" T={T}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[8px] uppercase tracking-widest ${T.textSecondary}`}>Auto_Orbit</span>
                    <Toggle on={autoRotate} onToggle={() => setAutoRotate(v => !v)} T={T} />
                  </div>
                  <Slider label="Speed" val={rotateSpeed} min={0} max={5} step={0.1} onChange={setRotateSpeed} T={T} />
                </Section>

                <Section title="Output_Sequence" T={T}>
                  <div className="space-y-3">
                    <Checkbox label="Current_Frame" checked={includeCurrent} onChange={() => setIncludeCurrent(v => !v)} T={T} />
                    <div className={`h-px ${T.divider}`} />
                    {["front","side","top"].map(v => (
                      <Checkbox key={v} label={`${v}_View`}
                        checked={selectedViews.includes(v)}
                        onChange={() => setSelectedViews(prev => prev.includes(v) ? prev.filter(x=>x!==v) : [...prev,v])}
                        T={T} />
                    ))}
                  </div>
                </Section>
              </div>

              {/* Mobile: show active tab content */}
              <div className="lg:hidden space-y-5">
                {activeTab === "materials" && (
                  <>
                    <Section title="Background" T={T}>
                      <div className="grid grid-cols-3 gap-1">
                        {[{val:"black",label:"Dark"},{val:"white",label:"Light"},{val:"transparent",label:"Alpha"}].map(({val,label}) => (
                          <BgButton key={val} val={val} label={label} active={bg===val} onClick={() => setBg(val)} T={T} />
                        ))}
                      </div>
                    </Section>
                    <Section title="Metal" T={T}>
                      <div className="space-y-1">
                        <SwatchButton active={materialType==="original"} label="Original" color={null} onClick={() => setMaterialType("original")} T={T} />
                        {Object.entries(METAL_GROUPS).map(([group, items]) => (
                          <div key={group}>
                            <div className={`text-[7px] uppercase tracking-widest my-1.5 ${T.textMuted}`}>{group}</div>
                            <div className="grid grid-cols-2 gap-1">
                              {items.map(({key,label,color}) => (
                                <SwatchButton key={key} active={materialType===key} label={label} color={color} onClick={() => setMaterialType(key)} T={T} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Section>
                    <Section title="Stone" T={T}>
                      <div className="space-y-1">
                        <SwatchButton active={stoneType==="original"} label="Original" color={null} onClick={() => setStoneType("original")} T={T} />
                        {Object.entries(STONE_GROUPS).map(([group, items]) => (
                          <div key={group}>
                            <div className={`text-[7px] uppercase tracking-widest my-1.5 ${T.textMuted}`}>{group}</div>
                            <div className="grid grid-cols-2 gap-1">
                              {items.map(({key,label,color}) => (
                                <SwatchButton key={key} active={stoneType===key} label={label} color={color} onClick={() => setStoneType(key)} T={T} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Section>
                  </>
                )}
                {activeTab === "scene" && (
                  <>
                    <Section title="Environment" T={T}>
                      <div className="grid grid-cols-2 gap-1">
                        {ENVIRONMENTS.map(({key, label}) => (
                          <button key={key} onClick={() => setEnvironment(key)}
                            className={`py-1.5 text-[8px] uppercase tracking-tight border transition-all ${environment===key ? T.tabActive : T.tabInactive}`}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </Section>
                    <Section title="Lighting" T={T}>
                      <Slider label="Intensity" val={lightIntensity} min={0} max={5} step={0.1} onChange={setLightIntensity} T={T} />
                    </Section>
                    <Section title="Rotation" T={T}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[8px] uppercase tracking-widest ${T.textSecondary}`}>Auto_Orbit</span>
                        <Toggle on={autoRotate} onToggle={() => setAutoRotate(v => !v)} T={T} />
                      </div>
                      <Slider label="Speed" val={rotateSpeed} min={0} max={5} step={0.1} onChange={setRotateSpeed} T={T} />
                    </Section>
                  </>
                )}
                {activeTab === "export" && (
                  <Section title="Output_Sequence" T={T}>
                    <div className="space-y-3">
                      <Checkbox label="Current_Frame" checked={includeCurrent} onChange={() => setIncludeCurrent(v => !v)} T={T} />
                      <div className={`h-px ${T.divider}`} />
                      {["front","side","top"].map(v => (
                        <Checkbox key={v} label={`${v}_View`}
                          checked={selectedViews.includes(v)}
                          onChange={() => setSelectedViews(prev => prev.includes(v) ? prev.filter(x=>x!==v) : [...prev,v])}
                          T={T} />
                      ))}
                    </div>
                  </Section>
                )}
              </div>
            </div>

            {/* Execute render */}
            <div className={`p-4 border-t ${T.border}`}>
              <button
                onClick={() => captureImage?.({ currentView: includeCurrent, selectedViews })}
                className={`w-full py-3 text-[9px] font-black uppercase tracking-[0.4em] transition-all active:scale-95 ${T.execBtn}`}
              >
                Execute_Render
              </button>
              <div className={`mt-1.5 text-center text-[7px] uppercase tracking-widest ${T.textMuted}`}>
                {queueCount} frame{queueCount !== 1 ? "s" : ""} queued
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Theme ─────────────────────────────────────────────────────────────────────
function buildTheme(isLight) {
  return {
    textPrimary:   isLight ? "text-zinc-900"   : "text-white",
    textSecondary: isLight ? "text-zinc-500"   : "text-white/50",
    textMuted:     isLight ? "text-zinc-400"   : "text-white/30",
    panelBg:       isLight ? "bg-white/95"     : "bg-black/80",
    border:        isLight ? "border-zinc-200" : "border-white/10",
    divider:       isLight ? "bg-zinc-200"     : "bg-white/10",
    tabActive:     isLight ? "border-zinc-900 bg-zinc-900 text-white"            : "border-white/50 bg-white/15 text-white",
    tabInactive:   isLight ? "border-zinc-200 text-zinc-500 hover:border-zinc-500 hover:text-zinc-900" : "border-white/10 text-white/30 hover:border-white/30 hover:text-white/60",
    swatchActive:  isLight ? "ring-2 ring-zinc-900"  : "ring-2 ring-white",
    loadBtn:       isLight ? "bg-zinc-900 text-white hover:bg-zinc-700"          : "bg-white text-black hover:bg-[#d4af37] hover:text-white",
    execBtn:       isLight ? "bg-zinc-900 text-white hover:bg-[#d4af37]"         : "bg-white text-black hover:bg-[#d4af37] hover:text-white",
    presetHover:   isLight ? "hover:border-zinc-500 hover:text-zinc-900"         : "hover:border-white/40 hover:text-white",
    toggleOn:      isLight ? "bg-zinc-900"  : "bg-white/40",
    toggleOff:     isLight ? "bg-zinc-200"  : "bg-white/10",
    toggleThumbOn: "bg-white",
    toggleThumbOff:isLight ? "bg-zinc-500"  : "bg-white/30",
    sliderTrack:   isLight ? "bg-zinc-300"  : "bg-white/10",
    sliderAccent:  isLight ? "accent-zinc-900" : "accent-white",
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ title, children, T }) {
  return (
    <div className="space-y-2">
      <h3 className={`text-[7px] tracking-[0.5em] uppercase font-bold pb-1.5 border-b ${T.textSecondary} ${T.border}`}>{title}</h3>
      {children}
    </div>
  );
}

function SwatchButton({ active, label, color, onClick, T }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-2 py-1.5 text-[8px] uppercase tracking-tight border transition-all w-full text-left ${active ? T.tabActive : T.tabInactive}`}>
      {color && (
        <span className={`flex-shrink-0 w-3 h-3 rounded-full border ${active ? "border-transparent" : "border-white/20"}`}
          style={{ background: color }} />
      )}
      <span className="truncate">{label}</span>
    </button>
  );
}

function BgButton({ val, label, active, onClick, T }) {
  const swatch = {
    black: "bg-zinc-900 border-zinc-700",
    white: "bg-white border-zinc-300",
    transparent: "",
  };
  return (
    <button onClick={onClick}
      className={`py-2 px-1 text-[7px] uppercase tracking-tight border transition-all flex flex-col items-center gap-1 ${active ? T.tabActive : T.tabInactive}`}>
      {val === "transparent"
        ? <span className="w-3 h-3 rounded-sm border border-zinc-400" style={{background:"linear-gradient(135deg,#aaa 25%,transparent 25%,transparent 75%,#aaa 75%),linear-gradient(135deg,#aaa 25%,white 25%,white 75%,#aaa 75%)",backgroundSize:"4px 4px",backgroundPosition:"0 0,2px 2px"}} />
        : <span className={`w-3 h-3 rounded-sm border ${swatch[val]}`} />
      }
      {label}
    </button>
  );
}

function Toggle({ on, onToggle, T }) {
  return (
    <button onClick={onToggle}
      className={`w-9 h-5 rounded-full relative transition-colors ${on ? T.toggleOn : T.toggleOff}`}>
      <div className={`absolute top-[3px] w-[14px] h-[14px] rounded-full transition-all ${on ? `right-[3px] ${T.toggleThumbOn}` : `left-[3px] ${T.toggleThumbOff}`}`} />
    </button>
  );
}

function Slider({ label, val, min, max, step, onChange, T }) {
  return (
    <div className="space-y-1.5">
      <div className={`flex justify-between text-[8px] uppercase tracking-widest ${T.textSecondary}`}>
        <span>{label}</span>
        <span className={T.textPrimary}>{val}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={e => onChange(Number(e.target.value))}
        className={`w-full h-px appearance-none cursor-crosshair ${T.sliderTrack} ${T.sliderAccent}`} />
    </div>
  );
}

function Checkbox({ label, checked, onChange, T }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={onChange}
        className={`w-3.5 h-3.5 bg-transparent border appearance-none transition-all cursor-pointer ${T.border} checked:bg-current`}
        style={{ accentColor: "currentColor" }} />
      <span className={`text-[8px] uppercase tracking-widest transition-colors ${T.textSecondary}`}>{label}</span>
    </label>
  );
}
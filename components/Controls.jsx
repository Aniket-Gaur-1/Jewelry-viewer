"use client";

export default function Controls(props) {
  const {
    setFile, materialType, setMaterialType, bg, setBg,
    captureImage, selectedViews, setSelectedViews,
    includeCurrent, setIncludeCurrent, autoRotate,
    setAutoRotate, rotateSpeed, setRotateSpeed,
    environment, setEnvironment, lightIntensity,
    setLightIntensity, applyPreset
  } = props;

  // Determine if we are in "Light Mode" based on background selection
  const isLightBg = bg === "white";
  
  // Dynamic color classes
  const textMain = isLightBg ? "text-zinc-900" : "text-white";
  const textMuted = isLightBg ? "text-zinc-500" : "text-white/30";
  const borderCol = isLightBg ? "border-zinc-200" : "border-white/10";
  const panelBg = isLightBg ? "bg-white/80" : "bg-black/60";

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 p-8 flex flex-col justify-between transition-colors duration-500 ${textMain}`}>
      
      {/* TOP BAR: Context-aware colors */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="space-y-1">
          <div className={`text-[9px] tracking-[0.5em] uppercase font-medium ${textMuted}`}>Terminal / Atelier</div>
          <h1 className="text-sm font-bold tracking-tight uppercase">Jewelry_Studio_Pro</h1>
        </div>

        <div className="flex gap-2">
          {["ecommerce", "luxury", "dark"].map((p) => (
            <button 
              key={p}
              onClick={() => applyPreset(p)}
              className={`text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-all ${borderCol} ${textMuted} hover:text-current hover:bg-current/5`}
            >
              {p}
            </button>
          ))}
          <label className={`ml-4 text-[10px] tracking-widest px-5 py-2 font-bold cursor-pointer transition-all uppercase ${isLightBg ? 'bg-zinc-900 text-white hover:bg-zinc-700' : 'bg-white text-black hover:bg-[#d4af37] hover:text-white'}`}>
            Load_Model
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </div>
      </div>

      {/* MIDDLE: Non-overlapping Side Panels */}
      <div className="flex-1 flex justify-between items-center">
        
        {/* LEFT PANEL: Export Settings */}
        <div className="w-60 pointer-events-auto translate-y-20">
          <div className={`${panelBg} backdrop-blur-xl border ${borderCol} p-5 space-y-6 shadow-xl`}>
            <Section title="Output_Sequence" mutedClass={textMuted}>
              <div className="space-y-4">
                <Checkbox 
                  label="Current_Frame" 
                  checked={includeCurrent} 
                  onChange={() => setIncludeCurrent(!includeCurrent)} 
                  isLight={isLightBg}
                />
                <div className={`h-[1px] w-full ${isLightBg ? 'bg-zinc-200' : 'bg-white/5'}`} />
                {["front", "side", "top"].map((v) => (
                  <Checkbox 
                    key={v} 
                    label={`${v}_View`} 
                    checked={selectedViews.includes(v)} 
                    onChange={() => setSelectedViews(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} 
                    isLight={isLightBg}
                  />
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* RIGHT PANEL: Engine Parameters */}
        <div className="w-72 pointer-events-auto">
          <div className={`${panelBg} backdrop-blur-2xl border ${borderCol} p-6 space-y-8 shadow-2xl`}>
            
            <Section title="Appearance" mutedClass={textMuted}>
              <div className="grid grid-cols-3 gap-1">
                {["gold", "silver", "rose"].map((m) => (
                  <TabButton key={m} active={materialType === m} label={m} onClick={() => setMaterialType(m)} isLight={isLightBg} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1 mt-1">
                {["white", "black", "transparent"].map((b) => (
                  <TabButton key={b} active={bg === b} label={b} onClick={() => setBg(b)} isLight={isLightBg} />
                ))}
              </div>
            </Section>

            <Section title="Lighting" mutedClass={textMuted}>
              <Slider label="Exposure" val={lightIntensity} min={0} max={5} step={0.1} onChange={setLightIntensity} isLight={isLightBg} />
              <div className="flex flex-wrap gap-4 mt-3">
                {["studio", "sunset", "warehouse", "night", "city", "apartment", "lobby", "park"].map((env) => (
                  <button 
                    key={env} 
                    onClick={() => setEnvironment(env)} 
                    className={`text-[8px] uppercase tracking-[0.2em] transition-colors ${environment === env ? (isLightBg ? 'text-zinc-900 font-bold' : 'text-white') : textMuted}`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Dynamics" mutedClass={textMuted}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[9px] uppercase tracking-widest ${textMuted}`}>Auto_Orbit</span>
                <button 
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`w-8 h-4 rounded-full relative transition-colors ${autoRotate ? (isLightBg ? 'bg-zinc-900' : 'bg-white/30') : (isLightBg ? 'bg-zinc-200' : 'bg-white/5')}`}
                >
                  <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${autoRotate ? 'right-1 bg-white' : 'left-1 bg-zinc-400'}`} />
                </button>
              </div>
              <Slider label="Velocity" val={rotateSpeed} min={0} max={5} step={0.1} onChange={setRotateSpeed} isLight={isLightBg} />
            </Section>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex justify-between items-end pointer-events-auto">
        <div className={`flex gap-10 text-[9px] tracking-[0.4em] uppercase font-mono ${textMuted}`}>
          <div className="flex flex-col">
            <span>Status_</span>
            <span className={textMain}>Active</span>
          </div>
          <div className="flex flex-col">
            <span>Queue_</span>
            <span className={textMain}>{selectedViews.length + (includeCurrent ? 1 : 0)} Frames</span>
          </div>
        </div>

        <button
          onClick={() => captureImage?.({ currentView: includeCurrent, selectedViews })}
          className={`px-16 py-4 text-[11px] font-black uppercase tracking-[0.5em] transition-all active:scale-95 shadow-lg ${isLightBg ? 'bg-zinc-900 text-white hover:bg-[#d4af37]' : 'bg-white text-black hover:bg-[#d4af37] hover:text-white'}`}
        >
          Execute_Render
        </button>
      </div>
    </div>
  );
}

// Sub-components with Contrast Awareness
function Section({ title, children, mutedClass }) {
  return (
    <div className="space-y-3">
      <h3 className={`text-[8px] tracking-[0.5em] uppercase font-bold border-b pb-2 ${mutedClass} border-current/5`}>{title}</h3>
      {children}
    </div>
  );
}

function TabButton({ active, label, onClick, isLight }) {
  const activeStyles = isLight ? "border-zinc-900 bg-zinc-900 text-white" : "border-white/40 bg-white/10 text-white";
  const inactiveStyles = isLight ? "border-zinc-200 text-zinc-400 hover:border-zinc-400" : "border-white/5 text-white/20 hover:text-white/40";
  
  return (
    <button
      onClick={onClick}
      className={`text-[9px] uppercase tracking-tighter py-2 border transition-all ${active ? activeStyles : inactiveStyles}`}
    >
      {label}
    </button>
  );
}

function Slider({ label, val, min, max, step, onChange, isLight }) {
  return (
    <div className="space-y-1.5">
      <div className={`flex justify-between text-[8px] uppercase tracking-widest ${isLight ? 'text-zinc-500' : 'text-white/30'}`}>
        <span>{label}</span>
        <span>{val}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} value={val} 
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-[1px] appearance-none cursor-crosshair ${isLight ? 'bg-zinc-200 accent-zinc-900' : 'bg-white/10 accent-white'}`}
      />
    </div>
  );
}

function Checkbox({ label, checked, onChange, isLight }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        className={`w-3.5 h-3.5 bg-transparent border appearance-none transition-all cursor-pointer ${isLight ? 'border-zinc-300 checked:bg-zinc-900' : 'border-white/20 checked:bg-white'}`}
      />
      <span className={`text-[9px] uppercase tracking-widest transition-colors ${isLight ? 'text-zinc-500 group-hover:text-zinc-900' : 'text-white/40 group-hover:text-white/70'}`}>{label}</span>
    </label>
  );
}
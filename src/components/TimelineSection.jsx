import React, { useState } from 'react';
import { Clock, Sun, Sparkles, Droplets, Moon, Sunset, Trees, PawPrint, Flame } from 'lucide-react';
import { translations } from '../translations';

export default function TimelineSection({ lang }) {
  const [activeIdx, setActiveIdx] = useState(2); // Default 11:00 AM
  const t = translations[lang]?.timeline || translations.en.timeline;
  const currentSlot = t.timeSlots[activeIdx];

  // Dynamic sky lighting gradient depending on time of day
  const skyLabels = t.skyLabels || [
    'Early Dawn Sunlight',
    'Morning Trail Sun',
    'Bright Midday Light',
    'High Noon Sun',
    'Afternoon Shade',
    'Golden Hour Glow',
    'Dusk Sky Hue',
    'Starlight Evening'
  ];

  const timeAtmospheres = [
    { sky: 'from-sunlight-500/15 via-beige-100 to-beige-50', icon: Sun, label: skyLabels[0] },
    { sky: 'from-amber-200/20 via-beige-100 to-beige-50', icon: Sun, label: skyLabels[1] },
    { sky: 'from-moss-500/15 via-beige-100 to-beige-50', icon: Trees, label: skyLabels[2] },
    { sky: 'from-blue-200/20 via-beige-100 to-beige-50', icon: Droplets, label: skyLabels[3] },
    { sky: 'from-emerald-200/20 via-beige-100 to-beige-50', icon: PawPrint, label: skyLabels[4] },
    { sky: 'from-amber-400/20 via-orange-100/30 to-beige-50', icon: Sunset, label: skyLabels[5] },
    { sky: 'from-amber-600/20 via-beige-200 to-beige-100', icon: Flame, label: skyLabels[6] },
    { sky: 'from-earth-900/90 via-earth-800 to-moss-900', icon: Moon, label: skyLabels[7] }
  ];

  const currentAtmosphere = timeAtmospheres[activeIdx] || timeAtmospheres[0];
  const IconAtmosphere = currentAtmosphere.icon;

  // Water level percentage calculation (15% to 92%)
  const waterLevel = 15 + (activeIdx / (t.timeSlots.length - 1)) * 77;

  return (
    <section id="timeline" className={`py-28 relative overflow-hidden transition-colors duration-1000 bg-gradient-to-b ${currentAtmosphere.sky}`}>
      
      {/* Background Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-moss-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunlight-500/20 text-earth-900 text-xs font-bold tracking-widest uppercase border border-sunlight-500/30 shadow-sm">
            <Clock className="w-4 h-4 text-sunlight-500" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif-heading font-extrabold text-earth-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-earth-700 font-normal">
            {t.sub}
          </p>
        </div>

        {/* MAIN VISUAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT (5/12): PHOTOREALISTIC WATER BOTTLE WITH DYNAMIC ANIMATED WATER LEVEL */}
          <div className="lg:col-span-5 flex justify-center">
            
            <div className="relative w-72 h-[520px] rounded-[56px] p-5 bg-beige-50/90 border-4 border-earth-900 shadow-[0_25px_60px_-15px_rgba(44,31,20,0.3)] flex flex-col justify-between overflow-hidden backdrop-blur-xl">
              
              {/* Bottle Top Handle & Cap Graphic */}
              <div className="w-full bg-earth-900 rounded-t-3xl py-2.5 px-4 text-center border-b border-earth-700 flex items-center justify-between">
                <span className="text-[10px] font-bold text-beige-300 tracking-widest uppercase">ECOSIP</span>
                <span className="w-2.5 h-2.5 rounded-full bg-sunlight-500 animate-ping" />
              </div>

              {/* Water Liquid Reservoir Container */}
              <div className="relative flex-1 w-full bg-earth-900/10 rounded-b-3xl overflow-hidden border border-earth-700/30 my-2">
                
                {/* Dynamic Water Liquid Fill */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-moss-800 via-moss-600 to-moss-500 transition-all duration-700 ease-out"
                  style={{ height: `${waterLevel}%` }}
                >
                  {/* Wave surface SVG */}
                  <div className="absolute -top-3 left-0 right-0 h-6 opacity-80">
                    <svg className="w-full h-full animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z" fill="#4A5D43" />
                    </svg>
                  </div>
                </div>

                {/* Timed Markers Printed on Bottle Glass */}
                <div className="absolute inset-0 p-3.5 flex flex-col justify-between text-earth-900 pointer-events-none">
                  {t.timeSlots.map((slot, idx) => {
                    const isSelected = idx === activeIdx;
                    return (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between text-xs font-semibold transition-all duration-300 ${
                          isSelected
                            ? 'text-sunlight-500 scale-110 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                            : 'text-earth-800/70'
                        }`}
                      >
                        <span className="bg-beige-50/80 px-2 py-0.5 rounded-full border border-beige-300 text-[10px]">
                          {slot.time}
                        </span>
                        <span className="font-serif-heading italic text-[11px] truncate max-w-[130px] text-right">
                          {slot.quote}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Bottom Volume Indicator Badge */}
              <div className="bg-earth-900 text-beige-50 p-3 rounded-2xl flex items-center justify-between text-xs font-bold shadow-md">
                <span className="text-beige-300">{t.intakeLabel || "Intake Volume:"}</span>
                <span className="text-sunlight-400 font-serif-heading text-sm">{currentSlot.intake}</span>
              </div>

            </div>

          </div>

          {/* RIGHT (7/12): VISUAL TIME DIAL & OUTDOOR SCENE CARD */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Hour Buttons Bar */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {t.timeSlots.map((slot, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                      isActive
                        ? 'bg-earth-900 text-beige-50 border-earth-900 shadow-earth scale-110 ring-2 ring-sunlight-500/50'
                        : 'bg-beige-50/90 text-earth-800 border-beige-300 hover:bg-beige-200'
                    }`}
                  >
                    <span className="text-xs font-bold">{slot.time.split(' ')[0]}</span>
                    <span className={`text-[10px] ${isActive ? 'text-sunlight-400' : 'text-earth-500'}`}>
                      {slot.time.split(' ')[1]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Time Slot Card */}
            <div className="p-8 rounded-[36px] bg-beige-50/95 shadow-2xl border border-beige-300/90 space-y-6 backdrop-blur-xl">
              
              {/* Header Info */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunlight-500/20 text-earth-900 text-xs font-bold">
                  <IconAtmosphere className="w-4 h-4 text-sunlight-500" />
                  <span>{currentAtmosphere.label} • {currentSlot.time}</span>
                </div>
                <span className="text-xs font-bold text-moss-800 bg-moss-100 px-3 py-1 rounded-full border border-moss-300">
                  {t.targetLabel || "Target Volume:"} {currentSlot.intake}
                </span>
              </div>

              {/* Quote & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-earth-900">
                  "{currentSlot.quote}"
                </h3>
                <p className="text-base text-earth-700 leading-relaxed font-normal">
                  {currentSlot.desc}
                </p>
              </div>

              {/* EcoSip Ritual Badge */}
              <div className="p-4 rounded-2xl bg-earth-900 text-beige-50 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-moss-700 text-beige-50">
                    <Sparkles className="w-5 h-5 text-sunlight-400 animate-spin-slow" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-sunlight-400">
                      {t.milestoneCompleted || "Daily Milestone • Completed"}
                    </div>
                    <div className="text-sm font-bold text-beige-50">
                      {t.milestoneTitle || "EcoSip Time Ritual"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-serif-heading font-bold text-sunlight-400">{currentSlot.intake}</div>
                  <div className="text-[10px] text-beige-300">1.5L Target</div>
                </div>
              </div>

              {/* Range Slider for Manual Interaction */}
              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min="0"
                  max={t.timeSlots.length - 1}
                  value={activeIdx}
                  onChange={(e) => setActiveIdx(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-beige-300 rounded-lg appearance-none cursor-pointer accent-moss-700"
                />
                <div className="flex justify-between text-[11px] font-bold text-earth-600">
                  <span>{t.sunrise || "7:00 AM (Sunrise ☀️)"}</span>
                  <span>{t.sunset || "9:00 PM (Sunset Goal ✨)"}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

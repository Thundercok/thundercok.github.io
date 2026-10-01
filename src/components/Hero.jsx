import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Clock, Droplets, Compass, Leaf, MousePointerClick } from 'lucide-react';
import { translations } from '../translations';
import heroGrassHdImg from '../assets/hero_grass_hd.jpg';

export default function Hero({ lang, onOpenOrder }) {
  const [hotspotActive, setHotspotActive] = useState(false);
  const t = translations[lang]?.hero || translations.en.hero;

  return (
    <section className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 flex items-center overflow-hidden bg-gradient-to-b from-beige-50 via-beige-100 to-beige-200">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-[-5%] left-[-5%] w-[650px] h-[650px] bg-moss-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[750px] h-[750px] bg-sunlight-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN (6/12): Editorial Typography & Controls */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-moss-100 text-moss-800 text-xs font-bold tracking-widest uppercase border border-moss-600/30 shadow-sm">
              <Compass className="w-4 h-4 text-moss-700 animate-spin-slow" />
              <span>{t.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-heading font-extrabold text-earth-900 tracking-tight leading-[1.08] whitespace-pre-line">
              {t.headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-earth-700 font-normal leading-relaxed max-w-xl">
              {t.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenOrder}
                className="px-9 py-4.5 rounded-full bg-earth-900 hover:bg-earth-800 text-beige-50 font-semibold text-sm tracking-wider uppercase shadow-earth hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-beige-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#features"
                className="px-9 py-4.5 rounded-full bg-beige-200 hover:bg-beige-300 text-earth-900 font-semibold text-sm tracking-wider uppercase border border-beige-300/80 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>{t.ctaSecondary}</span>
              </a>
            </div>

            {/* Quick Specs */}
            <div className="pt-6 border-t border-earth-700/15 grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-center gap-2.5">
                <Droplets className="w-4 h-4 text-moss-700" />
                <div>
                  <div className="text-[10px] text-earth-500 font-medium uppercase tracking-wider">
                    {t.statsHeaders?.capacity || "Capacity"}
                  </div>
                  <div className="text-xs font-bold text-earth-900">{t.stats.capacity}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-earth-800" />
                <div>
                  <div className="text-[10px] text-earth-500 font-medium uppercase tracking-wider">
                    {t.statsHeaders?.material || "Material"}
                  </div>
                  <div className="text-xs font-bold text-earth-900">{t.stats.material}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sunlight-500" />
                <div>
                  <div className="text-[10px] text-earth-500 font-medium uppercase tracking-wider">
                    {t.statsHeaders?.tracking || "Tracking"}
                  </div>
                  <div className="text-xs font-bold text-earth-900">{t.stats.feature}</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (6/12): High-Definition Photo Display */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            <div className="relative w-full h-[620px] sm:h-[680px] rounded-[48px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(44,31,20,0.25)] border-8 border-beige-50 bg-earth-900 group">
              
              {/* Photo */}
              <img
                src={heroGrassHdImg}
                alt="EcoSip Outdoor Scenic Experience"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading="eager"
              />

              {/* Minimal Top & Bottom Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Top Left Badge */}
              <div className="absolute top-6 left-6 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xl border border-white/70">
                <Leaf className="w-4 h-4 text-moss-700" />
                <span className="text-xs font-bold text-earth-900 tracking-wide">
                  {t.sunlitBadge || "Pure Sunlit Rest 🍃"}
                </span>
              </div>

              {/* Hotspot Pulse Marker */}
              <div 
                onClick={() => setHotspotActive(!hotspotActive)}
                className="absolute bottom-[35%] right-[28%] z-30 cursor-pointer group/spot"
              >
                <div className="w-9 h-9 rounded-full bg-moss-700 text-white flex items-center justify-center hotspot-pulse shadow-2xl border-2 border-white transform hover:scale-110 transition-transform">
                  <MousePointerClick className="w-4 h-4" />
                </div>

                {/* Hotspot Tooltip */}
                <div className={`absolute bottom-11 right-0 w-56 glass-panel-dark p-3.5 rounded-2xl text-beige-50 shadow-2xl transition-all duration-300 border border-moss-500/50 ${
                  hotspotActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover/spot:opacity-100 group-hover/spot:scale-100'
                }`}>
                  <div className="text-[10px] font-bold text-sunlight-400 uppercase tracking-widest">EcoSip Bottle</div>
                  <div className="text-xs font-serif-heading font-bold text-beige-50">
                    {t.hotspotTitle || "1.5L Time-Marked Hydration"}
                  </div>
                  <div className="text-[10px] text-beige-300 mt-0.5">
                    {t.hotspotDesc || "Pop-Up Straw & Carry Handle"}
                  </div>
                </div>
              </div>

              {/* Floating Bottom Bar */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-dark p-4 rounded-3xl shadow-xl flex items-center justify-between border border-moss-600/40 backdrop-blur-xl">
                <div>
                  <div className="text-[10px] font-bold text-sunlight-400 uppercase tracking-widest">Outdoor Chill</div>
                  <div className="text-xs font-serif-heading font-bold text-beige-50">EcoSip Hydration Bottle</div>
                </div>

                <button
                  onClick={onOpenOrder}
                  className="px-4 py-2 rounded-full bg-moss-700 hover:bg-moss-600 text-beige-50 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                >
                  {t.claimButton || "Claim Companion"}
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

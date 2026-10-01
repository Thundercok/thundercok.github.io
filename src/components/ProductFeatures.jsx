import React, { useState } from 'react';
import { Trees, PawPrint, Leaf, ShieldCheck, CheckCircle2, Sparkles, MousePointerClick, ArrowRight } from 'lucide-react';
import { translations } from '../translations';

import strawOpenImg from '../assets/straw_open.jpg';
import handleCarryImg from '../assets/handle_carry.jpg';
import storyMossImg from '../assets/story_moss.jpg';
import storyTrailImg from '../assets/story_trail.jpg';

export default function ProductFeatures({ lang, onOpenOrder }) {
  const [activeFeature, setActiveFeature] = useState('straw');
  const t = translations[lang]?.features || translations.en.features;

  const iconMap = {
    straw: PawPrint,
    handle: Trees,
    seal: ShieldCheck,
    eco: Leaf,
  };

  // Dedicated photo assignment per feature
  const featurePhotos = {
    straw: strawOpenImg,
    handle: handleCarryImg,
    seal: storyMossImg,
    eco: storyTrailImg,
  };

  const featureHotspots = {
    straw: { top: '22%', left: '52%', label: t.markers?.straw || 'One-Handed Pop-Up Straw' },
    handle: { top: '15%', left: '48%', label: t.markers?.handle || 'Ergonomic Carry Handle' },
    seal: { top: '35%', left: '50%', label: t.markers?.seal || '100% Leak-Proof Lock' },
    eco: { top: '65%', left: '45%', label: t.markers?.eco || 'BPA-Free Polycarbonate' },
  };

  const currentFeature = t.list.find(f => f.id === activeFeature) || t.list[2];

  return (
    <section id="features" className="py-28 bg-beige-50 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-[-5%] w-96 h-96 bg-moss-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-[500px] h-[500px] bg-sunlight-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-moss-100 text-moss-800 text-xs font-bold tracking-widest uppercase border border-moss-600/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-moss-600" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif-heading font-extrabold text-earth-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-earth-700 font-normal max-w-2xl mx-auto">
            {t.sub}
          </p>
        </div>

        {/* Feature Interactive Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT (6/12): Feature Selector Cards */}
          <div className="lg:col-span-6 space-y-4">
            {t.list.map((item) => {
              const IconComponent = iconMap[item.id] || Leaf;
              const isActive = activeFeature === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveFeature(item.id)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-beige-100 border-moss-700 shadow-earth ring-2 ring-moss-600/30 translate-x-2'
                      : 'bg-beige-100/50 border-beige-300 hover:bg-beige-200/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3.5 rounded-2xl transition-colors ${
                      isActive ? 'bg-earth-900 text-beige-50 shadow-md' : 'bg-beige-300 text-earth-800'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-moss-800">
                          {item.subtitle}
                        </span>
                        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                          isActive ? 'bg-moss-800 text-beige-50' : 'bg-beige-300 text-earth-800'
                        }`}>
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif-heading font-bold text-earth-900">
                        {item.title}
                      </h3>

                      <p className="text-sm text-earth-700 leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT (6/12): Live Photo Display + Details Box Below */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unobscured Photo Container Frame */}
            <div className="relative w-full h-[480px] sm:h-[540px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-beige-200 bg-earth-900 group">
              
              {/* Live Feature Photo */}
              <img
                src={featurePhotos[activeFeature]}
                alt="EcoSip Bottle Feature Detail"
                className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                loading="lazy"
              />

              {/* Floating Top Left Badge */}
              <div className="absolute top-5 left-5 glass-panel px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg border border-white/80">
                <CheckCircle2 className="w-4 h-4 text-moss-700" />
                <span className="text-xs font-bold text-earth-900">{t.liveBadge || "Live Feature Photo"}</span>
              </div>

              {/* Interactive Hotspot Marker on Bottle */}
              {featureHotspots[activeFeature] && (
                <div 
                  className="absolute z-20"
                  style={{ top: featureHotspots[activeFeature].top, left: featureHotspots[activeFeature].left }}
                >
                  <div className="w-8 h-8 rounded-full bg-moss-700 text-white flex items-center justify-center hotspot-pulse shadow-xl border-2 border-white">
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 glass-panel-dark px-3 py-1.5 rounded-xl text-[11px] font-bold text-beige-50 whitespace-nowrap shadow-xl border border-moss-500/40">
                    {featureHotspots[activeFeature].label}
                  </div>
                </div>
              )}

            </div>

            {/* HIGH-IMPACT FEATURE DETAILS PANEL */}
            <div className="p-6 rounded-3xl bg-earth-900 text-beige-50 shadow-2xl border border-earth-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sunlight-400 uppercase tracking-widest">
                  {currentFeature.subtitle}
                </span>
                <span className="text-xs font-semibold px-3 py-1 bg-earth-800 text-moss-300 rounded-full border border-earth-700">
                  {currentFeature.tag}
                </span>
              </div>

              <h4 className="text-2xl font-serif-heading font-bold text-beige-50">
                {currentFeature.title}
              </h4>

              <p className="text-xs sm:text-sm text-beige-300 leading-relaxed font-normal">
                {currentFeature.desc}
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenOrder}
                  className="w-full py-3.5 rounded-2xl bg-moss-700 hover:bg-moss-600 text-beige-50 font-bold text-xs uppercase tracking-wider transition-all shadow-moss flex items-center justify-center gap-2 group"
                >
                  <span>{t.orderBtn || "Order EcoSip Companion"}</span>
                  <ArrowRight className="w-4 h-4 text-beige-200 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

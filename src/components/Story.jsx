import React, { useState, useEffect } from 'react';
import { Trees, Quote, Footprints, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { translations } from '../translations';
import storyMossImg from '../assets/story_moss.jpg';
import storyBenchImg from '../assets/story_bench.jpg';
import storyTrailImg from '../assets/story_trail.jpg';

export default function Story({ lang }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const t = translations[lang]?.story || translations.en.story;

  const slides = [
    {
      img: storyMossImg,
      tag: t.slides?.[0]?.label || "🍃 Moss Covered Rock",
      alt: t.slides?.[0]?.alt || "EcoSip bottle resting on moss covered rock"
    },
    {
      img: storyBenchImg,
      tag: t.slides?.[1]?.label || "🪑 Wooden Park Bench",
      alt: t.slides?.[1]?.alt || "EcoSip bottle on wooden park bench"
    },
    {
      img: storyTrailImg,
      tag: t.slides?.[2]?.label || "🌲 Outdoor Court Trail",
      alt: t.slides?.[2]?.alt || "EcoSip bottle on outdoor trail"
    }
  ];

  // Auto rotate slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="story" className="py-24 bg-beige-100 relative overflow-hidden">
      
      {/* Decorative Background Aura */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-moss-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-earth-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-beige-300 text-earth-800 text-xs font-bold tracking-widest uppercase border border-beige-400/60 shadow-sm">
            <Trees className="w-4 h-4 text-moss-700" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-earth-900 leading-tight">
            {t.title}
          </h2>
        </div>

        {/* Grid: Rotating Single Photo Frame + Story Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: SINGLE ROTATING PHOTO FRAME */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-beige-50 bg-earth-900 group">
              
              {/* Slides */}
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    idx === activeIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />

                  {/* Soft bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Location Tag Badge */}
                  <div className="absolute top-5 left-5 glass-panel px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg border border-white/70">
                    <Sparkles className="w-4 h-4 text-moss-700" />
                    <span className="text-xs font-bold text-earth-900 tracking-wide">{slide.tag}</span>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveIdx((activeIdx - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-earth-900 shadow-lg hover:scale-110 transition-transform"
                title="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveIdx((activeIdx + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-earth-900 shadow-lg hover:scale-110 transition-transform"
                title="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Dot Indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-earth-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIdx === idx ? 'w-8 bg-sunlight-400' : 'w-2.5 bg-white/50 hover:bg-white'
                    }`}
                    title={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-8 rounded-3xl bg-beige-50 shadow-earth border border-beige-300/80 space-y-6">
              
              <p className="text-base sm:text-lg text-earth-800 leading-relaxed font-normal">
                {t.paragraph1}
              </p>

              <p className="text-base sm:text-lg text-earth-800 leading-relaxed font-normal">
                {t.paragraph2}
              </p>

              {/* Callout Quote Card */}
              <div className="p-6 rounded-2xl bg-earth-900 text-beige-50 space-y-3 relative overflow-hidden shadow-lg">
                <Quote className="w-8 h-8 text-moss-500/30 absolute top-4 right-4" />
                <div className="flex items-center gap-2 text-sunlight-400 text-xs font-semibold uppercase tracking-widest">
                  <Footprints className="w-4 h-4" />
                  <span>{t.ethosBadge || "EcoSip Ethos"}</span>
                </div>
                <p className="font-serif-heading italic text-lg sm:text-xl text-beige-100">
                  "{t.quote}"
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

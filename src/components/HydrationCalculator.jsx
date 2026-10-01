import React, { useState } from 'react';
import { Calculator, Droplets, Info, Check } from 'lucide-react';
import { translations } from '../translations';

export default function HydrationCalculator({ lang }) {
  const [weight, setWeight] = useState(65);
  const [activityKey, setActivityKey] = useState('moderate');
  const t = translations[lang]?.calculator || translations.en.calculator;

  const currentActivity = t.activities.find(a => a.key === activityKey) || t.activities[1];

  // Water calculation formula: weight * multiplier in ml
  const totalWaterMl = weight * currentActivity.multiplier;
  const totalWaterLiters = (totalWaterMl / 1000).toFixed(1);
  const bottleRefills = (totalWaterMl / 1500).toFixed(1);

  return (
    <section id="calculator" className="py-24 bg-beige-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-moss-100 text-moss-800 text-xs font-bold tracking-widest uppercase">
            <Calculator className="w-4 h-4 text-moss-700" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-earth-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-earth-700 font-normal">
            {t.sub}
          </p>
        </div>

        {/* Card Calculator Container */}
        <div className="max-w-4xl mx-auto bg-beige-100/90 rounded-3xl p-8 sm:p-12 shadow-earth border border-beige-300 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Inputs */}
          <div className="md:col-span-7 space-y-8">
            
            {/* Weight Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-earth-900 uppercase tracking-wider">
                  {t.weightLabel}
                </label>
                <span className="text-2xl font-serif-heading font-bold text-moss-800">
                  {weight} kg
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="110"
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full h-3 bg-beige-300 rounded-lg appearance-none cursor-pointer accent-moss-700"
              />
              <div className="flex justify-between text-[11px] text-earth-500 font-medium">
                <span>40 kg</span>
                <span>75 kg</span>
                <span>110 kg</span>
              </div>
            </div>

            {/* Activity Level Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-earth-900 uppercase tracking-wider">
                {t.activityLabel}
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {t.activities.map((act) => (
                  <button
                    key={act.key}
                    onClick={() => setActivityKey(act.key)}
                    className={`p-3.5 rounded-2xl text-left flex items-center justify-between transition-all border ${
                      activityKey === act.key
                        ? 'bg-earth-900 text-beige-50 border-earth-900 shadow-md'
                        : 'bg-beige-50 text-earth-800 border-beige-300 hover:bg-beige-200'
                    }`}
                  >
                    <span className="text-sm font-semibold">{act.label}</span>
                    {activityKey === act.key && (
                      <div className="w-5 h-5 rounded-full bg-moss-500 flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Calculated Result Box */}
          <div className="md:col-span-5 bg-earth-900 text-beige-50 p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-moss-400 text-xs font-bold uppercase tracking-widest">
                <Droplets className="w-4 h-4 text-moss-500 animate-bounce-slow" />
                <span>{t.resultBadge || "Result"}</span>
              </div>
              <div className="text-xs text-beige-300">{t.resultTitle}</div>
              <div className="text-5xl font-serif-heading font-extrabold text-sunlight-400">
                {totalWaterLiters} Liters
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-earth-800/80 border border-earth-700 space-y-1">
              <div className="text-xs text-beige-300">{t.refillText}</div>
              <div className="text-xl font-bold text-beige-50 flex items-baseline gap-1.5">
                <span className="text-moss-400 font-serif-heading text-2xl">{bottleRefills}</span>
                <span className="text-xs font-normal text-beige-300">{t.refillSuffix}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-beige-300/80 bg-earth-800/40 p-3 rounded-xl">
              <Info className="w-4 h-4 text-sunlight-500 flex-shrink-0 mt-0.5" />
              <span>{t.tip}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

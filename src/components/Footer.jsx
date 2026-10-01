import React from 'react';
import { Trees, Volume2, VolumeX } from 'lucide-react';
import { translations } from '../translations';

export default function Footer({ lang, isAudioPlaying, toggleAudio, onOpenOrder }) {
  const t = translations[lang]?.footer || translations.en.footer;

  return (
    <footer className="bg-earth-900 text-beige-100 pt-16 pb-12 relative overflow-hidden border-t border-earth-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-earth-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-moss-700 flex items-center justify-center text-beige-50">
                <Trees className="w-5 h-5" />
              </div>
              <span className="font-serif-heading font-bold text-2xl tracking-wider text-beige-50">
                ECOSIP.
              </span>
            </div>

            <p className="text-sm text-beige-300 max-w-sm font-normal leading-relaxed">
              {t.tagline}
            </p>

            {/* Audio Toggle Pill in Footer */}
            <button
              onClick={toggleAudio}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-800 hover:bg-earth-700 text-xs font-semibold text-beige-200 transition-colors border border-earth-700"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-moss-400 animate-pulse" />
                  <span>{t.soundOn}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-beige-400" />
                  <span>{t.soundOff}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sunlight-400">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-beige-300">
              <li><a href="#story" className="hover:text-beige-50 transition-colors">{t.links?.story || "The Story"}</a></li>
              <li><a href="#features" className="hover:text-beige-50 transition-colors">{t.links?.features || "Key Features"}</a></li>
              <li><a href="#timeline" className="hover:text-beige-50 transition-colors">{t.links?.timeline || "Daily Rhythm"}</a></li>
              <li><a href="#calculator" className="hover:text-beige-50 transition-colors">{t.links?.calculator || "Hydration Calculator"}</a></li>
              <li><a href="#gallery" className="hover:text-beige-50 transition-colors">{t.links?.gallery || "Photo Gallery"}</a></li>
            </ul>
          </div>

          {/* Call to action & Socials */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sunlight-400">
              {t.joinTitle || "Join The Journey"}
            </h4>
            <p className="text-xs text-beige-300">
              {t.joinSub || "Receive quiet reminders and eco outdoor tips."}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t.emailPlaceholder || "Enter your email"}
                className="px-4 py-2.5 rounded-full bg-earth-800 border border-earth-700 text-xs text-beige-100 placeholder:text-beige-400 focus:outline-none focus:border-moss-500 flex-1"
              />
              <button 
                onClick={onOpenOrder}
                className="px-4 py-2.5 rounded-full bg-moss-700 hover:bg-moss-600 text-beige-50 text-xs font-bold uppercase transition-colors"
              >
                {t.joinBtn || "Join"}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-beige-400">
          <div>{t.copyright}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-beige-200">{t.legal}</a>
            <a href="#" className="hover:text-beige-200">{t.links?.ethos || "EcoSip Ethos"}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

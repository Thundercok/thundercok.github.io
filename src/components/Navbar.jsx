import React, { useState, useEffect } from 'react';
import { Trees, Volume2, VolumeX, ShoppingBag, Menu, X } from 'lucide-react';
import { translations } from '../translations';

export default function Navbar({ lang, setLang, isAudioPlaying, toggleAudio, onOpenOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang]?.nav || translations.en.nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.features, href: '#features' },
    { label: t.customizer, href: '#customizer' },
    { label: t.timeline, href: '#timeline' },
    { label: t.calculator, href: '#calculator' },
    { label: t.story, href: '#story' },
    { label: t.company, href: '#company' },
    { label: t.gallery, href: '#gallery' },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'vi', label: 'VI' },
    { code: 'cn', label: 'CN' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-beige-50/90 backdrop-blur-md shadow-earth border-b border-beige-300/50' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-moss-800 flex items-center justify-center text-beige-50 shadow-md transition-transform duration-300 group-hover:scale-105">
              <Trees className="w-5 h-5 text-moss-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-heading font-bold text-xl tracking-wider text-earth-900 leading-none">
                ECOSIP
              </span>
              <span className="text-[10px] tracking-[0.25em] text-earth-600 font-semibold uppercase">
                HYDRATION
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-sm font-medium text-earth-700 hover:text-moss-800 transition-colors duration-200 tracking-wide relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-moss-600 hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2.5 rounded-full bg-beige-200 hover:bg-beige-300 text-earth-800 transition-all duration-200 flex items-center gap-1.5 text-xs font-medium border border-beige-300/60"
              title={isAudioPlaying ? t.soundOffTooltip : t.soundOnTooltip}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-moss-700 animate-pulse" />
                  <span className="text-[11px] text-moss-800 hidden lg:inline">{t.soundOnTooltip}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-earth-500" />
                  <span className="text-[11px] text-earth-600 hidden lg:inline">{t.soundOffTooltip}</span>
                </>
              )}
            </button>

            {/* Language Switcher (EN / VI / CN) */}
            <div className="flex items-center bg-beige-200 p-1 rounded-full border border-beige-300/60">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                    lang === l.code
                      ? 'bg-earth-900 text-beige-50 shadow-sm'
                      : 'text-earth-700 hover:text-earth-900'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Claim Order Button */}
            <button
              onClick={onOpenOrder}
              className="px-5 py-2.5 rounded-full bg-moss-800 hover:bg-moss-900 text-beige-50 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-moss hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.order}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="flex items-center bg-beige-200 p-0.5 rounded-full border border-beige-300">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    lang === l.code ? 'bg-earth-900 text-beige-50' : 'text-earth-800'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-beige-200 text-earth-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-beige-50 border-b border-beige-300 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-earth-800 hover:text-moss-700 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={toggleAudio}
              className="w-full py-2.5 rounded-xl bg-beige-200 text-earth-800 text-sm font-medium flex items-center justify-center gap-2"
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-moss-700" /> : <VolumeX className="w-4 h-4" />}
              <span>{isAudioPlaying ? t.soundOnTooltip : t.soundOffTooltip}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 rounded-full bg-moss-800 text-beige-50 text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-moss"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.order}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

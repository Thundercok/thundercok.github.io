import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Snowflake, Sun, Droplets, Check, ShieldCheck, ShoppingBag, Rotate3D } from 'lucide-react';
import { translations } from '../translations';
import { playWaterDropSound } from '../utils/useSoundEffects';

const COLOR_VARIANTS = [
  {
    id: 'purple',
    hex: '#8A4BAF',
    glow: 'rgba(138, 75, 175, 0.22)',
    name: { en: 'Lavender Purple', vi: 'Tím Lavender' },
    tag: { en: 'Sweet & Vibrant', vi: 'Ngọt ngào & Nổi bật' },
    bodyGrad: ['#A855F7', '#7E22CE'],
    capGrad: ['#6B21A8', '#3B0764'],
    waterGrad: ['#C084FC', '#9333EA'],
    opacity: 0.85,
  },
  {
    id: 'pink',
    hex: '#E86F68',
    glow: 'rgba(232, 111, 104, 0.22)',
    name: { en: 'Coral Rose Pink', vi: 'Hồng San Hô' },
    tag: { en: 'Warm & Playful', vi: 'Ấm áp & Trẻ trung' },
    bodyGrad: ['#FB7185', '#E11D48'],
    capGrad: ['#9F1239', '#4C0519'],
    waterGrad: ['#FDA4AF', '#F43F5E'],
    opacity: 0.85,
  },
  {
    id: 'black',
    hex: '#3A3D40',
    glow: 'rgba(58, 61, 64, 0.22)',
    name: { en: 'Smokey Obsidian Black', vi: 'Đen Khói Đêm' },
    tag: { en: 'Sleek & Minimal', vi: 'Tối giản & Đẳng cấp' },
    bodyGrad: ['#4B5563', '#111827'],
    capGrad: ['#1F2937', '#030712'],
    waterGrad: ['#6B7280', '#374151'],
    opacity: 0.88,
  },
  {
    id: 'green',
    hex: '#5B9E5A',
    glow: 'rgba(91, 158, 90, 0.22)',
    name: { en: 'Sage Canopy Green', vi: 'Xanh Rêu Tán Cây' },
    tag: { en: 'Nature & Fresh', vi: 'Tự nhiên & Tươi mát' },
    bodyGrad: ['#34D399', '#047857'],
    capGrad: ['#065F46', '#022C22'],
    waterGrad: ['#6EE7B7', '#10B981'],
    opacity: 0.85,
  },
  {
    id: 'clear',
    hex: '#D9E0E8',
    glow: 'rgba(217, 224, 232, 0.3)',
    name: { en: 'Crystal Clear White', vi: 'Trắng Trong Suốt' },
    tag: { en: 'Pure & Modern', vi: 'Tinh khôi & Hiện đại' },
    bodyGrad: ['#F1F5F9', '#94A3B8'],
    capGrad: ['#475569', '#0F172A'],
    waterGrad: ['#E2E8F0', '#CBD5E1'],
    opacity: 0.75,
  },
];

export default function ProductCustomizer({ lang = 'en', onOpenCustomOrder }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const t = translations[lang]?.customizer || translations['en'].customizer;
  const activeColor = COLOR_VARIANTS[selectedIdx];

  const handleSelectColor = (idx) => {
    setSelectedIdx(idx);
    playWaterDropSound();
  };

  const handleOrder = () => {
    playWaterDropSound();
    if (onOpenCustomOrder) {
      onOpenCustomOrder({
        body: { name: activeColor.name },
        cap: { name: { en: 'Integrated Cap', vi: 'Nắp Bật Chống Rò Rỉ' } },
        strap: { name: { en: 'Ergonomic Loop', vi: 'Quai Xách Linh Hoạt' } },
        totalPrice: '$5.00',
        lang,
      });
    }
  };

  // 3D Drag Rotation Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - startX;
    setRotationY((prev) => prev + delta * 0.5);
    setStartX(clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="customizer" className="py-20 bg-beige-50 relative overflow-hidden selection:bg-moss-700 selection:text-white">
      
      {/* Seamless Dynamic Color Atmosphere */}
      <motion.div
        animate={{ backgroundColor: activeColor.glow }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[130px] pointer-events-none opacity-60"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-moss-800 bg-moss-200/60 border border-moss-300/80 uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-moss-700" />
            {t.tag}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-earth-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-earth-700 font-medium max-w-xl mx-auto">
            {t.sub}
          </p>
        </div>

        {/* 100% Vector Pristine Render Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
          
          {/* LEFT: 3D Interactive Drag-to-Rotate Vector Bottle Render */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px] cursor-grab active:cursor-grabbing select-none group"
          >
            
            {/* Soft Radial Contact Floor Shadow */}
            <div className="absolute bottom-4 w-48 h-7 bg-earth-900/15 rounded-full blur-md transform scale-x-125 pointer-events-none" />

            {/* 3D Drag Hint Pill */}
            <div className="absolute top-2 bg-earth-900/80 backdrop-blur-md text-beige-100 text-[11px] font-bold px-3 py-1 rounded-full shadow-md border border-earth-700 flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
              <Rotate3D className="w-3.5 h-3.5 text-sunlight-400 animate-spin-slow" />
              <span>Drag to rotate 3D</span>
            </div>

            {/* Pristine Vector Bottle SVG Container with 3D Y-Rotation */}
            <div 
              className="relative w-64 sm:w-72 h-[380px] sm:h-[440px] flex items-center justify-center transition-transform duration-100"
              style={{
                perspective: '1000px',
                transform: `rotateY(${rotationY}deg)`,
              }}
            >
              
              <AnimatePresence mode="wait">
                <motion.svg
                  key={activeColor.id}
                  viewBox="0 0 240 460"
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="w-full h-full drop-shadow-2xl pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Bottle Translucent Body Gradient */}
                    <linearGradient id={`bodyGrad_${activeColor.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={activeColor.bodyGrad[0]} stopOpacity={activeColor.opacity} />
                      <stop offset="60%" stopColor={activeColor.bodyGrad[1]} stopOpacity={activeColor.opacity * 0.95} />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
                    </linearGradient>

                    {/* Cap & Loop Gradient */}
                    <linearGradient id={`capGrad_${activeColor.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={activeColor.capGrad[0]} />
                      <stop offset="100%" stopColor={activeColor.capGrad[1]} />
                    </linearGradient>

                    {/* Water Level Liquid Gradient */}
                    <linearGradient id={`waterGrad_${activeColor.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={activeColor.waterGrad[0]} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={activeColor.waterGrad[1]} stopOpacity="0.75" />
                    </linearGradient>

                    {/* Glass Specular Reflection Highlight */}
                    <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* BOTTLE BODY CONTAINER */}
                  <rect
                    x="40"
                    y="110"
                    width="160"
                    height="310"
                    rx="36"
                    fill={`url(#bodyGrad_${activeColor.id})`}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                  />

                  {/* WATER LIQUID LEVEL */}
                  <path
                    d="M 41 210 Q 80 205, 120 210 T 199 210 L 199 384 C 199 402, 184 419, 164 419 L 76 419 C 56 419, 41 402, 41 384 Z"
                    fill={`url(#waterGrad_${activeColor.id})`}
                  />

                  {/* FLOATING ICE CUBES INSIDE BOTTLE */}
                  <g opacity="0.65">
                    {/* Ice cube 1 */}
                    <rect x="75" y="240" width="28" height="28" rx="6" fill="#FFFFFF" opacity="0.7" transform="rotate(12 75 240)" />
                    {/* Ice cube 2 */}
                    <rect x="130" y="290" width="24" height="24" rx="5" fill="#FFFFFF" opacity="0.6" transform="rotate(-15 130 290)" />
                    {/* Ice cube 3 */}
                    <rect x="90" y="340" width="22" height="22" rx="5" fill="#FFFFFF" opacity="0.5" transform="rotate(25 90 340)" />
                  </g>

                  {/* SPECULAR SHINE HIGHLIGHT */}
                  <rect
                    x="56"
                    y="118"
                    width="24"
                    height="294"
                    rx="12"
                    fill="url(#glassReflect)"
                  />

                  {/* TIMED HYDRATION MARKERS (7 AM - 9 PM) */}
                  <g fill="#FFFFFF" opacity="0.85" textAnchor="end" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">
                    <text x="182" y="150">7 AM • 200ml</text>
                    <line x1="186" y1="147" x2="194" y2="147" stroke="#FFF" strokeWidth="1.5" opacity="0.9" />
                    
                    <text x="182" y="190">9 AM • 450ml</text>
                    <line x1="186" y1="187" x2="194" y2="187" stroke="#FFF" strokeWidth="1.5" opacity="0.9" />
                    
                    <text x="182" y="230">11 AM • 700ml</text>
                    <line x1="186" y1="227" x2="194" y2="227" stroke="#FFF" strokeWidth="1.5" opacity="0.9" />
                    
                    <text x="182" y="270">1 PM • 950ml</text>
                    <line x1="186" y1="267" x2="194" y2="267" stroke="#FFF" strokeWidth="1.5" opacity="0.9" />
                    
                    <text x="182" y="310">3 PM • 1200ml</text>
                    <line x1="186" y1="307" x2="194" y2="307" stroke="#FFF" strokeWidth="1.5" opacity="0.9" />
                    
                    <text x="182" y="350">7 PM • 1550ml</text>
                    <line x1="186" y1="347" x2="194" y2="347" stroke="#FFF" strokeWidth="1.5" opacity="0.9" />
                    
                    <text x="182" y="390">9 PM • Goal ✨</text>
                    <line x1="186" y1="387" x2="194" y2="387" stroke="#FFF" strokeWidth="1.5" opacity="0.9" />
                  </g>

                  {/* ECOSIP BRANDING ON BOTTLE */}
                  <text x="120" y="380" textAnchor="middle" fill="#FFFFFF" opacity="0.8" fontSize="13" fontWeight="bold" letterSpacing="3">
                    ECOSIP
                  </text>

                  {/* BOTTLE CAP & FLIP LATCH */}
                  <rect
                    x="56"
                    y="82"
                    width="128"
                    height="32"
                    rx="9"
                    fill={`url(#capGrad_${activeColor.id})`}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />

                  {/* DUST-SHIELD TOP LID */}
                  <path
                    d="M 76 82 C 76 52, 164 52, 164 82 Z"
                    fill={`url(#capGrad_${activeColor.id})`}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />

                  {/* POP-UP STRAW */}
                  <rect x="114" y="38" width="12" height="22" rx="4" fill="#FFFFFF" opacity="0.8" />

                  {/* ERGONOMIC CARRY HANDLE LOOP */}
                  <path
                    d="M 64 82 C 28 60, 28 15, 68 25 C 88 30, 88 82, 88 82"
                    fill="none"
                    stroke={`url(#capGrad_${activeColor.id})`}
                    strokeWidth="13"
                    strokeLinecap="round"
                  />

                  {/* PUSH-BUTTON RELEASE LATCH */}
                  <rect x="108" y="78" width="24" height="12" rx="4" fill="#E2E8F0" />
                </motion.svg>
              </AnimatePresence>

              {/* Floating Feature Badges */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-8 -left-2 sm:-left-6 flex flex-col gap-2.5 pointer-events-none z-20"
              >
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-sky-700 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg border border-sky-100">
                  <Snowflake className="w-4 h-4 text-sky-500 animate-pulse" />
                  <span>{t.coldBadge}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-amber-700 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg border border-amber-100">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>{t.hotBadge}</span>
                </div>
              </motion.div>

              {/* Capacity Floating Pill */}
              <div className="absolute bottom-10 -right-2 sm:-right-4 bg-white/90 backdrop-blur-md text-earth-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg border border-earth-200/80 flex items-center gap-1.5 pointer-events-none z-20">
                <Droplets className="w-4 h-4 text-moss-600" />
                <span>{t.capacityBadge}</span>
              </div>

            </div>

          </div>

          {/* RIGHT: Modern 5-Color Picker Control Panel */}
          <div className="lg:col-span-6 bg-white/90 backdrop-blur-xl p-7 sm:p-9 rounded-3xl border border-earth-200/80 shadow-2xl space-y-6">
            
            {/* Color Swatch Selection Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-bold text-earth-600 uppercase tracking-widest">
                  {t.selectColor}
                </label>
                <span className="text-sm font-extrabold text-earth-900 bg-earth-100 px-3 py-1 rounded-full border border-earth-200">
                  {activeColor.name[lang]}
                </span>
              </div>

              {/* 5 Big Swatch Circles */}
              <div className="flex items-center justify-between gap-3 pt-1">
                {COLOR_VARIANTS.map((col, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <button
                      key={col.id}
                      onClick={() => handleSelectColor(idx)}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? 'ring-4 ring-moss-700 ring-offset-2 scale-110 shadow-xl'
                          : 'hover:scale-105 opacity-80 hover:opacity-100 shadow-md'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name[lang]}
                      aria-label={col.name[lang]}
                    >
                      {isSelected && (
                        <Check className={`w-6 h-6 ${col.id === 'clear' ? 'text-earth-900' : 'text-white'} drop-shadow-md`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Variant Detail Card */}
            <div className="bg-earth-50/90 p-4 sm:p-5 rounded-2xl border border-earth-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-earth-900">
                  {activeColor.name[lang]}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-moss-800 text-white shadow-sm">
                  {activeColor.tag[lang]}
                </span>
              </div>
              
              <div className="text-xs text-earth-600 flex items-center gap-2 pt-1 font-medium">
                <ShieldCheck className="w-4 h-4 text-moss-700 shrink-0" />
                <span>{t.bpaBadge}</span>
              </div>
            </div>

            {/* Pricing & Claim Order CTA */}
            <div className="pt-2">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <span className="text-xs text-earth-400 line-through mr-2 font-semibold">{t.origPrice}</span>
                  <span className="text-3xl sm:text-4xl font-serif-heading font-extrabold text-moss-800">{t.price}</span>
                </div>
                <span className="text-xs font-bold text-moss-900 bg-moss-100 border border-moss-200/80 px-3 py-1.5 rounded-full">
                  {t.freeShipping}
                </span>
              </div>

              <button
                onClick={handleOrder}
                className="w-full py-4 px-6 rounded-2xl bg-moss-800 hover:bg-moss-900 text-white font-bold text-base shadow-moss hover:shadow-2xl transform active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t.orderBtn}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

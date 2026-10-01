import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Sparkles, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../translations';

export default function OrderModal({ isOpen, onClose, lang, customConfig = null }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('1.5L');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });

  if (!isOpen) return null;

  const t = translations[lang]?.orderModal || translations.en.orderModal;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-earth-900/80 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-300">
      
      <div className="relative w-full max-w-xl bg-beige-50 rounded-3xl p-6 sm:p-8 shadow-2xl border border-beige-300 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-beige-200 text-earth-800 hover:bg-beige-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-moss-100 text-moss-700 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif-heading font-bold text-earth-900">
              {t.successMsg}
            </h3>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-moss-800 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-moss-600" />
                <span>{customConfig ? (t.customOrderTitle || 'Custom Studio Order') : (t.standardOrderTitle || 'EcoSip Store')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-earth-900">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-earth-600 mt-1">
                {t.subtitle}
              </p>
            </div>

            {/* Custom Configuration Banner */}
            {customConfig && (
              <div className="p-4 rounded-2xl bg-moss-900 text-white border border-moss-700 shadow-md">
                <div className="text-xs font-bold text-moss-300 uppercase tracking-wider mb-1">
                  {t.customRecipeTitle || '✨ Custom Build Recipe:'}
                </div>
                <div className="text-sm font-semibold">
                  {t.bodyLabel || 'Body:'} {customConfig.body.name[lang] || customConfig.body.name.en} | {t.capLabel || 'Cap:'} {customConfig.cap.name[lang] || customConfig.cap.name.en} | {t.strapLabel || 'Strap:'} {customConfig.strap.name[lang] || customConfig.strap.name.en}
                </div>
                <div className="mt-2 text-xs text-moss-200">
                  {t.customTotalLabel || 'Custom Total:'} <span className="text-white font-extrabold text-sm">{customConfig.totalPrice}</span>
                </div>
              </div>
            )}

            {/* Price Badge */}
            <div className="p-4 rounded-2xl bg-beige-200/80 border border-beige-300 flex items-center justify-between">
              <div>
                <span className="text-xs text-earth-500 line-through mr-2">{t.origPrice}</span>
                <span className="text-2xl font-serif-heading font-extrabold text-moss-800">
                  {customConfig ? customConfig.totalPrice : t.price}
                </span>
              </div>
              <div className="text-xs font-bold px-3 py-1 bg-sunlight-500/20 text-earth-900 rounded-full">
                {t.discountTag || '25% Launch Discount'}
              </div>
            </div>

            {/* Color Variant Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-earth-900 uppercase tracking-wider">
                {t.colorLabel} <span className="text-moss-700">{t.colors[selectedColor]?.name}</span>
              </label>
              <div className="flex gap-3">
                {t.colors.map((col, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(idx)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      selectedColor === idx ? 'border-earth-900 scale-110 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: col.code }}
                    title={col.name}
                  >
                    {selectedColor === idx && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Volume Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-earth-900 uppercase tracking-wider">
                {t.sizeLabel}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['1.5L (Standard)', '2.0L (Trek Max)'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'bg-earth-900 text-beige-50 border-earth-900'
                        : 'bg-beige-100 text-earth-800 border-beige-300 hover:bg-beige-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="text"
                required
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-beige-100 border border-beige-300 text-sm text-earth-900 focus:outline-none focus:border-moss-700"
              />
              <input
                type="email"
                required
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-beige-100 border border-beige-300 text-sm text-earth-900 focus:outline-none focus:border-moss-700"
              />
              <input
                type="text"
                required
                placeholder={t.addressPlaceholder}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-beige-100 border border-beige-300 text-sm text-earth-900 focus:outline-none focus:border-moss-700"
              />

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-moss-800 hover:bg-moss-900 text-beige-50 font-bold text-xs uppercase tracking-widest shadow-moss transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.submitBtn}</span>
              </button>
            </form>

            {/* Guarantees */}
            <div className="pt-2 flex items-center justify-around text-[11px] text-earth-600 font-semibold border-t border-beige-300">
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-moss-700" />
                <span>{t.shipping}</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-moss-700" />
                <span>{t.guarantee}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

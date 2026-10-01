import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Factory, X, ZoomIn, CheckCircle2 } from 'lucide-react';
import { translations } from '../translations';

// Import Google Drive Company Assets
import imgEntrance from '../assets/company_factory_entrance.png';
import imgFactory from '../assets/company_factory.jpg';
import imgProd1 from '../assets/company_production_1.jpg';
import imgProd2 from '../assets/company_production_2.jpg';
import imgProd3 from '../assets/company_production_3.jpg';
import imgWarehouse from '../assets/company_warehouse.jpg';
import imgService from '../assets/company_customer_service.jpg';

const PHOTO_ASSETS = {
  entrance: imgEntrance,
  factory: imgFactory,
  prod1: imgProd1,
  prod2: imgProd2,
  prod3: imgProd3,
  warehouse: imgWarehouse,
  service: imgService,
};

export default function Company({ lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const t = translations[lang]?.company || translations['en'].company;

  const filteredPhotos = t.photos.filter((photo) => {
    if (activeTab === 'all') return true;
    return photo.cat === activeTab;
  });

  return (
    <section id="company" className="py-20 bg-earth-900 text-beige-50 relative overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-moss-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-sunlight-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-moss-300 bg-moss-950 border border-moss-700/80 uppercase">
            <Building2 className="w-3.5 h-3.5 text-moss-400" />
            {t.tag}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-extrabold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-earth-300">
            {t.sub}
          </p>
        </div>

        {/* Company Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {t.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-earth-800/80 border border-earth-700/80 backdrop-blur-md text-center hover:border-moss-600/60 transition-all group"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif-heading font-extrabold text-moss-400 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-medium text-earth-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {['all', 'production', 'factory', 'support'].map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === tabKey
                  ? 'bg-moss-700 text-white shadow-lg shadow-moss-900/50 scale-105'
                  : 'bg-earth-800/80 text-earth-300 hover:bg-earth-700 hover:text-white border border-earth-700/60'
              }`}
            >
              {t.tabs[tabKey]}
            </button>
          ))}
        </div>

        {/* Interactive Photo Showcase Layout */}
        <motion.div layout className="space-y-6">
          <AnimatePresence>
            {/* FEATURED HERO CARD */}
            {activeTab === 'all' && filteredPhotos.length > 0 && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedPhoto({ ...filteredPhotos[0], src: PHOTO_ASSETS[filteredPhotos[0].id] })}
                className="group relative rounded-3xl overflow-hidden bg-earth-800 border border-earth-700/80 cursor-pointer hover:border-moss-500/80 shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 min-h-[360px]"
              >
                {/* Image Section (7 cols) */}
                <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                  <img
                    src={PHOTO_ASSETS[filteredPhotos[0].id]}
                    alt={filteredPhotos[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-earth-800 opacity-80" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider bg-moss-900/90 text-moss-300 px-3.5 py-1.5 rounded-full border border-moss-700/80 backdrop-blur-md flex items-center gap-1.5">
                      <Factory className="w-3.5 h-3.5 text-moss-400" />
                      {filteredPhotos[0].subtitle}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-earth-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Section (5 cols) */}
                <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-4 bg-earth-800">
                  <div>
                    <span className="text-xs font-bold text-moss-400 uppercase tracking-widest block mb-2">
                      {t.featuredShowcase || "FEATURED FACILITY SHOWCASE"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif-heading font-extrabold text-white group-hover:text-moss-400 transition-colors">
                      {filteredPhotos[0].title}
                    </h3>
                    <p className="mt-4 text-sm text-earth-300 leading-relaxed">
                      {filteredPhotos[0].desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-earth-700/60 flex items-center justify-between text-xs text-earth-400">
                    <span className="flex items-center gap-1.5 text-moss-300 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-moss-400" />
                      {t.solarTitle || "100% Solar-Assisted Manufacturing"}
                    </span>
                    <span className="font-bold text-moss-400 group-hover:translate-x-1 transition-transform">
                      {t.inspectPrompt || "Click to Inspect →"}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* REMAINING BALANCED 3-COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === 'all' ? filteredPhotos.slice(1) : filteredPhotos).map((photo) => {
                const imageSrc = PHOTO_ASSETS[photo.id];
                return (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedPhoto({ ...photo, src: imageSrc })}
                    className="group relative rounded-3xl overflow-hidden bg-earth-800 border border-earth-700/80 cursor-pointer hover:border-moss-500/80 shadow-xl transition-all duration-300 flex flex-col"
                  >
                    {/* Photo Frame */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {/* Hover Zoom Icon */}
                      <div className="absolute top-4 right-4 p-2 rounded-full bg-earth-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                      </div>

                      <span className="absolute bottom-4 left-4 text-[11px] font-extrabold uppercase tracking-wider bg-moss-900/90 text-moss-300 px-3 py-1 rounded-full border border-moss-700/80 backdrop-blur-md">
                        {photo.subtitle}
                      </span>
                    </div>

                    {/* Photo Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h3 className="text-lg font-serif-heading font-bold text-white group-hover:text-moss-400 transition-colors">
                          {photo.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-earth-300 line-clamp-2">
                          {photo.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg p-4 sm:p-8 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-earth-900 rounded-3xl border border-earth-700 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="md:w-3/5 relative bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              {/* Modal Description */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-earth-900">
                <div>
                  <span className="text-xs font-bold text-moss-400 uppercase tracking-widest block mb-1">
                    {selectedPhoto.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif-heading font-extrabold text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="mt-4 text-sm text-earth-300 leading-relaxed">
                    {selectedPhoto.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-earth-800 space-y-2 text-xs text-earth-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-moss-500" />
                    <span>{t.isoStandard || "ISO 9001 Quality Inspection Standard"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-moss-500" />
                    <span>{t.ecoMfg || "Eco-Friendly Sustainable Manufacturing"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

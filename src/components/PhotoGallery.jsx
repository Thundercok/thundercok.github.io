import React, { useState } from 'react';
import { Camera, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../translations';

// Import All Real Image Assets
import imgBench from '../assets/story_bench.jpg';
import imgMoss from '../assets/story_moss.jpg';
import imgTrail from '../assets/story_trail.jpg';
import imgGrass from '../assets/hero_grass.jpg';
import imgStrawOpen from '../assets/straw_open.jpg';
import imgHandleCarry from '../assets/handle_carry.jpg';
import imgPhotoStraw from '../assets/photo_straw.jpg';

import imgEntrance from '../assets/company_factory_entrance.png';
import imgFactory from '../assets/company_factory.jpg';
import imgProd1 from '../assets/company_production_1.jpg';
import imgProd2 from '../assets/company_production_2.jpg';
import imgProd3 from '../assets/company_production_3.jpg';
import imgWarehouse from '../assets/company_warehouse.jpg';
import imgService from '../assets/company_customer_service.jpg';

const GALLERY_ITEMS = [
  { id: 'b1', src: imgBench, cat: 'outdoor', title: 'Wooden Park Bench', subtitle: 'Peaceful Outdoor Rest' },
  { id: 'm1', src: imgMoss, cat: 'outdoor', title: 'Mossy Forest Rock', subtitle: 'Mossy Trail Companion' },
  { id: 't1', src: imgTrail, cat: 'outdoor', title: 'Sunny Nature Trail', subtitle: 'Trekking Path Journey' },
  { id: 'g1', src: imgGrass, cat: 'outdoor', title: 'Forest Floor Grass', subtitle: 'Pure Outdoor Atmosphere' },
  { id: 's1', src: imgStrawOpen, cat: 'outdoor', title: 'One-Touch Straw Spout', subtitle: 'Dust-Proof Lid Action' },
  { id: 'h1', src: imgHandleCarry, cat: 'outdoor', title: 'Ergonomic Loop Handle', subtitle: 'Tough Carry Grip' },
  { id: 'ps1', src: imgPhotoStraw, cat: 'outdoor', title: 'Straw Spout Close-Up', subtitle: 'Precision Spout Seal' },

  { id: 'fe', src: imgEntrance, cat: 'factory', title: 'Modern Eco Factory Entrance', subtitle: 'Solar Eco Plant' },
  { id: 'fc', src: imgFactory, cat: 'factory', title: 'Cleanroom Molding Workshop', subtitle: 'Medical-Grade Workshop' },
  { id: 'p1', src: imgProd1, cat: 'factory', title: 'Precision Molding Line 1', subtitle: 'Automated Injection' },
  { id: 'p2', src: imgProd2, cat: 'factory', title: 'Leak-Proof Cap Assembly', subtitle: 'Stress Test Station' },
  { id: 'p3', src: imgProd3, cat: 'factory', title: 'Laser Timestamp Calibration', subtitle: 'Non-Toxic Organic Ink' },
  { id: 'wh', src: imgWarehouse, cat: 'factory', title: 'Global Logistics Warehouse', subtitle: 'Eco Fulfillment Center' },
  { id: 'cs', src: imgService, cat: 'factory', title: '24/7 Dedicated Support Center', subtitle: 'Customer Care Hub' },
];

export default function PhotoGallery({ lang }) {
  const [filter, setFilter] = useState('all');
  const [activePhoto, setActivePhoto] = useState(null);
  const t = translations[lang]?.gallery || translations['en'].gallery;

  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.cat === filter);

  return (
    <section id="gallery" className="py-24 bg-beige-100 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-[-5%] w-96 h-96 bg-moss-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-moss-100 text-moss-800 text-xs font-bold tracking-widest uppercase border border-moss-200">
            <Camera className="w-4 h-4 text-moss-700" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-extrabold text-earth-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-earth-700 font-normal">
            {t.sub}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {['all', 'outdoor', 'factory'].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                filter === key
                  ? 'bg-earth-900 text-beige-50 shadow-earth scale-105'
                  : 'bg-beige-50 text-earth-700 hover:bg-beige-200 border border-beige-300'
              }`}
            >
              {t.tabs?.[key] || key}
            </button>
          ))}
        </div>

        {/* All Photos Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActivePhoto(photo)}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-beige-300/80 group cursor-pointer bg-earth-900"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="text-[11px] font-extrabold text-moss-300 uppercase tracking-widest">
                    {photo.subtitle}
                  </span>
                  <h4 className="text-lg font-serif-heading font-bold text-white mt-1">
                    {photo.title}
                  </h4>
                  <div className="mt-3 text-xs text-beige-300 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-moss-400" />
                    <span>{t.inspectPrompt || "Click image to view full photo"}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg p-4 sm:p-8 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-earth-900 rounded-3xl border border-earth-700 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="md:w-3/5 relative bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              {/* Description */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-earth-900 text-beige-50">
                <div>
                  <span className="text-xs font-bold text-moss-400 uppercase tracking-widest block mb-1">
                    {activePhoto.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif-heading font-extrabold text-white">
                    {activePhoto.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

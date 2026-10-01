import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Company from './components/Company';
import ProductFeatures from './components/ProductFeatures';
import ProductCustomizer from './components/ProductCustomizer';
import TimelineSection from './components/TimelineSection';
import HydrationCalculator from './components/HydrationCalculator';
import PhotoGallery from './components/PhotoGallery';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer';
import PresentationMode from './components/PresentationMode';
import ForestParticlesCanvas from './components/ForestParticlesCanvas';

// EcoSip Hydration Main App Component
export default function App() {
  const [lang, setLang] = useState('en');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customOrderConfig, setCustomOrderConfig] = useState(null);
  const audioCtxRef = useRef(null);

  const handleOpenStandardOrder = () => {
    setCustomOrderConfig(null);
    setIsOrderModalOpen(true);
  };

  const handleOpenCustomOrder = (config) => {
    setCustomOrderConfig(config);
    setIsOrderModalOpen(true);
  };

  // Web Audio API Procedural Chill Forest Breeze & Chime Synthesizer
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsAudioPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Create pink noise for wind breeze effect
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.03;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.15;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        // Soft random wind frequency modulation
        setInterval(() => {
          if (ctx.state === 'running') {
            filter.frequency.setTargetAtTime(300 + Math.random() * 300, ctx.currentTime, 3);
          }
        }, 4000);
      } else {
        audioCtxRef.current.resume();
      }
      setIsAudioPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 text-earth-900 selection:bg-moss-700 selection:text-beige-50 relative overflow-x-hidden">
      
      {/* Interactive Forest Leaves & Sunbeams Canvas Overlay */}
      <ForestParticlesCanvas />

      {/* Presentation Controls Overlay */}
      <PresentationMode
        lang={lang}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
        onOpenOrder={handleOpenStandardOrder}
      />

      {/* Navigation Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
        onOpenOrder={handleOpenStandardOrder}
      />

      {/* Main Page Sections */}
      <main>
        <section id="hero" className="scroll-mt-16">
          <Hero lang={lang} onOpenOrder={handleOpenStandardOrder} />
        </section>

        <section id="features" className="scroll-mt-16">
          <ProductFeatures lang={lang} onOpenOrder={handleOpenStandardOrder} />
        </section>

        <section id="customizer" className="scroll-mt-16">
          <ProductCustomizer lang={lang} onOpenCustomOrder={handleOpenCustomOrder} />
        </section>

        <section id="timeline" className="scroll-mt-16">
          <TimelineSection lang={lang} />
        </section>

        <section id="calculator" className="scroll-mt-16">
          <HydrationCalculator lang={lang} />
        </section>

        <section id="story" className="scroll-mt-16">
          <Story lang={lang} />
        </section>

        <section id="company" className="scroll-mt-16">
          <Company lang={lang} />
        </section>

        <section id="gallery" className="scroll-mt-16">
          <PhotoGallery lang={lang} />
        </section>
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
        onOpenOrder={handleOpenStandardOrder}
      />

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        lang={lang}
        customConfig={customOrderConfig}
      />

    </div>
  );
}

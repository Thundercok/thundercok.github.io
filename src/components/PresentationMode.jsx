import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Maximize, Minimize, ChevronLeft, ChevronRight, Monitor, EyeOff, Sparkles, Volume2, VolumeX, Timer, RotateCcw } from 'lucide-react';
import { translations } from '../translations';
import { playChimeSound, playClickSound } from '../utils/useSoundEffects';

const SECTIONS = [
  { id: 'hero', nameKey: 'hero' },
  { id: 'features', nameKey: 'features' },
  { id: 'customizer', nameKey: 'customizer' },
  { id: 'timeline', nameKey: 'timeline' },
  { id: 'calculator', nameKey: 'calculator' },
  { id: 'story', nameKey: 'story' },
  { id: 'company', nameKey: 'company' },
  { id: 'gallery', nameKey: 'gallery' },
];

export default function PresentationMode({
  lang,
  isAudioPlaying,
  toggleAudio,
  onOpenOrder,
}) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  // Presenter Speech Timer state (in seconds)
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const t = translations[lang]?.presenter || translations.en.presenter;

  // Speech Timer countup
  useEffect(() => {
    let timerInterval = null;
    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isTimerRunning]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Scroll to section helper
  const scrollToSection = useCallback((index) => {
    const targetIndex = Math.max(0, Math.min(SECTIONS.length - 1, index));
    const sectionId = SECTIONS[targetIndex].id;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionIndex(targetIndex);
      playChimeSound();
    }
  }, []);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          scrollToSection(activeSectionIndex + 1);
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          scrollToSection(activeSectionIndex - 1);
          break;

        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;

        case 'End':
          e.preventDefault();
          scrollToSection(SECTIONS.length - 1);
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'p':
        case 'P':
          e.preventDefault();
          setIsToolbarVisible((prev) => !prev);
          break;

        case ' ':
          e.preventDefault();
          setIsAutoPlay((prev) => !prev);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex, scrollToSection]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((sec, idx) => {
      const el = document.getElementById(sec.id);
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                setActiveSectionIndex(idx);
              }
            });
          },
          { threshold: [0.4] }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Auto-play timer (advance section every 12 seconds when enabled)
  useEffect(() => {
    let interval = null;
    let timer = 0;
    const intervalTime = 100;
    const totalDuration = 12000;

    if (isAutoPlay) {
      interval = setInterval(() => {
        timer += intervalTime;
        setProgressPercent((timer / totalDuration) * 100);

        if (timer >= totalDuration) {
          timer = 0;
          setActiveSectionIndex((prev) => {
            const next = (prev + 1) % SECTIONS.length;
            scrollToSection(next);
            return next;
          });
        }
      }, intervalTime);
    } else {
      setProgressPercent(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlay, scrollToSection]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    playClickSound();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  return (
    <>
      {/* Top Reading Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-earth-900/10 z-[100] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-moss-500 via-sunlight-500 to-moss-700 transition-all duration-300"
          style={{ width: `${((activeSectionIndex + 1) / SECTIONS.length) * 100}%` }}
        />
      </div>

      {/* Auto-Play Progress Indicator */}
      {isAutoPlay && (
        <div className="fixed top-1 left-0 w-full h-1 bg-sunlight-500/20 z-[100] pointer-events-none">
          <div
            className="h-full bg-sunlight-500 transition-all duration-100 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Toggle Button when Toolbar is hidden */}
      {!isToolbarVisible && (
        <button
          onClick={() => {
            playClickSound();
            setIsToolbarVisible(true);
          }}
          className="fixed bottom-6 right-6 z-[90] p-3 rounded-full bg-earth-900/90 text-beige-50 shadow-earth hover:bg-moss-700 transition-all duration-300 hover:scale-110 flex items-center gap-2 text-xs font-semibold backdrop-blur-md"
          title={t.toggleToolbar}
        >
          <Monitor className="w-4 h-4 text-sunlight-500 animate-pulse" />
          <span>{t.toolbarTitle}</span>
        </button>
      )}

      {/* Floating Presenter Toolbar */}
      {isToolbarVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[94%] max-w-4xl glass-panel-dark text-beige-50 rounded-2xl p-3 sm:p-4 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 border border-earth-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Left: Section Indicator & Navigator */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-1.5 bg-earth-900/80 px-3 py-1.5 rounded-xl border border-earth-700/50">
                <Sparkles className="w-4 h-4 text-sunlight-500 animate-spin-slow" />
                <span className="text-xs font-bold tracking-wider uppercase text-sunlight-400">
                  {activeSectionIndex + 1}/{SECTIONS.length}
                </span>
                <span className="text-xs font-medium text-beige-200 hidden md:inline ml-1 border-l border-earth-700 pl-2">
                  {t.sections[SECTIONS[activeSectionIndex].nameKey]}
                </span>
              </div>

              {/* Speech Timer Controls */}
              <div className="flex items-center gap-1 bg-earth-900/90 px-3 py-1 rounded-xl border border-earth-700 text-xs font-mono text-sunlight-400">
                <Timer className="w-3.5 h-3.5 text-sunlight-500" />
                <span>{formatTimer(timerSeconds)}</span>
                <button
                  onClick={() => {
                    playClickSound();
                    setIsTimerRunning((prev) => !prev);
                  }}
                  className="ml-1 p-1 hover:text-beige-50 text-beige-300 transition-colors"
                  title={isTimerRunning ? 'Pause Speech Timer' : 'Start Speech Timer'}
                >
                  {isTimerRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                  className="p-1 hover:text-beige-50 text-beige-400 transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollToSection(activeSectionIndex - 1)}
                  disabled={activeSectionIndex === 0}
                  className="p-2 rounded-lg bg-earth-800/80 hover:bg-moss-700 text-beige-100 disabled:opacity-30 disabled:hover:bg-earth-800 transition-colors"
                  title="Previous Section (←)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection(activeSectionIndex + 1)}
                  disabled={activeSectionIndex === SECTIONS.length - 1}
                  className="p-2 rounded-lg bg-earth-800/80 hover:bg-moss-700 text-beige-100 disabled:opacity-30 disabled:hover:bg-earth-800 transition-colors"
                  title="Next Section (→)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle: Interactive Dots for Quick Jump */}
            <div className="hidden lg:flex items-center gap-2 bg-earth-900/60 px-4 py-2 rounded-xl border border-earth-800">
              {SECTIONS.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(idx)}
                  className="group relative py-1 focus:outline-none"
                  title={t.sections[sec.nameKey]}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeSectionIndex
                        ? 'w-6 bg-sunlight-500 shadow-sm'
                        : 'w-2 bg-beige-100/30 group-hover:bg-beige-100/70'
                    }`}
                  />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-earth-950 text-beige-100 text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-earth-700">
                    {t.sections[sec.nameKey]}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: Controls & Audio Spectrum Visualizer */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              
              {/* Audio Toggle & Spectrum Bar */}
              <button
                onClick={toggleAudio}
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                  isAudioPlaying
                    ? 'bg-moss-700/80 border-moss-500 text-beige-50'
                    : 'bg-earth-800/80 border-earth-700 text-beige-300 hover:text-beige-50'
                }`}
                title={isAudioPlaying ? 'Mute Ambience' : 'Play Forest Ambience'}
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 text-sunlight-400" />
                    {/* Animated Audio Spectrum Bars */}
                    <div className="flex items-end gap-0.5 h-3.5">
                      <div className="w-0.5 bg-sunlight-400 animate-pulse h-full" />
                      <div className="w-0.5 bg-sunlight-400 animate-bounce h-2/3" />
                      <div className="w-0.5 bg-sunlight-400 animate-pulse h-full" />
                      <div className="w-0.5 bg-sunlight-400 animate-bounce h-1/2" />
                    </div>
                  </>
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Auto-Play Toggle */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsAutoPlay((prev) => !prev);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isAutoPlay
                    ? 'bg-sunlight-500 text-earth-900 border-sunlight-400 font-bold shadow-md'
                    : 'bg-earth-800/80 text-beige-200 border-earth-700 hover:bg-earth-700'
                }`}
                title="Toggle Auto Play (12s per section)"
              >
                {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isAutoPlay ? 'Auto ON' : 'Auto OFF'}</span>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-xl bg-earth-800/80 border border-earth-700 text-beige-200 hover:bg-earth-700 hover:text-beige-50 transition-colors"
                title={isFullscreen ? t.exitFullscreen : t.enterFullscreen}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>

              {/* Hide Toolbar Toggle */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsToolbarVisible(false);
                }}
                className="p-2.5 rounded-xl bg-earth-800/80 border border-earth-700 text-beige-300 hover:text-beige-50 hover:bg-earth-700 transition-colors"
                title={t.toggleToolbar}
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Bottom Keyboard Hint Bar */}
          <div className="mt-2 pt-2 border-t border-earth-800/60 flex items-center justify-between text-[11px] text-beige-300/80 px-1">
            <span className="hidden sm:inline">{t.keyboardHint}</span>
            <span className="text-[10px] text-sunlight-400 font-medium">EcoSip Presentation Studio</span>
          </div>
        </div>
      )}
    </>
  );
}

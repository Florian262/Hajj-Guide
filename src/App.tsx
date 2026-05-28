import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundViewer from './components/BackgroundViewer';
import BottomSheet from './components/BottomSheet';
import GlossaryModal from './components/GlossaryModal';
import { useStore } from './store/useStore';
import { JourneyMap } from './components/JourneyMap';

// Web Audio API Sanctuary Drone Synth
class SanctuarySynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;

  start() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2);

      // Low Pass Filter for deep sanctuary warmth
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1, this.ctx.currentTime);

      // Osc 1 (Fundamental drone)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'triangle';
      this.osc1.frequency.setValueAtTime(75, this.ctx.currentTime); // Eb2/D#2 frequency

      // Osc 2 (Perfect Fifth for harmony)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(112.5, this.ctx.currentTime); // Bb2/A#2 frequency

      // LFO for breathing filter sweep (slow morphing texture)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(35, this.ctx.currentTime);

      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);

      // Connect graph
      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Start all nodes
      this.osc1.start();
      this.osc2.start();
      this.lfo.start();
    } catch (e) {
      console.error("Web Audio Synth failed to start", e);
    }
  }

  stop() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
    setTimeout(() => {
      if (this.ctx?.state === 'running') {
        this.ctx.suspend();
      }
    }, 1500);
  }
}

interface HajjTypeExplanation {
  name: string;
  subtitle: string;
  description: string;
  ihramCount: string;
  sacrificeRequired: boolean;
  badge?: string;
}

const hajjTypesExplanation: Record<'en' | 'ar' | 'tr' | 'sq', HajjTypeExplanation[]> = {
  en: [
    {
      name: "Hajj al-Tamattu'",
      subtitle: "Umrah first, then a separate Hajj (Most Recommended)",
      description: "You enter Makkah in a state of Ihram to perform Umrah first. After Umrah, you completely cut/shave hair and exit Ihram, enjoying normal dress and lifestyle. On the 8th of Dhu al-Hijjah, you re-enter Ihram from Makkah for the Hajj. This requires a sacrificial animal.",
      ihramCount: "2 Separate Ihrams",
      sacrificeRequired: true,
      badge: "Best Choice"
    },
    {
      name: "Hajj al-Qiran",
      subtitle: "Umrah and Hajj combined in one continuous Ihram",
      description: "You enter Ihram at the Miqat with the intention of performing both Umrah and Hajj together. You perform Umrah but do NOT shave/cut hair or exit Ihram. You must remain in the continuous state of Ihram with all restrictions until the rituals are fully complete on Eid day. This requires a sacrificial animal.",
      ihramCount: "1 Continuous Ihram",
      sacrificeRequired: true
    },
    {
      name: "Hajj al-Ifrad",
      subtitle: "Hajj rituals only, no Umrah included",
      description: "You enter Ihram with the sole intention of performing Hajj only. No Umrah is performed during this journey. You perform the welcome Tawaf upon arrival and remain in Ihram until Eid day. This does not require a sacrificial animal.",
      ihramCount: "1 Continuous Ihram",
      sacrificeRequired: false
    }
  ],
  ar: [
    {
      name: "حج التمتع",
      subtitle: "العمرة أولاً، ثم التحلل، ثم إحرام جديد للحج (مستحب جداً)",
      description: "تدخل مكة محرمًا لتأدية العمرة أولاً (طواف وسعي وقص الشعر). بعد العمرة، تتحلل بالكامل من الإحرام وتعود لملابسك وحياتك الطبيعية. وفي يوم التروية (8 ذو الحجة)، تحرم مرة أخرى للحج من مكة. يلزمه هدي (ذبح شاة).",
      ihramCount: "إحرامان منفصلان",
      sacrificeRequired: true,
      badge: "الخيار الأفضل"
    },
    {
      name: "حج القران",
      subtitle: "الجمع بين العمرة والحج في إحرام واحد مستمر",
      description: "تحرم من الميقات بنية العمرة والحج معًا. تؤدي طواف وسعي العمرة عند وصولك ولكنك لا تتحلل من إحرامك، بل تبقى محرمًا بجميع المحظورات حتى تنتهي من جميع مناسك الحج يوم العيد. يلزمه هدي.",
      ihramCount: "إحرام واحد مستمر",
      sacrificeRequired: true
    },
    {
      name: "حج الإفراد",
      subtitle: "أداء مناسك الحج فقط دون عمرة مصاحبة",
      description: "تحرم بنية الحج فقط من الميقات ولا تؤدي عمرة في هذه الرحلة. تؤدي طواف القدوم عند الوصول وتبقى محرمًا حتى يوم العيد. هذا النوع لا يلزمك فيه تقديم هدي (ذبح شاة).",
      ihramCount: "إحرام واحد مستمر",
      sacrificeRequired: false
    }
  ],
  tr: [
    {
      name: "Temettu Haccı",
      subtitle: "Önce Umre yapıp ihramdan çıkmak, sonra Hac için ihrama girmek (Tavsiye Edilen)",
      description: "Mekke'ye sadece Umre niyetiyle ihramlı girersiniz. Umreyi bitirince saçınızı kesip ihramdan tamamen çıkar ve normal kıyafetlerinize dönersiniz. 8 Zilhicce'de Mekke'de Hac için yeniden ihrama girersiniz. Bu hac türünde şükür kurbanı kesmek vaciptir.",
      ihramCount: "2 Ayrı İhram",
      sacrificeRequired: true,
      badge: "Tavsiye Edilen"
    },
    {
      name: "Kıran Haccı",
      subtitle: "Umre ve Haccı tek bir ihramda birleştirmek",
      description: "Mikat sınırında hem Umre hem Hac için birlikte tek bir ihrama girersiniz. Mekke'de Umre yapsa da ihramdan çıkmaz. Bayram günü tıraş olana kadar ihram yasaklarına uymaya devam eder. Bu hac türünde kurban kesmek vaciptir.",
      ihramCount: "1 Kesintisiz İhram",
      sacrificeRequired: true
    },
    {
      name: "İfrad Haccı",
      subtitle: "Umresiz, doğrudan sadece Hac ibadeti yapmak",
      description: "Sadece Hac niyetiyle ihrama girer ve bu seyahatte Umre yapmazsınız. Mekke'ye varınca Kudüm Tavafı yapar ve Bayram gününe kadar ihramda kalırsınız. İfrad haccında kurban kesmek zorunlu değildir.",
      ihramCount: "1 Kesintisiz İhram",
      sacrificeRequired: false
    }
  ],
  sq: [
    {
      name: "Haxhi Temettu'",
      subtitle: "Kryerja e Umres, dalja nga Ihrami, pastaj Ihram i ri për Haxh (I Rekomanduar)",
      description: "Hyni në Mekë me Ihram për të kryer fillimisht Umren. Pas saj, shkurtoni flokët dhe dilni plotësisht nga Ihrami duke u kthyer në veshje normale. Më 8 Dhil-Hixhxhë, hyni përsëri në Ihram për Haxhin nga Meka. Kërkon therjen e kurbanit.",
      ihramCount: "2 Ihramë të Ndarë",
      sacrificeRequired: true,
      badge: "Rekomandohet"
    },
    {
      name: "Haxhi Kuran",
      subtitle: "Umre dhe Haxh të bashkuara në një Ihram të vetëm",
      description: "Hyni në Ihram me qëllim të kryerjes së Umres dhe Haxhit së bashku. Kryeni Umren por NUK shkurtoni flokët dhe NUK dilni nga Ihrami. Qëndroni në Ihram të pandërprerë me të gjitha kufizimet deri në Bajram. Kërkon therjen e kurbanit.",
      ihramCount: "1 Ihram i Vazhdueshëm",
      sacrificeRequired: true
    },
    {
      name: "Haxhi Ifrad",
      subtitle: "Vetëm ritet e Haxhit, pa Umre paraprake",
      description: "Hyni në Ihram me qëllimin e vetëm për të kryer Haxhin. Nuk kryeni Umre gjatë këtij udhëtimi. Kryeni Tavafin e mirëseardhjes pas mbërritjes dhe qëndroni në Ihram deri në ditën e Bajramit. Nuk kërkon kurban obligues.",
      ihramCount: "1 Ihram i Vazhdueshëm",
      sacrificeRequired: false
    }
  ]
};

const App: React.FC = () => {
  const { 
    isDrawerOpen, 
    nextStage, 
    prevStage, 
    language, 
    theme, 
    setLanguage, 
    toggleTheme,
    profile,
    setProfile,
    clearProfile,
    viewMode,
    setViewMode
  } = useStore();

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  // Splash Screen State — shown for exactly 3 seconds (2.5s display + 0.5s exit)
  const [showSplash, setShowSplash] = useState(true);

  // Synth and Onboarding States
  const synthRef = useRef<SanctuarySynth | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [hajjType, setHajjType] = useState<'tamattu' | 'qiran' | 'ifrad' | null>(null);
  const [isHajjInfoOpen, setIsHajjInfoOpen] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Splash screen lifecycle: hide after 2500ms (Framer Motion exit takes 500ms → total 3s)
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    // Safety fallback: force hide after 4.5s even if something blocks React
    const safety = setTimeout(() => setShowSplash(false), 4500);
    return () => { clearTimeout(timer); clearTimeout(safety); };
  }, []);

  // Initialize Synth
  useEffect(() => {
    synthRef.current = new SanctuarySynth();
    return () => {
      synthRef.current?.stop();
    };
  }, []);

  // Synchronize dark theme class with html element for global CSS / Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleSound = () => {
    if (isSoundOn) {
      synthRef.current?.stop();
    } else {
      synthRef.current?.start();
    }
    setIsSoundOn(!isSoundOn);
  };

  const handleStart = (clientX: number) => {
    setTouchEnd(null);
    setTouchStart(clientX);
  };

  const handleMove = (clientX: number) => {
    setTouchEnd(clientX);
  };

  const handleEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    
    // Only swipe if the drawer is NOT open and we are in guide view
    if (isDrawerOpen || viewMode === 'map') return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextStage();
    } else if (isRightSwipe) {
      prevStage();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleEnterSanctuary = () => {
    if (gender && hajjType) {
      setProfile({ gender, hajjType });
    }
  };

  const isOnboardingOpen = profile.gender === null;
  const isDark = theme === 'dark';

  return (
    <main 
      className={`relative w-full h-full overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#030d08]' : 'bg-black'}`}
      onTouchStart={(e) => handleStart(e.targetTouches[0].clientX)}
      onTouchMove={(e) => handleMove(e.targetTouches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => {
        setIsMouseDown(true);
        handleStart(e.clientX);
      }}
      onMouseMove={(e) => {
        if (isMouseDown) handleMove(e.clientX);
      }}
      onMouseUp={() => {
        setIsMouseDown(false);
        handleEnd();
      }}
      onMouseLeave={() => {
        setIsMouseDown(false);
        handleEnd();
      }}
    >
      {/* ── Premium Animated Greeting Splash Screen ─────────────────── */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 z-[1000] flex flex-col items-center justify-center bg-[#030f07] select-none"
            style={{ willChange: 'opacity, transform' }}
          >
            {/* Radial ambient glow behind the logo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 55% 42% at 50% 46%, rgba(212,175,55,0.13) 0%, transparent 70%)',
              }}
            />

            {/* ── Logo Mark ── */}
            <div className="splash-logo-ring relative flex items-center justify-center mb-8">
              {/* Outer glow ring */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 148,
                  height: 148,
                  background:
                    'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 72%)',
                  filter: 'blur(8px)',
                }}
              />
              {/* Kaaba SVG with shimmer fill */}
              <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Gradient definition for SVG shimmer */}
                <defs>
                  <linearGradient id="kaaba-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#b8902a" />
                    <stop offset="40%"  stopColor="#f5d97a" />
                    <stop offset="50%"  stopColor="#fffbe6" />
                    <stop offset="60%"  stopColor="#f5d97a" />
                    <stop offset="100%" stopColor="#b8902a" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      from="-2 0"
                      to="2 0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                  <linearGradient id="band-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#7a5c10" />
                    <stop offset="50%"  stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#7a5c10" />
                  </linearGradient>
                </defs>

                {/* Outer circle frame */}
                <circle cx="48" cy="48" r="46" stroke="url(#kaaba-gold)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />

                {/* Kaaba body */}
                <rect x="22" y="30" width="52" height="46" rx="2" fill="url(#kaaba-gold)" opacity="0.12" />
                <rect x="22" y="30" width="52" height="46" rx="2" stroke="url(#kaaba-gold)" strokeWidth="2" />

                {/* Kiswah golden band */}
                <rect x="22" y="46" width="52" height="7" fill="url(#band-gold)" opacity="0.55" />
                <line x1="22" y1="46" x2="74" y2="46" stroke="url(#kaaba-gold)" strokeWidth="1" />
                <line x1="22" y1="53" x2="74" y2="53" stroke="url(#kaaba-gold)" strokeWidth="1" />

                {/* Door */}
                <rect x="40" y="55" width="16" height="21" rx="1" stroke="url(#kaaba-gold)" strokeWidth="1.5" fill="none" />
                <rect x="40" y="55" width="16" height="21" rx="1" fill="url(#kaaba-gold)" opacity="0.08" />

                {/* Kaaba top arch shadow line */}
                <line x1="22" y1="30" x2="74" y2="30" stroke="url(#kaaba-gold)" strokeWidth="1.5" opacity="0.4" />

                {/* Crescent moon top */}
                <path
                  d="M48 10 C44 14, 44 22, 48 26 C42 24, 38 18, 40 12 C42 8, 48 10 48 10Z"
                  fill="url(#kaaba-gold)"
                  opacity="0.85"
                />
                {/* Star */}
                <circle cx="53" cy="15" r="1.5" fill="url(#kaaba-gold)" opacity="0.75" />
              </svg>
            </div>

            {/* ── Brand Name with shimmer ── */}
            <p
              className="splash-shimmer text-[11px] font-black uppercase tracking-[0.45em] mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Hajj Guide
            </p>

            {/* ── The Sacred Greeting ── */}
            <div className="flex flex-col items-center gap-2 px-8 text-center">
              <p
                className="splash-greeting splash-shimmer text-[22px] leading-snug"
                style={{ fontFamily: 'Amiri, serif', letterSpacing: '0.02em' }}
              >
                السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </p>
              <p
                className="splash-sub text-[13px] font-medium tracking-wide"
                style={{ color: 'rgba(212,175,55,0.65)', fontFamily: 'Inter, sans-serif' }}
              >
                Selam Aleykum ve Rahmetullahi ve Berekatuhu
              </p>
            </div>

            {/* Bottom shimmer line */}
            <div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              style={{
                width: 64,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isOnboardingOpen && viewMode === 'map' ? (
        <JourneyMap />
      ) : (
        <BackgroundViewer />
      )}
      
      {/* Header Overlay */}
      <header className="absolute top-0 inset-x-0 z-20 pt-[env(safe-area-inset-top)] p-6 pointer-events-none flex justify-between items-center">
        {/* Brand Badge */}
        <div className="bg-hajj-green/30 dark:bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto shadow-sm">
          <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">Hajj Guide</span>
        </div>

        {/* Control Tools */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Map Portal Toggle Button */}
          {!isOnboardingOpen && (
            <button
              onClick={() => setViewMode(viewMode === 'map' ? 'guide' : 'map')}
              className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md border active:scale-95 transition-all cursor-pointer shadow-sm focus:outline-none ${
                viewMode === 'map' 
                  ? 'bg-hajj-gold/25 border-hajj-gold/45 text-hajj-gold font-bold animate-pulse' 
                  : 'bg-white/10 dark:bg-black/35 border-white/15 dark:border-white/10 text-white hover:bg-white/20'
              }`}
              title={viewMode === 'map' ? "Enter Guide View" : "Enter Map View"}
              aria-label="Toggle View Mode"
            >
              {viewMode === 'map' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              )}
            </button>
          )}

          {/* Sound Synthesizer Player Toggle */}
          <button
            onClick={handleToggleSound}
            className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md border active:scale-95 transition-all cursor-pointer shadow-sm focus:outline-none ${
              isSoundOn 
                ? 'bg-hajj-gold/25 border-hajj-gold/45 text-hajj-gold animate-pulse' 
                : 'bg-white/10 dark:bg-black/35 border-white/15 dark:border-white/10 text-white hover:bg-white/20'
            }`}
            title="Toggle Sanctuary Ambient sound"
            aria-label="Toggle Sound"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => toggleTheme()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/35 backdrop-blur-md border border-white/15 dark:border-white/10 text-white active:scale-95 transition-all cursor-pointer shadow-sm hover:bg-white/20 focus:outline-none"
            aria-label="Toggle Theme"
            title="Toggle Theme Mode"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-hajj-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center bg-white/10 dark:bg-black/35 backdrop-blur-md border border-white/15 dark:border-white/10 rounded-full px-3.5 py-2 shadow-sm text-white hover:bg-white/20 transition-all cursor-pointer">
            <span className="text-[10px] uppercase font-black tracking-widest mr-1.5 opacity-80">
              {language === 'sq' ? 'AL' : language}
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ar' | 'tr' | 'sq')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto"
              aria-label="Select Language"
            >
              <option value="en" className="text-hajj-navy bg-hajj-alabaster">EN - English</option>
              <option value="ar" className="text-hajj-navy bg-hajj-alabaster">AR - العربية</option>
              <option value="tr" className="text-hajj-navy bg-hajj-alabaster">TR - Türkçe</option>
              <option value="sq" className="text-hajj-navy bg-hajj-alabaster">SQ - Shqip</option>
            </select>
            <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Profile Reset Button (visible only when onboarded) */}
          {!isOnboardingOpen && (
            <button
              onClick={() => {
                if (window.confirm(language === 'sq' ? 'A dëshironi të fshini të dhënat dhe të ndryshoni profilin?' : language === 'tr' ? 'Profilinizi sıfırlamak ve tüm verileri silmek istediğinizden emin misiniz?' : language === 'ar' ? 'هل أنت متأكد من إعادة ضبط الملف الشخصي ومسح البيانات؟' : 'Are you sure you want to reset your profile and erase all progress?')) {
                  clearProfile();
                  setIsSoundOn(false);
                  synthRef.current?.stop();
                }
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/35 backdrop-blur-md border border-white/15 dark:border-white/10 text-white active:scale-95 transition-all cursor-pointer shadow-sm hover:bg-red-950/20 hover:border-red-500/20 focus:outline-none"
              title="Reset Profile"
              aria-label="Reset Profile"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {!isOnboardingOpen && viewMode === 'map' ? null : <BottomSheet />}

      {/* Onboarding Glassmorphism Screen */}
      <AnimatePresence>
        {isOnboardingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-center justify-center p-6 bg-[#061D13]/60 backdrop-blur-lg max-w-[450px] mx-auto select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`w-full p-8 rounded-[36px] border flex flex-col space-y-6 transition-colors duration-500 ${
                isDark 
                  ? 'bg-[#061D13]/85 border-white/10 text-hajj-alabaster/95 shadow-2xl' 
                  : 'bg-hajj-alabaster/90 border-white/40 text-hajj-navy shadow-2xl'
              }`}
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-hajj-gold">
                  {language === 'ar' ? 'تخصيص الحج' : language === 'tr' ? 'HAC PORTALI' : language === 'sq' ? 'PORTALI I HAXHIT' : 'PILGRIM PORTAL'}
                </span>
                <h2 className="text-2xl font-black tracking-tight">
                  {language === 'ar' ? 'مرحباً بك في دليل الحج' : language === 'tr' ? 'Hac Rehberine Hoş Geldiniz' : language === 'sq' ? 'Mirësevini në Hajj Guide' : 'Welcome to Hajj Guide'}
                </h2>
                <p className={`text-xs leading-relaxed transition-colors duration-500 ${isDark ? 'text-hajj-alabaster/65' : 'text-hajj-navy/65'}`}>
                  {language === 'ar'
                    ? 'قم بإعداد ملفك الإيماني لتخصيص المناسك والأدعية والأحكام الفقهية المناسبة لك.'
                    : language === 'tr'
                    ? 'Size özel ibadetler, dualar ve fıkıh rehberi sunabilmemiz için ibadet profilinizi oluşturun.'
                    : language === 'sq'
                    ? 'Krijoni profilin tuaj të lutjeve që ne të personalizojmë ritet, lutjet dhe fikhun sipas jush.'
                    : 'Establish your spiritual profile so we can customize your stage checklist, jurisprudence guide, and warnings.'}
                </p>
              </div>

              <div className="space-y-4">
                {/* Gender Select */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-hajj-gold">
                    {language === 'ar' ? 'الجنس' : language === 'tr' ? 'CİNSİYET' : language === 'sq' ? 'GJINIA' : 'GENDER'}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGender('male')}
                      className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase tracking-widest active:scale-95 transition-all cursor-pointer ${
                        gender === 'male'
                          ? isDark ? 'bg-hajj-gold border-hajj-gold text-hajj-green' : 'bg-hajj-green border-hajj-green text-hajj-alabaster'
                          : isDark ? 'bg-white/5 border-white/5 text-hajj-alabaster/60 hover:bg-white/10' : 'bg-white/50 border-white/20 text-hajj-navy/65 hover:bg-white/80'
                      }`}
                    >
                      {language === 'ar' ? 'ذكر' : language === 'tr' ? 'Erkek' : language === 'sq' ? 'Mashkull' : 'Male'}
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase tracking-widest active:scale-95 transition-all cursor-pointer ${
                        gender === 'female'
                          ? isDark ? 'bg-hajj-gold border-hajj-gold text-hajj-green' : 'bg-hajj-green border-hajj-green text-hajj-alabaster'
                          : isDark ? 'bg-white/5 border-white/5 text-hajj-alabaster/60 hover:bg-white/10' : 'bg-white/50 border-white/20 text-hajj-navy/65 hover:bg-white/80'
                      }`}
                    >
                      {language === 'ar' ? 'أنثى' : language === 'tr' ? 'Kadın' : language === 'sq' ? 'Femër' : 'Female'}
                    </button>
                  </div>
                </div>

                {/* Hajj Typology Select */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-hajj-gold">
                      {language === 'ar' ? 'نوع الحج' : language === 'tr' ? 'HAC TÜRÜ' : language === 'sq' ? 'LLOJI I HAXHIT' : 'HAJJ TYPE'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsHajjInfoOpen(true)}
                      className="text-[10px] font-extrabold text-hajj-gold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1 focus:outline-none bg-transparent border-none"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                      {language === 'ar' ? 'قارن' : language === 'tr' ? 'Karşılaştır' : language === 'sq' ? 'Krahaso' : 'Compare'}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setHajjType('tamattu')}
                      className={`py-3 rounded-xl border font-extrabold text-[10px] uppercase tracking-widest active:scale-95 transition-all cursor-pointer ${
                        hajjType === 'tamattu'
                          ? isDark ? 'bg-hajj-gold border-hajj-gold text-hajj-green' : 'bg-hajj-green border-hajj-green text-hajj-alabaster'
                          : isDark ? 'bg-white/5 border-white/5 text-hajj-alabaster/60 hover:bg-white/10' : 'bg-white/50 border-white/20 text-hajj-navy/65 hover:bg-white/80'
                      }`}
                    >
                      Tamattu
                    </button>
                    <button
                      onClick={() => setHajjType('qiran')}
                      className={`py-3 rounded-xl border font-extrabold text-[10px] uppercase tracking-widest active:scale-95 transition-all cursor-pointer ${
                        hajjType === 'qiran'
                          ? isDark ? 'bg-hajj-gold border-hajj-gold text-hajj-green' : 'bg-hajj-green border-hajj-green text-hajj-alabaster'
                          : isDark ? 'bg-white/5 border-white/5 text-hajj-alabaster/60 hover:bg-white/10' : 'bg-white/50 border-white/20 text-hajj-navy/65 hover:bg-white/80'
                      }`}
                    >
                      Qiran
                    </button>
                    <button
                      onClick={() => setHajjType('ifrad')}
                      className={`py-3 rounded-xl border font-extrabold text-[10px] uppercase tracking-widest active:scale-95 transition-all cursor-pointer ${
                        hajjType === 'ifrad'
                          ? isDark ? 'bg-hajj-gold border-hajj-gold text-hajj-green' : 'bg-hajj-green border-hajj-green text-hajj-alabaster'
                          : isDark ? 'bg-white/5 border-white/5 text-hajj-alabaster/60 hover:bg-white/10' : 'bg-white/50 border-white/20 text-hajj-navy/65 hover:bg-white/80'
                      }`}
                    >
                      Ifrad
                    </button>
                  </div>
                  <p className={`text-[10px] text-center leading-normal mt-1 opacity-60 transition-colors duration-500 ${isDark ? 'text-hajj-alabaster/55' : 'text-hajj-navy/55'}`}>
                    {hajjType === 'tamattu' 
                      ? (language === 'sq' ? 'Umre e plotë, pastaj Haxh me ndërprerje Ihrami (Rekomandohet)' : language === 'tr' ? 'Önce Umre, sonra ihramdan çıkıp Hac yapma (Tavsiye edilen)' : language === 'ar' ? 'عمرة كاملة، ثم التحلل، ثم الإحرام للحج (مستحب)' : 'Complete Umrah, then exit Ihram, then enter Hajj Ihram again (Most Recommended)')
                      : hajjType === 'qiran'
                      ? (language === 'sq' ? 'Umre dhe Haxh të bashkuara në një Ihram të vetëm' : language === 'tr' ? 'Umre ve Haccı tek bir ihramda birleştirme' : language === 'ar' ? 'الجمع بين العمرة والحج في إحرام واحد مستمر' : 'Umrah and Hajj combined in a single continuous Ihram')
                      : hajjType === 'ifrad'
                      ? (language === 'sq' ? 'Vetëm Haxh pa Umre paraprake' : language === 'tr' ? 'Umresiz, doğrudan sadece Hac yapma' : language === 'ar' ? 'أداء مناسك الحج فقط دون عمرة سابقة' : 'Hajj ritual only, without Umrah first')
                      : ''}
                  </p>
                </div>
              </div>

              {/* Enter Button CTA */}
              <button
                disabled={gender === null || hajjType === null}
                onClick={handleEnterSanctuary}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg select-none cursor-pointer active:scale-[0.98] transition-all disabled:opacity-30 disabled:scale-100 disabled:pointer-events-none focus:outline-none ${
                  isDark 
                    ? 'bg-hajj-gold text-hajj-green shadow-hajj-gold/5 hover:brightness-110' 
                    : 'bg-hajj-green text-hajj-alabaster shadow-hajj-green/15 hover:brightness-110'
                }`}
              >
                {language === 'ar' ? 'ادخل إلى الحرم' : language === 'tr' ? 'Mabede Gir' : language === 'sq' ? 'Hyni në Shenjtërore' : 'Enter the Sanctuary'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <GlossaryModal />

      {/* Hajj Types Comparison Modal */}
      <AnimatePresence>
        {isHajjInfoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[70] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md max-w-[450px] mx-auto select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`w-full max-h-[80vh] p-6 rounded-[32px] border flex flex-col transition-colors duration-500 overflow-hidden ${
                isDark 
                  ? 'bg-[#061D13]/95 border-white/10 text-hajj-alabaster shadow-2xl' 
                  : 'bg-hajj-alabaster/95 border-white/50 text-hajj-navy shadow-2xl'
              }`}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-4 border-white/10 dark:border-white/5">
                <div className="text-left">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-hajj-gold">
                    {language === 'ar' ? 'دليل الإرشاد فقهياً' : language === 'tr' ? 'FIKIH REHBERİ' : language === 'sq' ? 'UDHËZUESI I FIKHUT' : 'JURISPRUDENCE GUIDE'}
                  </span>
                  <h3 className="text-lg font-black tracking-tight">
                    {language === 'ar' ? 'أنواع الحج الثلاثة' : language === 'tr' ? 'Üç Hac Türü' : language === 'sq' ? 'Tri Llojet e Haxhit' : 'The Three Types of Hajj'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsHajjInfoOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 dark:bg-black/20 dark:hover:bg-black/40 border border-white/10 active:scale-95 transition-all cursor-pointer focus:outline-none"
                  aria-label="Close modal"
                >
                  <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-left custom-scrollbar">
                {hajjTypesExplanation[language].map((type, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      isDark 
                        ? 'bg-white/5 border-white/5 hover:bg-white/10' 
                        : 'bg-white/60 border-white/25 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-extrabold text-sm text-hajj-gold tracking-wide">
                        {type.name}
                      </h4>
                      {type.badge && (
                        <span className="text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-hajj-green/20 dark:bg-hajj-gold/20 text-hajj-green dark:text-hajj-gold border border-hajj-green/10 dark:border-hajj-gold/10">
                          {type.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-[10px] font-extrabold mb-1.5 leading-snug ${isDark ? 'text-hajj-alabaster/90' : 'text-hajj-navy/90'}`}>
                      {type.subtitle}
                    </p>
                    <p className={`text-[11px] leading-relaxed opacity-80 ${isDark ? 'text-hajj-alabaster/70' : 'text-hajj-navy/75'}`}>
                      {type.description}
                    </p>
                    
                    {/* Quick Details Chips */}
                    <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      <span className={`text-[9px] px-2 py-0.5 rounded-md font-semibold ${
                        type.sacrificeRequired 
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                        {language === 'ar' 
                          ? (type.sacrificeRequired ? 'الهدي: واجب' : 'الهدي: غير واجب') 
                          : language === 'tr' 
                          ? (type.sacrificeRequired ? 'Kurban: Vacip' : 'Kurban: Gerekmez') 
                          : language === 'sq' 
                          ? (type.sacrificeRequired ? 'Kurbani: Obligueshëm' : 'Kurbani: Jo i obligueshëm') 
                          : (type.sacrificeRequired ? 'Sacrifice: Required' : 'Sacrifice: Not Required')}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-md font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {language === 'ar' 
                          ? `الإحرام: ${type.ihramCount}` 
                          : language === 'tr' 
                          ? `İhram: ${type.ihramCount}` 
                          : language === 'sq' 
                          ? `Ihrami: ${type.ihramCount}` 
                          : `Ihram: ${type.ihramCount}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 dark:border-white/5 flex justify-end">
                <button
                  onClick={() => setIsHajjInfoOpen(false)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-all cursor-pointer border-none focus:outline-none ${
                    isDark 
                      ? 'bg-hajj-gold text-hajj-green hover:brightness-110 shadow-md shadow-hajj-gold/5' 
                      : 'bg-hajj-green text-hajj-alabaster hover:brightness-110 shadow-md shadow-hajj-green/10'
                  }`}
                >
                  {language === 'ar' ? 'فهمت' : language === 'tr' ? 'Anladım' : language === 'sq' ? 'Kuptova' : 'I Understand'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <GlossaryModal />
    </main>
  );
};

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundViewer from './components/BackgroundViewer';
import BottomSheet from './components/BottomSheet';
import GlossaryModal from './components/GlossaryModal';
import { useStore } from './store/useStore';

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
    clearProfile
  } = useStore();

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  // Synth and Onboarding States
  const synthRef = useRef<SanctuarySynth | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [hajjType, setHajjType] = useState<'tamattu' | 'qiran' | 'ifrad' | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

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
    
    // Only swipe if the drawer is NOT open to prevent conflicting vertical scrolls
    if (isDrawerOpen) return;

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
      <BackgroundViewer />
      
      {/* Header Overlay */}
      <header className="absolute top-0 inset-x-0 z-20 pt-[env(safe-area-inset-top)] p-6 pointer-events-none flex justify-between items-center">
        {/* Brand Badge */}
        <div className="bg-hajj-green/30 dark:bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto shadow-sm">
          <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">Hajj Way</span>
        </div>

        {/* Control Tools */}
        <div className="flex items-center gap-3 pointer-events-auto">
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

      <BottomSheet />

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
                  {language === 'ar' ? 'مرحباً بك في طريق الحج' : language === 'tr' ? 'Hac Yoluna Hoş Geldiniz' : language === 'sq' ? 'Mirësevini në Hajj Way' : 'Welcome to Hajj Way'}
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
                  <span className="text-[10px] font-black uppercase tracking-widest text-hajj-gold">
                    {language === 'ar' ? 'نوع الحج' : language === 'tr' ? 'HAC TÜRÜ' : language === 'sq' ? 'LLOJI I HAXHIT' : 'HAJJ TYPE'}
                  </span>
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
    </main>
  );
};

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, type PersonalDua } from '../store/useStore';
import { hajjData, chapterLabels } from '../data/hajjData';
import { commonDuas } from '../data/commonDuas';
import { renderTextWithTerms } from '../utils/glossaryRenderer';
import { calculateDistance, calculateBearing } from '../domain/geoMath';
import { getVisibleStages } from '../utils/stageSelectors';
import { useGeolocation } from '../hooks/useGeolocation';
import { useDeviceOrientation } from '../hooks/useDeviceOrientation';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

const getStepGender = (stepText: string): 'male' | 'female' | 'both' => {
  const text = stepText.toLowerCase();
  if (text.startsWith('men:') || text.startsWith('man:') || text.startsWith('الرجال:') || text.startsWith('erkekler:') || text.startsWith('burrat:')) {
    return 'male';
  }
  if (text.startsWith('women:') || text.startsWith('woman:') || text.startsWith('النساء:') || text.startsWith('kadınlar:') || text.startsWith('gratë:')) {
    return 'female';
  }
  return 'both';
};

const BottomSheet: React.FC = () => {
  const { 
    currentStageIndex, 
    isDrawerOpen, 
    toggleDrawer, 
    nextStage, 
    prevStage,
    completedItems,
    toggleChecklistItem,
    tawafCount,
    saiCount,
    incrementTawaf,
    resetTawaf,
    incrementSai,
    resetSai,
    language,
    theme,
    profile,
    saveTentLocation,
    personalDuas,
    addPersonalDua,
    togglePersonalDua,
    toggleStarDua,
    deletePersonalDua
  } = useStore();

  // Dynamically filter stages based on pilgrim's Hajj type
  const visibleStages = getVisibleStages(hajjData[language].stages, profile.hajjType);
  const currentStage = visibleStages[currentStageIndex] ?? visibleStages[0];
  const totalStages = visibleStages.length;
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Hook-based Geolocation State and Simulation
  const { userCoords, gpsSimulated, handleSimulateGPS } = useGeolocation();

  // Calculations for Telemetry
  const kaabaCoords = { lat: 21.4225, lng: 39.8262 };
  const distanceToKaaba = userCoords ? calculateDistance(userCoords.lat, userCoords.lng, kaabaCoords.lat, kaabaCoords.lng) : null;
  const bearingToKaaba = userCoords ? calculateBearing(userCoords.lat, userCoords.lng, kaabaCoords.lat, kaabaCoords.lng) : 0;

  const distanceToTent = userCoords && profile.tentCoords ? calculateDistance(userCoords.lat, userCoords.lng, profile.tentCoords.lat, profile.tentCoords.lng) : null;
  const bearingToTent = userCoords && profile.tentCoords ? calculateBearing(userCoords.lat, userCoords.lng, profile.tentCoords.lat, profile.tentCoords.lng) : 0;

  // Direct-DOM Compass and Needle Rotations
  const { dialRef, kaabaNeedleRef, tentNeedleRef, deviceHeadingRef } = useDeviceOrientation(bearingToKaaba, bearingToTent, gpsSimulated);

  // States
  const [playingDuaIndex, setPlayingDuaIndex] = useState<number | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isMensesDrawerOpen, setIsMensesDrawerOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMessage, setConfettiMessage] = useState(false);

  // Personal Dua States
  const [activeTab, setActiveTab] = useState<'guide' | 'duas'>('guide');
  const [newDuaText, setNewDuaText] = useState('');
  const [newDuaCategory, setNewDuaCategory] = useState<PersonalDua['category']>('general');
  const [duaFilter, setDuaFilter] = useState<'all' | 'favorites' | PersonalDua['category']>('all');
  const [isCommonDuasOpen, setIsCommonDuasOpen] = useState(false);
  const [commonDuaCategory, setCommonDuaCategory] = useState<'all' | 'quran' | 'prophetic' | 'forgiveness' | 'hajj'>('all');
  const [importingDuaId, setImportingDuaId] = useState<string | null>(null);

  // Handle swipe gesture state
  const [handleSwipeStartY, setHandleSwipeStartY] = useState<number | null>(null);

  // Android Back Button Fix
  useEffect(() => {
    const handlePopState = () => {
      if (isGuideOpen) {
        setIsGuideOpen(false);
        window.history.pushState({ guideOpen: false }, "");
        return;
      }
      if (isDrawerOpen) {
        toggleDrawer(false);
        window.history.pushState({ drawerOpen: false }, "");
      }
    };

    if (isDrawerOpen || isGuideOpen) {
      window.history.pushState({ drawerOpen: true, guideOpen: isGuideOpen }, "");
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDrawerOpen, isGuideOpen, toggleDrawer]);

  // Cancel Speech Synthesis and close Guide on Stage Navigation
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => {
      setPlayingDuaIndex(null);
      setIsGuideOpen(false); // Close guide when switching stages
    }, 0);
    return () => clearTimeout(timer);
  }, [currentStageIndex]);



  // Stamp current Tent GPS coords in Mina
  const handleStampTent = () => {
    if (userCoords) {
      saveTentLocation(userCoords.lat, userCoords.lng);
      if (navigator.vibrate) navigator.vibrate([80, 50, 80]);
      alert(language === 'sq' ? 'Pozicioni i çadrës u ruajt me sukses!' : language === 'tr' ? 'Çadır konumunuz başarıyla kaydedildi!' : language === 'ar' ? 'تم حفظ موقع الخيمة بنجاح!' : 'Tent location stamped successfully!');
    } else {
      alert(language === 'sq' ? 'Duke pritur për sinjalin GPS...' : language === 'tr' ? 'GPS sinyali bekleniyor...' : language === 'ar' ? 'بانتظار إشارة GPS...' : 'Waiting for GPS signal...');
    }
  };

  // Checklist handler with Confetti explosions upon completing a day's rites!
  const handleCheckItem = (stageId: string, index: number) => {
    toggleChecklistItem(stageId, index);
    
    // Check if checking this item completes the entire checklist
    const checklists = currentStage.details.checklists || [];
    const itemKey = `${stageId}-${index}`;
    const wasChecked = !!completedItems[itemKey];

    if (!wasChecked) {
      // Calculate active checklist items
      let completedCount = 0;
      checklists.forEach((_, cIndex) => {
        const key = `${stageId}-${cIndex}`;
        if (cIndex === index || !!completedItems[key]) {
          completedCount++;
        }
      });

      if (completedCount === checklists.length) {
        // Explode Confetti!
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        setShowConfetti(true);
        setConfettiMessage(true);
        setTimeout(() => setShowConfetti(false), 5500);
        setTimeout(() => setConfettiMessage(false), 4000);
      }
    }
  };

  // HTML5 Canvas Confetti Emitter Particle Loops
  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 450;
    canvas.height = canvas.parentElement?.clientHeight || 600;

    const particles: Particle[] = [];
    const colors = ['#D4AF37', '#FFF3CD', '#AA7C11', '#F9F6F0', '#E5A93B'];

    // Spawn 80 particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 60,
        y: canvas.height - 40,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 8,
        speedY: -Math.random() * 11 - 7,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
      });
    }

    let animFrameId: number;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.25; // gravity
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#D4AF37';
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y < canvas.height + 20) {
          active = true;
        }
      });

      if (active) {
        animFrameId = requestAnimationFrame(update);
      }
    };

    update();
    return () => cancelAnimationFrame(animFrameId);
  }, [showConfetti]);

  const handleSpeak = (text: string, index: number, isArabic: boolean) => {
    if (!window.speechSynthesis) return;

    if (playingDuaIndex === index) {
      window.speechSynthesis.cancel();
      setPlayingDuaIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (isArabic) {
      utterance.lang = 'ar-SA';
    } else {
      utterance.lang = language === 'sq' ? 'sq-AL' : language === 'tr' ? 'tr-TR' : 'en-US';
    }

    utterance.onend = () => {
      setPlayingDuaIndex(null);
    };
    utterance.onerror = () => {
      setPlayingDuaIndex(null);
    };

    setPlayingDuaIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  // ── Swipe Up/Down gesture handlers for the handle bar ────────────────
  const onHandleTouchStart = (e: React.TouchEvent) => {
    setHandleSwipeStartY(e.touches[0].clientY);
  };

  const onHandleTouchEnd = (e: React.TouchEvent) => {
    if (handleSwipeStartY === null) return;
    const endY = e.changedTouches[0].clientY;
    const diffY = handleSwipeStartY - endY; // positive = swiped up, negative = swiped down
    const threshold = 40;

    if (diffY > threshold && !isDrawerOpen) {
      toggleDrawer(true);
      if (navigator.vibrate) navigator.vibrate(40);
    } else if (diffY < -threshold && isDrawerOpen) {
      toggleDrawer(false);
      if (navigator.vibrate) navigator.vibrate(30);
    }
    setHandleSwipeStartY(null);
  };

  const drawerVariants = {
    closed: { y: 'calc(80dvh - 140px)' }, // leaves exactly 140px visible
    open: { y: '0px' }, // fully open, sits at the bottom of the viewport
  };



  // Filter checklists and guide sections dynamically based on Gender/Profile!
  const filterList = (item: string) => {
    if (profile.gender === 'female') {
      // Exclude male-only towels, exposed shoulder etc.
      if (item.toLowerCase().includes('exposed shoulder') || item.toLowerCase().includes('towels in carryon')) return false;
    }
    if (profile.gender === 'male') {
      // Exclude niqab/women specific rules
      if (item.toLowerCase().includes('niqab') || item.toLowerCase().includes('women on their menses')) return false;
    }
    return true;
  };

  // Completion calculation for overall Hajj stats
  const checklists = currentStage.details.checklists || [];
  const completedInStage = checklists.filter((_, i) => !!completedItems[`${currentStage.id}-${i}`]).length;
  const stageCompletionPercent = checklists.length > 0 ? Math.round((completedInStage / checklists.length) * 100) : 0;

  const isDark = theme === 'dark';

  const renderPersonalDuaText = (text: string, completed: boolean) => {
    const lines = text.split('\n');
    const hasArabic = lines.length > 1 && /[\u0600-\u06FF]/.test(lines[0]);

    if (hasArabic) {
      const arabicLine = lines[0];
      const translationLines = lines.slice(1).join('\n');
      return (
        <div className="space-y-2">
          <p 
            className={`text-right text-lg font-bold leading-loose font-arabic transition-all duration-300 ${
              completed 
                ? 'line-through opacity-35' 
                : isDark 
                ? 'text-white' 
                : 'text-hajj-navy'
            }`} 
            dir="rtl"
          >
            {arabicLine}
          </p>
          <p 
            className={`text-xs leading-relaxed font-semibold opacity-90 border-t border-black/5 dark:border-white/5 pt-2 transition-all duration-300 ${
              completed 
                ? 'line-through opacity-35' 
                : isDark 
                ? 'text-hajj-alabaster/80' 
                : 'text-hajj-navy/80'
            }`}
          >
            {translationLines}
          </p>
        </div>
      );
    }

    return (
      <p className={`text-sm leading-relaxed transition-all duration-300 ${
        completed 
          ? 'line-through opacity-35' 
          : isDark 
          ? 'text-hajj-alabaster/90' 
          : 'text-hajj-navy'
      }`}>
        {text}
      </p>
    );
  };

  return (
    <>
      <motion.div
        initial={{ y: '100dvh' }}
        animate={isDrawerOpen ? 'open' : 'closed'}
        variants={drawerVariants}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`absolute inset-x-0 bottom-0 z-50 w-full max-w-[450px] mx-auto pointer-events-auto backdrop-blur-xl border-t flex flex-col overflow-hidden rounded-t-[32px] transition-colors duration-500 ${
          isDark 
            ? 'bg-[#061D13]/85 border-white/5 text-hajj-alabaster/90 shadow-[0_-15px_45px_rgba(0,0,0,0.7)]' 
            : 'bg-hajj-alabaster/80 border-white/20 text-hajj-navy shadow-2xl'
        }`}
        style={{ height: '80dvh' }}
      >
        {/* Confetti Explosion Canvas Mount */}
        {showConfetti && (
          <canvas ref={canvasRef} className="absolute inset-0 z-50 pointer-events-none w-full h-full" />
        )}

        {/* Floating Menses Assistant Button for Women (RTL-aware top-left in Arabic) */}
        {profile.gender === 'female' && isDrawerOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); setIsMensesDrawerOpen(true); }}
            className={`absolute top-5 z-40 w-10 h-10 rounded-full flex items-center justify-center border shadow-lg cursor-pointer focus:outline-none bg-rose-50 border-rose-200 text-rose-500 shadow-rose-200/20 dark:bg-rose-950/40 dark:border-rose-900/40 dark:text-rose-400 dark:shadow-none ${
              language === 'ar' ? 'left-5' : 'right-5'
            }`}
            title="Menses Assistant"
          >
            <span className="text-base select-none">🌸</span>
          </motion.button>
        )}

        {/* Milestone Achievement Notification Banner */}
        <AnimatePresence>
          {confettiMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="absolute inset-x-0 top-16 z-50 mx-auto w-72 p-4 rounded-2xl bg-hajj-gold text-hajj-green border border-hajj-gold/30 text-center shadow-xl select-none"
            >
              <h4 className="text-sm font-black uppercase tracking-wider">
                {language === 'ar' ? 'تم إكمال مناسك اليوم!' : language === 'tr' ? 'BUGÜNKÜ RİTÜELLER TAMAMLANDI!' : language === 'sq' ? 'KRYET RITET E KËSAJ DITE!' : 'RITES OF THE DAY COMPLETED!'}
              </h4>
              <p className="text-[10px] font-bold opacity-80 mt-1">
                {language === 'ar' ? 'تقبل الله منكم صالح الأعمال!' : language === 'tr' ? 'Allah ibadetlerinizi kabul etsin!' : language === 'sq' ? 'Allahu ua pranofte haxhin!' : 'May Allah accept your spiritual efforts!'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Handle / Tap Area — supports tap, swipe up (open), swipe down (close) */}
        <div 
          className={`w-full py-3.5 flex flex-col items-center cursor-pointer flex-shrink-0 select-none transition-all duration-300 ${
            profile.gender === 'female' && isDrawerOpen
              ? 'px-14'
              : 'px-6'
          }`}
          onClick={() => toggleDrawer()}
          onTouchStart={onHandleTouchStart}
          onTouchEnd={onHandleTouchEnd}
        >
          {/* Drag Pill */}
          <div className={`w-12 h-1.5 rounded-full mb-2.5 transition-colors duration-500 ${isDark ? 'bg-white/15' : 'bg-hajj-navy/20'}`} />
          
          {/* Swipe direction micro-hint chevron */}
          <motion.div
            animate={{ y: isDrawerOpen ? 2 : -2 }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="mb-2"
          >
            <svg
              className={`w-3.5 h-3.5 transition-all duration-400 ${
                isDark ? 'text-white/25' : 'text-hajj-navy/25'
              } ${isDrawerOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.div>

          {/* Progress Mini bar */}
          {checklists.length > 0 && (
            <div className={`w-24 h-1 rounded-full mb-2 overflow-hidden transition-colors duration-500 ${
              isDark ? 'bg-white/15' : 'bg-hajj-navy/15'
            }`}>
              <div 
                className={`h-full transition-all duration-500 ${
                  isDark ? 'bg-hajj-gold' : 'bg-hajj-green'
                }`} 
                style={{ width: `${stageCompletionPercent}%` }} 
              />
            </div>
          )}

          {/* Chapter label */}
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-hajj-gold/70 mb-0.5 text-center">
            {chapterLabels[currentStage.chapter]?.[language] ?? ''}
          </span>
          <h2 className={`text-xl font-bold tracking-tight text-center transition-colors duration-500 ${isDark ? 'text-hajj-gold' : 'text-hajj-green'}`}>
            {language === 'ar' ? 'الخطوة' : language === 'tr' ? 'Adım' : language === 'sq' ? 'Hapi' : 'Step'} {currentStageIndex + 1} — {currentStage.title}
          </h2>
          <p className={`text-sm font-medium text-center transition-colors duration-500 ${isDark ? 'text-hajj-alabaster/60' : 'text-hajj-navy/60'}`}>
            {currentStage.location}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-black/5 dark:border-white/5 px-6 pb-2.5 flex-shrink-0">
          <div className="flex w-full bg-black/5 dark:bg-white/5 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all focus:outline-none cursor-pointer ${
                activeTab === 'guide'
                  ? isDark 
                    ? 'bg-hajj-gold text-hajj-green shadow-md shadow-hajj-gold/5' 
                    : 'bg-hajj-green text-hajj-alabaster shadow-md shadow-hajj-green/10'
                  : isDark
                    ? 'text-hajj-alabaster/40 hover:text-hajj-alabaster/70'
                    : 'text-hajj-navy/50 hover:text-hajj-navy/80'
              }`}
            >
              🗺️ {language === 'ar' ? 'الدليل والمناسك' : language === 'tr' ? 'Rehber & Menasik' : language === 'sq' ? 'Udhëzuesi & Ritet' : 'Guide & Rites'}
            </button>
            <button
              onClick={() => setActiveTab('duas')}
              className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all focus:outline-none cursor-pointer ${
                activeTab === 'duas'
                  ? isDark 
                    ? 'bg-hajj-gold text-hajj-green shadow-md shadow-hajj-gold/5' 
                    : 'bg-hajj-green text-hajj-alabaster shadow-md shadow-hajj-green/10'
                  : isDark
                    ? 'text-hajj-alabaster/40 hover:text-hajj-alabaster/70'
                    : 'text-hajj-navy/50 hover:text-hajj-navy/80'
              }`}
            >
              📿 {language === 'ar' ? 'الأدعية الخاصة' : language === 'tr' ? 'Özel Dualarım' : language === 'sq' ? 'Lutjet e Mia' : 'Personal Duas'}
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}
          onScroll={(e) => e.stopPropagation()} // Prevent bubble to horizontal nav
        >
          {activeTab === 'guide' ? (
            <div className="py-6 space-y-8">
            {/* Onboarding Typology Notice */}
            {currentStage.id === 'arrival' && profile.hajjType === 'ifrad' && (
              <div className={`p-4 rounded-2xl border text-xs font-semibold leading-relaxed transition-all duration-500 ${
                isDark ? 'bg-hajj-gold/10 border-hajj-gold/25 text-hajj-gold' : 'bg-amber-50 border-amber-200 text-amber-950 shadow-sm'
              }`}>
                {language === 'sq' 
                  ? '⚠️ Ju jeni duke kryer Haxh Ifrad (Vetëm Haxh pa Umre). Tavafi juaj i parë do të jetë Tavafi i Mirëseardhjes (Tavaf al-Qudoom) në gjendje Ihrami. Ju mbeteni në Ihram deri në ditën e Bajramit!'
                  : language === 'tr'
                  ? '⚠️ Hacc-ı İfrad (Umresiz Hac) yapıyorsunuz. İlk ibadetiniz İhramlı olarak yapacağınız Kudüm Tavafı olacaktır. Bayram gününe kadar ihramdan çıkmayacaksınız!'
                  : language === 'ar'
                  ? '⚠️ أنت تؤدي حج الإفراد (حج فقط دون عمرة). طوافك الأول سيكون طواف القدوم في الإحرام، وستبقى محرماً حتى يوم النحر (عيد الأضحى)!'
                  : '⚠️ You are performing Hajj Ifrad (Hajj only, without prior Umrah). Your first ritual will be the Welcome Tawaf (Tawaf al-Qudoom) in Ihram, and you will remain in Ihram until the Day of Eid!'}
              </div>
            )}

            <p className={`text-lg leading-relaxed italic transition-colors duration-500 ${isDark ? 'text-hajj-alabaster/80' : 'text-hajj-navy/80'}`}>
              {currentStage.description}
            </p>

            {/* FULLY OFFLINE COMPASS LOCATOR & GEOTELEMETRY WIDGET */}
            <div className={`p-5 rounded-[28px] border transition-all duration-500 space-y-5 ${
              isDark ? 'bg-white/5 border-white/5' : 'bg-white/50 border-white/20 shadow-sm'
            }`}>
              <h3 className="text-hajj-gold font-bold uppercase tracking-widest text-[10px] mb-1">
                {language === 'ar' ? 'البوصلة الجغرافية غير المتصلة' : language === 'tr' ? 'ÇEVRİMDIŞI GPS PUSULA' : language === 'sq' ? 'KOMPASI GPS OFFLINE' : 'OFFLINE GPS TELEMETRY'}
              </h3>
              
              <div className="flex flex-col items-center gap-4">
                {/* 3D-like Rotating Compass Dial */}
                <div className="relative w-36 h-36 rounded-full border-4 border-hajj-gold/30 flex items-center justify-center bg-black/10 dark:bg-black/35 shadow-inner">
                  {/* Rotating Dial Ring */}
                  <div 
                    ref={dialRef}
                    className="absolute inset-0 w-full h-full rounded-full transition-transform duration-200"
                    style={{ transform: `rotate(${-deviceHeadingRef.current}deg)` }}
                  >
                    {/* Compass Markers */}
                    <span className="absolute top-1 inset-x-0 mx-auto text-[9px] font-black text-red-500 text-center">N</span>
                    <span className="absolute bottom-1 inset-x-0 mx-auto text-[9px] font-black text-hajj-gold text-center">S</span>
                    <span className="absolute left-1.5 inset-y-0 my-auto text-[9px] font-black text-hajj-gold flex items-center">W</span>
                    <span className="absolute right-1.5 inset-y-0 my-auto text-[9px] font-black text-hajj-gold flex items-center">E</span>
                  </div>

                  {/* Golden Needle: Kaaba Direction pointer */}
                  {userCoords && (
                    <div 
                      ref={kaabaNeedleRef}
                      className="absolute w-1 h-32 transition-transform duration-300 pointer-events-none"
                      style={{ transform: `rotate(${bearingToKaaba - deviceHeadingRef.current}deg)` }}
                    >
                      <div className="w-1.5 h-16 bg-hajj-gold rounded-t-full shadow-lg" />
                    </div>
                  )}

                  {/* Green Needle: Saved Mina Tent pointer */}
                  {userCoords && profile.tentCoords && currentStage.id !== 'arrival' && (
                    <div 
                      ref={tentNeedleRef}
                      className="absolute w-1 h-32 transition-transform duration-300 pointer-events-none"
                      style={{ transform: `rotate(${bearingToTent - deviceHeadingRef.current}deg)` }}
                    >
                      <div className="w-1.5 h-16 bg-emerald-500 rounded-t-full shadow-lg" />
                    </div>
                  )}

                  <div className="z-10 w-9 h-9 rounded-full bg-hajj-green border-2 border-hajj-gold/50 flex items-center justify-center text-[10px] font-black text-hajj-gold">
                    🕋
                  </div>
                </div>

                {/* Telemetry Coords Display */}
                <div className="w-full grid grid-cols-2 gap-4 text-center">
                  <div className={`p-3 rounded-2xl border transition-colors ${isDark ? 'bg-black/20 border-white/5' : 'bg-hajj-alabaster/40 border-hajj-green/5'}`}>
                    <span className="text-[9px] font-black uppercase text-hajj-gold tracking-widest block">
                      {language === 'ar' ? 'المسافة إلى الكعبة' : language === 'tr' ? 'Kâbe Mesafesi' : language === 'sq' ? 'Te Qabeja' : 'To Holy Kaaba'}
                    </span>
                    <span className="text-sm font-extrabold block mt-0.5">
                      {distanceToKaaba 
                        ? `${(distanceToKaaba / 1000).toFixed(2)} km` 
                        : (language === 'sq' ? 'Kërkohet GPS' : language === 'tr' ? 'GPS Gerekli' : language === 'ar' ? 'مطلوب نظام GPS' : 'GPS Required')}
                    </span>
                  </div>

                  <div className={`p-3 rounded-2xl border transition-colors ${isDark ? 'bg-black/20 border-white/5' : 'bg-hajj-alabaster/40 border-hajj-green/5'}`}>
                    <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest block">
                      {language === 'ar' ? 'المسافة إلى الخيمة' : language === 'tr' ? 'Çadır Mesafesi' : language === 'sq' ? 'Te Çadra' : 'To Your Tent'}
                    </span>
                    <span className="text-sm font-extrabold block mt-0.5 text-emerald-500">
                      {profile.tentCoords 
                        ? (distanceToTent 
                          ? `${distanceToTent.toFixed(0)} m` 
                          : 'GPS...') 
                        : (language === 'sq' ? 'Çadra e paruajtur' : language === 'tr' ? 'Çadır Kayıtsız' : language === 'ar' ? 'خيمة غير مسجلة' : 'No Tent Saved')}
                    </span>
                  </div>
                </div>

                {/* Stamping / Simulation control panel */}
                <div className="flex gap-2">
                  {/* Save Tent Location Stamp Button in Mina Tent Stage */}
                  {currentStage.id === 'day1-mina' && (
                    <button
                      onClick={handleStampTent}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow-sm ${
                        isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                      }`}
                    >
                      📍 {language === 'sq' ? 'Ruaj Çadrën Time' : language === 'tr' ? 'Çadırımı Kaydet' : language === 'ar' ? 'حفظ خيمتي هنا' : 'Save My Tent'}
                    </button>
                  )}

                  {/* Simulator Trigger */}
                  {!userCoords && (
                    <button
                      onClick={handleSimulateGPS}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-all border border-dashed ${
                        isDark ? 'border-white/10 text-white/50 hover:bg-white/5' : 'border-hajj-green/20 text-hajj-green/50 hover:bg-white/50'
                      }`}
                    >
                      🔌 {language === 'sq' ? 'Simulo GPS në Mina' : language === 'tr' ? 'Mina GPS Simüle Et' : language === 'ar' ? 'محاكاة GPS في منى' : 'Simulate GPS in Mina'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* The Journey Section */}
            <section>
              <h3 className="text-hajj-gold font-bold uppercase tracking-widest text-xs mb-4">
                {language === 'ar' ? 'المناسك والخطوات' : language === 'tr' ? 'Yolculuk Adımları' : language === 'sq' ? 'Hapat e Udhëtimit' : 'The Journey'}
              </h3>
              <ul className="space-y-4">
                {currentStage.details.steps.map((step, i) => {
                  const stepGender = getStepGender(step);
                  const isOpposite = stepGender !== 'both' && profile.gender !== stepGender;
                  const isMatching = stepGender !== 'both' && profile.gender === stepGender;

                  let liClass = "flex gap-4 items-start transition-all duration-500 ";
                  if (isOpposite) {
                    liClass += "opacity-25 blur-[0.2px] hover:opacity-50 hover:blur-none";
                  } else if (isMatching) {
                    liClass += isDark 
                      ? `p-3.5 rounded-2xl border ${stepGender === 'female' ? 'bg-rose-950/10 border-rose-900/30' : 'bg-emerald-950/10 border-emerald-900/30'}`
                      : `p-3.5 rounded-2xl border ${stepGender === 'female' ? 'bg-rose-50/50 border-rose-200/50' : 'bg-emerald-50/50 border-emerald-200/50'}`;
                  }

                  return (
                    <li key={i} className={liClass}>
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold transition-all duration-500 ${
                        isMatching
                          ? (stepGender === 'female' ? 'bg-rose-400 text-white shadow-sm shadow-rose-400/25' : 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25')
                          : (isDark ? 'bg-hajj-gold text-hajj-green' : 'bg-hajj-green text-hajj-alabaster')
                      }`}>
                        {isMatching ? (stepGender === 'female' ? '🌸' : '👞') : (i + 1)}
                      </span>
                      <span className={`text-sm leading-relaxed transition-colors duration-500 ${
                        isMatching
                          ? (stepGender === 'female' ? (isDark ? 'text-rose-200' : 'text-rose-900') : (isDark ? 'text-emerald-200' : 'text-emerald-900'))
                          : (isDark ? 'text-hajj-alabaster/90' : 'text-hajj-navy/90')
                      }`}>
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Ritual Counter (Tawaf & Sa'i) for Arrival stage */}
            {currentStage.id === 'arrival' && (
              <section className={`p-6 rounded-[28px] border transition-all duration-500 space-y-4 ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-white/50 border-white/20 shadow-sm'
              }`}>
                <h3 className="text-hajj-gold font-bold uppercase tracking-widest text-xs mb-1">
                  {language === 'ar' ? 'عداد المناسك' : language === 'tr' ? 'Tavaf & Sa\'y Sayacı' : language === 'sq' ? 'Numëruesi i Riteve' : 'Ritual Counter'}
                </h3>
                <p className={`text-xs transition-colors duration-500 ${isDark ? 'text-hajj-alabaster/60' : 'text-hajj-navy/60'}`}>
                  {language === 'ar' 
                    ? 'يتطلب كل من الطواف والسعي سبعة أشواط كاملة. اضغط على الدوائر لتسجيل تقدمك.' 
                    : language === 'tr' 
                    ? 'Tavaf ve Sa\'y ibadetlerinin her ikisi de 7 tur gerektirir. Sayacı ilerletmek için dairelere dokunun.' 
                    : language === 'sq' 
                    ? 'Tavafi dhe Sa\'i kërkojnë saktësisht shtatë rrathë. Trokitni mbi rrathë për të numëruar.' 
                    : 'Tawaf (Kaaba) and Sa\'i (Safa & Marwa) both require exactly seven rounds. Tap the circles to count your progress.'}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Tawaf Counter */}
                  <div className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-500 space-y-3 relative overflow-hidden ${
                    isDark ? 'bg-black/20 border-white/5' : 'bg-hajj-alabaster/40 border-hajj-green/5'
                  }`}>
                    <span className={`text-xs font-bold tracking-wide transition-colors duration-500 ${isDark ? 'text-hajj-gold' : 'text-hajj-green'}`}>
                      {language === 'ar' ? 'أشواط الطواف' : language === 'tr' ? 'Tavaf Turları' : language === 'sq' ? 'Rrathët e Tavafit' : 'Tawaf Rounds'}
                    </span>
                    
                  <button
                    onClick={() => {
                      if (navigator.vibrate) navigator.vibrate(50);
                      incrementTawaf();
                    }}
                    className={`group w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center relative cursor-pointer active:scale-95 transition-all focus:outline-none ${
                      isDark 
                        ? 'border-hajj-gold/40 hover:bg-hajj-gold/5' 
                        : 'border-hajj-green hover:bg-hajj-green/5'
                    }`}
                  >
                    <svg className="absolute inset-0 w-full h-full -rotate-90 scale-95">
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="#D4AF37"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - tawafCount / 7)}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    
                    <div className="z-10 flex flex-col items-center">
                      <span className={`text-3xl font-extrabold transition-colors ${isDark ? 'text-hajj-gold group-hover:text-hajj-alabaster' : 'text-hajj-green group-hover:text-hajj-gold'}`}>
                        {tawafCount}
                      </span>
                      <span className={`text-[10px] uppercase font-bold ${isDark ? 'text-hajj-alabaster/40' : 'text-hajj-navy/40'}`}>
                        {language === 'ar' ? 'من ٧' : language === 'tr' ? '/ 7' : language === 'sq' ? 'nga 7' : 'of 7'}
                      </span>
                    </div>
                  </button>

                  {tawafCount === 7 ? (
                    <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold uppercase animate-pulse border border-emerald-500/20">
                      {language === 'ar' ? 'اكتمل!' : language === 'tr' ? 'Tamamlandı!' : language === 'sq' ? 'U Krye!' : 'Completed!'}
                    </span>
                  ) : (
                    <span className={`text-[10px] font-medium ${isDark ? 'text-hajj-alabaster/40' : 'text-hajj-navy/50'}`}>
                      {language === 'ar' ? 'اضغط للعد' : language === 'tr' ? 'Dokun ve Say' : language === 'sq' ? 'Trokit për numërim' : 'Tap to count'}
                    </span>
                  )}

                  {tawafCount > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetTawaf();
                      }}
                      className={`text-[10px] font-bold transition-colors uppercase pt-1 cursor-pointer ${
                        isDark ? 'text-red-400 hover:text-red-300' : 'text-red-650 hover:text-red-800'
                      }`}
                    >
                      {language === 'ar' ? 'إعادة ضبط' : language === 'tr' ? 'Sıfırla' : language === 'sq' ? 'Rifillo' : 'Reset'}
                    </button>
                  )}
                </div>

                {/* Sa'i Counter */}
                <div className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-500 space-y-3 relative overflow-hidden ${
                  isDark ? 'bg-black/20 border-white/5' : 'bg-hajj-alabaster/40 border-hajj-green/5'
                }`}>
                  <span className={`text-xs font-bold tracking-wide transition-colors duration-500 ${isDark ? 'text-hajj-gold' : 'text-hajj-green'}`}>
                    {language === 'ar' ? 'أشواط السعي' : language === 'tr' ? 'Sa\'y Turları' : language === 'sq' ? 'Rrathët e Sa\'it' : 'Sa\'i Rounds'}
                  </span>
                  
                  <button
                    onClick={() => {
                      if (navigator.vibrate) navigator.vibrate(50);
                      incrementSai();
                    }}
                    className={`group w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center relative cursor-pointer active:scale-95 transition-all focus:outline-none ${
                      isDark 
                        ? 'border-hajj-gold/40 hover:bg-hajj-gold/5' 
                        : 'border-hajj-green hover:bg-hajj-green/5'
                    }`}
                  >
                    <svg className="absolute inset-0 w-full h-full -rotate-90 scale-95">
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="#D4AF37"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - saiCount / 7)}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    
                    <div className="z-10 flex flex-col items-center">
                      <span className={`text-3xl font-extrabold transition-colors ${isDark ? 'text-hajj-gold group-hover:text-hajj-alabaster' : 'text-hajj-green group-hover:text-hajj-gold'}`}>
                        {saiCount}
                      </span>
                      <span className={`text-[10px] uppercase font-bold ${isDark ? 'text-hajj-alabaster/40' : 'text-hajj-navy/40'}`}>
                        {language === 'ar' ? 'من ٧' : language === 'tr' ? '/ 7' : language === 'sq' ? 'nga 7' : 'of 7'}
                      </span>
                    </div>
                  </button>

                  {saiCount === 7 ? (
                    <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold uppercase animate-pulse border border-emerald-500/20">
                      {language === 'ar' ? 'اكتمل!' : language === 'tr' ? 'Tamamlandı!' : language === 'sq' ? 'U Krye!' : 'Completed!'}
                    </span>
                  ) : (
                    <span className={`text-[10px] font-medium ${isDark ? 'text-hajj-alabaster/40' : 'text-hajj-navy/50'}`}>
                      {language === 'ar' ? 'اضغط للعد' : language === 'tr' ? 'Dokun ve Say' : language === 'sq' ? 'Trokit për numërim' : 'Tap to count'}
                    </span>
                  )}

                  {saiCount > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetSai();
                      }}
                      className={`text-[10px] font-bold transition-colors uppercase pt-1 cursor-pointer ${
                        isDark ? 'text-red-400 hover:text-red-300' : 'text-red-650 hover:text-red-800'
                      }`}
                    >
                      {language === 'ar' ? 'إعادة ضبط' : language === 'tr' ? 'Sıfırla' : language === 'sq' ? 'Rifillo' : 'Reset'}
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Supplications / Duas Section */}
          {currentStage.details.duas && (
            <section className={`p-6 rounded-2xl border transition-all duration-500 ${
              isDark ? 'bg-white/5 border-white/5' : 'bg-hajj-green/5 border-hajj-green/10 shadow-sm'
            }`}>
              <h3 className="text-hajj-gold font-bold uppercase tracking-widest text-xs mb-6">
                {language === 'ar' ? 'الأدعية والأذكار' : language === 'tr' ? 'Dualarki & Zikirler' : language === 'sq' ? 'Lutjet & Dhikri' : 'Supplications'}
              </h3>
              {currentStage.details.duas.map((dua, i) => (
                <div key={i} className="space-y-4 text-center relative">
                  {/* Speaker TTS Control Button */}
                  {window.speechSynthesis && (
                    <div className="absolute top-0 right-0">
                      <button
                        onClick={() => handleSpeak(dua.arabic, i, true)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer active:scale-90 ${
                          playingDuaIndex === i 
                            ? 'bg-hajj-gold/20 text-hajj-gold border border-hajj-gold/40 animate-pulse' 
                            : isDark 
                            ? 'bg-white/10 text-hajj-alabaster/70 border border-white/5 hover:bg-white/15' 
                            : 'bg-hajj-green/10 text-hajj-green border border-hajj-green/5 hover:bg-hajj-green/15'
                        }`}
                        title="Listen to Arabic Recitation"
                        aria-label="Listen Recitation"
                      >
                        {playingDuaIndex === i ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}

                  <p className={`font-arabic text-3xl leading-loose dir-rtl select-all px-8 ${
                    isDark ? 'text-hajj-gold' : 'text-hajj-green'
                  }`}>
                    {dua.arabic}
                  </p>
                  {dua.transliteration && (
                    <p className={`text-xs font-semibold italic leading-relaxed px-4 select-all ${
                      isDark ? 'text-hajj-alabaster/60' : 'text-hajj-gold'
                    }`}>
                      {dua.transliteration}
                    </p>
                  )}
                  <p className={`text-sm leading-relaxed px-6 transition-colors duration-500 ${
                    isDark ? 'text-hajj-alabaster/70' : 'text-hajj-navy/70'
                  }`}>
                    {dua.translation}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Checklist Section */}
          {checklists.length > 0 && (
            <section>
              <h3 className="text-hajj-gold font-bold uppercase tracking-widest text-xs mb-4">
                {language === 'ar' ? 'قائمة المهام والتحضيرات' : language === 'tr' ? 'Hazırlık Listesi' : language === 'sq' ? 'Lista e Përgatitjeve' : 'Checklist'}
              </h3>
              <div className="space-y-3">
                {checklists.filter(filterList).map((item, i) => {
                  const itemKey = `${currentStage.id}-${i}`;
                  const isChecked = !!completedItems[itemKey];
                  return (
                    <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-500 ${
                      isDark 
                        ? 'bg-white/5 border-white/5 hover:bg-white/10' 
                        : 'bg-white/50 border-white/20 hover:bg-white/70 shadow-sm'
                    }`}>
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => handleCheckItem(currentStage.id, i)}
                        className={`w-5 h-5 cursor-pointer accent-hajj-green transition-all`} 
                      />
                      <span className={`text-sm transition-all duration-500 ${
                        isChecked 
                          ? 'line-through opacity-40' 
                          : isDark 
                          ? 'text-hajj-alabaster/85 opacity-85' 
                          : 'text-hajj-navy opacity-85'
                      }`}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {/* Read Deep Scholarly Guide Button CTA */}
          {currentStage.scholarlyGuide && (
            <section className="pt-4">
              <button
                onClick={() => setIsGuideOpen(true)}
                className={`w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg select-none cursor-pointer active:scale-[0.97] transition-all focus:outline-none ${
                  isDark 
                    ? 'bg-hajj-gold text-hajj-green shadow-hajj-gold/5 hover:brightness-110' 
                    : 'bg-hajj-green text-hajj-alabaster shadow-hajj-green/15 hover:brightness-110'
                }`}
              >
                {language === 'ar' ? 'اقرأ الدليل الفقهي التفصيلي' : language === 'tr' ? 'Detaylı Fıkıh Rehberini Oku' : language === 'sq' ? 'Lexo Udhëzuesin e Plotë Fikh' : 'Read Deep Scholarly Guide'}
              </button>
            </section>
          )}
        </div>
      ) : (
        <div className="py-6 space-y-6">
          {/* Progress Summary */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between transition-colors ${
            isDark ? 'bg-white/5 border-white/5' : 'bg-white/50 border-white/20 shadow-sm'
          }`}>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-hajj-gold tracking-widest block">
                {language === 'ar' ? 'تقدم الأدعية' : language === 'tr' ? 'Dua İlerlemesi' : language === 'sq' ? 'Progresi i Lutjeve' : 'Dua Progress'}
              </span>
              <span className="text-sm font-extrabold block">
                🎯 {personalDuas.filter(d => d.completed).length} / {personalDuas.length} {language === 'ar' ? 'أدعية مكتملة' : language === 'tr' ? 'Tamamlanan Dua' : language === 'sq' ? 'Lutje të kryera' : 'completed'}
              </span>
            </div>
            {personalDuas.length > 0 && (
              <div className="w-20 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-hajj-gold transition-all duration-500" 
                  style={{ width: `${(personalDuas.filter(d => d.completed).length / personalDuas.length) * 100}%` }}
                />
              </div>
            )}
          </div>

          {/* Common Duas Catalog CTA Banner */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-hajj-green/30 to-hajj-green/10 border-hajj-green/20' 
              : 'bg-gradient-to-r from-hajj-green/10 to-hajj-green/5 border-hajj-green/10 shadow-sm'
          }`}>
            <div className="space-y-0.5 flex-1">
              <h4 className="text-xs font-bold text-hajj-gold uppercase tracking-wider">
                📖 {language === 'ar' ? 'الأدعية المأثورة والجامعة' : language === 'tr' ? 'Sahih Dualar Kataloğu' : language === 'sq' ? 'Katalogu i Lutjeve të Shpeshta' : 'Common Duas Catalog'}
              </h4>
              <p className="text-[10px] opacity-75 leading-relaxed">
                {language === 'ar' 
                  ? 'تصفح ٣٢ دعاءً صحيحاً من القرآن والسنة واستوردها مباشرة لقائمتك.' 
                  : language === 'tr' 
                  ? 'Kur\'an ve Sünnet\'ten 32 sahih duayı inceleyin ve listenize aktarın.' 
                  : language === 'sq' 
                  ? 'Shfletoni 32 lutje të vërteta nga Kurani e Suneti dhe importojini ato.' 
                  : 'Browse 32 authentic Qur\'an & Sunnah supplications to import.'}
              </p>
            </div>
            <button
              onClick={() => setIsCommonDuasOpen(true)}
              className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all shadow-md focus:outline-none cursor-pointer flex-shrink-0 ${
                isDark
                  ? 'bg-hajj-gold text-hajj-green shadow-hajj-gold/5 hover:brightness-110'
                  : 'bg-hajj-green text-hajj-alabaster shadow-hajj-green/10 hover:brightness-110'
              }`}
            >
              {language === 'ar' ? 'عرض الأدعية' : language === 'tr' ? 'Duaları Gör' : language === 'sq' ? 'Shiko Lutjet' : 'View Catalog'}
            </button>
          </div>

          {/* Add Supplication Form */}
          <div className={`p-5 rounded-2xl border space-y-4 transition-colors ${
            isDark ? 'bg-white/5 border-white/5' : 'bg-white/50 border-white/20 shadow-sm'
          }`}>
            <h4 className="text-xs font-bold text-hajj-gold uppercase tracking-wider">
              ✍️ {language === 'ar' ? 'إضافة دعاء جديد' : language === 'tr' ? 'Yeni Dua Ekle' : language === 'sq' ? 'Shto Lutje të Re' : 'Add New Supplication'}
            </h4>
            
            <div className="space-y-3">
              <textarea
                rows={2}
                value={newDuaText}
                onChange={(e) => setNewDuaText(e.target.value)}
                placeholder={
                  language === 'ar' 
                    ? 'اكتب دعاءك هنا...' 
                    : language === 'tr' 
                    ? 'Duanızı buraya yazın...' 
                    : language === 'sq' 
                    ? 'Shkruani lutjen tuaj këtu...' 
                    : 'Type your supplication here...'
                }
                className={`w-full p-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                  isDark 
                    ? 'bg-black/45 border-white/10 text-white focus:border-hajj-gold/55' 
                    : 'bg-white border-black/10 text-hajj-navy focus:border-hajj-green/55'
                }`}
              />
              
              <div className="flex gap-2 items-center">
                <select
                  value={newDuaCategory}
                  onChange={(e) => setNewDuaCategory(e.target.value as PersonalDua['category'])}
                  className={`flex-1 p-2.5 rounded-xl border text-xs focus:outline-none cursor-pointer transition-colors ${
                    isDark 
                      ? 'bg-black/45 border-white/10 text-white focus:border-hajj-gold/55' 
                      : 'bg-white border-black/10 text-hajj-navy focus:border-hajj-green/55'
                  }`}
                >
                  <option value="general">✨ {language === 'ar' ? 'عام' : language === 'tr' ? 'Genel' : language === 'sq' ? 'E Përgjithshme' : 'General'}</option>
                  <option value="self">👞/🌸 {language === 'ar' ? 'لنفسي' : language === 'tr' ? 'Kendim İçin' : language === 'sq' ? 'Për Vete' : 'For Self'}</option>
                  <option value="family">👨‍👩‍👧‍👦 {language === 'ar' ? 'لعائلتي' : language === 'tr' ? 'Ailem İçin' : language === 'sq' ? 'Për Familjen' : 'For Family'}</option>
                  <option value="health">🤲 {language === 'ar' ? 'الصحة والشفاء' : language === 'tr' ? 'Sağlık & Şifa' : language === 'sq' ? 'Shëndet & Shërim' : 'Health & Shifa'}</option>
                </select>

                <button
                  onClick={() => {
                    if (!newDuaText.trim()) return;
                    addPersonalDua(newDuaText.trim(), newDuaCategory);
                    setNewDuaText('');
                    if (navigator.vibrate) navigator.vibrate(30);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all focus:outline-none ${
                    isDark 
                      ? 'bg-hajj-gold text-hajj-green hover:brightness-110 shadow-md shadow-hajj-gold/5' 
                      : 'bg-hajj-green text-hajj-alabaster hover:brightness-110 shadow-md shadow-hajj-green/10'
                  }`}
                >
                  {language === 'ar' ? 'حفظ' : language === 'tr' ? 'Kaydet' : language === 'sq' ? 'Ruaj' : 'Save'}
                </button>
              </div>
            </div>
          </div>

          {/* Filtering Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 flex-wrap">
            {(['all', 'favorites', 'self', 'family', 'health', 'general'] as const).map((cat) => {
              const isActive = duaFilter === cat;
              let label = '';
              if (cat === 'all') {
                label = language === 'ar' ? 'الكل' : language === 'tr' ? 'Hepsi' : language === 'sq' ? 'Të Gjitha' : 'All';
              } else if (cat === 'favorites') {
                label = language === 'ar' ? '⭐ المفضلة' : language === 'tr' ? '⭐ Favoriler' : language === 'sq' ? '⭐ Favoritet' : '⭐ Favorites';
              } else if (cat === 'self') {
                label = language === 'ar' ? 'لنفسي' : language === 'tr' ? 'Kendim' : language === 'sq' ? 'Për Vete' : 'Self';
              } else if (cat === 'family') {
                label = language === 'ar' ? 'عائلتي' : language === 'tr' ? 'Ailem' : language === 'sq' ? 'Familja' : 'Family';
              } else if (cat === 'health') {
                label = language === 'ar' ? 'الشفاء' : language === 'tr' ? 'Sağlık' : language === 'sq' ? 'Shëndeti' : 'Health';
              } else {
                label = language === 'ar' ? 'عام' : language === 'tr' ? 'Genel' : language === 'sq' ? 'Përgjithshme' : 'General';
              }
              
              return (
                <button
                  key={cat}
                  onClick={() => setDuaFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${
                    isActive
                      ? isDark 
                        ? 'bg-hajj-gold text-hajj-green border-none' 
                        : 'bg-hajj-green text-hajj-alabaster border-none'
                      : isDark
                        ? 'bg-white/5 border border-white/5 text-hajj-alabaster/60 hover:bg-white/10'
                        : 'bg-black/5 border border-black/5 text-hajj-navy/60 hover:bg-black/10'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Supplications List */}
          <div className="space-y-3">
            {personalDuas
              .filter((d) => {
                if (duaFilter === 'all') return true;
                if (duaFilter === 'favorites') return !!d.starred;
                return d.category === duaFilter;
              })
              .map((dua) => {
                return (
                  <div
                    key={dua.id}
                    className={`p-5 rounded-2xl border flex gap-4 items-start transition-all duration-300 relative ${
                      isDark 
                        ? 'bg-[#082216]/60 border-white/5 hover:border-white/10 hover:bg-[#082216]/80' 
                        : 'bg-white/70 border-black/5 shadow-sm hover:shadow-md hover:bg-white'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className="pt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={dua.completed}
                        onChange={() => {
                          togglePersonalDua(dua.id);
                          if (navigator.vibrate) navigator.vibrate(30);
                        }}
                        className="w-5 h-5 cursor-pointer accent-hajj-green rounded-md"
                      />
                    </div>
                    
                    {/* Content area */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${
                          dua.category === 'self'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                            : dua.category === 'family'
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                            : dua.category === 'health'
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                            : 'bg-hajj-gold/15 border-hajj-gold/30 text-hajj-gold'
                        }`}>
                          {dua.category}
                        </span>
                      </div>

                      {renderPersonalDuaText(dua.text, dua.completed)}
                    </div>

                    {/* Actions Panel (Star & Delete) */}
                    <div className="flex flex-col gap-2 items-center flex-shrink-0 self-stretch justify-between">
                      {/* Star Button */}
                      <button
                        onClick={() => {
                          toggleStarDua(dua.id);
                          if (navigator.vibrate) navigator.vibrate(30);
                        }}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors cursor-pointer focus:outline-none ${
                          dua.starred
                            ? isDark
                              ? 'bg-hajj-gold/20 border-hajj-gold/35 text-hajj-gold hover:bg-hajj-gold/30'
                              : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100/70 shadow-sm'
                            : isDark
                              ? 'bg-white/5 border-white/5 text-hajj-alabaster/40 hover:bg-white/10 hover:text-hajj-alabaster/70'
                              : 'bg-black/5 border-black/5 text-hajj-navy/40 hover:bg-black/10 hover:text-hajj-navy/70'
                        }`}
                        title={dua.starred ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <svg 
                          className="w-3.5 h-3.5" 
                          fill={dua.starred ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.596 1.04-.596 1.236 0l2.25 6.848a1 1 0 00.95.69h7.198c.628 0 .888.82.38 1.218l-5.82 4.45a1 1 0 00-.364 1.118l2.25 6.848c.196.596-.48 1.09-.98.718l-5.82-4.45a1 1 0 00-1.176 0l-5.82 4.45c-.5.372-1.176-.122-.98-.718l2.25-6.848a1 1 0 00-.364-1.118L2.064 12.255c-.5-.398-.24-1.218.38-1.218h7.198a1 1 0 00.95-.69l2.25-6.848z" />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          deletePersonalDua(dua.id);
                          if (navigator.vibrate) navigator.vibrate(40);
                        }}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-colors cursor-pointer focus:outline-none ${
                          isDark 
                            ? 'bg-red-950/20 border-red-900/30 text-red-400 hover:bg-red-900/40 hover:text-red-300' 
                            : 'bg-red-50 border-red-200 text-red-650 hover:bg-red-100 hover:text-red-800'
                        }`}
                        title="Delete Supplication"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

            {personalDuas.filter((d) => {
              if (duaFilter === 'all') return true;
              if (duaFilter === 'favorites') return !!d.starred;
              return d.category === duaFilter;
            }).length === 0 && (
              <div className="py-8 text-center text-xs opacity-40 font-medium">
                {language === 'ar' ? 'لا توجد أدعية في هذا القسم.' : language === 'tr' ? 'Bu kategoride dua bulunmuyor.' : language === 'sq' ? 'Nuk ka lutje në këtë kategori.' : 'No supplications in this category.'}
              </div>
            )}
          </div>
        </div>
      )}
        
        {/* Safe Area Spacer */}
        <div className="h-[env(safe-area-inset-bottom,24px)]" />
      </div>

      {/* Navigation Bar — 3-Column Grid: always centered, never overflows on any phone */}
      <div className={`px-4 py-3 border-t grid grid-cols-3 items-center transition-colors duration-500 flex-shrink-0 ${
        isDark ? 'bg-[#061D13]/95 border-white/5' : 'bg-hajj-alabaster/95 border-hajj-green/5'
      }`}>

        {/* ← Previous — left column */}
        <div className="justify-self-start">
          <button 
            onClick={(e) => { e.stopPropagation(); prevStage(); }}
            disabled={currentStageIndex === 0}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm disabled:opacity-20 transition-all active:scale-95 cursor-pointer select-none focus:outline-none ${
              isDark ? 'text-hajj-alabaster/85 hover:bg-white/5' : 'text-hajj-green hover:bg-hajj-green/5'
            }`}
          >
            {language === 'ar' ? 'السابق' : language === 'tr' ? 'Geri' : language === 'sq' ? 'Prapa' : '← Prev'}
          </button>
        </div>

        {/* Stage Dots — center column, perfectly centered */}
        <div className="justify-self-center flex items-center gap-0.5 flex-wrap justify-center max-w-[72px]">
          {visibleStages.map((stage, i) => {
            const prevStageItem = visibleStages[i - 1];
            const isChapterStart = i > 0 && prevStageItem && stage.chapter !== prevStageItem.chapter;
            return (
              <React.Fragment key={stage.id}>
                {isChapterStart && (
                  <div className={`w-px h-2 rounded-full mx-0.5 flex-shrink-0 ${isDark ? 'bg-white/15' : 'bg-hajj-navy/15'}`} />
                )}
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                    i === currentStageIndex
                      ? 'w-3 bg-hajj-gold'
                      : isDark ? 'w-1 bg-white/15' : 'w-1 bg-hajj-navy/15'
                  }`}
                />
              </React.Fragment>
            );
          })}
        </div>

        {/* Next → — right column */}
        <div className="justify-self-end">
          <button 
            onClick={(e) => { e.stopPropagation(); nextStage(); }}
            disabled={currentStageIndex === totalStages - 1}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-sm shadow-md transition-all active:scale-95 disabled:opacity-20 cursor-pointer select-none focus:outline-none ${
              isDark 
                ? 'bg-hajj-gold text-hajj-green shadow-hajj-gold/10 hover:brightness-110' 
                : 'bg-hajj-green text-hajj-alabaster shadow-hajj-green/20 hover:brightness-110'
            }`}
          >
            {language === 'ar' ? 'التالي' : language === 'tr' ? 'İleri' : language === 'sq' ? 'Para' : 'Next →'}
          </button>
        </div>
      </div>
      {/* Safe Area Spacer for Bottom Bar */}
      <div className={`flex-shrink-0 transition-colors duration-500 ${isDark ? 'bg-[#061D13]/95' : 'bg-hajj-alabaster/95'}`} style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </motion.div>

      {/* Full-Page Scholarly Fiqh Guide Overlay */}
      <AnimatePresence>
        {isGuideOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className={`absolute inset-0 z-[100] w-full h-full flex flex-col overflow-hidden transition-colors duration-500 max-w-[450px] mx-auto ${
              isDark ? 'bg-[#061D13] text-hajj-alabaster/90' : 'bg-hajj-alabaster text-hajj-navy'
            }`}
          >
            {/* Frosted Sticky Header */}
            <div className={`p-6 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md transition-all duration-500 flex-shrink-0 ${
              isDark ? 'bg-[#061D13]/95 border-white/5' : 'bg-hajj-alabaster/95 border-hajj-green/5 shadow-sm'
            }`}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-hajj-gold">
                  {language === 'ar' ? 'فقه الحج والعمرة' : language === 'tr' ? 'Fıkıh & Sünnet Rehberi' : language === 'sq' ? 'Fikhu & Suneti i Haxhit' : 'Scholarly Fiqh Guide'}
                </span>
                <h3 className={`text-lg font-black tracking-tight mt-0.5 transition-colors duration-500 ${isDark ? 'text-hajj-alabaster' : 'text-hajj-green'}`}>
                  {currentStage.title}
                </h3>
              </div>
              
              <button
                onClick={() => setIsGuideOpen(false)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border cursor-pointer active:scale-90 transition-all select-none focus:outline-none ${
                  isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-hajj-green/5 border-hajj-green/10 text-hajj-green hover:bg-hajj-green/10'
                }`}
                aria-label="Close Guide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Core Guide Content */}
            {currentStage.scholarlyGuide && (
              <div 
                className="flex-1 overflow-y-auto px-6 py-8 space-y-8" 
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 36px)' }}
                onScroll={(e) => e.stopPropagation()} // Prevent bubble triggers
              >
                {/* 1. Spiritual Essence Section */}
                {currentStage.scholarlyGuide.spiritualEssence && (
                  <section className="space-y-3">
                    <h4 className="text-hajj-gold font-extrabold uppercase tracking-widest text-[11px] border-b border-hajj-gold/20 pb-1.5 flex items-center gap-2 select-none">
                      <span>🤍</span>
                      {language === 'ar' ? 'الجوهر الروحي' : language === 'tr' ? 'Manevi Öz' : language === 'sq' ? 'Esenca Shpirtërore' : 'Spiritual Essence'}
                    </h4>
                    <p className={`text-sm leading-relaxed font-medium transition-colors duration-500 whitespace-pre-line ${isDark ? 'text-hajj-alabaster/80' : 'text-hajj-navy/80'}`}>
                      {renderTextWithTerms(currentStage.scholarlyGuide.spiritualEssence)}
                    </p>
                  </section>
                )}

                {/* 2. Fiqh & Rules Section */}
                {currentStage.scholarlyGuide.fiqhRules && (
                  <section className={`p-6 rounded-3xl border transition-all duration-500 space-y-4 ${
                    isDark ? 'bg-white/5 border-white/5 text-hajj-alabaster/90' : 'bg-white/70 border-white/20 text-hajj-navy shadow-sm'
                  }`}>
                    <h4 className="text-hajj-gold font-black text-xs uppercase tracking-widest border-b border-hajj-gold/20 pb-2 flex items-center gap-2 select-none">
                      <span>⚖️</span>
                      {language === 'ar' ? 'الأحكام والفقه' : language === 'tr' ? 'Fıkıh & Kurallar' : language === 'sq' ? 'Fikhu & Rregullat' : 'Fiqh & Rules'}
                    </h4>
                    <div className="text-xs opacity-90 leading-relaxed font-medium space-y-3.5 whitespace-pre-line">
                      {renderTextWithTerms(currentStage.scholarlyGuide.fiqhRules)}
                    </div>
                  </section>
                )}

                {/* Special Rules for Women Section */}
                {profile.gender === 'female' && currentStage.scholarlyGuide.mensesRules && (
                  <section className={`p-6 rounded-3xl border transition-all duration-500 space-y-4 ${
                    isDark 
                      ? 'bg-rose-950/20 border-rose-800/30 text-rose-200/90 shadow-[0_0_20px_rgba(244,63,94,0.05)]' 
                      : 'bg-rose-50/70 border-rose-200/50 text-rose-900 shadow-sm shadow-rose-100/30'
                  }`}>
                    <h4 className="text-rose-400 font-black text-xs uppercase tracking-widest border-b border-rose-400/20 pb-2 flex items-center gap-2 select-none">
                      <span>🌸</span>
                      {language === 'ar' ? 'أحكام خاصة بالمرأة' : language === 'tr' ? 'Kadınlara Özel Hükümler' : language === 'sq' ? 'Rregulla të veçanta për Gratë' : 'Special Rules for Women'}
                    </h4>
                    <div className="text-xs leading-relaxed font-medium space-y-3.5 whitespace-pre-line">
                      {renderTextWithTerms(currentStage.scholarlyGuide.mensesRules)}
                    </div>
                  </section>
                )}

                {/* Did You Know? Interesting Fact Banner (Break up Fiqh and Hacks) */}
                {currentStage.scholarlyGuide.interestingFact && (
                  <div className={`p-5 rounded-[28px] border transition-all duration-500 flex flex-col space-y-2 relative overflow-hidden select-none ${
                    isDark 
                      ? 'bg-gradient-to-br from-hajj-gold/10 via-[#061D13]/30 to-[#030d08]/40 border-hajj-gold/25 shadow-hajj-gold/5' 
                      : 'bg-gradient-to-br from-hajj-green/5 via-hajj-gold/5 to-white/70 border-hajj-gold/30 shadow-sm shadow-hajj-gold/5'
                  }`}>
                    {/* Glowing background hint */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-hajj-gold/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2">
                      <span className="text-base">💡</span>
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-hajj-gold">
                        {language === 'ar' ? 'هل تعلم؟' : language === 'tr' ? 'BİLİYOR MUYDUNUZ?' : language === 'sq' ? 'A E DINIT?' : 'DID YOU KNOW?'}
                      </h5>
                    </div>
                    
                    <h6 className={`text-xs font-black transition-colors duration-500 ${isDark ? 'text-white' : 'text-hajj-green'}`}>
                      {currentStage.scholarlyGuide.interestingFact.title}
                    </h6>
                    
                    <p className={`text-[11px] leading-relaxed transition-colors duration-500 ${isDark ? 'text-hajj-alabaster/70' : 'text-hajj-navy/70'}`}>
                      {currentStage.scholarlyGuide.interestingFact.fact}
                    </p>
                  </div>
                )}

                {/* 3. Ground Survival Hacks Section */}
                {currentStage.scholarlyGuide.survivalHacks && (
                  <section className="space-y-4">
                    <h4 className="text-hajj-gold font-extrabold uppercase tracking-widest text-[11px] border-b border-hajj-gold/20 pb-1.5 flex items-center gap-2 select-none">
                      <span>🏃‍♂️</span>
                      {language === 'ar' ? 'إرشادات عملية للنجاة' : language === 'tr' ? 'Saha Hayatta Kalma Taktikleri' : language === 'sq' ? 'Këshilla Praktike në terren' : 'Ground Survival Hacks'}
                    </h4>
                    <div className="text-sm opacity-85 leading-relaxed font-medium space-y-2.5 whitespace-pre-line">
                      {renderTextWithTerms(currentStage.scholarlyGuide.survivalHacks)}
                    </div>
                  </section>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌸 Menses Assistant Overlay Drawer */}
      <AnimatePresence>
        {isMensesDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMensesDrawerOpen(false)}
              className="absolute inset-0 z-55 bg-black/60 backdrop-blur-sm w-full max-w-[450px] mx-auto rounded-t-[32px]"
            />
            {/* Drawer Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute inset-x-0 bottom-0 z-55 w-full max-w-[450px] mx-auto rounded-t-[32px] border-t flex flex-col overflow-hidden transition-colors duration-500 ${
                isDark 
                  ? 'bg-[#0b0406]/95 border-rose-950/40 text-rose-100 shadow-[0_-15px_45px_rgba(0,0,0,0.8)]' 
                  : 'bg-rose-50/95 border-rose-200/60 text-rose-950 shadow-2xl'
              }`}
              style={{ height: '75dvh' }}
              onScroll={(e) => e.stopPropagation()}
            >
              {/* Drag Handle Area */}
              <div className="w-full py-4 flex flex-col items-center cursor-pointer flex-shrink-0" onClick={() => setIsMensesDrawerOpen(false)}>
                <div className={`w-12 h-1.5 rounded-full mb-1 ${isDark ? 'bg-rose-900/30' : 'bg-rose-200'}`} />
              </div>

              {/* Header */}
              <div className="px-6 pb-4 flex items-center justify-between border-b border-rose-200/25 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌸</span>
                  <div>
                    <h3 className="text-base font-black tracking-tight text-rose-400">
                      {language === 'ar' ? 'مساعد الأحكام للمرأة' : language === 'tr' ? 'Kadın Özel Haller Rehberi' : language === 'sq' ? 'Asistenti i Rregullave për Gratë' : 'Menses Assistant'}
                    </h3>
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-0.5">
                      {language === 'ar' ? 'الفقه واليسر في الحج' : language === 'tr' ? 'Kolaylık & Fıkıh Rehberi' : language === 'sq' ? 'Lehtësimi & Fikhu në Haxh' : 'Ease & Fiqh Guidelines'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMensesDrawerOpen(false)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer active:scale-90 transition-all focus:outline-none ${
                    isDark ? 'bg-rose-950/20 border-rose-900/30 text-rose-300' : 'bg-rose-100 border-rose-200 text-rose-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Spiritual Comfort Card */}
                <div className={`p-5 rounded-2xl border transition-all flex flex-col space-y-3 relative overflow-hidden ${
                  isDark ? 'bg-rose-950/10 border-rose-900/25' : 'bg-white/90 border-rose-200/50 shadow-sm'
                }`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-400/5 rounded-full blur-2xl pointer-events-none" />
                  <span className="text-xl text-rose-400 font-extrabold select-none">“</span>
                  <p className={`text-xs italic leading-relaxed font-semibold ${isDark ? 'text-rose-200/90' : 'text-rose-900'}`}>
                    {language === 'ar' 
                      ? '«إنَّ هذا أمْرٌ كَتَبَهُ اللَّهُ علَى بَناتِ آدَمَ، فاقْضِي ما يَقْضِي الحاجُّ، غيرَ أنْ لا تَطُوفي بالبَيْتِ»'
                      : language === 'tr' 
                      ? '"Şüphesiz ki bu (özel hal), Allah\'ın Âdem kızlarına takdir ettiği bir şeydir. Hacıların yaptığı her şeyi yap, fakat Kâbe\'yi tavaf etme."'
                      : language === 'sq' 
                      ? '"Kjo është një çështje që Allahu e ka caktuar për vajzat e Ademit, prandaj bëj atë që bën çdo haxhi, por mos bëj Tavaf rreth Qabes."'
                      : '"This is a matter which Allah has decreed for the daughters of Adam, so do what any pilgrim does, but do not perform Tawaf."'}
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-rose-400/70 border-t border-rose-200/10 pt-2">
                    <span>— Prophet Muhammad ﷺ (Sahih al-Bukhari)</span>
                  </div>
                </div>

                {/* Stage Specific Guideline */}
                <section className="space-y-3">
                  <h4 className="text-rose-400 font-extrabold uppercase tracking-widest text-[10px] border-b border-rose-200/20 pb-1.5 flex items-center gap-2">
                    <span>📍</span>
                    {language === 'ar' ? 'إرشادات النسك الحالي' : language === 'tr' ? 'Bu Adım İçin Durumunuz' : language === 'sq' ? 'Udhëzimi për këtë Hap' : 'Current Stage Guideline'}
                  </h4>
                  <p className={`text-xs leading-relaxed font-semibold whitespace-pre-line ${isDark ? 'text-rose-100/80' : 'text-rose-950/80'}`}>
                    {currentStage.scholarlyGuide?.mensesRules 
                      ? currentStage.scholarlyGuide.mensesRules
                      : (language === 'ar' 
                          ? 'في هذه الخطوة، يمكنك أداء جميع أعمال ومناسك الحج بشكل طبيعي، حيث إن الطهارة الطقوسية (الوضوء أو الغسل) ليست شرطاً لصحة هذه الأعمال.'
                          : language === 'tr'
                          ? 'Bu adımda, hac ibadetlerinin tümünü normal şekilde gerçekleştirebilirsiniz; çünkü bu amellerin geçerliliği için abdest veya gusül şartı bulunmamaktadır.'
                          : language === 'sq'
                          ? 'Në këtë hap, ju mund të kryeni të gjitha veprimet e Haxhit krejtësisht normalisht, pasi pastërtia rituale (abdesti ose gusli) nuk është kusht për vlefshmërinë e këtë veprash.'
                          : 'During this step, you can perform all actions and rituals of Hajj normally, as ritual purity is not required for their validity.')}
                  </p>
                </section>

                {/* Quick Fiqh Cheat Sheet */}
                <section className="space-y-3">
                  <h4 className="text-rose-400 font-extrabold uppercase tracking-widest text-[10px] border-b border-rose-200/20 pb-1.5 flex items-center gap-2">
                    <span>📋</span>
                    {language === 'ar' ? 'مخطط الأعمال المباحة والممنوعة' : language === 'tr' ? 'İzin Verilen & Yasak Olan Ameller' : language === 'sq' ? 'Lista e Veprave të Lejuara & Ndaluara' : 'Permissibility Cheat-Sheet'}
                  </h4>
                  <div className={`p-4 rounded-2xl border text-xs space-y-4 ${isDark ? 'bg-black/35 border-rose-950/40' : 'bg-white border-rose-200/50 shadow-sm'}`}>
                    {/* Allowed Acts */}
                    <div className="space-y-2">
                      <h5 className="font-black text-rose-500 uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                        <span className="text-emerald-500 text-sm">✓</span>
                        {language === 'ar' ? 'أعمال مباحة تماماً (لا تشترط الطهارة)' : language === 'tr' ? 'Tamamen Serbest (Abdest Şart Değil)' : language === 'sq' ? 'Veprat e Lejuara (Nuk kërkohet pastërti)' : 'Fully Allowed (No Purity Required)'}
                      </h5>
                      <ul className={`grid grid-cols-2 gap-2 text-[10px] font-semibold ${isDark ? 'text-rose-100/70' : 'text-rose-950/70'}`}>
                        <li className="flex items-center gap-1">🟢 {language === 'ar' ? 'الوقوف بعرفة' : language === 'tr' ? 'Arafat Vakfesi' : language === 'sq' ? 'Qëndrimi në Arafat' : 'Arafat Standing'}</li>
                        <li className="flex items-center gap-1">🟢 {language === 'ar' ? 'المبيت بمزدلفة' : language === 'tr' ? 'Müzdelife Geceleme' : language === 'sq' ? 'Muzdelifë' : 'Muzdalifah Stay'}</li>
                        <li className="flex items-center gap-1">🟢 {language === 'ar' ? 'البقاء في منى' : language === 'tr' ? 'Mina Çadırları' : language === 'sq' ? 'Qëndrimi në Minë' : 'Mina Staying'}</li>
                        <li className="flex items-center gap-1">🟢 {language === 'ar' ? 'رمي الجمرات' : language === 'tr' ? 'Şeytan Taşlama' : language === 'sq' ? 'Gjuajtja e Gurëve' : 'Jamarat Stoning'}</li>
                        <li className="flex items-center gap-1">🟢 {language === 'ar' ? 'الذكر والدعاء' : language === 'tr' ? 'Dua & Zikir' : language === 'sq' ? 'Lutja & Dhikri' : 'Dhikr & Supplication'}</li>
                        <li className="flex items-center gap-1">🟢 {language === 'ar' ? 'قص/تقصير الشعر' : language === 'tr' ? 'Saç Kısaltma' : language === 'sq' ? 'Prerja e Flokëve' : 'Hair Trimming'}</li>
                      </ul>
                    </div>
                    
                    {/* Forbidden Acts */}
                    <div className="space-y-2 border-t border-rose-200/10 pt-3">
                      <h5 className="font-black text-rose-500 uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                        <span className="text-rose-500 text-sm">✗</span>
                        {language === 'ar' ? 'أعمال مؤجلة (تشترط الطهارة)' : language === 'tr' ? 'Ertelenmesi Gerekenler (Abdest Şart)' : language === 'sq' ? 'Veprat e Ndaluara (Kërkohet pastërti)' : 'Must Postpone (Ritual Purity Required)'}
                      </h5>
                      <ul className={`grid grid-cols-1 gap-2 text-[10px] font-semibold ${isDark ? 'text-rose-100/70' : 'text-rose-950/70'}`}>
                        <li className="flex items-center gap-1">🔴 {language === 'ar' ? 'دخول المسجد الحرام' : language === 'tr' ? 'Mescid-i Haram\'a Giriş' : language === 'sq' ? 'Hyrja në Xhaminë e Haramit' : 'Entering Masjid al-Haram'}</li>
                        <li className="flex items-center gap-1">🔴 {language === 'ar' ? 'الطواف بالبيت (الإفاضة/القدوم)' : language === 'tr' ? 'Kabe Tavafı (İfade/Kudüm)' : language === 'sq' ? 'Tavafi rreth Qabes' : 'Tawaf al-Kaaba (Pillar/Arrival)'}</li>
                        <li className="flex items-center gap-1">🔴 {language === 'ar' ? 'صلاة ركعتي الطواف أو الصلوات المفروضة' : language === 'tr' ? 'Tavaf Namazı & Farz Namazlar' : language === 'sq' ? 'Falja e Namazit' : 'Tawaf Prayers & Obligatory Prayers'}</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              {/* Safe Area Footer */}
              <div className={`flex-shrink-0 border-t border-rose-200/10 py-4 px-6 flex justify-end ${isDark ? 'bg-[#0d0406]' : 'bg-rose-100/50'}`}>
                <button
                  onClick={() => setIsMensesDrawerOpen(false)}
                  className={`py-3 px-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-md cursor-pointer active:scale-95 transition-all focus:outline-none ${
                    isDark ? 'bg-rose-500 text-white shadow-rose-950' : 'bg-rose-600 text-white shadow-rose-600/10'
                  }`}
                >
                  {language === 'ar' ? 'مفهوم، شكراً لك' : language === 'tr' ? 'Anlaşıldı, Teşekkürler' : language === 'sq' ? 'Kuptova, Faleminderit' : 'Understood, Thank You'}
                </button>
              </div>
              <div className={isDark ? 'bg-[#0d0406]' : 'bg-rose-100/50'} style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Common Duas Modal */}
      <AnimatePresence>
        {isCommonDuasOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`fixed inset-0 z-[100] flex flex-col backdrop-blur-xl ${
              isDark ? 'bg-hajj-green/95 text-hajj-alabaster' : 'bg-hajj-alabaster/95 text-hajj-navy'
            }`}
          >
            {/* Header */}
            <div className={`px-6 py-4 flex items-center justify-between border-b ${
              isDark ? 'border-white/5 bg-[#061D13]' : 'border-black/5 bg-[#FAF6F0]'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-hajj-gold">
                    {language === 'ar' ? 'الأدعية المأثورة والجامعة' : language === 'tr' ? 'Sahih Dualar' : language === 'sq' ? 'Lutjet e Shpeshta' : 'Common Duas'}
                  </h3>
                  <p className="text-[9px] opacity-60">
                    {language === 'ar' ? '٣٢ دعاءً صحيحاً من القرآن والسنة النبوية' : language === 'tr' ? 'Kur\'an ve Sünnet\'ten 32 Sahih Dua' : language === 'sq' ? '32 Lutje të Vërteta nga Kurani e Suneti' : '32 Authentic Supplications from Quran & Sunnah'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCommonDuasOpen(false);
                  setImportingDuaId(null);
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full border transition-transform active:scale-90 cursor-pointer focus:outline-none ${
                  isDark ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10' : 'bg-black/5 border-black/10 text-black/80 hover:bg-black/10'
                }`}
              >
                ✕
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className={`px-6 py-3 flex gap-1.5 overflow-x-auto border-b ${
              isDark ? 'border-white/5 bg-[#051810]' : 'border-black/5 bg-[#FAF8F5]'
            }`}>
              {(['all', 'quran', 'prophetic', 'forgiveness', 'hajj'] as const).map((cat) => {
                const isActive = commonDuaCategory === cat;
                let label = '';
                if (cat === 'all') {
                  label = language === 'ar' ? 'الكل' : language === 'tr' ? 'Tümü' : language === 'sq' ? 'Të Gjitha' : 'All';
                } else if (cat === 'quran') {
                  label = language === 'ar' ? 'من القرآن' : language === 'tr' ? 'Kur\'an\'dan' : language === 'sq' ? 'Nga Kurani' : 'Quranic';
                } else if (cat === 'prophetic') {
                  label = language === 'ar' ? 'أدعية نبوية' : language === 'tr' ? 'Nebevi' : language === 'sq' ? 'Profetike' : 'Prophetic';
                } else if (cat === 'forgiveness') {
                  label = language === 'ar' ? 'الاستغفار' : language === 'tr' ? 'Bağışlanma' : language === 'sq' ? 'Për Falje' : 'Forgiveness';
                } else if (cat === 'hajj') {
                  label = language === 'ar' ? 'الحج والمناسك' : language === 'tr' ? 'Hac & Arafat' : language === 'sq' ? 'Haxhi' : 'Hajj';
                }
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setCommonDuaCategory(cat);
                      setImportingDuaId(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer focus:outline-none ${
                      isActive
                        ? isDark 
                          ? 'bg-hajj-gold text-hajj-green border-none shadow-md shadow-hajj-gold/10' 
                          : 'bg-hajj-green text-hajj-alabaster border-none shadow-md shadow-hajj-green/10'
                        : isDark
                          ? 'bg-white/5 border border-white/5 text-hajj-alabaster/60 hover:bg-white/10'
                          : 'bg-black/5 border border-black/5 text-hajj-navy/60 hover:bg-black/10'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* List of Duas */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {commonDuas
                .filter((d) => commonDuaCategory === 'all' || d.category === commonDuaCategory)
                .map((dua) => {
                  const isImporting = importingDuaId === dua.id;
                  return (
                    <div
                      key={dua.id}
                      className={`p-5 rounded-2xl border transition-all relative ${
                        isDark 
                          ? 'bg-[#082216]/60 border-white/5 hover:border-white/10' 
                          : 'bg-white/70 border-black/5 shadow-sm hover:bg-white'
                      }`}
                    >
                      {/* Badge */}
                      <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border inline-block mb-3 ${
                        dua.category === 'quran'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                          : dua.category === 'prophetic'
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                          : dua.category === 'forgiveness'
                          ? 'bg-purple-500/10 border-purple-500/20 text-purple-500'
                          : 'bg-hajj-gold/15 border-hajj-gold/30 text-hajj-gold'
                      }`}>
                        {dua.category}
                      </span>

                      {/* Arabic script with diacritics */}
                      <p className="text-right text-lg font-bold leading-loose text-hajj-navy dark:text-white mb-2 font-arabic" dir="rtl">
                        {dua.arabic}
                      </p>

                      {/* Transliteration */}
                      <p className="text-xs italic opacity-65 leading-relaxed mb-3">
                        {dua.transliteration}
                      </p>

                      {/* Translated text */}
                      <p className="text-xs leading-relaxed font-semibold opacity-90 border-t border-black/5 dark:border-white/5 pt-3">
                        {dua.translations[language] || dua.translations['en']}
                      </p>

                      {/* Actions Footer */}
                      <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[9px] opacity-40 font-mono">ID: {dua.id}</span>
                        
                        <div className="relative">
                          {!isImporting ? (
                            <button
                              onClick={() => {
                                setImportingDuaId(dua.id);
                                if (navigator.vibrate) navigator.vibrate(30);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-all focus:outline-none flex items-center gap-1.5 ${
                                isDark 
                                  ? 'bg-hajj-gold text-hajj-green hover:brightness-110 shadow-sm shadow-hajj-gold/5' 
                                  : 'bg-hajj-green text-hajj-alabaster hover:brightness-110 shadow-sm'
                              }`}
                            >
                              📥 {language === 'ar' ? 'حفظ ودعاء' : language === 'tr' ? 'Ekle & Kaydet' : language === 'sq' ? 'Shto & Ruaj' : 'Import & Save'}
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 bg-black/10 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/5 animate-fade-in flex-wrap">
                              <span className="text-[9px] px-2 font-bold uppercase tracking-wider opacity-60">
                                {language === 'ar' ? 'الفئة:' : language === 'tr' ? 'Kategori:' : language === 'sq' ? 'Kategoria:' : 'Folder:'}
                              </span>
                              {(['general', 'self', 'family', 'health'] as const).map((destCat) => {
                                let label = destCat === 'general' ? 'Gen' : destCat === 'self' ? 'Self' : destCat === 'family' ? 'Fam' : 'Health';
                                if (language === 'ar') {
                                  label = destCat === 'general' ? 'عام' : destCat === 'self' ? 'نفسي' : destCat === 'family' ? 'عائلة' : 'شفاء';
                                } else if (language === 'tr') {
                                  label = destCat === 'general' ? 'Genel' : destCat === 'self' ? 'Kendim' : destCat === 'family' ? 'Ailem' : 'Sağlık';
                                } else if (language === 'sq') {
                                  label = destCat === 'general' ? 'Përgj' : destCat === 'self' ? 'Vete' : destCat === 'family' ? 'Familj' : 'Shënd';
                                }
                                return (
                                  <button
                                    key={destCat}
                                    onClick={() => {
                                      const textToImport = `${dua.arabic}\n(${dua.translations[language] || dua.translations['en']})`;
                                      addPersonalDua(textToImport, destCat, false, dua.id);
                                      setImportingDuaId(null);
                                      if (navigator.vibrate) navigator.vibrate(50);
                                    }}
                                    className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-all ${
                                      isDark
                                        ? 'bg-white/10 hover:bg-hajj-gold hover:text-hajj-green text-white'
                                        : 'bg-white hover:bg-hajj-green hover:text-white text-hajj-navy border border-black/5'
                                    }`}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                              
                              {/* Option with star directly */}
                              <button
                                onClick={() => {
                                  const textToImport = `${dua.arabic}\n(${dua.translations[language] || dua.translations['en']})`;
                                  addPersonalDua(textToImport, 'general', true, dua.id);
                                  setImportingDuaId(null);
                                  if (navigator.vibrate) navigator.vibrate(60);
                                }}
                                className={`p-1 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-all ${
                                  isDark
                                    ? 'bg-hajj-gold/25 hover:bg-hajj-gold text-hajj-gold hover:text-hajj-green'
                                    : 'bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200'
                                }`}
                                title="Import and mark Favorite ⭐"
                              >
                                ⭐
                              </button>

                              {/* Cancel import */}
                              <button
                                onClick={() => setImportingDuaId(null)}
                                className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-black text-red-500 hover:bg-red-500/10 cursor-pointer`}
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomSheet;

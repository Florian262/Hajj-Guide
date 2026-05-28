import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { hajjData, chapterLabels } from '../data/hajjData';
import { CloudTransition } from './CloudTransition';

const mapTranslations = {
  en: {
    title: "The Sacred Pathway",
    subtitle: "Your Interactive Hajj Journey Map",
    resumeBtn: "Resume Guide ➔",
    completed: "Completed Steps",
    steps: "Steps",
    genderMale: "Male Pilgrim 👞",
    genderFemale: "Female Pilgrim 🌸",
    typeTamattu: "Hajj al-Tamattu' (Umrah + Hajj)",
    typeQiran: "Hajj al-Qiran (Combined)",
    typeIfrad: "Hajj al-Ifrad (Hajj Only)",
    clickToFly: "Tap any step to enter that location",
    chapter: "Chapter",
  },
  ar: {
    title: "الصراط المقدس",
    subtitle: "خارطة طريق مناسك الحج التفاعلية",
    resumeBtn: "استئناف الدليل ➔",
    completed: "الخطوات المكتملة",
    steps: "الخطوات",
    genderMale: "حاج 👞",
    genderFemale: "حاجة 🌸",
    typeTamattu: "حج التمتع (عمرة + حج)",
    typeQiran: "حج القران (جمع)",
    typeIfrad: "حج الإفراد (حج فقط)",
    clickToFly: "اضغط على أي خطوة للدخول إلى الموقع",
    chapter: "الفصل",
  },
  tr: {
    title: "Kutsal Yolculuk Haritası",
    subtitle: "İnteraktif Hac Rehberi Yol Haritanız",
    resumeBtn: "Rehbere Dön ➔",
    completed: "Tamamlanan Adımlar",
    steps: "Adımlar",
    genderMale: "Erkek Hacı 👞",
    genderFemale: "Kadın Hacı 🌸",
    typeTamattu: "Temettu Haccı (Umre + Hac)",
    typeQiran: "Kıran Haccı (Birleşik)",
    typeIfrad: "İfrad Haccı (Sadece Hac)",
    clickToFly: "Bölgeye girmek için istediğiniz adıma dokunun",
    chapter: "Bölüm",
  },
  sq: {
    title: "Rruga e Shenjtë",
    subtitle: "Harta juaj Interaktive e Haxhit",
    resumeBtn: "Vazhdo Udhëzuesin ➔",
    completed: "Hapat e Kompletuar",
    steps: "Hapat",
    genderMale: "Haxhi Mashkull 👞",
    genderFemale: "Haxhi Femër 🌸",
    typeTamattu: "Haxhi Temettu' (Umre + Haxh)",
    typeQiran: "Haxhi Kuran (I Bashkuar)",
    typeIfrad: "Haxhi Ifrad (Vetëm Haxhi)",
    clickToFly: "Prekni mbi çdo hap për të hyrë në atë vendndodhje",
    chapter: "Kapitulli",
  }
};

const getStepIcon = (stageId: string, location: string) => {
  const idLower = stageId.toLowerCase();
  const locLower = location.toLowerCase();
  
  if (idLower.includes('preparation') || idLower.includes('departure') || idLower.includes('home')) {
    return '🏡';
  }
  if (idLower.includes('ihram') || idLower.includes('miqat')) {
    return '🌸';
  }
  if (idLower.includes('tawaf') || locLower.includes('kaaba') || locLower.includes('makkah')) {
    return '🕋';
  }
  if (locLower.includes('safa') || locLower.includes('marwa')) {
    return '⛰️';
  }
  if (idLower.includes('hair') || idLower.includes('shave') || idLower.includes('halq')) {
    return '✂️';
  }
  if (locLower.includes('mina')) {
    return '⛺';
  }
  if (locLower.includes('arafat') || locLower.includes('arafe')) {
    return '☀️';
  }
  if (locLower.includes('muzdalifah')) {
    return '🌌';
  }
  if (idLower.includes('rami') || idLower.includes('stoning') || idLower.includes('jamarat')) {
    return '🪨';
  }
  if (idLower.includes('sacrifice') || idLower.includes('qurbani') || idLower.includes('nahr')) {
    return '🐑';
  }
  return '📍';
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
}

export const JourneyMap: React.FC = () => {
  const language = useStore((state) => state.language);
  const profile = useStore((state) => state.profile);
  const currentStageIndex = useStore((state) => state.currentStageIndex);
  const setStageIndex = useStore((state) => state.setStageIndex);
  const setViewMode = useStore((state) => state.setViewMode);
  const toggleDrawer = useStore((state) => state.toggleDrawer);
  const completedItems = useStore((state) => state.completedItems);

  const t = mapTranslations[language];

  // Transition Orchestration
  const [transitionVisible, setTransitionVisible] = useState(false);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  // Floating background particles
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Filter stages based on user Hajj Type
  const allStages = hajjData[language].stages;
  const visibleStages = allStages.filter((stage) => {
    return !stage.hajjTypeFilter || (profile.hajjType && stage.hajjTypeFilter.includes(profile.hajjType));
  });

  // Calculate completed stages (if all checklists in a stage are completed, or by checklist items)
  const totalSteps = visibleStages.length;
  const completedStepsCount = visibleStages.filter((stage) => {
    const stageChecklists = stage.details.checklists || [];
    if (stageChecklists.length === 0) return false;
    return stageChecklists.every((_, idx) => completedItems[`${stage.id}-${idx}`]);
  }).length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.6,
        speedY: -(Math.random() * 0.15 + 0.05),
        opacity: Math.random() * 0.4 + 0.1
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let frameId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStepClick = (index: number) => {
    setTargetIndex(index);
    setTransitionVisible(true);
  };

  const handleFullyCovered = () => {
    if (targetIndex !== null) {
      setStageIndex(targetIndex);
      setViewMode('guide');
      toggleDrawer(false); // standard closed starting drawer
    }
  };

  // Re-order visible stages for winding landscape snake-zig-zag layout on desktop
  const getSnakeOrderedStages = () => {
    const cols = 3;
    const ordered: { stage: typeof visibleStages[0]; index: number; row: number; col: number }[] = [];
    
    visibleStages.forEach((stage, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      ordered.push({ stage, index, row, col });
    });

    return ordered;
  };

  const orderedStages = getSnakeOrderedStages();

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#051A11] to-[#0A3622] text-[#F9F6F0] overflow-y-auto pb-12 select-none font-sans">
      
      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70" />

      {/* Cloud Curtain Reveal Overlay */}
      <CloudTransition isVisible={transitionVisible} onFullyCovered={handleFullyCovered} />

      {/* Header Container */}
      <header className="relative w-full max-w-5xl mx-auto px-6 pt-8 pb-4 z-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-hajj-gold/15">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🕋</span>
            <h1 className="text-2xl font-black tracking-tight text-hajj-gold font-sans">{t.title}</h1>
          </div>
          <p className="text-xs text-[#F9F6F0]/60 mt-1 uppercase tracking-wider font-semibold">{t.subtitle}</p>
        </div>

        {/* Profile Badges and Actions */}
        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
          <div className="px-3 py-1.5 rounded-full bg-hajj-gold/10 border border-hajj-gold/20 text-[10px] uppercase font-bold tracking-wider text-hajj-gold">
            {profile.gender === 'female' ? t.genderFemale : t.genderMale}
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-wider text-[#F9F6F0]/80">
            {profile.hajjType === 'tamattu' ? t.typeTamattu : profile.hajjType === 'qiran' ? t.typeQiran : t.typeIfrad}
          </div>
          <button
            onClick={() => {
              setTargetIndex(currentStageIndex);
              setTransitionVisible(true);
            }}
            className="px-4 py-1.5 rounded-full bg-hajj-gold text-hajj-green hover:bg-white hover:text-hajj-green transition-all duration-300 text-xs font-black shadow-lg shadow-hajj-gold/10"
          >
            {t.resumeBtn}
          </button>
        </div>
      </header>

      {/* Progress & Helper Alert */}
      <div className="relative w-full max-w-5xl mx-auto px-6 mt-6 z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[#F9F6F0]/50 font-medium">
        <div className="flex items-center gap-2">
          <span>✨</span>
          <span>{t.clickToFly}</span>
        </div>
        <div className="flex items-center gap-4 bg-black/10 border border-white/5 rounded-full px-4 py-2 self-start sm:self-auto">
          <span>🎯 {t.completed}: <strong className="text-hajj-gold font-bold">{completedStepsCount}</strong> / {totalSteps} {t.steps}</span>
          <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-hajj-gold transition-all duration-500" 
              style={{ width: `${(completedStepsCount / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Path Map Container */}
      <main className="relative w-full max-w-5xl mx-auto px-6 mt-8 z-10">
        
        {/* MOBILE LAYOUT (Vertical Zig-Zag Timeline) */}
        <div className="block md:hidden relative w-full pl-6 border-l-2 border-dashed border-hajj-gold/25 space-y-6 py-4">
          {visibleStages.map((stage, index) => {
            const isCurrent = index === currentStageIndex;
            const icon = getStepIcon(stage.id, stage.location);
            const chapterName = chapterLabels[stage.chapter]?.[language] || "";
            const isFirstOfChapter = index === 0 || visibleStages[index - 1].chapter !== stage.chapter;

            return (
              <div key={stage.id} className="relative flex flex-col">
                
                {/* Chapter Heading Banner on Mobile */}
                {isFirstOfChapter && (
                  <div className="absolute top-[-36px] left-[-32px] right-0 flex items-center mb-6 pl-2 z-10">
                    <span className="bg-hajj-gold text-hajj-green px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest border border-[#F9F6F0]/20 shadow-md">
                      {chapterName}
                    </span>
                  </div>
                )}

                {/* Timeline active node bubble */}
                <div 
                  className={`absolute left-[-31px] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                    isCurrent 
                      ? 'bg-hajj-gold border-hajj-gold scale-125 shadow-[0_0_12px_#D4AF37]' 
                      : 'bg-hajj-green border-hajj-gold/50'
                  }`}
                >
                  {isCurrent && <div className="w-1.5 h-1.5 bg-hajj-green rounded-full" />}
                </div>

                {/* Step Card */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStepClick(index)}
                  className={`mt-4 w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                    isCurrent 
                      ? 'bg-[#F9F6F0]/95 border-hajj-gold text-hajj-navy shadow-xl shadow-hajj-gold/5' 
                      : 'bg-black/25 border-white/5 hover:border-white/15 hover:bg-black/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isCurrent ? 'text-hajj-gold bg-hajj-green px-2 py-0.5 rounded-md' : 'text-[#F9F6F0]/40'}`}>
                          {language === 'ar' ? 'الخطوة' : language === 'tr' ? 'Adım' : language === 'sq' ? 'Hapi' : 'Step'} {index + 1}
                        </span>
                        <span className={`text-[9px] font-semibold opacity-60 ${isCurrent ? 'text-hajj-navy' : 'text-[#F9F6F0]/40'}`}>
                          {stage.location}
                        </span>
                      </div>
                      <h3 className={`text-base font-extrabold leading-tight mt-1 ${isCurrent ? 'text-hajj-green' : 'text-[#F9F6F0]/90'}`}>
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed ${isCurrent ? 'text-hajj-navy/85' : 'text-[#F9F6F0]/50'}`}>
                    {stage.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP LAYOUT (Illuminated Snake Winding Grid) */}
        <div className="hidden md:block relative w-full py-6">
          
          {/* Beautiful flowing winding SVG thread connector */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Dynamically connected horizontal lines running row-by-row */}
              {Array.from({ length: Math.ceil(totalSteps / 3) }).map((_, r) => {
                const y = 80 + r * 220; // vertical center of each row
                return (
                  <g key={r}>
                    {/* Horizontal connector across the row */}
                    <line 
                      x1="12%" 
                      y1={y} 
                      x2="88%" 
                      y2={y} 
                      stroke="#D4AF37" 
                      strokeWidth="2" 
                      strokeDasharray="6 8" 
                    />
                    
                    {/* Curve connector at row transitions */}
                    {r < Math.ceil(totalSteps / 3) - 1 && (
                      r % 2 === 0 ? (
                        /* Right curve down */
                        <path 
                          d={`M 88% ${y} C 98% ${y}, 98% ${y + 220}, 88% ${y + 220}`} 
                          fill="none" 
                          stroke="#D4AF37" 
                          strokeWidth="2" 
                          strokeDasharray="6 8" 
                        />
                      ) : (
                        /* Left curve down */
                        <path 
                          d={`M 12% ${y} C 2% ${y}, 2% ${y + 220}, 12% ${y + 220}`} 
                          fill="none" 
                          stroke="#D4AF37" 
                          strokeWidth="2" 
                          strokeDasharray="6 8" 
                        />
                      )
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 gap-y-24 gap-x-12 relative z-10 px-4">
            {orderedStages.map(({ stage, index, row, col }) => {
              // Standard game snake direction flip: rows 1, 3, 5 are rendered right-to-left
              const isReversedRow = row % 2 === 1;
              
              // Map visual order inside grid-cols-3:
              // row 0: col 0, 1, 2  (0, 1, 2)
              // row 1: col 2, 1, 0  (3, 4, 5) -> flips order for grid placement
              const gridColumn = isReversedRow ? (3 - col) : (col + 1);

              const isCurrent = index === currentStageIndex;
              const icon = getStepIcon(stage.id, stage.location);
              const chapterName = chapterLabels[stage.chapter]?.[language] || "";
              const isFirstOfChapter = index === 0 || visibleStages[index - 1].chapter !== stage.chapter;

              return (
                <div 
                  key={stage.id} 
                  style={{ gridColumnStart: gridColumn }}
                  className="relative flex flex-col justify-center min-h-[160px]"
                >
                  {/* Chapter Ribbon */}
                  {isFirstOfChapter && (
                    <div className="absolute top-[-36px] inset-x-0 flex justify-center z-10">
                      <span className="bg-hajj-gold text-hajj-green px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest border border-[#F9F6F0]/20 shadow-md">
                        {chapterName}
                      </span>
                    </div>
                  )}

                  {/* Dynamic hovering game-style card */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.04, 
                      y: -6,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
                    }}
                    onClick={() => handleStepClick(index)}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 text-left h-full flex flex-col justify-between ${
                      isCurrent 
                        ? 'bg-[#F9F6F0]/95 border-hajj-gold text-hajj-navy shadow-2xl shadow-hajj-gold/15' 
                        : 'bg-[#061D13]/70 backdrop-blur-md border-white/5 hover:border-hajj-gold/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${isCurrent ? 'bg-hajj-green text-hajj-gold' : 'bg-white/5 text-[#F9F6F0]/50 border border-white/5'}`}>
                          {language === 'ar' ? 'الخطوة' : language === 'tr' ? 'Adım' : language === 'sq' ? 'Hapi' : 'Step'} {index + 1}
                        </span>
                        <span className={`text-[9px] font-bold ${isCurrent ? 'text-hajj-green' : 'text-hajj-gold'}`}>
                          {stage.location}
                        </span>
                      </div>

                      <div className="flex items-start gap-3 mt-3">
                        <span className="text-3xl flex-shrink-0">{icon}</span>
                        <h3 className={`text-base font-extrabold leading-snug tracking-tight ${isCurrent ? 'text-hajj-navy' : 'text-[#F9F6F0]/90 hover:text-hajj-gold'}`}>
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    <p className={`text-xs mt-3 leading-relaxed flex-grow line-clamp-2 ${isCurrent ? 'text-hajj-navy/80' : 'text-[#F9F6F0]/50'}`}>
                      {stage.description}
                    </p>

                    {/* Completion indicator inside card bottom */}
                    <div className="mt-4 flex items-center justify-between border-t border-current/10 pt-2 text-[9px] uppercase tracking-wider font-bold">
                      <span className={isCurrent ? 'text-hajj-navy/60' : 'text-[#F9F6F0]/40'}>
                        {isCurrent ? 'Active Location' : 'Tap to Travel'}
                      </span>
                      <span>
                        {isCurrent ? '🕌' : '➔'}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { hajjData } from '../data/hajjData';

const mapTranslations = {
  en: {
    title: "The Peaceful Path",
    subtitle: "Your Illustrated Hajj Journey Scroll",
    resumeBtn: "Resume Guide ➔",
    completed: "Completed Steps",
    steps: "Steps",
    genderMale: "Male Pilgrim 👞",
    genderFemale: "Female Pilgrim 🌸",
    typeTamattu: "Hajj al-Tamattu' (Umrah + Hajj)",
    typeQiran: "Hajj al-Qiran (Combined)",
    typeIfrad: "Hajj al-Ifrad (Hajj Only)",
    clickToFly: "Tap any circle to enter that location",
    chapter: "Chapter",
  },
  ar: {
    title: "الصراط الهادئ",
    subtitle: "مخطوطة رحلة الحج التفاعلية",
    resumeBtn: "استئناف الدليل ➔",
    completed: "الخطوات المكتملة",
    steps: "الخطوات",
    genderMale: "حاج 👞",
    genderFemale: "حاجة 🌸",
    typeTamattu: "حج التمتع (عمرة + حج)",
    typeQiran: "حج القران (جمع)",
    typeIfrad: "حج الإفراد (حج فقط)",
    clickToFly: "اضغط على أي دائرة للدخول إلى الموقع",
    chapter: "الفصل",
  },
  tr: {
    title: "Huzur Yolu",
    subtitle: "İnteraktif Hac Yolculuğu Parşömeni",
    resumeBtn: "Rehbere Dön ➔",
    completed: "Tamamlanan Adımlar",
    steps: "Adımlar",
    genderMale: "Erkek Hacı 👞",
    genderFemale: "Kadın Hacı 🌸",
    typeTamattu: "Temettu Haccı (Umre + Hac)",
    typeQiran: "Kıran Haccı (Birleşik)",
    typeIfrad: "İfrad Haccı (Sadece Hac)",
    clickToFly: "Bölgeye girmek için istediğiniz daireye dokunun",
    chapter: "Bölüm",
  },
  sq: {
    title: "Rruga e Paqes",
    subtitle: "Rukola juaj Interaktive e Haxhit",
    resumeBtn: "Vazhdo Udhëzuesin ➔",
    completed: "Hapat e Kompletuar",
    steps: "Hapat",
    genderMale: "Haxhi Mashkull 👞",
    genderFemale: "Haxhi Femër 🌸",
    typeTamattu: "Haxhi Temettu' (Umre + Haxh)",
    typeQiran: "Haxhi Kuran (I Bashkuar)",
    typeIfrad: "Haxhi Ifrad (Vetëm Haxhi)",
    clickToFly: "Prekni mbi çdo rreth për të hyrë në atë vendndodhje",
    chapter: "Kapitulli",
  }
};

const phaseTranslations = {
  en: {
    kaaba: "Kaaba",
    safaMarwa: "Safa & Marwa",
    minaCamp: "Mina Camp",
    mountArafat: "Mount Arafat",
    jamaratValley: "Jamarat Valley"
  },
  ar: {
    kaaba: "الكعبة",
    safaMarwa: "الصفا والمروة",
    minaCamp: "مخيم منى",
    mountArafat: "جبل عرفات",
    jamaratValley: "وادي الجمرات"
  },
  tr: {
    kaaba: "Kâbe",
    safaMarwa: "Safa & Merve",
    minaCamp: "Mina Kampı",
    mountArafat: "Arafat Dağı",
    jamaratValley: "Cemarat Vadisi"
  },
  sq: {
    kaaba: "Qabeja",
    safaMarwa: "Safa & Marva",
    minaCamp: "Kampi në Mina",
    mountArafat: "Mali i Arafatit",
    jamaratValley: "Lugina e Xhemaratit"
  }
};;


const kaabaIcon = (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-none stroke-hajj-gold stroke-[1.8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
    <rect x="4" y="5" width="16" height="14" rx="1.5" />
    <line x1="4" y1="10" x2="20" y2="10" strokeDasharray="1.5 1.5" />
    <rect x="10" y="12" width="4" height="7" rx="0.5" />
  </svg>
);

const mountainsIcon = (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-none stroke-hajj-gold stroke-[1.8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
    <path d="M3 20L9 8L15 17L18 12L21 20H3Z" />
  </svg>
);


const tentsIcon = (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-none stroke-hajj-gold stroke-[1.8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
    <path d="M12 4L3 15H21L12 4Z" />
    <line x1="12" y1="4" x2="12" y2="15" />
    <path d="M8 15C8 11 16 11 16 15" />
  </svg>
);

const handsIcon = (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-none stroke-hajj-gold stroke-[1.8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
    <path d="M12 2C8 6 6 9 6 12C6 16 9 19 12 21C15 19 18 16 18 12C18 9 16 6 12 2Z" />
    <path d="M12 7V17" />
  </svg>
);

const pebbleIcon = (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-none stroke-hajj-gold stroke-[1.8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
    <rect x="10" y="4" width="4" height="16" rx="1" />
    <circle cx="12" cy="7" r="1" className="fill-hajj-gold" />
    <circle cx="12" cy="12" r="1" className="fill-hajj-gold" />
    <circle cx="12" cy="17" r="1" className="fill-hajj-gold" />
  </svg>
);



// 5-Point Coordinate Map (enforcing 1:2 un-stretched aspect ratio alignment on the road)
const pathCoordinates = [
  { x: 45.5, y: 27.5 },  // Kaaba (on the road loop below Kaaba)
  { x: 57.0, y: 29.5 },  // Safa & Marwa (on the road loop below Safa & Marwa)
  { x: 61.0, y: 48.5 },  // Mina Camp (on the road loop to the right of Mina Camp)
  { x: 42.0, y: 64.0 },  // Mount Arafat (on the road loop to the left of Mount Arafat)
  { x: 56.0, y: 93.0 }   // Jamarat Valley (on the road loop to the right of Jamarat Valley)
];

const mapPhases = [
  {
    id: 'phase-kaaba',
    titleKey: 'kaaba' as const,
    icon: kaabaIcon,
    x: 45.5,
    y: 27.5,
    entryStageId: 'step-01-preparation'
  },
  {
    id: 'phase-safa-marwa',
    titleKey: 'safaMarwa' as const,
    icon: mountainsIcon,
    x: 57.0,
    y: 29.5,
    entryStageId: 'step-04-safa-marwa'
  },
  {
    id: 'phase-mina',
    titleKey: 'minaCamp' as const,
    icon: tentsIcon,
    x: 61.0,
    y: 48.5,
    entryStageId: 'step-08-mina'
  },
  {
    id: 'phase-arafat',
    titleKey: 'mountArafat' as const,
    icon: handsIcon,
    x: 42.0,
    y: 64.0,
    entryStageId: 'step-09-arafat'
  },
  {
    id: 'phase-jamarat',
    titleKey: 'jamaratValley' as const,
    icon: pebbleIcon,
    x: 56.0,
    y: 93.0,
    entryStageId: 'step-11-rami-aqaba'
  }
];

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
}

interface JourneyMapProps {
  onSelectStage: (index: number) => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({ onSelectStage }) => {
  const language = useStore((state) => state.language);
  const profile = useStore((state) => state.profile);
  const currentStageIndex = useStore((state) => state.currentStageIndex);
  const completedItems = useStore((state) => state.completedItems);
  const viewMode = useStore((state) => state.viewMode);

  const t = mapTranslations[language];

  // Transition Orchestration
  const [mapZoomed, setMapZoomed] = useState(false);
  const [cameraOrigin, setCameraOrigin] = useState({ x: 50, y: 10 });

  // Floating background particles
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Filter stages based on Hajj Type
  const allStages = hajjData[language].stages;
  const visibleStages = allStages.filter((stage) => {
    return !stage.hajjTypeFilter || (profile.hajjType && stage.hajjTypeFilter.includes(profile.hajjType));
  });

  // Calculate completed stages
  const totalSteps = visibleStages.length;
  const completedStepsCount = visibleStages.filter((stage) => {
    const stageChecklists = stage.details.checklists || [];
    if (stageChecklists.length === 0) return false;
    return stageChecklists.every((_, idx) => completedItems[`${stage.id}-${idx}`]);
  }).length;

  useEffect(() => {
    if (viewMode !== 'map') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.1 + 0.03),
        opacity: Math.random() * 0.3 + 0.1
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
        ctx.fillStyle = 'rgba(212, 175, 55, 0.45)';
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
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === 'map') {
      setMapZoomed(false);
    }
  }, [viewMode]);

  const handleStepClick = (targetIndex: number, phase: typeof mapPhases[0]) => {
    setCameraOrigin({ x: phase.x, y: phase.y });
    setMapZoomed(true);
    onSelectStage(targetIndex);
  };

  // Generate dynamic gold thread winding path SVG definition for the 5 points
  const dPath = pathCoordinates.map((coords, index) => {
    return `${index === 0 ? 'M' : 'L'} ${coords.x} ${coords.y}`;
  }).join(' ');

  return (
    <div className="fixed inset-0 w-full h-full bg-[#030f07] text-[#F9F6F0] z-10 select-none font-sans overflow-hidden flex flex-col justify-end">
      
      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />
      <div className="w-full h-full overflow-y-auto pt-24 pb-12 scroll-smooth custom-scrollbar relative z-10 max-w-[450px] mx-auto flex flex-col">
        
        {/* Header Block inside Scrollable Container */}
        <header className="px-6 pb-6 text-center z-20">
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-xl">🧭</span>
            <h1 className="text-xl font-arabic font-extrabold tracking-tight text-hajj-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{t.title}</h1>
          </div>
          <p className="text-[9px] text-hajj-gold/75 uppercase tracking-[0.25em] font-black mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{t.subtitle}</p>

          {/* Quick Profile Summary */}
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            <span className="text-[8px] font-black uppercase tracking-wider bg-hajj-gold/15 border border-hajj-gold/35 text-hajj-gold px-2 py-0.5 rounded-full backdrop-blur-md">
              {profile.gender === 'female' ? t.genderFemale : t.genderMale}
            </span>
            <span className="text-[8px] font-black uppercase tracking-wider bg-black/40 border border-white/10 text-[#F9F6F0]/75 px-2 py-0.5 rounded-full backdrop-blur-md">
              {profile.hajjType === 'tamattu' ? 'Tamattu' : profile.hajjType === 'qiran' ? 'Qiran' : 'Ifrad'}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 bg-black/35 border border-white/5 backdrop-blur-md rounded-full px-3 py-1.5 max-w-[220px] mx-auto text-[9px] font-bold text-[#F9F6F0]/50 shadow-md">
            <span>🎯 {completedStepsCount}/{totalSteps} {t.steps}</span>
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-hajj-gold transition-all duration-500 animate-pulse" 
                style={{ width: `${(completedStepsCount / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </header>

        {/* Dynamic Helper Text */}
        <div className="text-center text-[9px] font-black text-hajj-gold/45 uppercase tracking-[0.2em] py-2 flex items-center justify-center gap-1.5 select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          <span>✨</span>
          <span>{t.clickToFly}</span>
        </div>

        {/* Illustrated Parchment Scroll Map Path */}
        <motion.div 
          animate={{ 
            scale: mapZoomed ? 3.5 : 1, 
            x: mapZoomed ? `${(50 - cameraOrigin.x) * 2.5}%` : '0%',
            y: mapZoomed ? `${(45 - cameraOrigin.y) * 1.5}%` : '0%',
            filter: mapZoomed ? 'blur(6px)' : 'blur(0px)',
            opacity: mapZoomed ? 0.35 : 1,
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="relative flex-shrink-0 w-full aspect-[1/2] border-[12px] border-hajj-green outline outline-2 outline-hajj-gold/60 rounded-3xl overflow-hidden shadow-[inset_0_0_80px_rgba(10,54,34,0.15),0_15px_40px_rgba(0,0,0,0.5)] z-10"
        >
          {/* Background Map Image (User's Beautiful Illustrated Parchment Map) */}
          <img 
            src="/images/hajj_map_clean.webp" 
            alt="Illustrated Hajj Journey Scroll"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0" 
          />

          {/* Paper noise texture overlay for vintage antiqued look */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,54,34,0.04)_100%)] opacity-70 pointer-events-none z-10" />

          {/* Winding Golden Thread dashed Connector SVG (subtly layered to reinforce path) */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-70">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path 
                d={dPath} 
                stroke="#b8902a" 
                strokeWidth="0.4" 
                strokeDasharray="1 1.2" 
                fill="none" 
                className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              />
              
              {/* Midpoint Directional Chevrons */}
              {pathCoordinates.map((_, index) => {
                if (index === 0) return null;
                const p1 = pathCoordinates[index - 1];
                const p2 = pathCoordinates[index];
                
                const mx = (p1.x + p2.x) / 2;
                const my = (p1.y + p2.y) / 2;
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
                
                return (
                  <g key={`arrow-${index}`} transform={`translate(${mx}, ${my}) rotate(${angle})`}>
                    <path 
                      d="M -0.8 -0.8 L 0.8 0 L -0.8 0.8 Z" 
                      fill="#b8902a" 
                      className="opacity-80 drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)]"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Clicking Nodes Layer */}
          {mapPhases.map((phase, index) => {
            const label = phaseTranslations[language][phase.titleKey];
            
            // Find target stage index inside visibleStages dynamically at runtime
            const stageIndex = visibleStages.findIndex(s => s.id === phase.entryStageId);
            const targetIndex = stageIndex !== -1 ? stageIndex : 0;
            const isCurrentPhaseActive = currentStageIndex >= targetIndex && (index === 4 || currentStageIndex < (mapPhases[index + 1] ? visibleStages.findIndex(s => s.id === mapPhases[index + 1].entryStageId) : 99));

            return (
              <div 
                key={phase.id} 
                style={{ 
                  position: 'absolute', 
                  left: `${phase.x}%`, 
                  top: `${phase.y}%`, 
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleStepClick(targetIndex, phase)}
                  className="relative flex items-center cursor-pointer group"
                >
                  
                  {/* Frosted Manuscript Paper Tag Label */}
                  <div 
                    className="absolute top-[54px] left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none select-none transition-all duration-300 bg-[#F9F6F0]/90 border border-hajj-gold/30 rounded-md px-2.5 py-1 shadow-sm backdrop-blur-sm flex items-center justify-center"
                  >
                    <h4 
                      className={`text-[9.5px] font-arabic font-semibold italic tracking-tight leading-snug text-center ${
                        isCurrentPhaseActive 
                          ? 'text-hajj-green font-bold scale-102' 
                          : 'text-[#3E4F42] group-hover:text-hajj-green transition-colors duration-300'
                      }`}
                    >
                      {label}
                    </h4>
                  </div>

                  {/* Elegant Gilded Circular Node - Deep Emerald Green with polished Gold rims (larger w-[46px] h-[46px] for 5 medallions) */}
                  <div 
                    className={`relative w-[46px] h-[46px] rounded-full border-[2.2px] bg-[#0A3622] flex items-center justify-center shadow-[0_4px_10px_rgba(10,54,34,0.35)] transition-all duration-300 ${
                      isCurrentPhaseActive 
                        ? 'border-hajj-gold shadow-[0_0_15px_#D4AF37] scale-112' 
                        : 'border-hajj-gold/55 group-hover:border-hajj-gold group-hover:shadow-[0_0_8px_rgba(212,175,55,0.35)]'
                    }`}
                  >
                    {/* Golden Icon */}
                    <div className="w-[24px] h-[24px] flex items-center justify-center opacity-90">
                      {phase.icon}
                    </div>
                  </div>

                  {/* Circular Step Number Badge */}
                  <div 
                    className={`absolute top-[-6px] left-1/2 -translate-x-1/2 text-[5.5px] font-sans font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border shadow-sm transition-colors ${
                      isCurrentPhaseActive 
                        ? 'bg-hajj-gold text-hajj-green border-white/20' 
                        : 'bg-[#0A3622] text-hajj-gold border-hajj-gold/30'
                    }`}
                  >
                    {index + 1}
                  </div>

                </motion.div>
              </div>
            );
          })}

        </motion.div>

        {/* Floating Resume Journey Anchor */}
        <div className="w-full px-6 pt-6 pb-4 text-center z-10 mt-auto">
          <button
            onClick={() => onSelectStage(currentStageIndex)}
            className="w-full py-3.5 rounded-2xl bg-hajj-gold text-hajj-green hover:bg-[#F9F6F0] hover:text-hajj-green transition-all duration-300 text-xs font-black shadow-lg shadow-hajj-gold/15 active:scale-[0.98]"
          >
            {t.resumeBtn}
          </button>
        </div>

      </div>

    </div>
  );
};

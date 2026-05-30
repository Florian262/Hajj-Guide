import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { hajjData } from '../data/hajjData';
import { getVisibleStages } from '../utils/stageSelectors';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  angle: number;
  angleSpeed: number;
  color: string;
}

type LiturgicalEnv = 'divine-sun' | 'arafat-sunset' | 'muzdalifah-night' | 'mina-lantern';

const getLiturgicalEnv = (stageId: string): LiturgicalEnv => {
  if (stageId === 'step-09-arafat') return 'arafat-sunset';
  if (stageId === 'step-10-muzdalifah') return 'muzdalifah-night';
  if (
    stageId === 'step-08-mina' ||
    stageId === 'step-13-shave' ||
    stageId === 'step-15-rami-day1' ||
    stageId === 'step-16-mina-night' ||
    stageId === 'step-17-rami-day2'
  ) {
    return 'mina-lantern';
  }
  return 'divine-sun';
};

const BackgroundViewer: React.FC = () => {
  const currentStageIndex = useStore((state) => state.currentStageIndex);
  const language = useStore((state) => state.language);
  const isDrawerOpen = useStore((state) => state.isDrawerOpen);
  const theme = useStore((state) => state.theme);
  const viewMode = useStore((state) => state.viewMode);
  
  // Use profile to determine effective stage list
  const profile = useStore((state) => state.profile);
  const visibleStages = getVisibleStages(hajjData[language].stages, profile.hajjType);

  const currentStage = visibleStages[currentStageIndex] ?? visibleStages[0];
  const isDark = theme === 'dark';
  const liturgicalEnv = getLiturgicalEnv(currentStage?.id ?? '');

  // Liturgical Overlay styling definitions based on active step environment
  let flareClass = '';
  let bottomBlendClass = '';

  switch (liturgicalEnv) {
    case 'arafat-sunset':
      flareClass = 'bg-[radial-gradient(circle_at_right,rgba(230,120,40,0.22),rgba(212,175,55,0.08)_50%,transparent_80%)]';
      bottomBlendClass = isDark
        ? 'from-black/60 via-[#e67828]/12 to-transparent'
        : 'from-hajj-alabaster/30 via-[#e67828]/5 to-transparent';
      break;
    case 'muzdalifah-night':
      flareClass = 'bg-[radial-gradient(circle_at_top_left,rgba(100,180,255,0.18),transparent_55%)]';
      bottomBlendClass = isDark
        ? 'from-black/80 via-[#0c1f24]/20 to-transparent'
        : 'from-hajj-alabaster/30 via-[#0c1f24]/5 to-transparent';
      break;
    case 'mina-lantern':
      flareClass = 'bg-[radial-gradient(circle_at_bottom,rgba(245,158,11,0.15),transparent_70%)]';
      bottomBlendClass = isDark
        ? 'from-black/70 via-[#f59e0b]/15 to-transparent'
        : 'from-hajj-alabaster/30 via-[#f59e0b]/5 to-transparent';
      break;
    case 'divine-sun':
    default:
      flareClass = 'bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.20),transparent_60%)]';
      bottomBlendClass = isDark
        ? 'from-black/55 via-[#061D13]/10 to-transparent'
        : 'from-hajj-alabaster/15 to-transparent';
      break;
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High-performance canvas particle engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewMode === 'map' || isDrawerOpen) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Detect if this is a night stage
    const isNightStage = currentStage.id === 'step-10-muzdalifah' || currentStage.id === 'step-16-mina-night';

    // Particle customization
    const particleCount = isNightStage ? 35 : 25;
    const particles: Particle[] = [];

    const getParticleColor = () => {
      if (isNightStage) {
        // Twinkling starlight colors: silver/blue-white/soft-gold (highly bright & saturated)
        const rand = Math.random();
        if (rand < 0.4) return 'rgba(224, 242, 254, 0.9)'; // bright blue-white
        if (rand < 0.7) return 'rgba(255, 255, 255, 0.95)'; // bright silver
        return 'rgba(212, 175, 55, 0.85)'; // rich gold
      } else {
        // Warm golden sun-dust colors
        return Math.random() < 0.6 ? 'rgba(212, 175, 55, 0.75)' : 'rgba(245, 217, 122, 0.8)';
      }
    };

    // Initialize particles (making them smaller & more concentrated)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isNightStage ? 0.9 : 1.4) + 0.4,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(Math.random() * 0.35 + 0.1), // float upwards
        opacity: Math.random() * 0.7 + 0.1,
        opacitySpeed: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.02 - 0.01,
        color: getParticleColor()
      });
    }

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Apply sinusoidal sway and vertical float
        p.angle += p.angleSpeed;
        p.x += p.speedX + Math.sin(p.angle) * 0.12;
        p.y += p.speedY;

        // Twinkle/pulse opacity
        p.opacity += p.opacitySpeed;
        if (p.opacity > 0.85 || p.opacity < 0.1) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        const alpha = Math.max(0, Math.min(1, p.opacity));
        const glowScale = isNightStage ? 2.3 : 1.8;

        // 1. Draw soft outer halo glow (highly concentrated & brighter)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * glowScale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * (isNightStage ? 0.40 : 0.30);
        ctx.fill();

        // 2. Draw sharp inner colored core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.9;
        ctx.fill();

        // 3. Draw hot-white concentrated center (AAA diamond sparkle effect)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = alpha * 1.0;
        ctx.fill();

        // Reset particle if it floats off screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.6 + 0.2;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentStage.id, currentStageIndex, viewMode, isDrawerOpen]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            // Slow diagonally panning Ken Burns zoom
            scale: isDrawerOpen ? 1.02 : [1.02, 1.08],
            x: isDrawerOpen ? 0 : [0, -6],
            y: isDrawerOpen ? 0 : [0, -3],
            // GPU-accelerated lens focus blur shift when bottom drawer opens/closes
            filter: isDrawerOpen ? 'blur(5px)' : 'blur(0px)',
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1.2, ease: 'easeInOut' },
            filter: { duration: 0.6, ease: 'easeInOut' },
            scale: isDrawerOpen
              ? { duration: 0.5, ease: 'easeOut' }
              : { duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
            x: isDrawerOpen ? { duration: 0.5 } : { duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
            y: isDrawerOpen ? { duration: 0.5 } : { duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentStage.image}
            alt={currentStage.title}
            className="w-full h-full object-cover brightness-[1.14] contrast-[1.03] transition-all duration-1000"
          />

          {/* Layer 1: Dynamic Liturgical Radial Flare overlay */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${flareClass}`} />

          {/* Layer 2: Dynamic Liturgical Theme-aware bottom-up blend overlay */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 bg-gradient-to-t ${bottomBlendClass}`} />
        </motion.div>
      </AnimatePresence>

      {/* Layer 3: High-performance floating starlight / dust canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
    </div>
  );
};

export default BackgroundViewer;

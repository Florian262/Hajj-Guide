import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { hajjData } from '../data/hajjData';

const BackgroundViewer: React.FC = () => {
  const currentStageIndex = useStore((state) => state.currentStageIndex);
  const language = useStore((state) => state.language);
  const isDrawerOpen = useStore((state) => state.isDrawerOpen);
  
  // Use profile to determine effective stage list (same filtering as BottomSheet)
  const profile = useStore((state) => state.profile);
  const allStages = hajjData[language].stages;
  const visibleStages = allStages.filter((stage) => {
    if (!stage.hajjTypeFilter) return true;
    return stage.hajjTypeFilter.includes(profile.hajjType ?? 'tamattu');
  });

  const currentStage = visibleStages[currentStageIndex] ?? visibleStages[0];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            // Freeze the Ken Burns zoom when the drawer is open.
            // This eliminates the GPU bottleneck: when backdrop-blur is active
            // the phone doesn't need to recalculate blur on every animation frame.
            scale: isDrawerOpen ? 1 : [1, 1.05],
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1.5 },
            scale: isDrawerOpen
              ? { duration: 0.4, ease: 'easeOut' } // smooth freeze
              : { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentStage.image}
            alt={currentStage.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundViewer;

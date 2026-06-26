import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CloudTransitionProps {
  isVisible: boolean;
}

export const CloudTransition: React.FC<CloudTransitionProps> = ({ isVisible }) => {
  const cloudAssetUrl = '/images/cloud.webp';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="absolute inset-0 w-full h-full z-50 overflow-hidden pointer-events-none select-none bg-black/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* LAYER 1: The Base Mist (Diving Forward & Counter-Clockwise) */}
          <motion.img 
            src={cloudAssetUrl} 
            alt="Transition Mist Base" 
            className="absolute object-cover cloud-blend-screen"
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1.5, rotate: -15 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }} // Custom cubic bezier for a heavy plunge feel
            style={{ 
              left: "-20%",
              top: "-20%",
              width: "140%",
              height: "140%",
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d'
            }}
          />

          {/* LAYER 2: The Foreground Break (Diving Faster & Clockwise) */}
          <motion.img 
            src={cloudAssetUrl} 
            alt="Transition Mist Foreground" 
            className="absolute object-cover cloud-blend-screen scale-y-[-1]" // Flips image vertically for variety
            initial={{ scale: 0.7, rotate: 45 }}
            animate={{ scale: 1.6, rotate: 90 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }} // Snappy exit ease
            style={{ 
              left: "-30%",
              top: "-30%",
              width: "160%",
              height: "160%",
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d'
            }}
          />

          {/* LAYER 3: The Solid UI Mask */}
          {/* This matching Alabaster block flashes briefly at peak screen coverage (0.4s) to hide the state swap */}
          <motion.div 
            className="absolute inset-0 bg-[#F9F6F0]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.95, 0] }}
            transition={{ times: [0, 0.35, 0.55, 1], duration: 1.1, ease: "linear" }}
            style={{ 
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

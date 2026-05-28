import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CloudTransitionProps {
  isVisible: boolean;
  onFullyCovered?: () => void;
}

export const CloudTransition: React.FC<CloudTransitionProps> = ({ isVisible, onFullyCovered }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 w-full h-full z-50 flex pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.8 } }}
        >
          {/* Left Cloud Curtain */}
          <motion.div
            className="w-1/2 h-full bg-gradient-to-r from-hajj-green via-[#08301e] to-[#0A3622] border-r-2 border-hajj-gold/30 relative flex items-center justify-end overflow-hidden"
            initial={{ x: '-100%' }}
            animate={{ 
              x: '0%',
              transition: { type: 'spring', damping: 20, stiffness: 60 }
            }}
            exit={{ 
              x: '-100%',
              transition: { type: 'spring', damping: 22, stiffness: 50, delay: 0.2 }
            }}
            onAnimationComplete={(definition: any) => {
              // Trigger when left curtain finishes closing to center
              if (definition && typeof definition === 'object' && definition.x === '0%' && onFullyCovered) {
                setTimeout(onFullyCovered, 150);
              } else if (definition === '0%' && onFullyCovered) { // fallback
                setTimeout(onFullyCovered, 150);
              }
            }}
          >
            {/* Fine geometric arabesque star pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Premium Gold Arabesque Cloud Decal (SVG) */}
            <div className="absolute right-[-40px] top-1/4 w-96 h-96 opacity-20 pointer-events-none select-none text-hajj-gold">
              <svg viewBox="0 0 200 200" className="w-full h-full fill-current">
                <path d="M 0 100 C 20 70, 60 70, 80 100 C 100 80, 140 80, 160 110 C 180 100, 200 120, 180 140 C 190 160, 170 180, 150 170 C 130 190, 90 190, 70 170 C 50 180, 20 160, 30 140 C 10 130, -10 110, 0 100 Z" />
              </svg>
            </div>
            
            <div className="absolute right-[-20px] bottom-1/4 w-80 h-80 opacity-20 pointer-events-none select-none text-hajj-gold">
              <svg viewBox="0 0 200 200" className="w-full h-full fill-current scale-y-[-1]">
                <path d="M 0 100 C 20 70, 60 70, 80 100 C 100 80, 140 80, 160 110 C 180 100, 200 120, 180 140 C 190 160, 170 180, 150 170 C 130 190, 90 190, 70 170 C 50 180, 20 160, 30 140 C 10 130, -10 110, 0 100 Z" />
              </svg>
            </div>

            {/* Traditional Cloud golden trailing mist ribbon */}
            <div className="absolute right-0 top-1/2 w-48 h-[1px] bg-gradient-to-l from-hajj-gold/50 to-transparent" />
          </motion.div>

          {/* Right Cloud Curtain */}
          <motion.div
            className="w-1/2 h-full bg-gradient-to-l from-hajj-green via-[#08301e] to-[#0A3622] border-l-2 border-hajj-gold/30 relative flex items-center justify-start overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ 
              x: '0%',
              transition: { type: 'spring', damping: 20, stiffness: 60 }
            }}
            exit={{ 
              x: '100%',
              transition: { type: 'spring', damping: 22, stiffness: 50, delay: 0.2 }
            }}
          >
            {/* Fine geometric arabesque star pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Premium Gold Arabesque Cloud Decal (SVG) */}
            <div className="absolute left-[-40px] top-1/3 w-96 h-96 opacity-20 pointer-events-none select-none text-hajj-gold">
              <svg viewBox="0 0 200 200" className="w-full h-full fill-current scale-x-[-1]">
                <path d="M 0 100 C 20 70, 60 70, 80 100 C 100 80, 140 80, 160 110 C 180 100, 200 120, 180 140 C 190 160, 170 180, 150 170 C 130 190, 90 190, 70 170 C 50 180, 20 160, 30 140 C 10 130, -10 110, 0 100 Z" />
              </svg>
            </div>

            <div className="absolute left-[-20px] bottom-1/5 w-72 h-72 opacity-20 pointer-events-none select-none text-hajj-gold">
              <svg viewBox="0 0 200 200" className="w-full h-full fill-current scale-y-[-1] scale-x-[-1]">
                <path d="M 0 100 C 20 70, 60 70, 80 100 C 100 80, 140 80, 160 110 C 180 100, 200 120, 180 140 C 190 160, 170 180, 150 170 C 130 190, 90 190, 70 170 C 50 180, 20 160, 30 140 C 10 130, -10 110, 0 100 Z" />
              </svg>
            </div>

            {/* Traditional Cloud golden trailing mist ribbon */}
            <div className="absolute left-0 top-1/2 w-48 h-[1px] bg-gradient-to-r from-hajj-gold/50 to-transparent" />
          </motion.div>

          {/* Central Sacred Reveal Shield */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none select-none z-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.95,
                transition: { delay: 0.25, duration: 0.4, ease: 'easeOut' }
              }}
              exit={{ 
                scale: 0.6, 
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              className="bg-[#F9F6F0] border-2 border-hajj-gold px-7 py-6 rounded-full shadow-[0_15px_50px_rgba(0,0,0,0.5)] flex items-center justify-center flex-col min-w-[150px] min-h-[150px]"
            >
              {/* Islamic geometric Star / Crescent graphic */}
              <div className="w-12 h-12 flex items-center justify-center text-hajj-green mb-1">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d="M12 2L14.8 8.6L22 9.2L16.5 13.8L18.2 20.8L12 17L5.8 20.8L7.5 13.8L2 9.2L9.2 8.6L12 2Z" className="stroke-hajj-gold stroke-2" />
                </svg>
              </div>
              <span className="text-hajj-green font-black text-xs uppercase tracking-widest mt-1">HAJJ GUIDE</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

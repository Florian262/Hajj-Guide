import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import glossaryData from '../data/glossary.json';

type GlossaryData = {
  [termKey: string]: {
    [lang: string]: {
      term: string;
      definition: string;
    };
  };
};

const glossary = glossaryData as GlossaryData;

/**
 * GlossaryModal — Glassmorphic frosted overlay dialog.
 * - Mounted at root in App.tsx at z-[100] (above everything including onboarding z-[60])
 * - Closes on: backdrop tap, Escape key, or close button
 * - RTL-aware for Arabic
 */
const GlossaryModal: React.FC = () => {
  const { activeGlossaryTerm, setActiveGlossaryTerm, language, theme } = useStore();
  const dialogRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';
  const isRTL = language === 'ar';

  // Close on Escape key
  useEffect(() => {
    if (!activeGlossaryTerm) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveGlossaryTerm(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeGlossaryTerm, setActiveGlossaryTerm]);

  // Trap focus inside the dialog when open
  useEffect(() => {
    if (activeGlossaryTerm && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [activeGlossaryTerm]);

  const termData = activeGlossaryTerm
    ? glossary[activeGlossaryTerm]?.[language] ?? glossary[activeGlossaryTerm]?.['en']
    : null;

  return (
    <AnimatePresence>
      {activeGlossaryTerm && termData && (
        <>
          {/* Backdrop */}
          <motion.div
            key="glossary-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveGlossaryTerm(null)}
            aria-hidden="true"
          />

          {/* Dialog Card */}
          <motion.div
            key="glossary-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="glossary-term-title"
            aria-describedby="glossary-term-definition"
            ref={dialogRef}
            tabIndex={-1}
            dir={isRTL ? 'rtl' : 'ltr'}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className={[
              // Positioning — centred, max readable width, safe area for notch
              'fixed z-[101] bottom-0 left-0 right-0 mx-auto',
              'max-w-[450px] w-full',
              'mb-[env(safe-area-inset-bottom,0px)]',
              'px-4 pb-8 pt-0',
              'focus:outline-none',
            ].join(' ')}
          >
            <div
              className={[
                'rounded-[28px] p-6 shadow-2xl border',
                isDark
                  ? 'bg-[#061D13]/90 border-white/10 backdrop-blur-xl'
                  : 'bg-white/90 border-white/50 backdrop-blur-xl shadow-hajj-green/10',
              ].join(' ')}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  {/* Label pill */}
                  <span className="inline-block text-[9px] font-black uppercase tracking-[0.25em] text-hajj-gold mb-1.5">
                    {language === 'ar'
                      ? 'مصطلح رئيسي'
                      : language === 'tr'
                      ? 'Temel Kavram'
                      : language === 'sq'
                      ? 'Koncept Kyç'
                      : 'Key Concept'}
                  </span>
                  {/* Term name */}
                  <h2
                    id="glossary-term-title"
                    className={[
                      'text-xl font-black leading-tight tracking-tight',
                      isDark ? 'text-hajj-alabaster' : 'text-hajj-navy',
                    ].join(' ')}
                  >
                    {termData.term}
                  </h2>
                </div>

                {/* Close button — large tap target */}
                <button
                  onClick={() => setActiveGlossaryTerm(null)}
                  aria-label="Close definition"
                  className={[
                    'flex-shrink-0 -mt-1 -mr-1',
                    'w-10 h-10 flex items-center justify-center rounded-full',
                    'transition-all active:scale-90',
                    isDark
                      ? 'bg-white/8 hover:bg-white/12 text-hajj-alabaster/60'
                      : 'bg-black/5 hover:bg-black/10 text-hajj-navy/50',
                  ].join(' ')}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div
                className={`h-px mb-4 ${isDark ? 'bg-white/8' : 'bg-hajj-navy/8'}`}
              />

              {/* Definition */}
              <p
                id="glossary-term-definition"
                className={[
                  'text-sm leading-relaxed',
                  isDark ? 'text-hajj-alabaster/80' : 'text-hajj-navy/75',
                  isRTL ? 'text-right' : 'text-left',
                ].join(' ')}
              >
                {termData.definition}
              </p>

              {/* Subtle book icon at bottom */}
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5">
                <svg
                  className="w-3.5 h-3.5 text-hajj-gold/60 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className={`text-[10px] uppercase tracking-widest font-bold opacity-40 ${isDark ? 'text-hajj-alabaster' : 'text-hajj-navy'}`}>
                  {language === 'ar'
                    ? 'معجم الحج'
                    : language === 'tr'
                    ? 'Hac Sözlüğü'
                    : language === 'sq'
                    ? 'Fjalori i Haxhit'
                    : 'Hajj Glossary'}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlossaryModal;

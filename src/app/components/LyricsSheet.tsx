import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { X, Share2, Languages } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';


interface LyricsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  lyrics: string;
}

export function LyricsSheet({
  isOpen,
  onClose,
  lyrics
}: LyricsSheetProps) {
  const { haptic } = useTelegram();
  const [dragState, setDragState] = useState<'collapsed' | 'half' | 'full'>('half');
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);

  const backgroundBlur = useTransform(y, [0, 400], [20, 0]);
  const backgroundOpacity = useTransform(y, [0, 400], [0.5, 0]);


  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (velocity > 500 || offset > 200) {
      onClose();
      haptic.light();
    } else if (velocity < -500 || offset < -200) {
      setDragState('full');
      haptic.light();
    } else if (offset > 100) {
      setDragState('collapsed');
      haptic.light();
    } else {
      setDragState('half');
      haptic.light();
    }
  };

  const heightMap = {
    collapsed: '25%',
    half: '60%',
    full: '95%',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
  initial={{ opacity: 0 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-[150] bg-black pointer-events-none"
  style={{
    opacity: backgroundOpacity,
    backdropFilter: `blur(${backgroundBlur}px)`,
    WebkitBackdropFilter: `blur(${backgroundBlur}px)`,
  }}
/>

          <motion.div
            ref={containerRef}
            drag="y"
            dragConstraints={{ top: 0, bottom: 400 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              height: heightMap[dragState]
            }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              mass: 0.8
            }}
            style={{ y }}
            className="fixed bottom-0 left-0 right-0 z-[160] bg-gradient-to-b from-zinc-900 via-zinc-900 to-black rounded-t-3xl shadow-2xl overflow-hidden border-t border-white/10"
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full cursor-grab active:cursor-grabbing shadow-lg" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex items-center justify-between px-6 pt-8 pb-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Lyrics</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  onClose();
                  haptic.light();
                }}
                className="text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div
              ref={lyricsRef}
              className="overflow-y-auto h-[calc(100%-180px)] px-6 py-8 space-y-6 scrollbar-hide"
            >
              <pre className="text-white text-lg leading-10 whitespace-pre-wrap font-medium">
  {lyrics}
</pre>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl border-t border-white/10">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => haptic.medium()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-medium backdrop-blur-xl hover:bg-white/15 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => haptic.medium()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-medium backdrop-blur-xl hover:bg-white/15 transition-all"
                >
                  <Languages className="w-5 h-5" />
                  Translate
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Cast, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTelegram } from '../hooks/useTelegram';

interface MiniPlayerProps {
  isPlaying?: boolean;
  progress?: number;
  track?: {
    title: string;
    artist: string;
    cover: string;
  };
  onDragMove?: (offsetY: number) => void;
  onDragFinish?: (offsetY: number) => void;
  onExpand?: () => void;
  onTogglePlay?: () => void;
  onClose?: () => void;
  
}

export function MiniPlayer({
  isPlaying = false,
  progress = 0,
  onTogglePlay,
  track = {
    title: 'stay',
    artist: 'all things break',
    cover: 'https://images.unsplash.com/photo-1521744267606-fde52352ef6f?w=200'
  },
  onExpand,
  onClose,
  onDragMove,
  onDragFinish,
}: MiniPlayerProps) {
  
  const { haptic } = useTelegram();

  const [isClosing, setIsClosing] = useState(false);

const closeWithAnimation = () => {
  setIsClosing(true);
  haptic.heavy();

  setTimeout(() => {
    onClose?.();
  }, 220);
};

  return (
    <motion.div
  initial={{ y: 100, opacity: 0 }}
  animate={isClosing ? { y: 120, opacity: 0 } : { y: 0, opacity: 1 }}
  transition={{
    type: 'spring',
    damping: 28,
    stiffness: 260,
  }}
  className="fixed bottom-16 left-0 right-0 z-40 px-3 pb-2 pointer-events-auto"
>
      <motion.div
  drag="y"
dragConstraints={{ top: 0, bottom: 0 }}
dragElastic={0.18}
dragMomentum={false}

onDrag={(event, info) => {
  onDragMove?.(info.offset.y);
}}

onDragEnd={(event, info) => {
  onDragFinish?.(info.offset.y);
}}

  whileHover={{ scale: 1.02 }}
  onTap={() => {
  onExpand?.();
}}
        className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-r from-black/60 via-black/50 to-black/60 border border-white/10 shadow-2xl shadow-black/50 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-orange-900/20 to-red-900/20 opacity-50" />

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="relative flex items-center gap-3 p-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg flex-shrink-0"
          >
            <ImageWithFallback
              src={track.cover}
              alt={track.title}
              className="w-full h-full object-cover"
            />
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center"
                >
                  <div className="flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-white rounded-full"
                        animate={{
                          height: ['8px', '16px', '8px'],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white text-sm line-clamp-1">
              {track.title}
            </h4>
            <p className="text-white/60 text-xs line-clamp-1">
              {track.artist}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <Cast className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
  e.stopPropagation();
  onTogglePlay?.();
  haptic.medium();
}}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg shadow-white/20"
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                  >
                    <Pause className="w-5 h-5 text-black" fill="black" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                  >
                    <Play className="w-5 h-5 text-black ml-0.5" fill="black" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onExpand?.();
                haptic.medium();
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Heart, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FullPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  track?: {
    title: string;
    artist: string;
    album: string;
    cover: string;
    duration: string;
  };
}

export function FullPlayer({
  isOpen,
  onClose,
  track = {
    title: 'stay',
    artist: 'all things break',
    album: 'Midnight Sessions',
    cover: 'https://images.unsplash.com/photo-1521744267606-fde52352ef6f?w=600',
    duration: '3:45'
  }
}: FullPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(65);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-red-950/40 to-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.3),transparent_70%)]" />

          <div className="relative h-full flex flex-col p-6 pb-safe">
            <div className="flex items-center justify-between mb-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white/80 hover:text-white"
              >
                <ChevronDown className="w-7 h-7" />
              </motion.button>

              <div className="text-center flex-1">
                <p className="text-white/60 text-sm">PLAYING FROM PLAYLIST</p>
                <p className="text-white font-medium">{track.album}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-white"
              >
                <MoreVertical className="w-6 h-6" />
              </motion.button>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1 flex items-center justify-center mb-8"
            >
              <div className="relative w-full max-w-sm aspect-square">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-3xl" />
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
                >
                  <ImageWithFallback
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold text-white mb-2 line-clamp-1">
                    {track.title}
                  </h1>
                  <p className="text-white/60 text-lg line-clamp-1">
                    {track.artist}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={`w-7 h-7 transition-colors ${
                      isLiked ? 'text-red-500 fill-red-500' : 'text-white/60'
                    }`}
                  />
                </motion.button>
              </div>

              <div className="space-y-2">
                <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none"
                    style={{ left: `calc(${progress}% - 8px)` }}
                  />
                </div>
                <div className="flex justify-between text-white/50 text-sm">
                  <span>2:24</span>
                  <span>{track.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/60 hover:text-white"
                >
                  <Shuffle className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white"
                >
                  <SkipBack className="w-8 h-8" fill="white" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-white shadow-2xl shadow-white/30 flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                      >
                        <Pause className="w-9 h-9 text-black" fill="black" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                      >
                        <Play className="w-9 h-9 text-black ml-1" fill="black" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white"
                >
                  <SkipForward className="w-8 h-8" fill="white" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/60 hover:text-white"
                >
                  <Repeat className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

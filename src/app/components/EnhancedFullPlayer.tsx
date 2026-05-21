import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Plus,
  Download
} from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTelegram } from '../hooks/useTelegram';
import { LyricsSheet } from './LyricsSheet';

interface EnhancedFullPlayerProps {
  onSheetDrag?: (offsetY: number) => void;
  onSheetDragEnd?: (offsetY: number) => void;
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  onTogglePlay: () => void;
  onSeek: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  track?: {
    title: string;
    artist: string;
    album: string;
    cover: string;
    duration: string;
    likes?: string;
    lyricsChords?: string;
    
  };
}

const queueTracks = [
  { id: '1', title: 'Midnight Dreams', artist: 'Echo Wave' },
  { id: '2', title: 'Neon Lights', artist: 'Cyber Pulse' },
  { id: '3', title: 'Urban Waves', artist: 'City Lights' },
];

export function EnhancedFullPlayer({
  isOpen,
  onClose,
  isPlaying,
  currentTime,
  duration,
  progress,
  onTogglePlay,
  onSeek,
  onNext,
  onPrevious,
  onSheetDrag,
 onSheetDragEnd,
  track = {
    title: 'stay',
    artist: 'all things break',
    album: 'Midnight Sessions',
    cover: 'https://images.unsplash.com/photo-1521744267606-fde52352ef6f?w=600',
    duration: '3:11',
    likes: '3.4K'
  }
}: EnhancedFullPlayerProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

const formatTime = (time: number) => {
  if (!time || Number.isNaN(time)) return '0:00';

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
};

  const { haptic } = useTelegram();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
  className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-zinc-900 to-black overflow-y-auto overscroll-none pb-safe pointer-events-auto"
>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.2),transparent_70%)]" />

          <div className="relative min-h-screen flex flex-col p-4 pt-8">
        
 
            <motion.div
  className="h-8 flex items-center justify-center mb-4 touch-none"
  onPan={(event, info) => {
    if (info.offset.y > 0) {
      onSheetDrag?.(info.offset.y);
    }
  }}
  onPanEnd={(event, info) => {
    onSheetDragEnd?.(info.offset.y);
  }}
>
  <div className="w-12 h-1.5 rounded-full bg-white/30" />
</motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0 mx-auto w-full max-w-md mb-8"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 blur-3xl" />
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full h-full"
                >
                  <ImageWithFallback
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-6 flex-1">
              <div className="flex items-start justify-between px-2">
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold text-white mb-1 line-clamp-2">
                    {track.title}
                  </h1>
                  <p className="text-white/60 text-lg line-clamp-1">
                    {track.artist}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto scrollbar-hide px-2 pb-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsLiked(!isLiked);
                    if (!isLiked) setIsDisliked(false);
                    haptic.medium();
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${
                    isLiked
                      ? 'bg-white/20 border-white/30 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
                  <span className="font-medium">{track.likes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsDisliked(!isDisliked);
                    if (!isDisliked) setIsLiked(false);
                    haptic.medium();
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${
                    isDisliked
                      ? 'bg-white/20 border-white/30 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <ThumbsDown className={`w-5 h-5 ${isDisliked ? 'fill-white' : ''}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowLyrics(true);
                    haptic.medium();
                  }}
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 text-white shadow-lg shadow-red-500/20 hover:from-red-600/30 hover:to-orange-600/30 transition-all"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Lyrics</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsSaved(!isSaved);
                    haptic.medium();
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${
                    isSaved
                      ? 'bg-white/20 border-white/30 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Plus className={`w-5 h-5 ${isSaved ? 'rotate-45' : ''} transition-transform`} />
                  <span className="font-medium">Save</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => haptic.medium()}
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Download</span>
                </motion.button>
              </div>

              <div className="space-y-2 px-2">
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
                    onChange={(e) => onSeek(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none"
                    style={{ left: `calc(${progress}% - 8px)` }}
                  />
                </div>
                <div className="flex justify-between text-white/50 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => haptic.light()}
                  className="text-white/60 hover:text-white p-2"
                >
                  <Shuffle className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
  onPrevious();
  haptic.medium();
}}
                  className="text-white p-2"
                >
                  <SkipBack className="w-8 h-8" fill="white" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
  onTogglePlay();
  haptic.heavy();
}}
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
                  onClick={() => {
  onNext();
  haptic.medium();
}}
                  className="text-white p-2"
                >
                  <SkipForward className="w-8 h-8" fill="white" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => haptic.light()}
                  className="text-white/60 hover:text-white p-2"
                >
                  <Repeat className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="mt-8 px-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowQueue(!showQueue);
                    haptic.light();
                  }}
                  className="w-full text-center py-3 text-white/70 hover:text-white font-medium text-sm"
                >
                  Queue
                </motion.button>

                <AnimatePresence>
                  {showQueue && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 mt-4">
                        {queueTracks.map((qTrack, idx) => (
                          <motion.div
                            key={qTrack.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all"
                          >
                            <div className="w-2 h-2 rounded-full bg-white/30" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium line-clamp-1">
                                {qTrack.title}
                              </p>
                              <p className="text-white/50 text-xs line-clamp-1">
                                {qTrack.artist}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <LyricsSheet
            isOpen={showLyrics}
            onClose={() => setShowLyrics(false)}
            lyrics={track.lyricsChords || ''}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

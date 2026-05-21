import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTelegram } from '../hooks/useTelegram';

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  gradient?: string;
}

const mockTracks: Track[] = [
  {
  id: '1',
  title: 'Збірник AlternativeCamp',
  artist: '137 пісень • Фонограми • Акорди',
  cover: '/covers/alternativecamp.png',
  gradient: 'from-orange-900/50 to-black/70'
  },
  {
    id: '2',
    title: 'Neon Lights',
    artist: 'Cyber Pulse',
    cover: 'https://images.unsplash.com/photo-1771301455501-694654813e1a?w=400',
    gradient: 'from-blue-600/40 to-cyan-600/40'
  },
  {
    id: '3',
    title: 'Vinyl Memories',
    artist: 'Retro Sound',
    cover: 'https://images.unsplash.com/photo-1761098281103-51bf33e39d7f?w=400',
    gradient: 'from-orange-600/40 to-red-600/40'
  },
  {
    id: '4',
    title: 'Mountain Echo',
    artist: 'Nature Beats',
    cover: 'https://images.unsplash.com/photo-1702259970719-fc3b6448de9b?w=400',
    gradient: 'from-gray-600/40 to-slate-800/40'
  },
  {
    id: '5',
    title: 'Urban Waves',
    artist: 'City Lights',
    cover: 'https://images.unsplash.com/flagged/photo-1572591500581-0cf1230ceb1d?w=400',
    gradient: 'from-indigo-600/40 to-purple-600/40'
  },
  {
    id: '6',
    title: 'Silent Storm',
    artist: 'Ambient Flow',
    cover: 'https://images.unsplash.com/photo-1680528221124-3bd6b87bf6ee?w=400',
    gradient: 'from-red-900/40 to-black/40'
  }
];

export function QuickPicks({
  onOpenSongbook
}: {
  onOpenSongbook: () => void;
}) {
  const { haptic } = useTelegram();

  return (
    <div className="px-5 py-4">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-white mb-5"
      >
        AlternativeCamp
      </motion.h2>

      <div className="grid grid-cols-2 gap-4">
        {mockTracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
  haptic.medium();

  if (track.id === '1') {
    onOpenSongbook();
  }
}}
            className="group relative cursor-pointer"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
              <ImageWithFallback
                src={track.cover}
                alt={track.title}
                className="w-full h-full object-cover"
              />

              <div className={`absolute inset-0 bg-gradient-to-t ${track.gradient || 'from-black/60 to-transparent'} opacity-60`} />

              <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                </div>
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <h3 className="font-semibold text-white text-sm line-clamp-1 mb-0.5">
                  {track.title}
                </h3>
                <p className="text-white/70 text-xs line-clamp-1">
                  {track.artist}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

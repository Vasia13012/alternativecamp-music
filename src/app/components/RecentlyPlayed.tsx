import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTelegram } from '../hooks/useTelegram';

const recentTracks = [
  {
    id: '1',
    title: 'Forgotten Roads',
    artist: 'Ambient Collective',
    cover: 'https://images.unsplash.com/photo-1639470552436-27aa138a3902?w=400',
  },
  {
    id: '2',
    title: 'Tokyo Nights',
    artist: 'Lo-Fi Beats',
    cover: 'https://images.unsplash.com/photo-1660478661256-dc7c3d0698ff?w=400',
  },
  {
    id: '3',
    title: 'Solar Winds',
    artist: 'Space Journey',
    cover: 'https://images.unsplash.com/photo-1702259964735-3d3c53800cd5?w=400',
  },
  {
    id: '4',
    title: 'Deep Blue',
    artist: 'Ocean Waves',
    cover: 'https://images.unsplash.com/photo-1551887293-b6dfdd376323?w=400',
  },
];

export function RecentlyPlayed() {
  const { haptic } = useTelegram();

  return (
    <div className="px-5 py-6">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-white mb-5"
      >
        Забуте вибране
      </motion.h2>

      <div className="grid grid-cols-2 gap-4">
        {recentTracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => haptic.medium()}
            className="cursor-pointer"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl shadow-black/40 mb-3">
              <ImageWithFallback
                src={track.cover}
                alt={track.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <h3 className="font-semibold text-white text-sm line-clamp-1 mb-0.5">
              {track.title}
            </h3>
            <p className="text-white/60 text-xs line-clamp-1">
              {track.artist}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

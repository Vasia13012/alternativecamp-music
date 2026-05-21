import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = [
  'Lo-Fi Beats',
  'Workout Energy',
  'Deep Focus',
  'Ukrainian Artists',
  'Ambient Chill',
  'Rock Classics',
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl"
        >
          <div className="h-full flex flex-col">
            <div className="sticky top-0 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-xl p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white/70 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for songs, artists, albums..."
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                Trending Searches
              </h3>

              <div className="space-y-2">
                {trendingSearches.map((term, index) => (
                  <motion.button
                    key={term}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="w-full text-left px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const categories = [
  'Podcasts',
  'Workout',
  'Energy',
  'Chill',
  'Deep',
  'Rock',
  'Electronic',
  'Ukrainian Music',
  'Jazz',
  'Classical',
  'Hip-Hop',
  'Pop'
];

export function CategoryChips() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const { haptic } = useTelegram();

  return (
    <div className="relative px-5 py-4">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveCategory(index);
              haptic.selection();
            }}
            className={`
              flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm
              backdrop-blur-xl border transition-all snap-start
              ${activeCategory === index
                ? 'bg-white/20 border-white/30 text-white shadow-lg shadow-white/10'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

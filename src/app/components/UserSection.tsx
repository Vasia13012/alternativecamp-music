import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function UserSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="px-5 pt-4 pb-3"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-xl p-4 cursor-pointer group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-red-600/20 opacity-50 group-hover:opacity-70 transition-opacity" />

        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-white/20">
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
              V
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-sm">ВАСИЛЬ ЗІНЧЕНКО</h3>
            <p className="text-white/60 text-xs">Швидкий вибір</p>
          </div>

          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronRight className="w-5 h-5 text-white/70" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

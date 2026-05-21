import { motion } from 'motion/react';

export function LoadingSkeleton() {
  return (
    <div className="px-5 py-4 space-y-8">
      <div className="space-y-3">
        <div className="h-8 w-32 bg-white/10 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-3"
            >
              <div className="aspect-square bg-white/10 rounded-3xl animate-pulse" />
              <div className="h-4 bg-white/10 rounded-xl animate-pulse w-3/4" />
              <div className="h-3 bg-white/10 rounded-xl animate-pulse w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

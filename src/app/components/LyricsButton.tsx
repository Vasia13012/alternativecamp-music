import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

interface LyricsButtonProps {
  onClick: () => void;
}

export function LyricsButton({ onClick }: LyricsButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-36 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-orange-600 shadow-2xl shadow-red-500/40 flex items-center justify-center border-2 border-white/20"
    >
      <FileText className="w-6 h-6 text-white" />
    </motion.button>
  );
}

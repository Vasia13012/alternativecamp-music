import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

export function VolumeControl() {
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const { haptic } = useTelegram();

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setShowSlider(!showSlider);
          haptic.light();
        }}
        className="p-2 text-white/70 hover:text-white"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </motion.button>

      {showSlider && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 p-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
        >
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(false);
            }}
            className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer rotate-180 [writing-mode:bt-lr] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
            style={{ writingMode: 'bt-lr' }}
          />
        </motion.div>
      )}
    </div>
  );
}

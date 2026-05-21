import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { MiniPlayer } from './MiniPlayer';
import { EnhancedFullPlayer } from './EnhancedFullPlayer';

interface PlayerSheetProps {
  hasStartedPlaying: boolean;
  isPlayerExpanded: boolean;
  setIsPlayerExpanded: (value: boolean) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  track: any;
  onTogglePlay: () => void;
  onSeek: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onCloseMini: () => void;
}

export function PlayerSheet({
  hasStartedPlaying,
  isPlayerExpanded,
  setIsPlayerExpanded,
  isPlaying,
  currentTime,
  duration,
  progress,
  track,
  onTogglePlay,
  onSeek,
  onNext,
  onPrevious,
  onCloseMini,
}: PlayerSheetProps) {
  const [isDraggingOpen, setIsDraggingOpen] = useState(false);
  const dragY = useMotionValue(0);

  const fullPlayerY = useTransform(dragY, [-320, 0], [0, 900]);
  const fullPlayerOpacity = useTransform(dragY, [-180, 0], [1, 0]);

  const openFullPlayer = () => {
  dragY.set(0);
  setIsDraggingOpen(false);
  setIsPlayerExpanded(true);
};

  const closeFullPlayer = () => {
    dragY.set(0);
    setIsDraggingOpen(false);
    setIsPlayerExpanded(false);
  };

  return (
    <>
      {hasStartedPlaying && !isPlayerExpanded && (
        <MiniPlayer
          isPlaying={isPlaying}
          progress={progress}
          track={track}
          onTogglePlay={onTogglePlay}
          onExpand={openFullPlayer}
          onClose={onCloseMini}
          onDragMove={(offsetY) => {
            if (offsetY < 0) {
              setIsDraggingOpen(true);
              dragY.set(offsetY);
            }
          }}
          onDragFinish={(offsetY) => {
            if (offsetY < -90) {
              openFullPlayer();
            } else {
              setIsDraggingOpen(false);
              dragY.set(0);
            }
          }}
        />
      )}

      <motion.div
  className="fixed inset-0 z-[90] pointer-events-auto touch-none"
  drag={isPlayerExpanded ? "y" : false}
  dragConstraints={{ top: 0, bottom: 900 }}
  dragElastic={0.12}
  dragMomentum={false}
  onDragEnd={(event, info) => {
    if (info.offset.y > 120) {
      closeFullPlayer();
    }
  }}
  style={{
    y: isPlayerExpanded ? dragY : fullPlayerY,
    opacity: isPlayerExpanded ? 1 : fullPlayerOpacity,
  }}
>
        <EnhancedFullPlayer
        onSheetDrag={(offsetY) => {
  dragY.set(offsetY);
}}

onSheetDragEnd={(offsetY) => {
  if (offsetY > 120) {
    closeFullPlayer();
  } else {
    dragY.set(0);
  }
}}
          isOpen={isPlayerExpanded || isDraggingOpen}
          onClose={closeFullPlayer}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          progress={progress}
          track={track}
          onTogglePlay={onTogglePlay}
          onSeek={onSeek}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </motion.div>
    </>
  );
}
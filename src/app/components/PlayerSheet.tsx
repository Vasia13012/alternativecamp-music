import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
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
  const SHEET_HEIGHT = window.innerHeight;
  const SNAP_POINT = SHEET_HEIGHT * 0.5;

  const fullPlayerY = useTransform(dragY, [-320, 0], [0, SHEET_HEIGHT]);
  const fullPlayerOpacity = useTransform(dragY, [-160, 0], [1, 0]);

  const openFullPlayer = () => {
    setIsPlayerExpanded(true);

    animate(dragY, 0, {
      type: 'spring',
      stiffness: 420,
      damping: 38,
    });

    setTimeout(() => {
      setIsDraggingOpen(false);
    }, 80);
  };

  const closeFullPlayer = () => {
    animate(dragY, SHEET_HEIGHT, {
      type: 'spring',
      stiffness: 420,
      damping: 38,
    });

    setTimeout(() => {
      dragY.set(0);
      setIsDraggingOpen(false);
      setIsPlayerExpanded(false);
    }, 220);
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
              return;
            }

            if (offsetY > 80) {
              onCloseMini();
              dragY.set(0);
              setIsDraggingOpen(false);
              return;
            }

            animate(dragY, 0, {
              type: 'spring',
              stiffness: 420,
              damping: 38,
            });

            setIsDraggingOpen(false);
          }}
        />
      )}

      {(isPlayerExpanded || isDraggingOpen) && (
        <motion.div
          className="fixed inset-0 z-[90] pointer-events-auto"
          drag={isPlayerExpanded ? 'y' : false}
          dragConstraints={{ top: 0, bottom: SHEET_HEIGHT }}
          dragElastic={0.04}
          dragMomentum={false}
          onDrag={(event, info) => {
            if (info.offset.y >= 0) {
              dragY.set(info.offset.y);
            }
          }}
          onDragEnd={(event, info) => {
            if (info.offset.y > SNAP_POINT) {
              closeFullPlayer();
            } else {
              openFullPlayer();
            }
          }}
          style={{
            y: isPlayerExpanded ? dragY : fullPlayerY,
            opacity: isPlayerExpanded ? 1 : fullPlayerOpacity,
          }}
        >
          <EnhancedFullPlayer
            isOpen={true}
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
      )}
    </>
  );
}
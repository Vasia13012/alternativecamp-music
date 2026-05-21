import { useEffect, useRef, useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { CategoryChips } from './components/CategoryChips';
import { UserSection } from './components/UserSection';
import { QuickPicks } from './components/QuickPicks';
import { RecentlyPlayed } from './components/RecentlyPlayed';
import { BottomNavigation } from './components/BottomNavigation';
import { SearchOverlay } from './components/SearchOverlay';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SplashScreen } from './components/SplashScreen';
import { SongbookPage } from './components/SongbookPage';
import { PlayerSheet } from './components/PlayerSheet';
import { songs } from './data/songs';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isSongbookOpen, setIsSongbookOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [progress, setProgress] = useState(0);
const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

const tracks = songs;

const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
const currentTrack = tracks[currentTrackIndex];

const togglePlay = async () => {
  const audio = audioRef.current;
  if (!audio) return;

  if (audio.paused) {
    await audio.play();
    setIsPlaying(true);
    setHasStartedPlaying(true);
  } else {
    audio.pause();
    setIsPlaying(false);
  }
};

const handleSeek = (value: number) => {
  const audio = audioRef.current;
  if (!audio || !duration) return;

  const newTime = (value / 100) * duration;
  audio.currentTime = newTime;
  setCurrentTime(newTime);
  setProgress(value);
};

const nextTrack = () => {
  setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  setCurrentTime(0);
  setProgress(0);
  setIsPlaying(true);
};

const previousTrack = () => {
  setCurrentTrackIndex((prev) =>
    prev === 0 ? tracks.length - 1 : prev - 1
  );
  setCurrentTime(0);
  setProgress(0);
  setIsPlaying(true);
};

useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  audio.load();

  if (isPlaying) {
    audio.play().catch((error) => {
      console.error('Track switch play error:', error);
    });
  }
}, [currentTrack.src]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();

      tg.MainButton.setText('Play All');
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        tg.HapticFeedback.impactOccurred('medium');
      });

      const themeParams = tg.themeParams;
      if (themeParams.bg_color) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
      }
    }
  }, []);

  return (
    <>
    <audio
  key={currentTrack.src}
  ref={audioRef}
  src={currentTrack.src}
  preload="auto"
  onLoadedMetadata={(e) => {
    setDuration(e.currentTarget.duration);
  }}
  onTimeUpdate={(e) => {
    const audio = e.currentTarget;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  }}
  onEnded={() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  }}
/>
      <SplashScreen isVisible={showSplash} />

      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />

        {isSongbookOpen ? (
  <SongbookPage
    songs={tracks}
    onBack={() => setIsSongbookOpen(false)}
    onSelectSong={(index) => {
      setCurrentTrackIndex(index);
      setIsPlayerExpanded(true);
      setIsSongbookOpen(false);
      setHasStartedPlaying(true);
    }}
  />
) : (

        <div className="relative z-10 flex flex-col min-h-screen pb-32">
        <TopNavigation onSearchClick={() => setIsSearchOpen(true)} />
        <CategoryChips />
        <UserSection />
        <QuickPicks
  onOpenSongbook={() => setIsSongbookOpen(true)}
/>
        <RecentlyPlayed />

        <BottomNavigation />
      </div>
      )}

      <PlayerSheet
  hasStartedPlaying={hasStartedPlaying}
  isPlayerExpanded={isPlayerExpanded}
  setIsPlayerExpanded={setIsPlayerExpanded}
  isPlaying={isPlaying}
  currentTime={currentTime}
  duration={duration}
  progress={progress}
  track={currentTrack}
  onTogglePlay={togglePlay}
  onSeek={handleSeek}
  onNext={nextTrack}
  onPrevious={previousTrack}
  onCloseMini={() => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setIsPlaying(false);
    setHasStartedPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  }}
/>

</div>
</>
);
}
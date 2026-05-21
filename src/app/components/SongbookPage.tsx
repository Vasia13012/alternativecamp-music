import { motion } from 'motion/react';
import { ArrowLeft, Play, Music, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTelegram } from '../hooks/useTelegram';

interface SongbookPageProps {
  songs: any[];
  onBack: () => void;
  onSelectSong: (index: number) => void;
}

export function SongbookPage({ songs, onBack, onSelectSong }: SongbookPageProps) {
  const { haptic } = useTelegram();

  return (
    <div className="relative z-20 min-h-screen px-5 pt-8 pb-32 text-white">
      <button
        onClick={() => {
          onBack();
          haptic.light();
        }}
        className="mb-6 flex items-center gap-2 text-white/80 hover:text-white"
      >
        <ArrowLeft className="w-6 h-6" />
        Назад
      </button>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 mb-5">
          <ImageWithFallback
            src="/covers/alternativecamp.png"
            alt="Збірник AlternativeCamp"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
          Християнський пісенник
        </p>

        <h1 className="text-4xl font-bold mb-3">
          Збірник AlternativeCamp
        </h1>

        <p className="text-white/60 max-w-md">
          137 пісень • фонограми • тексти • акорди
        </p>
      </div>

      <div className="flex gap-3 mb-8">
        <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full bg-white text-black font-semibold">
          <Play className="w-5 h-5" fill="black" />
          Слухати
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full bg-white/10 border border-white/15 text-white font-semibold">
          <FileText className="w-5 h-5" />
          Тексти
        </button>
      </div>

      <div className="space-y-2">
        {songs.map((song, index) => (
          <motion.button
            key={song.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onSelectSong(index);
              haptic.medium();
            }}
            className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/10 transition text-left"
          >
            <span className="w-7 text-white/50 text-sm">
              {song.number}
            </span>

            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
              <ImageWithFallback
                src={song.cover}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold line-clamp-1">
                {song.title}
              </h3>
              <p className="text-white/50 text-sm line-clamp-1">
                {song.artist} • {song.duration}
              </p>
            </div>

            <Music className="w-5 h-5 text-white/40" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
import { Bell, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useTelegram } from '../hooks/useTelegram';

interface TopNavigationProps {
  notificationCount?: number;
  userAvatar?: string;
  onSearchClick?: () => void;
}

export function TopNavigation({ notificationCount = 5, userAvatar, onSearchClick }: TopNavigationProps) {
  const { user, haptic } = useTelegram();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/5"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/30"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M8 5.14v14l11-7-11-7z" fill="currentColor"/>
            </svg>
          </motion.div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Music</h1>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => haptic.light()}
            className="relative"
          >
            <Bell className="w-6 h-6 text-white/80" />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-white text-xs font-semibold flex items-center justify-center shadow-lg shadow-red-500/50"
              >
                {notificationCount}
              </motion.span>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              haptic.light();
              onSearchClick?.();
            }}
          >
            <Search className="w-6 h-6 text-white/80" />
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 cursor-pointer"
            onClick={() => haptic.light()}
          >
            {user?.photo_url || userAvatar ? (
              <img
                src={user?.photo_url || userAvatar}
                alt={user?.first_name || 'User'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                {user?.first_name?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

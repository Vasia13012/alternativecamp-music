import { motion } from 'motion/react';
import { Home, Search, Compass, Library, User } from 'lucide-react';
import { useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState('home');
  const { haptic } = useTelegram();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/40 border-t border-white/10"
    >
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setActiveTab(item.id);
                haptic.selection();
              }}
              className="relative flex flex-col items-center gap-1 px-4 py-2 min-w-0"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-white' : 'text-white/50'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-lg shadow-white/50"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>

              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-white/50'
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-white/5 rounded-2xl -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}

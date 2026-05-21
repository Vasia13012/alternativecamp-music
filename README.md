# 🎵 Premium Telegram Music Mini App

A modern, atmospheric music streaming app for Telegram Mini Apps, inspired by YouTube Music, Spotify, and premium UI design principles.

## ✨ Features

### 🎨 Premium Design
- **Cinematic Dark Theme**: Deep gradients with black, dark red, orange, and burgundy
- **Glassmorphism Effects**: Modern blur effects and transparency throughout
- **Smooth Animations**: Apple-level smoothness using Framer Motion
- **Responsive Design**: Mobile-first, optimized for all smartphone sizes

### 🎵 Music Features
- **Quick Picks Grid**: 2-column album/playlist layout with hover animations
- **Recently Played**: Track your listening history
- **Category Browsing**: Podcasts, Workout, Energy, Chill, Deep, Rock, Electronic, Ukrainian Music, and more
- **Enhanced Full Player**: YouTube Music-style player with action buttons
- **Mini Player**: Sticky bottom player with live playback visualization
- **Search Functionality**: Fast search with trending suggestions
- **YouTube Music-Style Lyrics**: Draggable bottom sheet with synchronized lyrics
- **Action Buttons**: Like (with counter), Dislike, Lyrics, Save, Download
- **Queue Management**: View and manage upcoming tracks

### 📱 Telegram Integration
- **Telegram WebApp SDK**: Full integration with Telegram's Web App API
- **Haptic Feedback**: Touch feedback on all interactive elements
- **Theme Support**: Respects Telegram's theme colors
- **Safe Area Support**: Works perfectly with iOS notches and Android navigation
- **User Avatar**: Auto-fetches Telegram user profile picture

### 🎭 Interactive Components
- **Top Navigation**: Logo, notifications badge, search, user avatar
- **Category Chips**: Horizontal scrolling category selector with active states
- **Album Cards**: Rounded corners, shadows, gradient overlays, tap animations
- **Bottom Navigation**: 5-tab navigation (Home, Search, Explore, Library, Profile)
- **Animated Background**: Subtle moving gradients for atmosphere
- **Draggable Lyrics Sheet**: Three-state bottom sheet (collapsed, half-open, full-screen)
- **Spring Animations**: Natural, physics-based motion throughout
- **Background Dimming**: Automatic blur and opacity when lyrics open

### 🚀 Performance
- **Lazy Loading**: Images load on demand with fallbacks
- **Smooth Scrolling**: Optimized scroll performance
- **Loading Skeletons**: Beautiful loading states
- **Motion Animations**: Hardware-accelerated animations

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Animation library
- **React Spring** - Physics-based animations
- **@use-gesture/react** - Gesture handling for drag interactions
- **Telegram WebApp API** - Telegram integration
- **Lucide React** - Icon library
- **Vite** - Build tool

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── TopNavigation.tsx      # Header with logo, search, notifications
│   │   ├── CategoryChips.tsx      # Horizontal category selector
│   │   ├── UserSection.tsx        # User profile card
│   │   ├── QuickPicks.tsx         # Album grid
│   │   ├── RecentlyPlayed.tsx     # Recently played tracks
│   │   ├── MiniPlayer.tsx         # Sticky bottom player
│   │   ├── FullPlayer.tsx         # Expandable full-screen player
│   │   ├── BottomNavigation.tsx   # Bottom tab navigation
│   │   ├── SearchOverlay.tsx      # Search modal
│   │   ├── AnimatedBackground.tsx # Animated gradient background
│   │   ├── LoadingSkeleton.tsx    # Loading states
│   │   └── figma/
│   │       └── ImageWithFallback.tsx
│   ├── hooks/
│   │   └── useTelegram.ts         # Telegram WebApp hook
│   └── App.tsx                    # Main app component
├── styles/
│   ├── theme.css                  # Theme variables and utilities
│   └── fonts.css                  # Font imports
└── imports/                       # Assets
```

## 🎨 Design Features

### Color Palette
- **Primary**: Black, Dark Red (#8B0000), Orange (#FF4500), Burgundy
- **Accents**: White with opacity for glassmorphism
- **Gradients**: Radial and linear gradients for depth

### Typography
- **Clean Sans-serif**: Modern, readable fonts
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing & Borders
- **Border Radius**: 20-28px for premium rounded corners
- **Shadows**: Soft multi-layer shadows for depth
- **Blur**: Backdrop blur for glassmorphism (10-40px)

## 🎯 Interactive States

- **Hover**: Scale animations (1.05x)
- **Tap**: Scale animations (0.95x)
- **Active**: Visual feedback with colors and shadows
- **Loading**: Pulse animations on skeletons

## 📱 Telegram Features

### Haptic Feedback
- Light impact on button taps
- Medium impact on play/pause
- Selection feedback on tab switches
- Success/error notifications

### WebApp Integration
- Auto-expand on load
- Closing confirmation
- Main button integration
- Theme parameter support
- User data access

## 🎵 Music Playback Features

### Enhanced Player
- Play/Pause toggle with spring animations
- Custom progress bar with animated thumb
- Skip forward/backward with haptic feedback
- Shuffle mode
- Repeat mode
- Queue view with track list

### Action Buttons (YouTube Music Style)
- **Like Button**: With real-time like counter (e.g., "3.4K")
- **Dislike Button**: Toggle dislike state
- **Lyrics Button**: Opens draggable lyrics sheet
- **Save Button**: Add to playlist/library
- **Download Button**: Offline listening support

### Lyrics Experience
- **Draggable Bottom Sheet**: Smooth spring-based animations
- **Three States**: 
  - Collapsed (25% height)
  - Half-open (60% height) 
  - Full-screen (95% height)
- **Synchronized Lyrics**: Auto-scroll with playback
- **Active Line Highlighting**: Current lyric in bright white
- **Faded Previous/Next**: Subtle grey for context
- **Share & Translate**: Action buttons at bottom
- **Background Effects**: Automatic dim and blur when open
- **Gesture Support**: Swipe up/down to resize, drag handle
- **Natural Physics**: Spring animations feel premium and fluid

## 🌟 Premium Details

- **Neon Glow Effects**: Subtle glow on active elements
- **Dynamic Gradients**: Animated background gradients
- **Smooth Transitions**: All state changes are animated
- **Gesture Support**: Swipe gestures (future enhancement)
- **Loading States**: Beautiful skeleton screens
- **Error Handling**: Graceful image fallbacks

## 🔧 Development

The app uses modern React patterns:
- Hooks for state management
- TypeScript for type safety
- Modular component architecture
- Custom hooks for Telegram integration
- Motion components for animations

## 📦 Dependencies

Key packages:
- `@twa-dev/sdk` - Telegram WebApp SDK
- `motion` - Animation library (formerly Framer Motion)
- `lucide-react` - Icon library
- `tailwindcss` - CSS framework

## 🎭 Future Enhancements

- User playlists
- Social sharing
- Lyrics display
- Audio visualization
- Offline mode
- Dark/Light theme toggle
- Personalized recommendations
- Music player controls in notification

---

**Built with ❤️ for Telegram Mini Apps**

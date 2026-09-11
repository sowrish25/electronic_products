import React from 'react';
import { ScreenType } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  savedCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  savedCount
}) => {
  // If in PDP, we suppress the bottom nav bar per semantic mobile PDP pattern (sticky purchase dock is active)
  if (currentScreen === 'pdp') {
    return null;
  }

  const navItems = [
    {
      id: 'home' as ScreenType,
      label: 'Home',
      icon: 'home',
      fillIcon: true
    },
    {
      id: 'catalog' as ScreenType,
      label: 'Catalog',
      icon: 'grid_view',
      fillIcon: true
    },
    {
      id: 'cart' as ScreenType,
      label: 'Cart',
      icon: 'shopping_cart',
      fillIcon: true,
      badge: cartCount > 0 ? cartCount : undefined
    },
    {
      id: 'saved' as ScreenType,
      label: 'Saved',
      icon: 'favorite',
      fillIcon: true,
      badge: savedCount > 0 ? savedCount : undefined
    },
    {
      id: 'hub' as ScreenType,
      label: 'Hub',
      icon: 'devices',
      fillIcon: true
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-5 pt-2 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-md bg-surface-dim/92 backdrop-blur-xl border border-outline-variant/40 rounded-full shadow-2xl shadow-primary-container/10 px-3 py-1.5 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'bg-surface-container-high/80 text-primary-container shadow-[0_0_12px_rgba(0,242,254,0.25)]'
                  : 'text-on-surface-variant hover:text-primary-container'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                style={{ fontVariationSettings: isActive && item.fillIcon ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span
                className={`font-badge-label text-[10px] tracking-tight mt-0.5 ${
                  isActive ? 'font-bold text-primary-container' : 'font-medium'
                }`}
              >
                {item.label}
              </span>

              {/* Dynamic badge */}
              {item.badge !== undefined && (
                <span className="absolute top-0 right-1 flex items-center justify-center min-w-[14px] h-3.5 px-1 rounded-full bg-primary-container text-on-primary-fixed font-badge-label text-[9px] font-bold ring-1 ring-surface-dim">
                  {item.badge}
                </span>
              )}

              {/* Active neon blip */}
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse shadow-[0_0_6px_#00f2fe]"></span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

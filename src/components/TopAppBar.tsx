import React from 'react';
import { ScreenType } from '../types';

interface TopAppBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  deliveryLocation: string;
  onOpenLocationModal: () => void;
  onOpenMenuDrawer: () => void;
  onBack?: () => void;
  wishlistCount: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  deliveryLocation,
  onOpenLocationModal,
  onOpenMenuDrawer,
  onBack,
  wishlistCount
}) => {
  // If in PDP or Catalog with search/back bar, render contextual header
  if (currentScreen === 'pdp') {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 w-full bg-surface-dim/85 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack || (() => onNavigate('home'))}
            aria-label="Go back"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container/60 hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-1.5 pl-1">
            <span className="font-spec-code-sm text-[11px] text-on-surface-variant tracking-wider uppercase">Audio</span>
            <span className="text-outline text-xs">/</span>
            <span className="font-spec-code-sm text-[11px] text-primary-container tracking-wide font-medium">Apex Vision</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            aria-label="Share product"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'PulseTech Apex Pro', url: window.location.href }).catch(() => {});
              }
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
          <button
            aria-label="View Saved"
            onClick={() => onNavigate('saved')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high/60 text-primary-container border border-primary-container/40 glow-cyan-sm active:scale-90 transition-transform relative"
          >
            <span className="material-symbols-outlined text-[20px] fill-1">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container"></span>
            )}
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 w-full bg-surface-dim/85 backdrop-blur-md shadow-sm border-b border-outline-variant/20">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenMenuDrawer}
          aria-label="Open menu"
          className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:text-primary-container hover:bg-surface-container/60 transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="flex items-baseline gap-1 text-left group"
        >
          <span className="font-headline-md text-headline-md font-bold tracking-wider text-primary-container drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]">
            PulseTech
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
        </button>
      </div>

      {/* Location Delivery Indicator (Desktop/Tablet) */}
      <div
        onClick={onOpenLocationModal}
        className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/40 text-on-surface-variant hover:border-primary-container/40 hover:text-primary-container transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-primary-container text-[16px]">location_on</span>
        <span className="font-spec-code text-[12px] text-on-surface">
          Deliver to <strong className="text-primary font-semibold">{deliveryLocation}</strong>
        </span>
        <span className="material-symbols-outlined text-[14px]">expand_more</span>
      </div>

      {/* Actions Cluster */}
      <div className="flex items-center gap-1.5">
        {currentScreen === 'cart' ? (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high/80 border border-outline-variant/40">
            <span className="material-symbols-outlined text-primary-container text-[14px] fill-1">lock</span>
            <span className="font-spec-code-sm text-[10px] text-on-surface-variant">256-BIT SSL</span>
          </div>
        ) : currentScreen === 'hub' ? (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/40">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-spec-code-sm text-[10px] text-primary-container tracking-wider">NETWORK: 5G ACTIVE</span>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('saved')}
            aria-label="Wishlist"
            className="flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:text-primary-container transition-colors active:scale-95 relative"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container"></span>
          </button>
        )}

        {/* Shopping Cart Button with Dynamic Badge */}
        <button
          onClick={() => onNavigate('cart')}
          aria-label="View Shopping Cart"
          className="relative flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:text-primary-container transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-primary-container text-on-primary-fixed font-badge-label text-[10px] font-bold ring-2 ring-surface-dim animate-in fade-in zoom-in">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

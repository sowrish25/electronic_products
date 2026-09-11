import React from 'react';
import { Product, ScreenType } from '../types';

interface SavedScreenProps {
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
  onNavigate
}) => {
  return (
    <main className="pt-16 max-w-md mx-auto px-4 space-y-4 pb-28">
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">Saved Hardware</h1>
          <p className="font-spec-code-sm text-[11px] text-on-surface-variant">
            {wishlist.length} item{wishlist.length === 1 ? '' : 's'} tracked with real-time price alerts
          </p>
        </div>
        <button
          onClick={() => onNavigate('catalog')}
          className="font-spec-code text-[12px] text-primary-container flex items-center gap-1 hover:underline"
        >
          <span>Catalog</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="p-8 text-center neo-glass rounded-xl space-y-3 mt-4">
          <span className="material-symbols-outlined text-5xl text-outline">bookmark_border</span>
          <p className="text-on-surface text-sm font-semibold">No saved hardware yet</p>
          <p className="text-on-surface-variant text-xs">
            Tap the bookmark or heart icon on any product to track availability and price changes.
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-fixed font-bold text-xs glow-cyan active:scale-95"
          >
            Explore Tech Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-3 mt-2">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="neo-card rounded-xl p-3.5 flex items-center justify-between gap-3"
            >
              <div
                onClick={() => {
                  onSelectProduct(item);
                  onNavigate('pdp');
                }}
                className="w-16 h-16 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center p-1 cursor-pointer shrink-0"
              >
                <img className="w-full h-full object-contain" src={item.image} alt={item.name} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-badge-label text-[9px] text-primary-container uppercase font-bold">
                    {item.brand}
                  </span>
                  {item.badges?.[0] && (
                    <span className="font-badge-label text-[8px] px-1 rounded bg-secondary-container/40 text-secondary">
                      {item.badges[0]}
                    </span>
                  )}
                </div>
                <h3
                  onClick={() => {
                    onSelectProduct(item);
                    onNavigate('pdp');
                  }}
                  className="font-headline-sm text-[14px] font-bold text-on-surface truncate cursor-pointer hover:text-primary-container"
                >
                  {item.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-spec-code text-[14px] font-bold text-primary-container">
                    ${item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && (
                    <span className="font-spec-code-sm text-[10px] text-outline line-through">
                      ${item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <button
                  onClick={() => onRemoveFromWishlist(item.id)}
                  aria-label="Remove item"
                  className="text-on-surface-variant hover:text-error transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <button
                  onClick={() => onAddToCart(item)}
                  className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary-fixed font-label-action text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

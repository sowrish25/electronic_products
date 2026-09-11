import React, { useState, useMemo } from 'react';
import { Product, ScreenType } from '../types';
import { CATALOG_PRODUCTS } from '../data/mockData';

interface CatalogScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  activeCategoryFilter?: string;
  onOpenFilterModal: () => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  activeCategoryFilter,
  onOpenFilterModal
}) => {
  const [searchQuery, setSearchQuery] = useState('Laptops & High-Performance Rigs');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');
  const [activeBrands, setActiveBrands] = useState<string[]>(['Apple', 'Asus', 'Razer']);
  const [pricePillActive, setPricePillActive] = useState(true);
  const [ramPillActive, setRamPillActive] = useState(true);
  const [gpuPillActive, setGpuPillActive] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Active filter count
  const activeParamCount = (activeBrands.length > 0 ? 1 : 0) + (pricePillActive ? 1 : 0) + (ramPillActive ? 1 : 0) + (gpuPillActive ? 1 : 0) + (inStockOnly ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let list = [...CATALOG_PRODUCTS];
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setActiveBrands([]);
    setPricePillActive(false);
    setRamPillActive(false);
    setGpuPillActive(false);
    setInStockOnly(false);
    setSortBy('popular');
  };

  const featuredProduct = filteredProducts[0];
  const gridProducts = filteredProducts.slice(1);

  return (
    <div className="min-h-screen flex flex-col font-body-md pb-24">
      {/* Top App Bar with embedded search */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 w-full bg-surface-dim/85 backdrop-blur-md shadow-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-2 flex-1 mr-2">
          <button
            onClick={() => onNavigate('home')}
            aria-label="Go Back"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container active:scale-95 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          {/* Search Bar Input */}
          <div className="flex-1 relative flex items-center">
            <span className="material-symbols-outlined text-outline absolute left-3 text-[18px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full h-9 pl-9 pr-8 bg-surface-container-lowest border border-outline-variant/40 rounded-full font-body-sm text-primary text-[12px] focus:outline-none focus:border-primary-container"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear Search"
                className="absolute right-2.5 text-outline hover:text-on-surface text-[16px] flex items-center"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onNavigate('saved')}
            aria-label="Wishlist"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container active:scale-95 transition-all relative"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-14 px-4 pt-3 flex-1 flex flex-col gap-3 max-w-lg mx-auto md:max-w-4xl w-full">
        {/* Results & View Controls Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_8px_#00f2fe]"></span>
            <h1 className="font-headline-sm text-[16px] sm:text-[17px] font-bold text-on-background tracking-tight">
              142 Products Found
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-surface-container p-0.5 rounded-lg border border-outline-variant/30">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-surface-container-high text-primary-container shadow-xs' : 'text-on-surface-variant'
                }`}
                title="Grid View"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-surface-container-high text-primary-container shadow-xs' : 'text-on-surface-variant'
                }`}
                title="List View"
              >
                <span className="material-symbols-outlined text-[18px]">view_list</span>
              </button>
            </div>

            {/* Filter Modal Trigger */}
            <button
              onClick={onOpenFilterModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container border border-primary-container/40 text-primary-container font-label-action text-[12px] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Filters</span>
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-primary-container text-on-primary-fixed font-badge-label text-[9px] font-bold">
                {activeParamCount}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {/* Sort Pill */}
          <button
            onClick={() => {
              if (sortBy === 'popular') setSortBy('price-low');
              else if (sortBy === 'price-low') setSortBy('price-high');
              else setSortBy('popular');
            }}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant text-on-surface font-body-sm text-[11px] whitespace-nowrap active:scale-95"
          >
            <span className="text-on-surface-variant font-spec-code-sm">Sort:</span>
            <span className="font-medium text-primary capitalize">
              {sortBy === 'popular' ? 'Popular & Featured' : sortBy === 'price-low' ? 'Price: Low-High' : 'Price: High-Low'}
            </span>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
          </button>

          {/* Active Brand Pill */}
          {activeBrands.length > 0 && (
            <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-container/10 border border-primary-container text-primary-container font-body-sm text-[11px] whitespace-nowrap">
              <span className="font-spec-code-sm">Brand:</span>
              <span className="font-semibold">{activeBrands.join(', ')}</span>
              <span
                onClick={() => setActiveBrands([])}
                className="material-symbols-outlined text-[14px] cursor-pointer ml-1 text-primary-container"
              >
                close
              </span>
            </div>
          )}

          {/* Active Price Range Pill */}
          {pricePillActive && (
            <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-container/10 border border-primary-container text-primary-container font-body-sm text-[11px] whitespace-nowrap">
              <span className="font-spec-code-sm">Price:</span>
              <span className="font-semibold">$500-$3000</span>
              <span
                onClick={() => setPricePillActive(false)}
                className="material-symbols-outlined text-[14px] cursor-pointer ml-1 text-primary-container"
              >
                close
              </span>
            </div>
          )}

          {/* Active RAM Pill */}
          {ramPillActive && (
            <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-container/10 border border-primary-container text-primary-container font-body-sm text-[11px] whitespace-nowrap">
              <span className="font-spec-code-sm">RAM:</span>
              <span className="font-semibold">32GB+</span>
              <span
                onClick={() => setRamPillActive(false)}
                className="material-symbols-outlined text-[14px] cursor-pointer ml-1 text-primary-container"
              >
                close
              </span>
            </div>
          )}

          {/* GPU Pill */}
          <button
            onClick={() => setGpuPillActive(!gpuPillActive)}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full font-body-sm text-[11px] whitespace-nowrap transition-colors ${
              gpuPillActive
                ? 'bg-primary-container/10 border border-primary-container text-primary-container'
                : 'bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary-container'
            }`}
          >
            <span>GPU: RTX 40-Series</span>
          </button>

          {/* In Stock Only */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full font-body-sm text-[11px] whitespace-nowrap transition-colors ${
              inStockOnly
                ? 'bg-primary-container/10 border border-primary-container text-primary-container'
                : 'bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary-container'
            }`}
          >
            <span>In Stock Only</span>
          </button>
        </div>

        {/* Product Catalog Bento Grid */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          {/* Card 1: Featured Razer Blade 16 OLED (Full Width Showcase Card) */}
          {featuredProduct && (
            <div className="col-span-2 neo-card rounded-xl p-3.5 flex flex-col relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-44 h-44 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Top Badges Row */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-fixed font-badge-label text-[9px] tracking-wider uppercase font-bold">
                    TOP SELLER
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/40 font-spec-code-sm text-[9px] text-primary">
                    OLED 240Hz
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => alert('Added Razer Blade 16 to Hardware Comparison Matrix!')}
                    aria-label="Compare"
                    className="w-7 h-7 rounded-full bg-surface-container-high/80 flex items-center justify-center text-on-surface-variant hover:text-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">compare_arrows</span>
                  </button>
                  <button
                    onClick={() => onToggleWishlist(featuredProduct)}
                    aria-label="Save"
                    className={`w-7 h-7 rounded-full bg-surface-container-high/80 flex items-center justify-center transition-colors ${
                      isWishlisted(featuredProduct.id) ? 'text-error' : 'text-on-surface-variant hover:text-error'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: isWishlisted(featuredProduct.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>
              </div>

              {/* Product Image */}
              <div
                onClick={() => {
                  onSelectProduct(featuredProduct);
                  onNavigate('pdp');
                }}
                className="relative w-full h-36 my-2 flex items-center justify-center overflow-hidden rounded-lg bg-surface-container-lowest/60 border border-outline-variant/20 cursor-pointer"
              >
                <img
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                />
              </div>

              {/* Details & Specs */}
              <div className="flex flex-col z-10">
                <div className="flex items-baseline justify-between">
                  <span className="font-badge-label text-on-surface-variant text-[10px] tracking-wider">
                    {featuredProduct.brand.toUpperCase()} CORP
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-amber-400 fill-1">star</span>
                    <span className="font-spec-code text-on-surface text-[11px] font-bold">
                      {featuredProduct.rating}
                    </span>
                    <span className="font-body-sm text-outline text-[10px]">({featuredProduct.reviewsCount})</span>
                  </div>
                </div>

                <h2
                  onClick={() => {
                    onSelectProduct(featuredProduct);
                    onNavigate('pdp');
                  }}
                  className="font-headline-sm text-[16px] font-bold text-on-background mt-0.5 cursor-pointer hover:text-primary-container transition-colors"
                >
                  {featuredProduct.name}
                </h2>

                {/* Spec Chips Strip */}
                <div className="flex flex-wrap items-center gap-1.5 my-2">
                  {featuredProduct.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30 font-spec-code-sm text-[10px] text-on-surface-variant"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 mt-1">
                  <div className="flex flex-col">
                    <span className="font-display-hero text-[22px] leading-tight text-primary-container font-extrabold tracking-tight">
                      ${featuredProduct.price.toLocaleString()}
                    </span>
                    <span className="font-spec-code-sm text-[9px] text-outline">Ships in 24 Hours</span>
                  </div>
                  <button
                    onClick={() => onAddToCart(featuredProduct)}
                    className="h-9 px-3.5 rounded-lg bg-primary-container text-on-primary-fixed font-label-action text-[13px] font-bold flex items-center gap-1.5 glow-cyan active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[17px]">add_shopping_cart</span>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2-Column Product Cards */}
          {gridProducts.map((prod) => (
            <div
              key={prod.id}
              className={`${
                viewMode === 'list' ? 'col-span-2' : 'col-span-1'
              } neo-card rounded-xl p-3 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`px-1.5 py-0.5 rounded font-badge-label text-[8px] uppercase font-bold ${
                      prod.badges?.[0]?.includes('SALE')
                        ? 'bg-error-container text-error'
                        : 'bg-secondary-container/50 border border-secondary/30 text-secondary'
                    }`}
                  >
                    {prod.badges?.[0] || 'FLAGSHIP'}
                  </span>
                  <button
                    onClick={() => onToggleWishlist(prod)}
                    className={`transition-colors ${
                      isWishlisted(prod.id) ? 'text-error' : 'text-on-surface-variant hover:text-error'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: isWishlisted(prod.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div
                  onClick={() => {
                    onSelectProduct(prod);
                    onNavigate('pdp');
                  }}
                  className="w-full h-24 my-1.5 rounded-lg bg-surface-container-lowest/60 border border-outline-variant/20 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <img
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    src={prod.image}
                    alt={prod.name}
                  />
                </div>

                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[12px] text-amber-400 fill-1">star</span>
                  <span className="font-spec-code text-on-surface text-[10px] font-bold">{prod.rating}</span>
                  <span className="font-body-sm text-outline text-[9px]">({prod.reviewsCount})</span>
                </div>

                <h3
                  onClick={() => {
                    onSelectProduct(prod);
                    onNavigate('pdp');
                  }}
                  className="font-headline-sm text-[14px] leading-snug text-on-background line-clamp-1 mt-0.5 cursor-pointer hover:text-primary-container transition-colors"
                >
                  {prod.name}
                </h3>
                <p className="font-body-sm text-[10px] text-outline-variant line-clamp-1">{prod.subtitle}</p>

                <div className="flex flex-col gap-1 my-2">
                  {prod.specs.slice(0, 2).map((spec, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant/30 font-spec-code-sm text-[9px] text-on-surface-variant truncate"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 mt-1">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-primary-container text-[15px] font-bold">
                    ${prod.price.toLocaleString()}
                  </span>
                  {prod.originalPrice && (
                    <span className="font-spec-code-sm text-[9px] text-outline line-through">
                      ${prod.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="w-8 h-8 rounded-lg bg-surface-container-high border border-primary-container/40 text-primary-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-fixed transition-colors active:scale-90"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Active Filters Floating Quick Bar */}
        <div className="w-full mt-2 mb-4 p-2.5 rounded-xl bg-surface-container-low/90 backdrop-blur-md border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[18px]">filter_alt</span>
            <span className="font-body-sm text-[11px] text-on-surface">
              {activeParamCount} parameters active • Showing 142 items
            </span>
          </div>
          <button
            onClick={handleResetFilters}
            className="text-primary-container hover:underline font-label-action text-[11px] flex items-center gap-1 active:scale-95"
          >
            <span>Reset all</span>
            <span className="material-symbols-outlined text-[14px]">refresh</span>
          </button>
        </div>
      </main>
    </div>
  );
};

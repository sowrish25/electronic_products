import React, { useState, useEffect } from 'react';
import { Product, ScreenType } from '../types';
import { HERO_PRODUCT, FLASH_DEALS, RECOMMENDED_PRODUCTS } from '../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  deliveryLocation: string;
  onOpenLocationModal: () => void;
  onSelectCategory: (category: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  deliveryLocation,
  onOpenLocationModal,
  onSelectCategory
}) => {
  const [selectedPill, setSelectedPill] = useState('All Gadgets');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time ticking timers for excitement and immersion
  const [heroSeconds, setHeroSeconds] = useState(15502); // 04:18:22
  const [flashSeconds, setFlashSeconds] = useState(9912); // 02:45:12

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSeconds((prev) => (prev > 0 ? prev - 1 : 15502));
      setFlashSeconds((prev) => (prev > 0 ? prev - 1 : 9912));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatHeroTimer = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const formatFlashTimer = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}h : ${m}m : ${s}s`;
  };

  const categories = [
    { name: 'All Gadgets', icon: 'widgets', fill: true },
    { name: 'Smartphones', icon: 'smartphone' },
    { name: 'Laptops & PCs', icon: 'laptop_mac' },
    { name: 'Audio & ANC', icon: 'headphones' },
    { name: 'Wearables', icon: 'watch' },
    { name: 'Gaming Consoles', icon: 'sports_esports' },
    { name: 'Smart Home', icon: 'home_iot_device' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectCategory(selectedPill === 'All Gadgets' ? '' : selectedPill);
    onNavigate('catalog');
  };

  return (
    <main className="pt-16 px-4 space-y-6 max-w-lg mx-auto md:max-w-4xl pb-24">
      {/* Mobile Location Micro-bar */}
      <div className="flex sm:hidden items-center justify-between py-1.5 px-3 bg-surface-container-low/80 rounded-lg border border-outline-variant/30">
        <button
          onClick={onOpenLocationModal}
          className="flex items-center gap-1.5 text-on-surface-variant text-left"
        >
          <span className="material-symbols-outlined text-primary-container text-[16px]">location_on</span>
          <span className="font-spec-code-sm text-[11px]">
            Deliver: <span className="text-primary font-medium">{deliveryLocation}</span>
          </span>
        </button>
        <button
          onClick={onOpenLocationModal}
          className="font-spec-code-sm text-[11px] text-primary-container flex items-center hover:underline"
        >
          Change <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </button>
      </div>

      {/* Search Bar */}
      <section className="relative">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center w-full h-12 bg-surface-container-lowest/90 rounded-xl border border-outline-variant/60 focus-within:border-primary-container focus-within:shadow-[0_0_15px_rgba(0,242,254,0.25)] transition-all duration-300"
        >
          <div className="pl-3.5 pr-2 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-[20px] text-primary-container">search</span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-on-surface placeholder:text-outline/70 font-body-md text-[13px] focus:outline-none focus:ring-0 border-0 p-0"
            placeholder="Search 4K OLED, RTX 4090, M3 Max..."
            type="text"
          />
          <div className="flex items-center gap-1 pr-2.5">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('Apex Pro ANC');
                onNavigate('catalog');
              }}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high/60 transition-colors"
              title="Voice Search"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('hub')}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high/60 transition-colors"
              title="Scan QR / Barcode"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            </button>
          </div>
        </form>
      </section>

      {/* Category Pills (Horizontal Scroll) */}
      <section className="-mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-2.5 py-1">
        {categories.map((cat) => {
          const isActive = selectedPill === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedPill(cat.name);
                if (cat.name !== 'All Gadgets') {
                  onSelectCategory(cat.name);
                  onNavigate('catalog');
                }
              }}
              className={`flex items-center gap-1.5 h-9 rounded-full font-label-action text-[13px] whitespace-nowrap active:scale-95 transition-all ${
                isActive
                  ? 'px-4 bg-primary-container text-on-primary-fixed font-semibold shadow-[0_0_14px_rgba(0,242,254,0.4)]'
                  : 'px-3.5 bg-surface-container-low border border-outline-variant/40 text-on-surface-variant hover:text-primary hover:border-primary-container/40'
              }`}
            >
              <span
                className="material-symbols-outlined text-[17px]"
                style={{ fontVariationSettings: isActive && cat.fill ? "'FILL' 1" : "'FILL' 0" }}
              >
                {cat.icon}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </section>

      {/* Featured Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-primary-container/30 bg-gradient-to-br from-surface-container-high/90 via-surface-container-low to-surface-container-lowest p-5 glow-cyan-card backdrop-blur-xl">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-container/15 border border-primary-container/50 text-primary-container font-badge-label text-[10px] glow-cyan-badge tracking-wider font-bold">
                NEW RELEASE
              </span>
              <div className="flex items-center gap-1 text-on-surface-variant font-spec-code-sm text-[10px]">
                <span className="material-symbols-outlined text-[14px] text-error">timer</span>
                <span>
                  Ends in <span className="text-primary font-semibold">{formatHeroTimer(heroSeconds)}</span>
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {HERO_PRODUCT.name}
              </h2>
              <p className="font-body-md text-[13px] text-on-surface-variant mt-1">
                {HERO_PRODUCT.subtitle}
              </p>
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-headline-lg text-2xl font-bold text-primary-container">$349.99</span>
              <span className="font-spec-code text-[12px] line-through text-outline">$429.99</span>
              <span className="font-badge-label text-[10px] text-secondary px-1.5 py-0.5 rounded bg-secondary-container/40 border border-secondary/30">
                -18%
              </span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  onSelectProduct(HERO_PRODUCT);
                  onNavigate('pdp');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary-fixed font-label-action text-[14px] font-bold glow-cyan-button active:scale-95 transition-transform"
              >
                <span>Explore Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => onToggleWishlist(HERO_PRODUCT)}
                aria-label="Bookmark product"
                className={`flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-high border transition-colors ${
                  isWishlisted(HERO_PRODUCT.id)
                    ? 'border-primary-container text-primary-container'
                    : 'border-outline-variant/40 text-on-surface-variant hover:text-primary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isWishlisted(HERO_PRODUCT.id) ? 'bookmark' : 'bookmark_add'}
                </span>
              </button>
            </div>
          </div>

          <div
            onClick={() => {
              onSelectProduct(HERO_PRODUCT);
              onNavigate('pdp');
            }}
            className="sm:col-span-5 relative flex items-center justify-center min-h-[160px] cursor-pointer group"
          >
            <div className="absolute inset-0 rounded-full bg-primary-container/10 filter blur-xl group-hover:bg-primary-container/20 transition-all"></div>
            <img
              className="relative z-10 w-44 h-44 object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
              src={HERO_PRODUCT.image}
              alt={HERO_PRODUCT.name}
            />
          </div>
        </div>
      </section>

      {/* Flash Tech Deals */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-error-container/30 border border-error/40 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[18px] fill-1">local_fire_department</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Flash Tech Deals</h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high border border-outline-variant/30">
            <span className="material-symbols-outlined text-[14px] text-error">schedule</span>
            <span className="font-spec-code-sm text-[10px] font-semibold text-primary">
              {formatFlashTimer(flashSeconds)}
            </span>
          </div>
        </div>

        <div className="-mx-4 px-4 overflow-x-auto no-scrollbar flex items-stretch gap-3.5 pb-2">
          {FLASH_DEALS.map((item) => (
            <div
              key={item.id}
              className="min-w-[260px] sm:min-w-[280px] p-3.5 rounded-xl bg-surface-container/70 border border-outline-variant/40 hover:border-primary-container/40 transition-colors flex flex-col justify-between backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-badge-label text-[10px] px-2 py-0.5 rounded bg-error-container/60 text-error border border-error/40 font-bold">
                    {item.badges?.[0]}
                  </span>
                  <button
                    onClick={() => onToggleWishlist(item)}
                    className={`transition-colors ${
                      isWishlisted(item.id) ? 'text-error' : 'text-on-surface-variant hover:text-error'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: isWishlisted(item.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div
                  onClick={() => {
                    onSelectProduct(item);
                    onNavigate('pdp');
                  }}
                  className="relative w-full h-32 flex items-center justify-center rounded-lg bg-surface-container-lowest/60 border border-outline-variant/20 overflow-hidden mb-3 cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-container/5 to-transparent"></div>
                  <img
                    className="w-28 h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  {item.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="font-spec-code-sm text-[9px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant border border-outline-variant/30"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <h4
                  onClick={() => {
                    onSelectProduct(item);
                    onNavigate('pdp');
                  }}
                  className="font-headline-sm text-[15px] font-semibold text-on-surface line-clamp-1 cursor-pointer hover:text-primary-container transition-colors"
                >
                  {item.name}
                </h4>
                <p className="font-body-sm text-[11px] text-outline mt-0.5 line-clamp-1">{item.subtitle}</p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-outline-variant/30">
                <div>
                  <div className="font-headline-sm text-headline-sm font-bold text-primary-container">
                    ${item.price.toLocaleString()}
                  </div>
                  {item.originalPrice && (
                    <div className="font-spec-code-sm text-[10px] line-through text-outline">
                      ${item.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onAddToCart(item)}
                  aria-label={`Add ${item.name} to cart`}
                  className="w-9 h-9 rounded-lg bg-primary-container/15 border border-primary-container/50 text-primary-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-fixed transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Categories (2x2 Bento Grid) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Trending Categories</h3>
          <button
            onClick={() => {
              onSelectCategory('');
              onNavigate('catalog');
            }}
            className="font-spec-code text-[12px] text-primary-container flex items-center hover:underline"
          >
            View Matrix <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => {
              onSelectCategory('Gaming Consoles');
              onNavigate('catalog');
            }}
            className="group relative overflow-hidden rounded-xl bg-surface-container-low/80 border border-outline-variant/40 hover:border-primary-container/50 transition-all p-3.5 flex flex-col justify-between h-36 backdrop-blur-md cursor-pointer"
          >
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-primary-container/10 rounded-full blur-xl group-hover:bg-primary-container/20 transition-all"></div>
            <div className="flex justify-between items-start z-10">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[18px]">sports_esports</span>
              </div>
              <span className="font-spec-code-sm text-[10px] text-outline">140+ Units</span>
            </div>
            <div className="z-10">
              <h4 className="font-headline-sm text-[15px] font-bold text-on-surface group-hover:text-primary-container transition-colors">
                Gaming Rigs
              </h4>
              <p className="font-spec-code-sm text-[10px] text-outline">RTX 4090 • Liquid Cooled</p>
            </div>
          </div>

          <div
            onClick={() => {
              onSelectCategory('Audio & ANC');
              onNavigate('catalog');
            }}
            className="group relative overflow-hidden rounded-xl bg-surface-container-low/80 border border-outline-variant/40 hover:border-secondary/50 transition-all p-3.5 flex flex-col justify-between h-36 backdrop-blur-md cursor-pointer"
          >
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:bg-secondary/20 transition-all"></div>
            <div className="flex justify-between items-start z-10">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">headset</span>
              </div>
              <span className="font-spec-code-sm text-[10px] text-outline">85+ Units</span>
            </div>
            <div className="z-10">
              <h4 className="font-headline-sm text-[15px] font-bold text-on-surface group-hover:text-secondary transition-colors">
                True Wireless
              </h4>
              <p className="font-spec-code-sm text-[10px] text-outline">ANC 2.0 • LDAC Lossless</p>
            </div>
          </div>

          <div
            onClick={() => {
              onSelectCategory('Creator Cameras');
              onNavigate('catalog');
            }}
            className="group relative overflow-hidden rounded-xl bg-surface-container-low/80 border border-outline-variant/40 hover:border-primary-container/50 transition-all p-3.5 flex flex-col justify-between h-36 backdrop-blur-md cursor-pointer"
          >
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-primary-container/10 rounded-full blur-xl group-hover:bg-primary-container/20 transition-all"></div>
            <div className="flex justify-between items-start z-10">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </div>
              <span className="font-spec-code-sm text-[10px] text-outline">62+ Units</span>
            </div>
            <div className="z-10">
              <h4 className="font-headline-sm text-[15px] font-bold text-on-surface group-hover:text-primary-container transition-colors">
                Creator Cameras
              </h4>
              <p className="font-spec-code-sm text-[10px] text-outline">8K Cinema • Full Frame</p>
            </div>
          </div>

          <div
            onClick={() => {
              onSelectCategory('Smartphones');
              onNavigate('catalog');
            }}
            className="group relative overflow-hidden rounded-xl bg-surface-container-low/80 border border-outline-variant/40 hover:border-primary-container/50 transition-all p-3.5 flex flex-col justify-between h-36 backdrop-blur-md cursor-pointer"
          >
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-primary-container/10 rounded-full blur-xl group-hover:bg-primary-container/20 transition-all"></div>
            <div className="flex justify-between items-start z-10">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[18px]">smartphone</span>
              </div>
              <span className="font-spec-code-sm text-[10px] text-outline">110+ Units</span>
            </div>
            <div className="z-10">
              <h4 className="font-headline-sm text-[15px] font-bold text-on-surface group-hover:text-primary-container transition-colors">
                Flagship Phones
              </h4>
              <p className="font-spec-code-sm text-[10px] text-outline">Titanium • Gen 3 AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended For You */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Recommended For You</h3>
            <p className="font-spec-code-sm text-[10px] text-outline">Calibrated to your hardware preferences</p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary-container font-spec-code text-[12px]"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Filter</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {RECOMMENDED_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col justify-between rounded-xl bg-surface-container/85 border border-outline-variant/30 p-3 hover:border-primary-container/50 transition-all backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-badge-label text-[9px] px-1.5 py-0.5 rounded bg-primary-container/20 text-primary-container font-bold border border-primary-container/40">
                    {prod.badges?.[0] || 'TOP'}
                  </span>
                  <button
                    onClick={() => onToggleWishlist(prod)}
                    className={`transition-colors ${
                      isWishlisted(prod.id) ? 'text-error' : 'text-on-surface-variant hover:text-error'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
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
                  className="relative w-full aspect-square rounded-lg bg-surface-container-lowest/70 border border-outline-variant/20 flex items-center justify-center p-2 mb-2 cursor-pointer group"
                >
                  <img
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    src={prod.image}
                    alt={prod.name}
                  />
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {prod.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="font-spec-code-sm text-[9px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <h4
                  onClick={() => {
                    onSelectProduct(prod);
                    onNavigate('pdp');
                  }}
                  className="font-headline-sm text-[14px] font-semibold text-on-surface leading-snug line-clamp-1 cursor-pointer hover:text-primary-container transition-colors"
                >
                  {prod.name}
                </h4>

                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] text-amber-400 fill-1">star</span>
                  <span className="font-spec-code-sm text-[10px] font-semibold text-on-surface">{prod.rating}</span>
                  <span className="font-body-sm text-[10px] text-outline">({prod.reviewsCount})</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-outline-variant/20">
                <div>
                  <div className="font-headline-sm text-[15px] font-bold text-primary-container">${prod.price}</div>
                  {prod.originalPrice && (
                    <div className="font-spec-code-sm text-[9px] line-through text-outline">
                      ${prod.originalPrice}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onAddToCart(prod)}
                  aria-label={`Add ${prod.name} to cart`}
                  className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-fixed flex items-center justify-center font-bold hover:shadow-[0_0_12px_rgba(0,242,254,0.6)] active:scale-90 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Trust Banner */}
      <section className="rounded-xl bg-surface-container-low/60 border border-outline-variant/30 p-4 grid grid-cols-3 gap-2 text-center">
        <div className="space-y-1">
          <span className="material-symbols-outlined text-primary-container text-[20px]">verified</span>
          <div className="font-headline-sm text-[13px] font-bold text-on-surface">100% Genuine</div>
          <div className="font-spec-code-sm text-[9px] text-outline">Direct OEM Sealed</div>
        </div>
        <div className="space-y-1 border-x border-outline-variant/30 px-1">
          <span className="material-symbols-outlined text-primary-container text-[20px]">local_shipping</span>
          <div className="font-headline-sm text-[13px] font-bold text-on-surface">Priority Express</div>
          <div className="font-spec-code-sm text-[9px] text-outline">Same-Day Dispatch</div>
        </div>
        <div className="space-y-1">
          <span className="material-symbols-outlined text-primary-container text-[20px]">shield</span>
          <div className="font-headline-sm text-[13px] font-bold text-on-surface">Pulse Care+</div>
          <div className="font-spec-code-sm text-[9px] text-outline">2-Year Tech Guard</div>
        </div>
      </section>
    </main>
  );
};

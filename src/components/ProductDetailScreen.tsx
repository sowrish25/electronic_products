import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (product: Product, selectedColor?: string, selectedEdition?: string, editionPrice?: number) => void;
  onInstantBuy: (product: Product, selectedColor?: string, selectedEdition?: string, totalPrice?: number) => void;
  onOpenTradeInModal: () => void;
  onOpenARModal: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onAddToCart,
  onInstantBuy,
  onOpenTradeInModal,
  onOpenARModal
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Cyber Obsidian');
  const [selectedEdition, setSelectedEdition] = useState<'standard' | 'studio'>('standard');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image, product.image, product.image, product.image, product.image];

  const colors = product.colors || [
    { name: 'Cyber Obsidian', hex: '#0d1117' },
    { name: 'Stealth Silver', hex: '#64748b' },
    { name: 'Neon Cyan Accent', hex: '#00f2fe' },
    { name: 'Matte Titanium', hex: '#334155' }
  ];

  const editionExtra = selectedEdition === 'studio' ? 50.00 : 0.00;
  const totalPrice = product.price + editionExtra;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedEdition === 'studio' ? 'Studio DAC Bundle' : 'Standard ANC', editionExtra);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleInteractive360 = () => {
    setIs360Active(true);
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  return (
    <main className="pt-16 px-4 max-w-md mx-auto space-y-5 pb-36">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary-fixed px-4 py-2 rounded-full font-label-action text-[13px] font-bold shadow-xl shadow-primary-container/30 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Added to Cart!</span>
        </div>
      )}

      {/* Multi-Angle Product Gallery */}
      <section className="relative rounded-xl bg-surface-container-lowest hairline-border overflow-hidden pt-4 pb-3">
        {/* Top Badges Layer */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <button
            type="button"
            onClick={onOpenARModal}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-dim/90 border border-primary-container/30 backdrop-blur-md hover:border-primary-container cursor-pointer transition-colors active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-badge-label text-[10px] text-primary-container tracking-wider">AR VIEW IN ROOM</span>
            <span className="material-symbols-outlined text-[14px] text-primary-container">view_in_ar</span>
          </button>
          <div className="pointer-events-auto px-2 py-0.5 rounded bg-surface-container-high/80 border border-outline-variant/40">
            <span className="font-spec-code text-[11px] text-on-surface-variant">
              {selectedImageIndex + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Centered Radial Glow & Product Image */}
        <div className="relative w-full aspect-square flex items-center justify-center p-6 my-2">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container/15 via-transparent to-transparent opacity-75"></div>
          <img
            style={{ transform: `rotateY(${rotationAngle}deg)`, transition: 'transform 0.4s ease-out' }}
            className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
            src={images[selectedImageIndex]}
            alt={product.name}
          />
        </div>

        {/* Controls Tray: 360-degree preview pill & pagination dots */}
        <div className="flex items-center justify-between px-4 pt-1">
          <button
            onClick={handleInteractive360}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/50 text-on-surface transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px] text-primary-container">360</span>
            <span className="font-label-action text-[12px] tracking-wide text-primary">
              {is360Active ? `Rotated ${rotationAngle}°` : 'Interactive 360°'}
            </span>
          </button>

          {/* Carousel Indicators */}
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  selectedImageIndex === i ? 'w-5 bg-primary-container' : 'w-1.5 bg-outline-variant hover:bg-outline'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Title & Pricing Section */}
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/40 font-badge-label text-[10px] text-primary-container tracking-widest uppercase">
            PULSE AUDIO • FLAGSHIP 2025
          </span>
        </div>

        <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
          {product.name} ANC Spatial Studio Headphones
        </h1>

        {/* Ratings & Sales Metric */}
        <div className="flex items-center gap-2 pt-0.5">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-[16px] fill-1">star</span>
            ))}
          </div>
          <span className="font-spec-code text-[12px] font-bold text-on-surface">4.9</span>
          <span className="font-body-sm text-[11px] text-on-surface-variant">(1,248 reviews)</span>
          <span className="text-outline">•</span>
          <span className="font-body-sm text-[11px] text-primary-container font-medium">2.4k sold this month</span>
        </div>

        {/* Pricing Stack */}
        <div className="pt-2 p-3.5 rounded-xl bg-surface-container-low hairline-border">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display-hero text-3xl font-bold text-primary-container tracking-tight">
              ${totalPrice.toFixed(2)}
            </span>
            <span className="font-body-lg text-[15px] text-outline line-through">$429.99</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-red-950/70 border border-red-500/40 text-red-300 font-badge-label text-[10px] tracking-wide">
              Save $80 (19% off)
            </span>
          </div>

          {/* PulsePay Financing Pill */}
          <div className="mt-2.5 pt-2 border-t border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary-fixed-dim">credit_card</span>
              <span className="font-body-sm text-[12px] text-on-surface">
                Or <strong className="text-primary font-semibold">$29.16/mo</strong> for 12 mos with 0% APR PulsePay
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
          </div>
        </div>
      </section>

      {/* Variant Selector */}
      <section className="space-y-3 pt-1">
        {/* Color Swatches */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label-action text-[14px] text-on-surface">Finish Selection</span>
            <span className="font-spec-code-sm text-[11px] text-primary-container font-bold">{selectedColor}</span>
          </div>
          <div className="flex items-center gap-3">
            {colors.map((c) => {
              const isSelected = selectedColor === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  aria-label={`Select ${c.name}`}
                  className={`w-9 h-9 rounded-full p-0.5 transition-all ${
                    isSelected
                      ? 'ring-2 ring-primary-container ring-offset-2 ring-offset-surface-dim'
                      : 'hover:ring-1 hover:ring-outline'
                  }`}
                >
                  <span
                    style={{ backgroundColor: c.hex }}
                    className="block w-full h-full rounded-full border border-outline-variant"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Edition Selection Tabs */}
        <div className="space-y-2">
          <label className="block font-label-action text-[14px] text-on-surface">Configuration Edition</label>
          <div className="grid grid-cols-2 gap-2">
            {/* Standard (Included) */}
            <div
              onClick={() => setSelectedEdition('standard')}
              className={`p-3 rounded-xl relative cursor-pointer transition-all ${
                selectedEdition === 'standard'
                  ? 'bg-surface-container-high border-2 border-primary-container shadow-[0_0_12px_rgba(0,242,254,0.15)]'
                  : 'bg-surface-container-low border border-outline-variant/40 hover:border-outline'
              }`}
            >
              {selectedEdition === 'standard' && (
                <div className="absolute top-2 right-2">
                  <span className="material-symbols-outlined text-[16px] text-primary-container fill-1">
                    check_circle
                  </span>
                </div>
              )}
              <p className="font-headline-sm text-[15px] leading-tight text-primary font-semibold">Standard ANC</p>
              <p className="font-spec-code-sm text-[10px] text-on-surface-variant mt-1">Lossless Wireless</p>
              <p className="font-spec-code text-[12px] font-bold text-primary-container mt-2">Included</p>
            </div>

            {/* Studio DAC Bundle */}
            <div
              onClick={() => setSelectedEdition('studio')}
              className={`p-3 rounded-xl relative cursor-pointer transition-all ${
                selectedEdition === 'studio'
                  ? 'bg-surface-container-high border-2 border-primary-container shadow-[0_0_12px_rgba(0,242,254,0.15)]'
                  : 'bg-surface-container-low border border-outline-variant/40 hover:border-outline'
              }`}
            >
              {selectedEdition === 'studio' && (
                <div className="absolute top-2 right-2">
                  <span className="material-symbols-outlined text-[16px] text-primary-container fill-1">
                    check_circle
                  </span>
                </div>
              )}
              <p className="font-headline-sm text-[15px] leading-tight text-on-surface font-semibold">Studio DAC Bundle</p>
              <p className="font-spec-code-sm text-[10px] text-on-surface-variant mt-1">High-Res USB-C 32-bit</p>
              <p className="font-spec-code text-[12px] font-bold text-secondary mt-2">+$50.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Tech Specs Matrix (4-Box Grid) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Architecture Specs</h2>
          <span className="font-spec-code-sm text-[10px] text-outline tracking-wider">SERIES IX DUAL CORE</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-xl bg-surface-container-low hairline-border relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary-container text-[22px]">
                battery_charging_full
              </span>
              <span className="font-badge-label text-[9px] text-primary-fixed-dim px-1.5 py-0.5 rounded bg-surface-container-high">
                FAST RECHARGE
              </span>
            </div>
            <p className="font-headline-sm text-[15px] text-on-surface font-semibold">45h Battery</p>
            <p className="font-spec-code-sm text-[10px] text-on-surface-variant mt-0.5">Fast charge: 15m = 6h</p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low hairline-border relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary-container text-[22px]">memory</span>
              <span className="font-badge-label text-[9px] text-secondary px-1.5 py-0.5 rounded bg-surface-container-high">
                SPATIAL
              </span>
            </div>
            <p className="font-headline-sm text-[15px] text-on-surface font-semibold">Dual H2 Chips</p>
            <p className="font-spec-code-sm text-[10px] text-on-surface-variant mt-0.5">Active Spatial tracking</p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low hairline-border relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary-container text-[22px]">graphic_eq</span>
              <span className="font-badge-label text-[9px] text-primary px-1.5 py-0.5 rounded bg-surface-container-high">
                32-BIT
              </span>
            </div>
            <p className="font-headline-sm text-[15px] text-on-surface font-semibold">Hi-Res Audio</p>
            <p className="font-spec-code-sm text-[10px] text-on-surface-variant mt-0.5">LDAC, aptX Adaptive</p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low hairline-border relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary-container text-[22px]">hearing</span>
              <span className="font-badge-label text-[9px] text-error px-1.5 py-0.5 rounded bg-surface-container-high">
                -48dB
              </span>
            </div>
            <p className="font-headline-sm text-[15px] text-on-surface font-semibold">Hybrid ANC 2.0</p>
            <p className="font-spec-code-sm text-[10px] text-on-surface-variant mt-0.5">Up to 48dB reduction</p>
          </div>
        </div>
      </section>

      {/* Trade-In Estimator Card */}
      <section className="p-4 rounded-xl bg-gradient-to-r from-surface-container to-surface-container-high hairline-border relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary-container">
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              <span className="font-label-action text-[13px] tracking-wide uppercase font-semibold">
                Hardware Trade-In Program
              </span>
            </div>
            <p className="font-headline-sm text-[16px] text-primary font-bold">Got an old pair?</p>
            <p className="font-body-md text-[13px] text-on-surface-variant">
              Trade-in and save up to <strong className="text-primary-container">$120</strong> towards this device
              immediately.
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-outline-variant/30 flex items-center justify-between">
          <span className="font-spec-code-sm text-[10px] text-outline">Instant diagnostic valuation</span>
          <button
            onClick={onOpenTradeInModal}
            className="px-3.5 py-1.5 rounded-lg bg-surface-dim hover:bg-surface-container border border-primary-container/40 text-primary-container font-label-action text-[13px] transition-colors active:scale-95"
          >
            Calculate Value
          </button>
        </div>
      </section>

      {/* Comprehensive Specs Accordion */}
      <section className="space-y-2">
        <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Technical Documentation</h2>
        <div className="space-y-2">
          {/* Audio Drivers */}
          <details className="group rounded-xl bg-surface-container-low hairline-border p-3.5" open>
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary-container text-[18px]">speaker</span>
                <span className="font-label-action text-[14px] text-on-surface font-semibold">
                  Audio Drivers &amp; Acoustics
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-outline-variant/30 grid grid-cols-2 gap-2 text-on-surface-variant">
              <div>
                <span className="font-spec-code-sm text-[10px] text-outline block">TRANSDUCER TYPE</span>
                <span className="font-spec-code text-[12px] text-on-surface">40mm Graphene-Coated</span>
              </div>
              <div>
                <span className="font-spec-code-sm text-[10px] text-outline block">FREQ RESPONSE</span>
                <span className="font-spec-code text-[12px] text-on-surface">4Hz – 45,000Hz</span>
              </div>
              <div className="mt-1">
                <span className="font-spec-code-sm text-[10px] text-outline block">IMPEDANCE</span>
                <span className="font-spec-code text-[12px] text-on-surface">32 Ohms</span>
              </div>
              <div className="mt-1">
                <span className="font-spec-code-sm text-[10px] text-outline block">TOTAL HARMONIC DIST</span>
                <span className="font-spec-code text-[12px] text-on-surface">&lt; 0.05% @ 1kHz</span>
              </div>
            </div>
          </details>

          {/* Connectivity */}
          <details className="group rounded-xl bg-surface-container-low hairline-border p-3.5">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary-container text-[18px]">bluetooth</span>
                <span className="font-label-action text-[14px] text-on-surface font-semibold">
                  Connectivity &amp; Bluetooth 5.4
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-outline-variant/30 space-y-1.5 text-on-surface-variant">
              <p className="font-body-sm text-[12px] text-on-surface">
                Bluetooth 5.4 LE Audio with Multi-point connection support (up to 3 simultaneous sources).
              </p>
              <p className="font-spec-code-sm text-[10px] text-outline">CODECS: LDAC, LC3, aptX Adaptive, AAC, SBC</p>
            </div>
          </details>

          {/* Weight & Materials */}
          <details className="group rounded-xl bg-surface-container-low hairline-border p-3.5">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary-container text-[18px]">tune</span>
                <span className="font-label-action text-[14px] text-on-surface font-semibold">Weight &amp; Materials</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-outline-variant/30 space-y-1.5 text-on-surface-variant">
              <p className="font-body-sm text-[12px] text-on-surface">
                254g total weight. Anodized aero-grade aluminum chassis, memory-foam protein leather magnetic cushions.
              </p>
            </div>
          </details>

          {/* What's in the Box */}
          <details className="group rounded-xl bg-surface-container-low hairline-border p-3.5">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary-container text-[18px]">inventory_2</span>
                <span className="font-label-action text-[14px] text-on-surface font-semibold">What's in the Box</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-outline-variant/30 space-y-1 text-on-surface-variant font-body-sm text-[12px]">
              <p>• Apex Vision Pro Headphones</p>
              <p>• Hard-shell ballistic travel case with magnetic cable slot</p>
              <p>• Braided USB-C to USB-C 1.5m lossless digital audio cord</p>
              <p>• 3.5mm gold-plated auxiliary audio connector</p>
            </div>
          </details>
        </div>
      </section>

      {/* Customer Review Highlight */}
      <section className="p-4 rounded-xl bg-surface-container-low hairline-border space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Acoustic Feedback</h2>
            <p className="font-spec-code-sm text-[10px] text-primary-container font-semibold">
              96% OF AUDIOPHILES RECOMMEND
            </p>
          </div>
          <div className="text-right">
            <span className="font-headline-lg text-2xl font-bold text-primary">4.9</span>
            <span className="font-spec-code-sm text-[10px] text-outline block">/ 5.0 RATING</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-2 text-[11px] font-spec-code-sm">
            <span className="w-8 text-on-surface-variant">5 Star</span>
            <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: '91%' }}></div>
            </div>
            <span className="w-7 text-right text-outline">91%</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-spec-code-sm">
            <span className="w-8 text-on-surface-variant">4 Star</span>
            <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary-container/60 rounded-full" style={{ width: '7%' }}></div>
            </div>
            <span className="w-7 text-right text-outline">7%</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-spec-code-sm">
            <span className="w-8 text-on-surface-variant">&lt; 3 Star</span>
            <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-outline rounded-full" style={{ width: '2%' }}></div>
            </div>
            <span className="w-7 text-right text-outline">2%</span>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-lg bg-surface-container border border-outline-variant/30 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px] fill-1">star</span>
              ))}
            </div>
            <span className="font-spec-code-sm text-[10px] text-primary-container flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[12px]">verified</span> Verified Owner
            </span>
          </div>
          <p className="font-body-md text-[13px] text-on-surface italic">
            "The spatial isolation easily outperforms my studio monitors. The transient response on lossless playback is pure perfection."
          </p>
          <p className="font-spec-code-sm text-[10px] text-outline">— Dr. Elena R., Sound Architect</p>
        </div>
      </section>

      {/* Sticky Bottom Action Bar */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-surface-dim/92 backdrop-blur-xl border-t border-outline-variant/40 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="min-w-[90px] flex flex-col justify-center">
            <span className="font-badge-label text-[9px] text-outline tracking-wider uppercase">TOTAL PAYABLE</span>
            <span className="font-headline-md text-xl font-bold text-primary-container leading-none">
              ${totalPrice.toFixed(2)}
            </span>
            <span className="font-spec-code-sm text-[10px] text-emerald-400 mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[11px]">bolt</span> Free 1-Day
            </span>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-2">
            <button
              onClick={handleAdd}
              className="h-11 rounded-xl bg-surface-container-high hover:bg-surface-bright border border-outline-variant/60 flex items-center justify-center gap-1.5 text-on-surface active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-primary-container">shopping_bag</span>
              <span className="font-label-action text-[13px] tracking-tight">Add to Cart</span>
            </button>
            <button
              onClick={() => onInstantBuy(product, selectedColor, selectedEdition, totalPrice)}
              className="h-11 rounded-xl bg-gradient-to-r from-primary-container to-primary-fixed-dim glow-cyan-btn text-on-primary-fixed font-label-action text-[13px] tracking-tight font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <span>Buy with</span>
              <span className="font-bold tracking-tight">Pay</span>
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
};

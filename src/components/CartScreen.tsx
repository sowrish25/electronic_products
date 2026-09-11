import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onTogglePulseCare: (id: string) => void;
  onProceedToCheckout: (total: number, fulfillmentMethod: string) => void;
  onNavigateCatalog: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onTogglePulseCare,
  onProceedToCheckout,
  onNavigateCatalog
}) => {
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [promoCodeInput, setPromoCodeInput] = useState('PULSE10');
  const [isPromoApplied, setIsPromoApplied] = useState(true);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const itemBase = item.product.price + (item.editionExtraPrice || 0);
    return acc + itemBase * item.quantity;
  }, 0);

  const pulseCareTotal = cartItems.reduce((acc, item) => {
    return acc + (item.hasPulseCare ? item.pulseCarePrice : 0);
  }, 0);

  const promoDiscount = isPromoApplied ? 20.00 : 0.00;
  const tax = subtotal > 0 ? +(subtotal * 0.0768).toFixed(2) : 0.00;
  const freeDeliveryThreshold = 460.00;
  const deliveryDistance = Math.max(0, +(freeDeliveryThreshold - subtotal).toFixed(2));
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const totalAmount = Math.max(0, +(subtotal - promoDiscount + pulseCareTotal + tax).toFixed(2));
  const splitAmount = +(totalAmount / 4).toFixed(2);

  const handleApplyPromo = () => {
    if (promoCodeInput.trim().toUpperCase() === 'PULSE10') {
      setIsPromoApplied(true);
    }
  };

  return (
    <main className="max-w-md mx-auto pt-16 px-4 pb-48">
      {/* Page Header & Badge */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-headline-lg text-2xl font-bold tracking-tight text-primary">My Tech Cart</h1>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/60 font-badge-label text-[10px] text-primary-container font-bold">
            {cartItems.length} items
          </span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined text-primary-container text-[16px]">verified_user</span>
          <span className="font-spec-code-sm text-[10px]">Encrypted</span>
        </div>
      </div>

      {/* Free Shipping Progress Bar */}
      <section className="mt-4 p-3.5 rounded-xl neo-glass border border-outline-variant/40 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[18px]">local_shipping</span>
            <p className="font-body-sm text-[11px] text-on-surface">
              {deliveryDistance > 0 ? (
                <>
                  Add <span className="font-spec-code text-[12px] text-primary-container font-bold">${deliveryDistance.toFixed(2)}</span> for FREE Express Priority Delivery
                </>
              ) : (
                <span className="text-emerald-400 font-bold">You have qualified for FREE Express Priority Delivery!</span>
              )}
            </p>
          </div>
          <span className="font-spec-code-sm text-[11px] text-primary-container font-bold">{freeDeliveryPercent}%</span>
        </div>
        {/* Progress Bar Track */}
        <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-primary-container to-secondary-fixed-dim rounded-full glow-cyan-sm transition-all duration-500"
            style={{ width: `${freeDeliveryPercent}%` }}
          />
        </div>
      </section>

      {/* Cart Items Section */}
      <section className="mt-4 space-y-3">
        {cartItems.length === 0 ? (
          <div className="p-8 text-center neo-glass rounded-xl space-y-3">
            <span className="material-symbols-outlined text-5xl text-outline">shopping_bag</span>
            <p className="text-on-surface-variant text-sm">Your cart is currently empty.</p>
            <button
              onClick={onNavigateCatalog}
              className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-fixed font-bold text-xs"
            >
              Explore Tech Catalog
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <article
              key={item.id}
              className="p-3.5 rounded-xl neo-glass border border-outline-variant/30 flex flex-col gap-3"
            >
              <div className="flex gap-3">
                {/* Thumbnail Media Well */}
                <div className="w-20 h-20 rounded-lg bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-primary-container/5 rounded-lg"></div>
                  <img
                    className="w-16 h-16 object-contain z-10"
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-1">
                    <div>
                      <h2 className="font-headline-sm text-[14px] font-semibold text-primary leading-tight">
                        {item.product.name}
                      </h2>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {item.selectedColor && (
                          <span className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant/40 font-spec-code-sm text-[9px] text-on-surface-variant">
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedEdition && (
                          <span className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant/40 font-spec-code-sm text-[9px] text-primary-container">
                            {item.selectedEdition}
                          </span>
                        )}
                        {!item.selectedEdition && item.product.specs?.[0] && (
                          <span className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant/40 font-spec-code-sm text-[9px] text-on-surface-variant">
                            {item.product.specs[0]}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.product.name}`}
                      className="text-on-surface-variant hover:text-error transition-colors p-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  {/* Price & Stepper Row */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-headline-sm text-[16px] font-bold text-primary-container">
                      ${((item.product.price + (item.editionExtraPrice || 0)) * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Decrease Quantity"
                        className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-all rounded"
                      >
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </button>
                      <span className="w-7 text-center font-spec-code text-[12px] text-on-surface font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="Increase Quantity"
                        className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-all rounded"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional PulseCare Toggle */}
              {item.pulseCarePrice > 0 && (
                <label className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 cursor-pointer hover:border-primary-container/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] fill-1">
                      shield
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-[12px] text-primary font-medium">
                        PulseCare+ 2-Yr Accidental Protection
                      </span>
                      <span className="font-spec-code-sm text-[10px] text-on-surface-variant">
                        Covers liquid, drop &amp; electrical surges
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-spec-code text-[11px] text-primary-container font-semibold">+$39.99</span>
                    <input
                      type="checkbox"
                      checked={item.hasPulseCare}
                      onChange={() => onTogglePulseCare(item.id)}
                      className="w-4 h-4 rounded bg-surface-container-lowest border-outline-variant text-primary-container focus:ring-primary-container"
                    />
                  </div>
                </label>
              )}
            </article>
          ))
        )}
      </section>

      {/* Fulfillment Method Selector */}
      <section className="mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-headline-sm text-[15px] font-bold text-primary">Fulfillment Method</h3>
          <span className="font-badge-label text-[10px] text-on-surface-variant">SELECT OPTION</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Option A: Express Delivery */}
          <div
            onClick={() => setFulfillmentMethod('delivery')}
            className={`p-3 rounded-xl cursor-pointer relative flex flex-col justify-between transition-all ${
              fulfillmentMethod === 'delivery'
                ? 'neo-glass-selected'
                : 'neo-glass border border-outline-variant/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-lg fill-1">bolt</span>
              </div>
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  fulfillmentMethod === 'delivery' ? 'border-primary-container' : 'border-outline-variant'
                }`}
              >
                {fulfillmentMethod === 'delivery' && <span className="w-2 h-2 rounded-full bg-primary-container"></span>}
              </span>
            </div>
            <div>
              <p className="font-label-action text-[13px] text-primary font-bold">Express Delivery</p>
              <p className="font-spec-code-sm text-[10px] text-primary-container mt-0.5">Tomorrow, 2 - 6 PM</p>
              <p className="font-badge-label text-[9px] text-on-surface-variant mt-1">Direct to doorstep</p>
            </div>
          </div>

          {/* Option B: Instant Store Pickup */}
          <div
            onClick={() => setFulfillmentMethod('pickup')}
            className={`p-3 rounded-xl cursor-pointer relative flex flex-col justify-between transition-all ${
              fulfillmentMethod === 'pickup'
                ? 'neo-glass-selected'
                : 'neo-glass border border-outline-variant/40 hover:border-outline-variant/70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">storefront</span>
              </div>
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  fulfillmentMethod === 'pickup' ? 'border-primary-container' : 'border-outline-variant'
                }`}
              >
                {fulfillmentMethod === 'pickup' && <span className="w-2 h-2 rounded-full bg-primary-container"></span>}
              </span>
            </div>
            <div>
              <p className="font-label-action text-[13px] text-on-surface font-bold">Instant Pickup</p>
              <p className="font-spec-code-sm text-[10px] text-on-surface-variant mt-0.5">Ready in 2 hours</p>
              <p className="font-badge-label text-[9px] text-outline mt-1">Downtown Tech Hub</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Voucher / Promo Code Input */}
      <section className="mt-5 neo-glass p-3.5 rounded-xl border border-outline-variant/30">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
              confirmation_number
            </span>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg pl-9 pr-3 py-2 font-spec-code text-[11px] text-on-surface placeholder:text-outline focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none uppercase"
              placeholder="Enter promo or trade-in code"
              type="text"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
            />
          </div>
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 bg-surface-container border border-primary-container/60 hover:bg-primary-container hover:text-surface-dim font-label-action text-[13px] text-primary-container rounded-lg transition-all active:scale-95 font-semibold"
          >
            Apply
          </button>
        </div>

        {/* Active Applied Tag */}
        {isPromoApplied && (
          <div className="mt-2.5 flex items-center justify-between p-2 rounded-lg bg-primary-container/10 border border-primary-container/30">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-container text-[14px] fill-1">check_circle</span>
              <span className="font-spec-code-sm text-[10px] text-primary">PULSE10 applied</span>
              <span className="font-badge-label text-[10px] text-primary-container font-bold">(-$20.00)</span>
            </div>
            <button
              onClick={() => setIsPromoApplied(false)}
              aria-label="Remove Promo Code"
              className="text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        )}
      </section>

      {/* Express 1-Tap Checkout Section */}
      <section className="mt-5 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="h-px flex-1 bg-outline-variant/40"></span>
          <span className="font-badge-label text-[9px] text-on-surface-variant uppercase tracking-wider">
            Express Instant Checkout
          </span>
          <span className="h-px flex-1 bg-outline-variant/40"></span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onProceedToCheckout(totalAmount, fulfillmentMethod)}
            className="h-11 bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/50 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <span className="font-headline-sm text-[15px] font-bold tracking-tight text-white flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">phone_iphone</span> Pay
            </span>
          </button>

          <button
            onClick={() => onProceedToCheckout(totalAmount, fulfillmentMethod)}
            className="h-11 bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/50 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <span className="font-headline-sm text-[15px] font-bold tracking-tight text-white flex items-center gap-1">
              <span className="text-primary-container font-bold">G</span>Pay
            </span>
          </button>
        </div>

        {/* PulsePay Split Payment Strip */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">pie_chart</span>
            <span className="font-body-sm text-[12px] text-on-surface">Split into 4 interest-free payments</span>
          </div>
          <span className="font-spec-code text-[12px] font-bold text-secondary">
            4 × ${splitAmount.toFixed(2)}
          </span>
        </div>
      </section>

      {/* Order Summary Card */}
      <section className="mt-5 p-4 rounded-xl neo-glass border border-outline-variant/40 space-y-2.5">
        <h3 className="font-headline-sm text-[16px] font-bold text-primary mb-3">Order Summary</h3>
        <div className="flex justify-between items-center text-body-md text-[13px]">
          <span className="text-on-surface-variant">Subtotal</span>
          <span className="font-spec-code text-[12px] text-on-surface">${subtotal.toFixed(2)}</span>
        </div>
        {isPromoApplied && (
          <div className="flex justify-between items-center text-body-md text-[13px]">
            <span className="text-on-surface-variant flex items-center gap-1">
              Promotional Discount
              <span className="font-badge-label text-[9px] text-primary-container bg-primary-container/10 px-1 rounded">
                10%
              </span>
            </span>
            <span className="font-spec-code text-[12px] text-primary-container font-medium">-$20.00</span>
          </div>
        )}
        {pulseCareTotal > 0 && (
          <div className="flex justify-between items-center text-body-md text-[13px]">
            <span className="text-on-surface-variant">PulseCare+ Protection (2-Yr)</span>
            <span className="font-spec-code text-[12px] text-on-surface">+${pulseCareTotal.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-body-md text-[13px]">
          <span className="text-on-surface-variant">Estimated Tax (HST/GST)</span>
          <span className="font-spec-code text-[12px] text-on-surface">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-body-md text-[13px]">
          <span className="text-on-surface-variant flex items-center gap-1">
            Express Priority Shipping
            <span className="font-badge-label text-[9px] text-primary-container font-semibold">TIER 1</span>
          </span>
          <span className="font-spec-code text-[12px] text-primary-container font-bold">FREE</span>
        </div>
        <div className="pt-3 border-t border-outline-variant/40 flex justify-between items-center">
          <div>
            <span className="font-headline-sm text-[16px] text-primary font-bold">Total Amount</span>
            <p className="font-spec-code-sm text-[10px] text-on-surface-variant">Includes all local taxes</p>
          </div>
          <div className="text-right">
            <span className="font-headline-lg text-2xl font-bold text-primary-container">
              ${totalAmount.toFixed(2)}
            </span>
            <p className="font-badge-label text-[10px] text-on-surface-variant">USD</p>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Checkout Action Dock */}
      <aside className="fixed bottom-20 left-0 right-0 z-40 max-w-md mx-auto px-4 pointer-events-none">
        <div className="p-3 neo-glass rounded-2xl border border-primary-container/30 glow-cyan-sm pointer-events-auto backdrop-blur-xl bg-surface-dim/95">
          <button
            onClick={() => onProceedToCheckout(totalAmount, fulfillmentMethod)}
            disabled={cartItems.length === 0}
            className="w-full h-12 bg-gradient-to-r from-primary-container to-primary-fixed-dim hover:opacity-95 text-on-primary-fixed font-label-action text-[14px] font-bold rounded-xl flex items-center justify-between px-4 glow-cyan-btn transition-all active:scale-98 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] fill-1">lock</span>
              <span>Proceed to Checkout</span>
            </div>
            <div className="flex items-center gap-1.5 font-spec-code text-[13px] font-bold">
              <span>${totalAmount.toFixed(2)}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-on-surface-variant font-spec-code-sm text-[10px]">
            <span className="material-symbols-outlined text-primary-container text-[13px]">verified</span>
            <span>Guaranteed safe &amp; secure 256-bit encrypted checkout</span>
          </div>
        </div>
      </aside>
    </main>
  );
};

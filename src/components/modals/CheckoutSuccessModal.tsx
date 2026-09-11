import React from 'react';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  fulfillmentMethod: string;
  onViewHub: () => void;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  orderTotal,
  fulfillmentMethod,
  onViewHub
}) => {
  if (!isOpen) return null;

  const orderId = `PT-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-surface-container-low border border-primary-container/60 rounded-3xl p-5 shadow-2xl text-center space-y-4 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Success Animated Beacon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-container/20 border border-primary-container text-primary-container flex items-center justify-center relative glow-cyan">
          <span className="material-symbols-outlined text-3xl fill-1 animate-in zoom-in">check_circle</span>
        </div>

        <div>
          <span className="font-badge-label text-[10px] text-primary-container uppercase tracking-wider font-bold">
            TRANSACTION CONFIRMED
          </span>
          <h2 className="font-headline-lg text-xl font-bold text-on-surface mt-1">
            Dispatch Sequence Initialized
          </h2>
          <p className="font-spec-code-sm text-[11px] text-on-surface-variant mt-0.5">
            Encrypted Order ID: <strong className="text-primary font-semibold">{orderId}</strong>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Total Paid:</span>
            <span className="font-spec-code text-[13px] font-bold text-primary-container">
              ${orderTotal.toFixed(2)} USD
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Fulfillment:</span>
            <span className="font-spec-code text-[11px] text-on-surface capitalize">
              {fulfillmentMethod === 'delivery' ? 'Express Doorstep Delivery' : 'Instant Store Pickup'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Estimated Dispatch:</span>
            <span className="font-spec-code text-[11px] text-emerald-400 font-bold">Within 2 Hours</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onViewHub();
            }}
            className="w-full py-3 rounded-xl bg-primary-container text-on-primary-fixed font-label-action text-[13px] font-bold glow-cyan active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">radar</span>
            <span>Track in Pulse Hub</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl text-on-surface-variant hover:text-on-surface font-label-action text-xs"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTradeInCredit: (amount: number) => void;
}

export const TradeInModal: React.FC<TradeInModalProps> = ({
  isOpen,
  onClose,
  onApplyTradeInCredit
}) => {
  const [deviceType, setDeviceType] = useState('Headphones');
  const [brand, setBrand] = useState('Sony');
  const [condition, setCondition] = useState<'flawless' | 'good' | 'fair'>('flawless');

  if (!isOpen) return null;

  const baseValues: Record<string, number> = {
    Headphones: 90,
    Laptop: 450,
    Phone: 280,
    Camera: 520
  };

  const conditionMultiplier: Record<string, number> = {
    flawless: 1.33,
    good: 1.0,
    fair: 0.65
  };

  const estimatedValue = Math.round(
    (baseValues[deviceType] || 100) * (conditionMultiplier[condition] || 1)
  );

  const handleApply = () => {
    onApplyTradeInCredit(estimatedValue);
    onClose();
    alert(`Trade-In voucher of $${estimatedValue}.00 credited to your active session!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-low border border-primary-container/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[20px]">swap_horiz</span>
            <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">Hardware Trade-In Estimator</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Device Category */}
          <div className="space-y-1.5">
            <label className="font-label-action text-[13px] text-on-surface font-semibold block">Device Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['Headphones', 'Laptop', 'Phone', 'Camera'].map((type) => (
                <button
                  key={type}
                  onClick={() => setDeviceType(type)}
                  className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all border ${
                    deviceType === type
                      ? 'bg-primary-container/15 border-primary-container text-primary-container font-bold'
                      : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:border-outline'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {type === 'Headphones'
                      ? 'headphones'
                      : type === 'Laptop'
                      ? 'laptop'
                      : type === 'Phone'
                      ? 'smartphone'
                      : 'photo_camera'}
                  </span>
                  <span className="text-[12px]">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Device Brand */}
          <div className="space-y-1.5">
            <label className="font-label-action text-[13px] text-on-surface font-semibold block">Brand Manufacturer</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3 py-2 text-on-surface text-xs focus:border-primary-container outline-none"
            >
              <option value="Sony">Sony Electronics</option>
              <option value="Apple">Apple Inc.</option>
              <option value="Bose">Bose Acoustics</option>
              <option value="Sennheiser">Sennheiser Pro</option>
              <option value="Razer">Razer Blade / Opus</option>
              <option value="Other">Other Verified OEM</option>
            </select>
          </div>

          {/* Condition Grading */}
          <div className="space-y-1.5">
            <label className="font-label-action text-[13px] text-on-surface font-semibold block">Condition Grade</label>
            <div className="space-y-2">
              {[
                { id: 'flawless', label: 'Flawless / Pristine', desc: 'Zero scratches, battery health > 90%, original box' },
                { id: 'good', label: 'Good Working Condition', desc: 'Minor cosmetic wear, fully operational, cable included' },
                { id: 'fair', label: 'Fair / Heavily Used', desc: 'Noticeable scuffs or degraded battery, still powers on' }
              ].map((c) => (
                <div
                  key={c.id}
                  onClick={() => setCondition(c.id as any)}
                  className={`p-2.5 rounded-xl cursor-pointer border transition-all ${
                    condition === c.id
                      ? 'bg-surface-container-high border-primary-container text-primary shadow-sm'
                      : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:border-outline'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-[13px] font-bold text-on-surface">{c.label}</span>
                    {condition === c.id && (
                      <span className="material-symbols-outlined text-primary-container text-[16px] fill-1">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="font-spec-code-sm text-[10px] text-on-surface-variant mt-0.5">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Valuation Output Box */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-primary-container/40 text-center space-y-1">
            <span className="font-badge-label text-[10px] text-outline uppercase tracking-wider">
              ESTIMATED TRADE-IN VALUATION
            </span>
            <div className="font-display-hero text-3xl font-extrabold text-primary-container">
              ${estimatedValue}.00 USD
            </div>
            <p className="font-spec-code-sm text-[10px] text-emerald-400 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[13px]">bolt</span>
              Pre-paid insured shipping kit dispatched instantly
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant/30 flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl bg-primary-container text-on-primary-fixed font-label-action text-[13px] font-bold glow-cyan active:scale-95"
          >
            Apply ${estimatedValue} Credit
          </button>
        </div>
      </div>
    </div>
  );
};

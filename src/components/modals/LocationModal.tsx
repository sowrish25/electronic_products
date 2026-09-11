import React, { useState } from 'react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onUpdateLocation: (newLocation: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onUpdateLocation
}) => {
  const [address, setAddress] = useState(currentLocation);

  if (!isOpen) return null;

  const popularLocations = [
    'Brooklyn, NY 11201',
    'Manhattan, NY 10001',
    'San Francisco, CA 94103',
    'Austin, TX 78701',
    'Seattle, WA 98101'
  ];

  const handleSave = () => {
    if (address.trim()) {
      onUpdateLocation(address.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-surface-container-low border border-primary-container/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="px-4 py-3 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[18px]">location_on</span>
            <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Dispatch Destination</h3>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary-container">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="font-spec-code-sm text-[11px] text-on-surface-variant block mb-1">
              ZIP CODE / CITY
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Brooklyn, NY 11201"
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3 py-2 text-xs text-on-surface focus:border-primary-container outline-none"
            />
          </div>

          <div>
            <span className="font-spec-code-sm text-[10px] text-outline block mb-1.5">RECENT LOCATIONS</span>
            <div className="space-y-1.5">
              {popularLocations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setAddress(loc);
                    onUpdateLocation(loc);
                    onClose();
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-on-surface flex items-center justify-between transition-colors"
                >
                  <span>{loc}</span>
                  <span className="material-symbols-outlined text-[14px] text-outline">history</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-primary-container text-on-primary-fixed font-label-action text-[13px] font-bold glow-cyan active:scale-95 transition-all mt-2"
          >
            Update Location
          </button>
        </div>
      </div>
    </div>
  );
};

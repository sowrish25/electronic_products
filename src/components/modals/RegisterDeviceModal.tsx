import React, { useState } from 'react';

interface RegisterDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (name: string, serial: string) => void;
}

export const RegisterDeviceModal: React.FC<RegisterDeviceModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess
}) => {
  const [deviceName, setDeviceName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [scanning, setScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDeviceName('Sony WH-1000XM5 Studio');
      setSerialNumber(`SN-SNY-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceName && serialNumber) {
      onRegisterSuccess(deviceName, serialNumber);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-surface-container-low border border-primary-container/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="px-4 py-3 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[20px]">devices_other</span>
            <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Register Hardware Unit</h3>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary-container">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="font-spec-code-sm text-[11px] text-on-surface-variant block mb-1">
              DEVICE MODEL
            </label>
            <input
              type="text"
              required
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="e.g. Sony WH-1000XM5"
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3 py-2 text-xs text-on-surface focus:border-primary-container outline-none"
            />
          </div>

          <div>
            <label className="font-spec-code-sm text-[11px] text-on-surface-variant block mb-1">
              SERIAL NUMBER (SN) / BARCODE
            </label>
            <input
              type="text"
              required
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="e.g. C02G99-XXXX-4K"
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3 py-2 text-xs text-on-surface focus:border-primary-container outline-none uppercase font-mono"
            />
          </div>

          <button
            type="button"
            onClick={handleSimulateScan}
            className="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-primary-container text-xs font-label-action flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">barcode_scanner</span>
            <span>{scanning ? 'Scanning Barcode...' : 'Auto-Detect via Scanner'}</span>
          </button>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary-container text-on-primary-fixed font-label-action text-[13px] font-bold glow-cyan active:scale-95 transition-all"
            >
              Sync to Hub Fleet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

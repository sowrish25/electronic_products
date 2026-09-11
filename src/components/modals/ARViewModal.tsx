import React, { useState } from 'react';
import { Product } from '../../types';

interface ARViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const ARViewModal: React.FC<ARViewModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const [scale, setScale] = useState(1);
  const [lighting, setLighting] = useState<'neon' | 'studio' | 'daylight'>('neon');
  const [isSpatialAudioOn, setIsSpatialAudioOn] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="w-full max-w-md h-[82vh] bg-surface-dim border border-primary-container/40 rounded-3xl overflow-hidden flex flex-col relative shadow-2xl">
        {/* AR Camera Simulated Viewport */}
        <div className="relative flex-1 bg-surface-container-lowest overflow-hidden flex items-center justify-center">
          {/* Simulated room wallpaper / environment */}
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center filter blur-xs"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD84j8oK7Hh2j-6M5xU0W_e1Nvd34_yHffH5hQ4P4g94d4Q4f4G5h5J5k5L5m5N5b5V5c5X5z5A5s5D5f5G5h5J5k5L5m5N5b5V5c5X5z5A5s5D5f5G5h5J5k5L5m5N')"
            }}
          />

          {/* AR Perspective Grid Plane */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

          {/* Center reticle & Spatial ring */}
          <div className="absolute w-56 h-56 rounded-full border border-primary-container/30 border-dashed animate-[spin_20s_linear_infinite] pointer-events-none"></div>
          <div className="absolute w-44 h-44 rounded-full border border-primary-container/20 pointer-events-none"></div>

          {/* Interactive AR Product Projection */}
          <div
            style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease-out' }}
            className="relative z-20 flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            {isSpatialAudioOn && (
              <div className="absolute -inset-4 rounded-full border border-primary-container/40 animate-ping pointer-events-none"></div>
            )}
            <img
              className="w-48 h-48 object-contain filter drop-shadow-[0_20px_40px_rgba(0,242,254,0.35)]"
              src={product.image}
              alt={product.name}
            />
            {/* Ground shadow plane */}
            <div className="w-36 h-4 rounded-full bg-primary-container/20 blur-md mt-2"></div>
          </div>

          {/* Top Floating Telemetry Overlay */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-30">
            <div className="px-3 py-1 rounded-full bg-surface-dim/80 backdrop-blur-md border border-primary-container/40 flex items-center gap-1.5 text-[11px] font-spec-code-sm text-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SURFACE LOCKED • 1:1 TRUE SCALE</span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-surface-dim/80 border border-outline-variant/40 flex items-center justify-center text-on-surface hover:text-primary-container"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Spatial Sound Wave Indicator */}
          {isSpatialAudioOn && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-dim/90 border border-secondary/40 text-[10px] font-spec-code-sm text-secondary">
              <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
              <span>360° SPATIAL SIMULATION</span>
            </div>
          )}
        </div>

        {/* Bottom AR Tools Tray */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 space-y-3 z-30">
          <div className="flex items-center justify-between">
            <span className="font-label-action text-[13px] text-on-surface font-semibold">Scale Projection</span>
            <div className="flex items-center gap-1 bg-surface-container rounded-lg p-0.5 border border-outline-variant/30">
              {[
                { label: '75%', val: 0.75 },
                { label: '100%', val: 1 },
                { label: '125%', val: 1.25 }
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => setScale(s.val)}
                  className={`px-2.5 py-1 rounded text-[11px] font-spec-code-sm transition-all ${
                    scale === s.val
                      ? 'bg-primary-container text-on-primary-fixed font-bold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setIsSpatialAudioOn(!isSpatialAudioOn)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-label-action transition-all ${
                isSpatialAudioOn
                  ? 'border-secondary text-secondary bg-secondary/10'
                  : 'border-outline-variant/40 text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">surround_sound</span>
              <span>Spatial Audio</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setLighting(lighting === 'neon' ? 'studio' : 'neon')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface text-xs font-label-action"
              >
                <span className="material-symbols-outlined text-[16px] text-primary-container">wb_incandescent</span>
                <span className="capitalize">{lighting}</span>
              </button>
              <button
                onClick={() => alert('Snapshot saved to device gallery!')}
                className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-fixed flex items-center justify-center font-bold"
                title="Capture Room Photo"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

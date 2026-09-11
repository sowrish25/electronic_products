import React, { useState } from 'react';
import { ActiveOrder } from '../../types';

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ActiveOrder;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  const [courierStatus, setCourierStatus] = useState<'normal' | 'called'>('normal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-low border border-primary-container/40 rounded-2xl overflow-hidden shadow-2xl shadow-primary-container/20 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping"></span>
            <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Live GPS Dispatch Radar</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Satellite Map Canvas Simulation */}
        <div className="relative h-64 w-full bg-surface-container-lowest overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAa0uySlZQE7fGI-v4OxgHy6bcrG66X7S2DrSmp7IHMYKgIAIsOpVWE0jhD0ozCBR06Pc0agNF8mtTBe8tTgI1ElaXH-uF-4sDc0K4NRfaOTxOqrFHpOg8n4-riMSxuf26qkTAVCwadq5kusxjMXZUDJWHOVxiGd8x2m6A3lEVdkwVcbXnA8T4C0nA0AFiQhk_W0ZeqBNShCnkXMx2HfoGi-Pzg42oGdYWKgbC-3FnKuMpPHvPVOmgI')"
            }}
          />
          {/* Radar scan grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,242,254,0.15),_transparent_70%)] pointer-events-none"></div>

          {/* Delivery Destination Pin */}
          <div className="absolute top-12 left-16 flex flex-col items-center">
            <div className="px-2 py-0.5 rounded bg-surface-dim/90 border border-outline-variant/60 text-[9px] font-spec-code-sm text-primary mb-1 shadow-lg">
              Brooklyn, NY
            </div>
            <div className="w-6 h-6 rounded-full bg-surface-dim border-2 border-primary flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[14px]">home</span>
            </div>
          </div>

          {/* Moving Courier Van Beacon */}
          <div className="absolute bottom-16 right-20 flex flex-col items-center animate-bounce">
            <div className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-fixed text-[9px] font-badge-label font-bold mb-1 shadow-lg shadow-primary-container/40">
              Marcus • Van #19
            </div>
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-primary-container opacity-75"></span>
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              </div>
            </div>
          </div>

          {/* Route path line svg */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-primary-container" fill="none">
            <path
              d="M 80 75 Q 180 120 280 185"
              stroke="#00f2fe"
              strokeWidth="3"
              strokeDasharray="6 6"
              className="opacity-80"
            />
          </svg>

          {/* Floating Telemetry Stats Box */}
          <div className="absolute bottom-2 left-2 right-2 bg-surface-dim/90 backdrop-blur-md rounded-lg border border-primary-container/30 p-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-spec-code-sm text-[11px] text-primary">
              <span className="material-symbols-outlined text-[16px] text-primary-container">speed</span>
              <span>28 MPH • Approaching Atlantic Ave</span>
            </div>
            <span className="font-spec-code-sm text-[10px] text-primary-container font-bold">1.4 MI REMAINING</span>
          </div>
        </div>

        {/* Courier Details & Action Bar */}
        <div className="p-4 space-y-3 bg-surface-container-low overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[24px]">sports_motorsports</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-[14px] font-bold text-on-surface">Marcus D.</h4>
                <p className="font-spec-code-sm text-[11px] text-on-surface-variant">
                  FedTech Express Courier • Van #19
                </p>
                <div className="flex items-center gap-1 text-amber-400 text-[11px] mt-0.5">
                  <span className="material-symbols-outlined text-[13px] fill-1">star</span>
                  <span className="font-bold text-on-surface">4.98</span>
                  <span className="text-outline text-[10px]">(3,420 deliveries)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCourierStatus('called');
                  alert('Connecting secure VoIP audio link to Marcus D. (Van #19)...');
                }}
                className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant/40 hover:border-primary-container text-primary-container flex items-center justify-center transition-all active:scale-90"
                title="Call Courier"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
              </button>
              <button
                onClick={() => alert('Dispatching SMS: "Please leave package inside vestibule behind security door."')}
                className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant/40 hover:border-primary-container text-primary-container flex items-center justify-center transition-all active:scale-90"
                title="Message Courier"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 space-y-1">
            <div className="flex justify-between text-xs font-spec-code-sm">
              <span className="text-on-surface-variant">Estimated Arrival:</span>
              <span className="text-primary font-bold">4:30 PM (Today)</span>
            </div>
            <div className="flex justify-between text-xs font-spec-code-sm">
              <span className="text-on-surface-variant">Verification PIN:</span>
              <span className="text-primary-container font-bold tracking-widest">7 8 2 1</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-action text-[13px] font-semibold transition-colors"
          >
            Dismiss Radar
          </button>
        </div>
      </div>
    </div>
  );
};

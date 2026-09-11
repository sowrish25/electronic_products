import React, { useState } from 'react';
import { RegisteredDevice, ScreenType, ActiveOrder } from '../types';
import { REGISTERED_DEVICES, PREVIOUS_ORDERS, INITIAL_ACTIVE_ORDER } from '../data/mockData';

interface HubScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenLiveTrackingModal: () => void;
  onOpenAISupportModal: () => void;
  onOpenTradeInModal: () => void;
  onOpenRegisterDeviceModal: () => void;
  onReorder: (item: { name: string; price: number }) => void;
}

export const HubScreen: React.FC<HubScreenProps> = ({
  onNavigate,
  onOpenLiveTrackingModal,
  onOpenAISupportModal,
  onOpenTradeInModal,
  onOpenRegisterDeviceModal,
  onReorder
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'devices' | 'warranty'>('orders');
  const [activeOrder] = useState<ActiveOrder>(INITIAL_ACTIVE_ORDER);
  const [devices] = useState<RegisteredDevice[]>(REGISTERED_DEVICES);

  return (
    <main className="pt-16 max-w-md mx-auto px-4 space-y-5 pb-28">
      {/* Telemetry Profile Header */}
      <section className="mt-2 flex items-center justify-between hardware-card rounded-xl p-3.5 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-3">
          {/* User Avatar with Status Ring */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-primary-container via-secondary-fixed-dim to-transparent">
              <img
                className="w-full h-full rounded-full object-cover bg-surface-container-high"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnjunh0HbBHxJR9-NvWxWwVnNK0SqU3ZwDKBWdH8_G7mg8CecyZV-14BukTJYCwb5Bsy1UlzcmTy8v6jnn06d7g99o3UszeKvKTeBsgPHwjBnKPZSCVQ-9j-MTxh6jXUeJXkLaTPXKRHEHBowxVe81G4VffxLZW3syKLUIYH4LSBrkOJwtBPGr-oQ6dvw18t-hPV8M7F_at4PjbydMcBcCqTR7puS8vQDDvUIA14HUP3xiV2Na1T6g"
                alt="User Profile"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00F2FE] border-2 border-background flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-dim"></span>
            </span>
          </div>

          <div>
            <h1 className="font-headline-sm text-[16px] text-on-surface font-semibold">Pulse Hub &amp; Orders</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container/15 border border-primary-container/40 text-primary-container font-badge-label text-[9px] tracking-wide font-bold">
                <span className="material-symbols-outlined text-[12px] fill-1">bolt</span>
                PRO TIER III
              </span>
              <span className="font-spec-code-sm text-[10px] text-on-surface-variant">ID: 884-AX</span>
            </div>
          </div>
        </div>

        {/* Hub Settings Button */}
        <button
          onClick={() => alert('Profile & Device Settings: Telemetry sync active. 5G telemetry node: 884-AX.')}
          aria-label="Hub Settings"
          className="w-10 h-10 rounded-lg bg-surface-container-high/70 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:border-primary-container/40 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </section>

      {/* Quick Tab Switcher */}
      <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setActiveTab('orders')}
          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-action text-[12px] font-semibold transition-all ${
            activeTab === 'orders'
              ? 'bg-primary-container text-on-primary-fixed shadow-lg shadow-primary-container/20'
              : 'bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">local_shipping</span>
          <span>Active Orders (1)</span>
        </button>

        <button
          onClick={() => setActiveTab('devices')}
          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-action text-[12px] font-semibold transition-all ${
            activeTab === 'devices'
              ? 'bg-primary-container text-on-primary-fixed shadow-lg shadow-primary-container/20'
              : 'bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">devices</span>
          <span>My Registered Devices (4)</span>
        </button>

        <button
          onClick={() => setActiveTab('warranty')}
          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-action text-[12px] font-semibold transition-all ${
            activeTab === 'warranty'
              ? 'bg-primary-container text-on-primary-fixed shadow-lg shadow-primary-container/20'
              : 'bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">verified_user</span>
          <span>Warranty &amp; Care</span>
        </button>
      </section>

      {/* SECTION 1: Active Order Real-Time Dispatch */}
      {activeTab === 'orders' && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <h2 className="font-headline-sm text-[15px] font-bold text-on-surface">Real-Time Dispatch</h2>
            </div>
            <span className="font-spec-code-sm text-[10px] text-on-surface-variant">FEDTECH #FT-0982</span>
          </div>

          <div className="hardware-card-active rounded-xl p-4 relative overflow-hidden space-y-4">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary-container to-transparent"></div>

            {/* Top Row: Order Details */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-badge-label text-[9px] px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/50 text-primary-container font-bold">
                    ORDER #{activeOrder.orderNumber}
                  </span>
                  <span className="font-spec-code-sm text-[10px] text-on-surface-variant">TODAY</span>
                </div>
                <h3 className="font-headline-sm text-[16px] font-bold text-on-surface leading-tight pt-1">
                  {activeOrder.productName}
                </h3>
                <p className="font-body-sm text-[11px] text-on-surface-variant">
                  {activeOrder.productSubtitle}
                </p>
              </div>

              {/* Product Mini Thumbnail */}
              <div className="w-14 h-14 rounded-lg bg-surface-container-highest/80 border border-outline-variant/40 p-1 shrink-0 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-container/10 blur-sm rounded-full"></div>
                <img
                  className="w-full h-full object-contain relative z-10"
                  src={activeOrder.image}
                  alt={activeOrder.productName}
                />
              </div>
            </div>

            {/* Status Radar Banner */}
            <div className="bg-surface-container-lowest/80 border border-primary-container/30 rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F2FE]"></span>
                </span>
                <span className="font-body-md text-[12px] font-medium text-primary">
                  Out for Delivery — Arriving today by <strong className="text-primary-container font-semibold">{activeOrder.eta}</strong>
                </span>
              </div>
              <span className="font-spec-code-sm text-[10px] text-primary-container font-bold">
                ETA {activeOrder.etaMinutes}M
              </span>
            </div>

            {/* 5-Step Stepper */}
            <div className="pt-2">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-3 right-3 top-3 h-[2px] bg-surface-container-highest -z-0"></div>
                <div className="absolute left-3 w-3/4 top-3 h-[2px] bg-gradient-to-r from-primary-container/60 via-primary-container to-primary-container -z-0"></div>

                {/* Step 1 */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[14px] fill-1">check</span>
                  </div>
                  <span className="font-spec-code-sm text-[9px] text-on-surface-variant uppercase">Placed</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[14px] fill-1">check</span>
                  </div>
                  <span className="font-spec-code-sm text-[9px] text-on-surface-variant uppercase">Proc.</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[14px] fill-1">check</span>
                  </div>
                  <span className="font-spec-code-sm text-[9px] text-on-surface-variant uppercase">Shipped</span>
                </div>

                {/* Step 4: Active Transit */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-background border-2 border-primary-container text-primary-container flex items-center justify-center shadow-lg shadow-primary-container/40 ring-4 ring-primary-container/20">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                  </div>
                  <span className="font-spec-code-sm text-[9px] text-primary-container font-bold uppercase">Transit</span>
                </div>

                {/* Step 5: Delivery */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high border border-outline-variant/40 text-outline flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                  </div>
                  <span className="font-spec-code-sm text-[9px] text-outline uppercase">Delivery</span>
                </div>
              </div>
            </div>

            {/* Courier Diagnostics & Live Action Row */}
            <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant/50 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[18px]">sports_motorsports</span>
                </div>
                <div>
                  <div className="font-label-action text-[13px] font-semibold text-on-surface">
                    {activeOrder.courierService}
                  </div>
                  <div className="font-spec-code-sm text-[10px] text-on-surface-variant">
                    Courier: {activeOrder.courierName} • {activeOrder.courierVehicle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenLiveTrackingModal}
                  aria-label="Route Snapshot"
                  className="p-2 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-primary-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">map</span>
                </button>
                <button
                  onClick={onOpenLiveTrackingModal}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-container text-on-primary-fixed font-label-action text-[12px] font-bold glow-cyan-btn hover:brightness-110 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">near_me</span>
                  <span>Track Live GPS</span>
                </button>
              </div>
            </div>

            {/* Telemetry Map Snippet Preview */}
            <div
              onClick={onOpenLiveTrackingModal}
              className="relative rounded-lg h-24 w-full overflow-hidden border border-outline-variant/40 bg-surface-container-lowest cursor-pointer group"
            >
              <div
                className="w-full h-full bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAa0uySlZQE7fGI-v4OxgHy6bcrG66X7S2DrSmp7IHMYKgIAIsOpVWE0jhD0ozCBR06Pc0agNF8mtTBe8tTgI1ElaXH-uF-4sDc0K4NRfaOTxOqrFHpOg8n4-riMSxuf26qkTAVCwadq5kusxjMXZUDJWHOVxiGd8x2m6A3lEVdkwVcbXnA8T4C0nA0AFiQhk_W0ZeqBNShCnkXMx2HfoGi-Pzg42oGdYWKgbC-3FnKuMpPHvPVOmgI')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-dim/90 border border-primary-container/40 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-ping"></span>
                <span className="font-spec-code-sm text-[10px] text-primary">
                  CURRENT BEACON: {activeOrder.gpsDistance}
                </span>
              </div>
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-background/90 font-spec-code-sm text-[9px] text-on-surface-variant border border-outline-variant/40">
                LAT {activeOrder.latitude}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: My Registered Devices */}
      {(activeTab === 'orders' || activeTab === 'devices') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[20px]">devices_wearables</span>
              <h2 className="font-headline-sm text-[15px] font-bold text-on-surface">My Registered Devices</h2>
            </div>
            <span className="font-spec-code-sm text-[10px] text-primary-container font-bold">4 ONLINE</span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
            {/* Device 1: MacBook Pro */}
            <div className="hardware-card shrink-0 w-72 rounded-xl p-3.5 space-y-3 border-l-2 border-l-primary-container">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-surface-container-highest/60 text-primary-container">
                  <span className="material-symbols-outlined text-[24px]">laptop_mac</span>
                </div>
                <span className="font-spec-code-sm text-[10px] px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/30 text-on-surface">
                  SN: C02G99...4K
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">MacBook Pro 16"</h3>
                <p className="font-spec-code text-[11px] text-on-surface-variant">Apple M3 Max • 64GB Unified</p>
              </div>
              <div className="space-y-2 pt-1 border-t border-outline-variant/20">
                <div className="flex items-center justify-between text-body-sm text-[11px]">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary-container text-[14px]">verified</span>
                    PulseCare Extended
                  </span>
                  <span className="font-spec-code-sm text-[10px] text-primary">Nov 2026</span>
                </div>
                <div>
                  <div className="flex items-center justify-between font-spec-code-sm text-[9px] text-on-surface-variant mb-1">
                    <span>HARDWARE HEALTH</span>
                    <span className="text-primary-container font-semibold">98% OPTIMAL</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container rounded-full w-[98%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device 2: Apex Pro ANC Headphones */}
            <div className="hardware-card shrink-0 w-72 rounded-xl p-3.5 space-y-3 border-l-2 border-l-secondary-fixed-dim">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-surface-container-highest/60 text-secondary-fixed-dim">
                  <span className="material-symbols-outlined text-[24px]">headphones</span>
                </div>
                <span className="font-spec-code-sm text-[9px] px-2 py-0.5 rounded bg-secondary-container/40 border border-secondary/30 text-secondary-fixed font-bold">
                  NEW REGISTRATION
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Apex Pro Wireless ANC</h3>
                <p className="font-spec-code text-[11px] text-on-surface-variant">Studio Matte Black • Low Latency</p>
              </div>
              <div className="space-y-2 pt-1 border-t border-outline-variant/20">
                <div className="flex items-center justify-between text-body-sm text-[11px]">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-[14px]">system_update</span>
                    Firmware
                  </span>
                  <span className="font-spec-code text-[11px] text-primary-container font-semibold">
                    v2.1.0 (Latest)
                  </span>
                </div>
                <div className="flex items-center justify-between bg-surface-container-lowest/60 px-2 py-1 rounded">
                  <span className="font-spec-code-sm text-[9px] text-on-surface-variant">CODEC STREAM</span>
                  <span className="font-spec-code-sm text-[9px] text-secondary-fixed font-semibold">LDAC 990KBPS</span>
                </div>
              </div>
            </div>

            {/* Device 3: Sony Alpha A7 IV */}
            <div className="hardware-card shrink-0 w-72 rounded-xl p-3.5 space-y-3 border-l-2 border-l-outline">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-surface-container-highest/60 text-on-surface">
                  <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                </div>
                <span className="font-badge-label text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-primary-container font-bold">
                  EST. $1,420
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[15px] font-bold text-on-surface">Sony Alpha A7 IV Body</h3>
                <p className="font-spec-code text-[11px] text-on-surface-variant">Full Frame 33MP • 4K 60p</p>
              </div>
              <div className="space-y-2 pt-1 border-t border-outline-variant/20">
                <div className="flex items-center justify-between text-body-sm text-[11px]">
                  <span className="text-on-surface-variant">Trade-In Eligibility</span>
                  <span className="font-spec-code-sm text-[10px] text-primary-container font-semibold">
                    Pre-Approved
                  </span>
                </div>
                <button
                  onClick={onOpenTradeInModal}
                  className="w-full py-1 text-center rounded bg-surface-container-high hover:bg-surface-container-highest text-primary-container text-[12px] font-label-action font-semibold border border-outline-variant/40 transition-colors active:scale-95"
                >
                  Instant Trade Appraisal
                </button>
              </div>
            </div>

            {/* Register New Device Trigger */}
            <div
              onClick={onOpenRegisterDeviceModal}
              className="hardware-card shrink-0 w-52 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2.5 border-dashed border-outline-variant/60 hover:border-primary-container/70 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[26px]">add</span>
              </div>
              <div>
                <h4 className="font-label-action text-[13px] text-on-surface font-semibold">Register Device</h4>
                <p className="font-body-sm text-[10px] text-on-surface-variant">Scan barcode or sync via Bluetooth</p>
              </div>
              <button className="flex items-center gap-1 text-primary-container font-spec-code-sm text-[10px] pt-1">
                <span className="material-symbols-outlined text-[14px]">barcode_scanner</span>
                <span>SCAN CODE</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: Pulse Support Suite (2x2 Bento) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-[15px] font-bold text-on-surface">Pulse Support Suite</h2>
          <span className="font-spec-code-sm text-[10px] text-on-surface-variant">RESPONSE &lt; 2 MIN</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Tile 1: 24/7 AI Tech Specialist */}
          <div
            onClick={onOpenAISupportModal}
            className="hardware-card rounded-xl p-3.5 space-y-2 hover:border-primary-container/40 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="w-9 h-9 rounded-lg bg-primary-container/15 text-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <h3 className="font-label-action text-[13px] font-semibold text-on-surface">AI Tech Specialist</h3>
              <p className="font-body-sm text-[10px] text-on-surface-variant mt-0.5 leading-tight">
                24/7 diagnostic assistance &amp; troubleshooting
              </p>
            </div>
            <div className="flex items-center gap-1 font-spec-code-sm text-[9px] text-primary-container pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              <span>BOT ACTIVE</span>
            </div>
          </div>

          {/* Tile 2: Return or Exchange */}
          <div
            onClick={() => alert('Return Portal: Eligible for 14-day direct return label. Return QR generated for FedTech Dropoff.')}
            className="hardware-card rounded-xl p-3.5 space-y-2 hover:border-primary-container/40 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-secondary-container/40 text-secondary-fixed flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">swap_horizontal_circle</span>
            </div>
            <div>
              <h3 className="font-label-action text-[13px] font-semibold text-on-surface">Return &amp; Replace</h3>
              <p className="font-body-sm text-[10px] text-on-surface-variant mt-0.5 leading-tight">
                Easy labels &amp; instant store credit
              </p>
            </div>
            <span className="inline-block font-spec-code-sm text-[9px] text-secondary-fixed bg-secondary-container/30 px-1.5 py-0.5 rounded font-semibold">
              14 DAYS LEFT
            </span>
          </div>

          {/* Tile 3: Book Genius Diagnostic */}
          <div
            onClick={() => alert('Genius Diagnostic: 4 workbench locations open in Brooklyn & Manhattan. Next slot: Today 3:15 PM at Pulse Hub Downtown.')}
            className="hardware-card rounded-xl p-3.5 space-y-2 hover:border-primary-container/40 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
            </div>
            <div>
              <h3 className="font-label-action text-[13px] font-semibold text-on-surface">Genius Diagnostic</h3>
              <p className="font-body-sm text-[10px] text-on-surface-variant mt-0.5 leading-tight">
                Reserve physical workbench appointment
              </p>
            </div>
            <span className="font-spec-code-sm text-[9px] text-on-surface-variant">NEARBY: 4 LOCATIONS</span>
          </div>

          {/* Tile 4: Download Invoices & Tax */}
          <div
            onClick={() => alert('Generating certified PDF Tax Invoice statement for all 2025/2026 PulseTech purchases... Download initiated.')}
            className="hardware-card rounded-xl p-3.5 space-y-2 hover:border-primary-container/40 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-surface-container-highest text-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <h3 className="font-label-action text-[13px] font-semibold text-on-surface">Tax &amp; Receipts</h3>
              <p className="font-body-sm text-[10px] text-on-surface-variant mt-0.5 leading-tight">
                Export certified PDF billing statements
              </p>
            </div>
            <span className="font-spec-code-sm text-[9px] text-primary-container flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[12px]">download</span>
              <span>EXPORT ALL</span>
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: Previous Deliveries */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-[15px] font-bold text-on-surface">Previous Deliveries</h2>
          <button
            onClick={() => onNavigate('catalog')}
            className="font-label-action text-[12px] text-primary-container hover:underline flex items-center gap-0.5"
          >
            <span>View All Previous Orders</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {PREVIOUS_ORDERS.map((order) => (
          <div
            key={order.id}
            className="hardware-card rounded-xl p-3 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[20px]">{order.icon}</span>
              </div>
              <div>
                <div className="font-body-md text-[13px] font-semibold text-on-surface">{order.name}</div>
                <div className="font-spec-code-sm text-[10px] text-on-surface-variant">
                  Delivered {order.date} • ${order.price.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-spec-code-sm text-[9px] px-2 py-0.5 rounded bg-surface-container-highest text-primary font-bold">
                {order.status}
              </span>
              <button
                onClick={() => onReorder(order)}
                aria-label={`Reorder ${order.name}`}
                className="p-1.5 rounded-lg bg-surface-container-high hover:text-primary-container transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

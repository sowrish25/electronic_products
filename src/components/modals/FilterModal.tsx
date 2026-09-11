import React, { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    priceMax: number;
    brands: string[];
    ram: string[];
    inStockOnly: boolean;
  }) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters
}) => {
  const [priceMax, setPriceMax] = useState(3500);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['Apple', 'Asus', 'Razer']);
  const [selectedRam, setSelectedRam] = useState<string[]>(['32GB']);
  const [inStockOnly, setInStockOnly] = useState(true);

  if (!isOpen) return null;

  const brandsList = ['Apple', 'Asus', 'Razer', 'Dell', 'Lenovo', 'Sony', 'Bose'];
  const ramOptions = ['16GB', '32GB', '64GB', '128GB Unified'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleRam = (ram: string) => {
    setSelectedRam((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      priceMax,
      brands: selectedBrands,
      ram: selectedRam,
      inStockOnly
    });
    onClose();
  };

  const handleReset = () => {
    setPriceMax(4000);
    setSelectedBrands([]);
    setSelectedRam([]);
    setInStockOnly(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-low border border-primary-container/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[20px]">tune</span>
            <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">Hardware Calibration Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-5 overflow-y-auto">
          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-action text-[13px] text-on-surface font-semibold">Maximum Budget</span>
              <span className="font-spec-code text-[13px] text-primary-container font-bold">
                ${priceMax.toLocaleString()} USD
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="4500"
              step="50"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-primary-container h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-spec-code-sm text-[10px] text-outline">
              <span>$200</span>
              <span>$4,500+</span>
            </div>
          </div>

          {/* OEM Brands */}
          <div className="space-y-2">
            <label className="font-label-action text-[13px] text-on-surface font-semibold block">OEM Hardware Brands</label>
            <div className="flex flex-wrap gap-2">
              {brandsList.map((brand) => {
                const isSelected = selectedBrands.includes(brand);
                return (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-label-action transition-all ${
                      isSelected
                        ? 'bg-primary-container text-on-primary-fixed font-bold shadow-md shadow-primary-container/20'
                        : 'bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:border-primary-container'
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Memory / RAM Capacity */}
          <div className="space-y-2">
            <label className="font-label-action text-[13px] text-on-surface font-semibold block">Memory Architecture</label>
            <div className="grid grid-cols-2 gap-2">
              {ramOptions.map((ram) => {
                const isSelected = selectedRam.includes(ram);
                return (
                  <button
                    key={ram}
                    onClick={() => toggleRam(ram)}
                    className={`p-2 rounded-lg text-left text-[12px] font-spec-code transition-all border ${
                      isSelected
                        ? 'bg-primary-container/15 border-primary-container text-primary-container font-bold'
                        : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:border-outline'
                    }`}
                  >
                    {ram}
                  </button>
                );
              })}
            </div>
          </div>

          {/* In Stock Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-outline-variant/30">
            <div>
              <span className="font-label-action text-[13px] text-on-surface font-semibold block">In-Stock Only</span>
              <span className="font-spec-code-sm text-[10px] text-on-surface-variant">
                Show only units ready for same-day dispatch
              </span>
            </div>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-5 h-5 rounded bg-surface-container-lowest border-outline-variant text-primary-container focus:ring-primary-container"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant/30 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant hover:text-primary font-label-action text-[12px]"
          >
            Reset All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl bg-primary-container text-on-primary-fixed font-label-action text-[13px] font-bold glow-cyan active:scale-95 transition-all"
          >
            Apply Calibration
          </button>
        </div>
      </div>
    </div>
  );
};

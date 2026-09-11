export type ScreenType = 'home' | 'catalog' | 'cart' | 'saved' | 'hub' | 'pdp';

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  series?: string;
  subtitle?: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  soldCountText?: string;
  image: string;
  galleryImages?: string[];
  badges?: string[];
  specs: string[];
  inStock?: boolean;
  colors?: { name: string; hex: string; bgClass?: string }[];
  isTopSeller?: boolean;
  isSale?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedEdition?: string;
  editionExtraPrice?: number;
  hasPulseCare: boolean;
  pulseCarePrice: number;
}

export interface RegisteredDevice {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  specs: string;
  warranty: string;
  warrantyExpiry: string;
  healthPercent: number;
  healthStatus: string;
  firmware?: string;
  codec?: string;
  tradeInValue?: number;
  type: 'laptop' | 'audio' | 'camera' | 'mobile';
}

export interface ActiveOrder {
  id: string;
  orderNumber: string;
  productName: string;
  productSubtitle: string;
  image: string;
  eta: string;
  etaMinutes: number;
  statusText: string;
  currentStep: number; // 0: Placed, 1: Proc, 2: Shipped, 3: Transit, 4: Delivery
  courierName: string;
  courierService: string;
  courierVehicle: string;
  gpsDistance: string;
  latitude: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  selectedBrands: string[];
  minPrice: number;
  maxPrice: number;
  minRam: string;
  gpuSeries: string;
  inStockOnly: boolean;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating';
}

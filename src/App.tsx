import React, { useState } from 'react';
import { Product, CartItem, ScreenType, RegisteredDevice } from './types';
import {
  HERO_PRODUCT,
  INITIAL_CART_ITEMS,
  INITIAL_WISHLIST_ITEMS,
  REGISTERED_DEVICES
} from './data/mockData';

// Layout Components
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';

// Screens
import { HomeScreen } from './components/HomeScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { CartScreen } from './components/CartScreen';
import { HubScreen } from './components/HubScreen';
import { SavedScreen } from './components/SavedScreen';

// Modals
import { LiveTrackingModal } from './components/modals/LiveTrackingModal';
import { FilterModal } from './components/modals/FilterModal';
import { TradeInModal } from './components/modals/TradeInModal';
import { ARViewModal } from './components/modals/ARViewModal';
import { AISupportModal } from './components/modals/AISupportModal';
import { LocationModal } from './components/modals/LocationModal';
import { CheckoutSuccessModal } from './components/modals/CheckoutSuccessModal';
import { RegisterDeviceModal } from './components/modals/RegisterDeviceModal';
import { INITIAL_ACTIVE_ORDER } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(HERO_PRODUCT);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlist, setWishlist] = useState<Product[]>(INITIAL_WISHLIST_ITEMS);
  const [deliveryLocation, setDeliveryLocation] = useState('Brooklyn, NY 11201');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [devices, setDevices] = useState<RegisteredDevice[]>(REGISTERED_DEVICES);

  // Modals state
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isAROpen, setIsAROpen] = useState(false);
  const [isAISupportOpen, setIsAISupportOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [isRegisterDeviceOpen, setIsRegisterDeviceOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(499.16);
  const [fulfillmentMethod, setFulfillmentMethod] = useState('delivery');

  // Helpers
  const isWishlisted = (productId: string) => wishlist.some((p) => p.id === productId);

  const toggleWishlist = (product: Product) => {
    if (isWishlisted(product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const handleAddToCart = (
    product: Product,
    selectedColor?: string,
    selectedEdition?: string,
    editionPrice?: number
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.product.id === product.id &&
          i.selectedColor === selectedColor &&
          i.selectedEdition === selectedEdition
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        quantity: 1,
        selectedColor: selectedColor || product.colors?.[0]?.name,
        selectedEdition: selectedEdition,
        editionExtraPrice: editionPrice || 0,
        hasPulseCare: false,
        pulseCarePrice: 39.99
      };
      return [...prev, newItem];
    });
  };

  const handleInstantBuy = (
    product: Product,
    selectedColor?: string,
    selectedEdition?: string,
    totalPrice?: number
  ) => {
    handleAddToCart(product, selectedColor, selectedEdition);
    setCheckoutTotal(totalPrice || product.price);
    setIsCheckoutSuccessOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleTogglePulseCare = (id: string) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, hasPulseCare: !i.hasPulseCare } : i))
    );
  };

  const handleProceedToCheckout = (total: number, fulfillment: string) => {
    setCheckoutTotal(total);
    setFulfillmentMethod(fulfillment);
    setIsCheckoutSuccessOpen(true);
  };

  const handleReorder = (item: { name: string; price: number }) => {
    const dummyProduct: Product = {
      id: `reorder-${Date.now()}`,
      name: item.name,
      subtitle: 'OEM High-Performance Replacement',
      price: item.price,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6t4t5tW4b5eG5b6F6n4C6v4D6x4E6y4U6i4O6p4A6s4D6f4G6h4J6k4L6m4N6b4V6c4X6z4A6s4D6f4G6h4J6k4L6m4N6b4V6c4X6z',
      brand: 'PulseTech',
      category: 'Accessories',
      specs: ['OEM Sealed', 'Express Dispatch'],
      rating: 4.9,
      reviewsCount: 88,
      inStock: true
    };
    handleAddToCart(dummyProduct);
    setCurrentScreen('cart');
  };

  const handleRegisterSuccess = (name: string, serial: string) => {
    const newDevice: RegisteredDevice = {
      id: `dev-${Date.now()}`,
      name,
      model: 'Custom Registered Hardware Unit',
      serialNumber: serial,
      specs: 'Synced via PulseHub Barcode Diagnostic',
      warranty: 'Standard Pulse Care',
      warrantyExpiry: 'March 2027',
      healthPercent: 100,
      healthStatus: '100% HEALTHY',
      type: 'audio'
    };
    setDevices((prev) => [newDevice, ...prev]);
    alert(`Device "${name}" successfully registered and synced with Pulse Care!`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary-fixed">
      {/* Universal Top App Bar (Custom header for Catalog screen handles back) */}
      {currentScreen !== 'catalog' && (
        <TopAppBar
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          wishlistCount={wishlist.length}
          deliveryLocation={deliveryLocation}
          onOpenLocationModal={() => setIsLocationOpen(true)}
        />
      )}

      {/* Screen Router */}
      <div className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={setCurrentScreen}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentScreen('pdp');
            }}
            onAddToCart={handleAddToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
            deliveryLocation={deliveryLocation}
            onOpenLocationModal={() => setIsLocationOpen(true)}
            onSelectCategory={(cat) => setCategoryFilter(cat)}
          />
        )}

        {currentScreen === 'pdp' && (
          <ProductDetailScreen
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onInstantBuy={handleInstantBuy}
            onOpenTradeInModal={() => setIsTradeInOpen(true)}
            onOpenARModal={() => setIsAROpen(true)}
          />
        )}

        {currentScreen === 'catalog' && (
          <CatalogScreen
            onNavigate={setCurrentScreen}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentScreen('pdp');
            }}
            onAddToCart={handleAddToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
            activeCategoryFilter={categoryFilter}
            onOpenFilterModal={() => setIsFilterOpen(true)}
          />
        )}

        {currentScreen === 'cart' && (
          <CartScreen
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onTogglePulseCare={handleTogglePulseCare}
            onProceedToCheckout={handleProceedToCheckout}
            onNavigateCatalog={() => setCurrentScreen('catalog')}
          />
        )}

        {currentScreen === 'hub' && (
          <HubScreen
            onNavigate={setCurrentScreen}
            onOpenLiveTrackingModal={() => setIsTrackingOpen(true)}
            onOpenAISupportModal={() => setIsAISupportOpen(true)}
            onOpenTradeInModal={() => setIsTradeInOpen(true)}
            onOpenRegisterDeviceModal={() => setIsRegisterDeviceOpen(true)}
            onReorder={handleReorder}
          />
        )}

        {currentScreen === 'saved' && (
          <SavedScreen
            wishlist={wishlist}
            onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentScreen('pdp');
            }}
            onNavigate={setCurrentScreen}
          />
        )}
      </div>

      {/* Floating Bottom Navigation Bar */}
      <BottomNavBar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        savedCount={wishlist.length}
      />

      {/* Interactive Modals */}
      <LiveTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        order={INITIAL_ACTIVE_ORDER}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={(filters) => {
          console.log('Applied filters:', filters);
        }}
      />

      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        onApplyTradeInCredit={(credit) => {
          console.log('Trade-in credit:', credit);
        }}
      />

      <ARViewModal
        isOpen={isAROpen}
        onClose={() => setIsAROpen(false)}
        product={selectedProduct}
      />

      <AISupportModal
        isOpen={isAISupportOpen}
        onClose={() => setIsAISupportOpen(false)}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentLocation={deliveryLocation}
        onUpdateLocation={setDeliveryLocation}
      />

      <CheckoutSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        orderTotal={checkoutTotal}
        fulfillmentMethod={fulfillmentMethod}
        onViewHub={() => setCurrentScreen('hub')}
      />

      <RegisterDeviceModal
        isOpen={isRegisterDeviceOpen}
        onClose={() => setIsRegisterDeviceOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
}

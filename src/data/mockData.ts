import { Product, CartItem, RegisteredDevice, ActiveOrder } from '../types';

export const HERO_PRODUCT: Product = {
  id: 'apex-pro-anc',
  name: 'CyberAudio Apex Pro',
  category: 'Audio & ANC',
  brand: 'Pulse Audio',
  series: 'Flagship 2025',
  subtitle: 'Lossless Spatial Sound • Graphene Drivers • 60h Playtime',
  description: 'Precision engineered for audiophiles and pro creators. High-resolution graphene-coated 40mm transducers deliver breathtaking dynamic range with real-time biometric head tracking.',
  price: 349.99,
  originalPrice: 429.99,
  discountPercent: 18,
  rating: 4.9,
  reviewsCount: 1248,
  soldCountText: '2.4k sold this month',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGZXAK-kiQ2ygwpNywPSOft_9YjrIORNOls-fdlVhcTQ97_It59dtglSmHjz1HrPTjW6RMyAwn6KIYlaaOSPKH5xfwdqkRUsgg1VACSBCbuaWhK1udOMaG-37Uqak-ixfCOtSFrCkCmjn7S-RzdCcug_5VUsicZA7wdpsxWXMdIKGZ6hgR9a-qR9n5QrxaXMs93yXLhM-1rFXbrWUj6nya61TBlWGpJ6ccPTv2xga_sg8sp_gZLsp9',
  galleryImages: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAGZXAK-kiQ2ygwpNywPSOft_9YjrIORNOls-fdlVhcTQ97_It59dtglSmHjz1HrPTjW6RMyAwn6KIYlaaOSPKH5xfwdqkRUsgg1VACSBCbuaWhK1udOMaG-37Uqak-ixfCOtSFrCkCmjn7S-RzdCcug_5VUsicZA7wdpsxWXMdIKGZ6hgR9a-qR9n5QrxaXMs93yXLhM-1rFXbrWUj6nya61TBlWGpJ6ccPTv2xga_sg8sp_gZLsp9',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuATJwvea-cwjx40_tk7oeweXiDjqAea7CG-nnZE4Nt-xr4NVwm0ts380RmvHtJet8kKCkXGeoWRCluGNK9MDujlMbOINoC4Pr394ZumuxNDkQeeZiUI_-IcgVpZH7IZvK-MTK-UHIKIcmkmgktorwRPeV5FBad2y8L0BbfLQdF63yfhNG_gnBRUfqmbp8Zstun5uUiVlvxsJQmWKmPYoBj72TxJOyQYSt2-QAhTVECJ_6DmqoyxbdZC',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBRxWmL89TnKdMDWuL4h132xZz03qLwGCYHV44d5yeJdBW44MyloItwWfqrVqr2kgHfAvmouQCJ-ILBBuNMPkRcjqZ0kT5_4y9ppFCPQoRyBcD3IW5dKlDi4XqzOSfNrW7FgGhUgqgNuPZMD0StzUyBYHZh9FKm1mjRylXFxfPBGm7MrKftaVq5zncOzdM52qarnF3A2Z1TNGv2l53T4qyN5oLJM3pCKNzJCmOyNCehjDMF3o39FQH3',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD-q8VMPng6dDSh5D_RVSeOJljwqqrRKcykkcYGZaurY1SNN-jpBHLKTps1mSM5Ry0_LfXs8UWf8fb1Tbgv8R1PCSxI_WnpMTLKd_qKMWGu_5hFstY0D99ughfQh5CPNsDaOORpQDp19BqUMjurXYp6ySYVfilMtNEdSXUfYlRUKqK47ukuWn_T2SwWm0Hcipf5nMPb_1Cf981PdYC3TozjfRc_XuWY7x0nmLbJFBv0z-DTHRdkxmoC'
  ],
  badges: ['NEW RELEASE', 'LOSSLESS AUDIO', 'ANC 2.0'],
  specs: ['40mm Graphene Drivers', '45h Battery', 'Dual H2 Chips', 'Hybrid ANC 2.0', '32-bit LDAC'],
  colors: [
    { name: 'Cyber Obsidian', hex: '#0d1117' },
    { name: 'Stealth Silver', hex: '#64748b' },
    { name: 'Neon Cyan Accent', hex: '#00f2fe' },
    { name: 'Matte Titanium', hex: '#334155' }
  ],
  inStock: true,
  isTopSeller: true
};

export const FLASH_DEALS: Product[] = [
  {
    id: 'ultrabook-pro-16',
    name: 'UltraBook Pro 16',
    category: 'Laptops & PCs',
    brand: 'Apple',
    subtitle: 'Liquid Retina XDR • ProMotion 120Hz',
    price: 1899.00,
    originalPrice: 2199.00,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB2V27qgrTbhJ87q82w4_7NGrh95BHCkU4zFUHhgyoskxzOatkKetOmTNbdJAv-7msT8ASyClBUrppv4DKpdkTk19UlHWRyR3m37CEi057rH22AKANk2VXqhOqc0HXA8IaU-0YaXIjptkVxVUbfrhRaeEzkVcDPfIEtjev1m-l5b-TER6TAF1tFOHAbGRVlH1AoxgKVWXfu65xcGOV8kEJhCcRSrPRF9ePx5YSJXlttKEfVNupjMdq',
    specs: ['M3 Max', '36GB RAM', '1TB SSD'],
    badges: ['-15% OFF'],
    inStock: true,
    isSale: true
  },
  {
    id: 'novapulse-watch-ultra',
    name: 'NovaPulse Smartwatch Ultra 2',
    category: 'Wearables',
    brand: 'NovaPulse',
    subtitle: 'Dual-Frequency GPS • 100m Dive Rated',
    price: 429.00,
    originalPrice: 499.00,
    discountPercent: 14,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjdcWdUes0pSuhKt5ZUEePSC88NGSD6ldLX7b5HQe0C--5RTJee6YuxdEBqLvhZLd3U2pgmCndMPSeVmEcxaOfAaV0N_IBfDmDlnQuIbhqYpuqG2Fz-h7J94lYSNrJJJJ2qH0ZoaOruymn8kHA4EDCwEaFPYVmsxTfqweU0oKiEd1pjtEQFJubtIjjS2UOl8Ad0WgkMM5dqaBq7i5ZynlTEi_fMWMl-XKulpvtyq2hQtzl4EjgLOLj',
    specs: ['Titanium', 'Sapphire', '72h Battery'],
    badges: ['-14% OFF'],
    inStock: true,
    isSale: true
  }
];

export const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: 'vortex-phone-pro',
    name: 'Vortex Phone Pro 5G',
    category: 'Smartphones',
    brand: 'Vortex',
    subtitle: 'Snapdragon 8 Gen 3 • 120Hz OLED',
    price: 899.00,
    rating: 4.9,
    reviewsCount: 1200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGaMFasaG-X5OlKpnaGbksVfXOtqzLrD36a2aOgXzUUuDuOAYsXElpxwoVS4DXL5NsQh7wNXkHaKkNtxVP0DOdY0JiCiA15sSCRDJvG1lukngxC5NpN5B-Ug9Bc9JT74OzfARrQijuqeuIGPE9913O741tkDtOfakdddn-_jqcJi-kxFo72Ps5PgncZcr1Rc2KmzHRJ4xQ8usS6SgSTARFHxaIxTZC4nGI5uibNeyqW6LPai4e2Lc',
    specs: ['Snapdragon 8 Gen 3', '120Hz OLED'],
    badges: ['NEW'],
    inStock: true,
    isNew: true
  },
  {
    id: 'echobuds-spatial-pro',
    name: 'EchoBuds Spatial Pro',
    category: 'Audio & ANC',
    brand: 'Echo',
    subtitle: 'ANC 2.0 • 42h Case Battery',
    price: 199.00,
    originalPrice: 249.00,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 850,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMjmvS1BYR6YADQ9sAehkw1Oe66Y4HeI05-4uYE3ksEKqJC56vRQ4ue2tRXI8sxC-TdyGGSkVKooV5Ikq2Ek8AYCqzG1X5FODfWv78F2dS4HhGKj7Ux8V7ISoow6kt5pohZ5KiZAWz8dWrD4xY69uUsmneUzT7b7RmX2obX1wA6mGl3ksr3nGJGiRacg5YKL9VXxBrofDcQAmfK_9dEzCdUbXQR4iDN38G9xmkjpCBJhzHqmmm1h2b',
    specs: ['ANC 2.0', '42h Case'],
    badges: ['-20%'],
    inStock: true,
    isSale: true
  },
  {
    id: 'quantum-striker-mouse',
    name: 'Quantum Striker Mouse',
    category: 'Gaming Consoles',
    brand: 'Quantum',
    subtitle: '32K DPI Optical • 54 Grams Honeycomb',
    price: 129.00,
    rating: 4.9,
    reviewsCount: 2400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATRT4KAeE9ioxOE4HVXkCwcFgtsWVBWO-xp7gGUGTIGN1DekLFEA0N7TiotiLS3u-2hf75tKQsDr9-SUJgEUPWeMZ_LpOdinVY6ClnrJ-B8H58cxkhAbchQ_SKqGWbBjF5Qa6OQiynhkN-AgmIdgOHf6bYN7G2RPwau00pZIjktevrbKUNuhjfmF46XAurEUVlvWcAEbDOO8OQzVZ2j_Rv-1UqWBwygWbf6v95ZQ0C5mWSCj_5WQ_N',
    specs: ['32K DPI', '54 Grams'],
    badges: ['POPULAR'],
    inStock: true,
    isTopSeller: true
  },
  {
    id: 'spectra-curved-34',
    name: 'Spectra Curved 34"',
    category: 'Gaming Consoles',
    brand: 'Spectra',
    subtitle: '240Hz OLED • 0.03ms Ultra-Low Latency',
    price: 799.00,
    originalPrice: 889.00,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 640,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTBD1BZ6pJDe_g5t33fhB8ERoY6bl9Vw_woO5m20M9nSmw8MDjvZSnILDkepiNZ7QAKEb7cMgSuNg5n4cVCR22TX_jQJmtEPePZ5i2rkRxR3PeyPreZivHQUTdTF9VPEIptr0lVvJ2Kt1Dy0HVqiv34gEl2UUTF977vm9X-ARmX7tabSbFU0gib-u04WMI8SqUk2FnlhHIdGT3fut599nEzbtcgeaS-jNNTIOSQudzi9MCsvdUwesz',
    specs: ['240Hz OLED', '0.03ms'],
    badges: ['-10%'],
    inStock: true,
    isSale: true
  }
];

export const CATALOG_PRODUCTS: Product[] = [
  {
    id: 'razer-blade-16-oled',
    name: 'Razer Blade 16 OLED',
    category: 'Laptops & PCs',
    brand: 'Razer',
    subtitle: 'Dual-Mode Mini-LED • RTX 4090 16GB',
    price: 3299.99,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKQCscvD0nyExR58PDEu_50Y6vUL4MuzGS_pyba8moRXK1icDfUQKcr5-Ocm-1q-fxOgIxVUDs64Ud1bZrOj2mMCs-frqMDzXV64uyieEULhJdL7QQmVxqfboPPJVCL2IwJz_l1bXqtUrp_OBTIop5u6nau4z5ezwPHYYBuhD-02L_AZ3rfp_FcBUqfILV1ATDqdOp4hBtdCKOQnhBsJARyF9OXl66YSO9y_-s2cKHIEi3G8uyU7x3',
    specs: ['RTX 4090 16GB', '32GB DDR5', 'Dual-Mode Mini-LED'],
    badges: ['TOP SELLER', 'OLED 240Hz'],
    inStock: true,
    isTopSeller: true
  },
  {
    id: 'macbook-pro-16-space-black',
    name: 'MacBook Pro 16"',
    category: 'Laptops & PCs',
    brand: 'Apple',
    subtitle: 'Space Black • M3 Max 16-Core',
    price: 3499.00,
    rating: 5.0,
    reviewsCount: 312,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChd4S2ytxMfMVjtkQnk_OYyL4sHONUq9bwkEsktCeUWBf5bMnm7pCSRJxX6NLNc0fm9oZLCQSAcN_nR_-dRVOgkuWanpSnmEECc1ONq3hvs8Cymx8uutdLS5481zJiOLMSDEwAxFhqfRP2MKna9BsIvGgV4QDN1hrQgL1Ncd-_9YZtZR65OzcaTb7B_uUWHeCmwSRx4za9njwSvDfEvaUcS027N-8SKnD0yrx4nFheMIs4Z2hf06uV',
    specs: ['M3 Max 16-Core', '36GB Unified RAM'],
    badges: ['PRO CHOICE'],
    inStock: true,
    isTopSeller: true
  },
  {
    id: 'rog-zephyrus-g14',
    name: 'ROG Zephyrus G14',
    category: 'Laptops & PCs',
    brand: 'Asus',
    subtitle: '1.5kg Ultraportable • Ryzen 9 • RTX 4070',
    price: 1599.99,
    originalPrice: 1799.00,
    discountPercent: 12,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC7jYapu01FtoqNt5a2053IxRNFtr7LwKgrLCsb9ut7uKLx3atp4KUOfJ_dAbHphJ7Xc51Y6YxiXlejlB7db5OsQjfdJQr9NxMEgKjsrObgyF-6uhqo60K74Dlw78PLA7mC65qY-bWvOnm1FjFCPpfeOepeqZ6vqmMVqvpSFQCiNfD2oMdmYQnxAMJwnWJOmV1TGlKmv66PwnYS74aM21p5roSd5bsrxfkimVYUN6wsRXMsvKyxqY8',
    specs: ['Ryzen 9 • RTX 4070', 'OLED 3K 120Hz'],
    badges: ['SALE -12%'],
    inStock: true,
    isSale: true
  },
  {
    id: 'dell-xps-14-ai',
    name: 'Dell XPS 14 AI',
    category: 'Laptops & PCs',
    brand: 'Dell',
    subtitle: 'Graphite Grey • Core Ultra 7 NPU',
    price: 1699.00,
    rating: 4.7,
    reviewsCount: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKnCYzp2ZtQZNXZI26PTFCrtf8RvMxKfGcyBBQQfjxDCUdkn-77KHFl1dO9pp2TearfDPccB2FQY-ejjL2GWGtEGM4FlA8j0BjTbW7RzK9VRf1UOmAkx2rMoaNgagTpz7KJBysRtpGU3PExrci_o2FhD7yZLwWk2oZIDo60Z1D2y6KUq2SY1aBkzH4r0tOfytmMkPp8IwBCbF94R4gKAmfwSYbfo9-eeQzGDRy4pWJzQ54Utfaa7w-',
    specs: ['Core Ultra 7 NPU', '3.2K OLED Touch'],
    badges: ['NEW'],
    inStock: true,
    isNew: true
  },
  {
    id: 'legion-pro-7i',
    name: 'Legion Pro 7i',
    category: 'Laptops & PCs',
    brand: 'Lenovo',
    subtitle: 'Onyx Grey • i9-14900HX 24-Core',
    price: 2199.99,
    rating: 4.8,
    reviewsCount: 116,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwhVors07xgl1fYD6bdaLFLQ_bSrXSCjYczlg5Fia92hvuZtIkRxO-U7hAmUUlN0EC1BYOOhHdGbMKjMHQTxh_6sGUoDvleakZwYPqBnGO4NGeQf7Xbk1TAsmYAOsRccvQMQPPkJYLqNir0JON36o08ALvQdSmsI6QT9h8AhCY2cPyo1Wml7WUaFoESMCH3kazTOBIbP_1_auDLn9Gsn1IMoLX89C-q6w_Ezarwwd18_3yBIaNcQfW',
    specs: ['i9-14900HX 24-Core', 'RTX 4080 12GB'],
    badges: ['HOT RIG'],
    inStock: true
  }
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    product: HERO_PRODUCT,
    quantity: 1,
    selectedColor: 'Cyber Obsidian',
    selectedEdition: 'Standard ANC',
    hasPulseCare: true,
    pulseCarePrice: 39.99
  },
  {
    id: 'cart-2',
    product: {
      id: 'thundervolt-140w',
      name: 'ThunderVolt 140W GaN Charger',
      category: 'Smart Home',
      brand: 'ThunderVolt',
      subtitle: '4-Port PD 3.1 • GaN III Architecture',
      price: 69.99,
      rating: 4.9,
      reviewsCount: 450,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0xU3fJepUW933h1vow8F41sFrIgLmIrMx9MLzayYTJzDKdYRHFz3mUGDwIGISxlKgoq0UHoUq0DRg_9-1HMqW_7MlkXijarFcDD3wjijqc1bbfi6quMUu3r-lKgp0ItAn3--CU7-ODL_PcPgl_Ha0bYlIqtcribqM6csyTRsByuCQ_Y10dyJfBjUrzpjh0N8SZn0uX-WDL0h9rjgl7ba4BawCxs-wszdi23oaLbV8xzNN2J3QMQSz',
      specs: ['4-Port PD 3.1', 'GaN III'],
      inStock: true
    },
    quantity: 1,
    hasPulseCare: false,
    pulseCarePrice: 0
  },
  {
    id: 'cart-3',
    product: {
      id: 'braided-usbc-240w',
      name: 'Braided USB-C Cable 240W',
      category: 'Smart Home',
      brand: 'PulseTech',
      subtitle: '2m • Titanium Connectors • E-Marker',
      price: 24.99,
      rating: 4.8,
      reviewsCount: 620,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB57exYscLNGmo554_I5-u0cf6k6LfsKOv0up5W8Lax8VVYLAtyl0GzFPisGVjIo6Mo_e2X1Gxz-PWAcyAfbZJBkFA6MAtN-K8dGxW2TlqwHRAiryjvLXAQ4_H8ZIaT1J74HnppX5wlq6D8QqlaYgwDnfYR9DViQzZgnz5k3t4wDL1f41--3zO8YlM1TQtqDoe_3UteUrmgMK0crVBcLnCD7FMwKBqQrp0zzTmEWSnTxaQ_DbVsTBMu',
      specs: ['2m • Titanium', 'E-Marker'],
      inStock: true
    },
    quantity: 1,
    hasPulseCare: false,
    pulseCarePrice: 0
  }
];

export const INITIAL_ACTIVE_ORDER: ActiveOrder = {
  id: 'order-1',
  orderNumber: 'PT-982410',
  productName: 'Apex Pro ANC Headphones',
  productSubtitle: '+ Bundled 140W Gallium-Nitride HyperCharger',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-q8VMPng6dDSh5D_RVSeOJljwqqrRKcykkcYGZaurY1SNN-jpBHLKTps1mSM5Ry0_LfXs8UWf8fb1Tbgv8R1PCSxI_WnpMTLKd_qKMWGu_5hFstY0D99ughfQh5CPNsDaOORpQDp19BqUMjurXYp6ySYVfilMtNEdSXUfYlRUKqK47ukuWn_T2SwWm0Hcipf5nMPb_1Cf981PdYC3TozjfRc_XuWY7x0nmLbJFBv0z-DTHRdkxmoC',
  eta: '4:30 PM',
  etaMinutes: 42,
  statusText: 'Out for Delivery — Arriving today by 4:30 PM',
  currentStep: 3, // Step 4 in 5-step stepper (0-indexed: Transit)
  courierName: 'Marcus D.',
  courierService: 'FedTech Express',
  courierVehicle: 'Van #19',
  gpsDistance: '1.4 MI AWAY',
  latitude: '37.7749° N'
};

export const REGISTERED_DEVICES: RegisteredDevice[] = [
  {
    id: 'device-1',
    name: 'MacBook Pro 16"',
    model: 'Apple M3 Max • 64GB Unified',
    serialNumber: 'C02G99...4K',
    specs: 'Apple M3 Max • 64GB Unified',
    warranty: 'PulseCare Extended',
    warrantyExpiry: 'Nov 2026',
    healthPercent: 98,
    healthStatus: '98% OPTIMAL',
    type: 'laptop'
  },
  {
    id: 'device-2',
    name: 'Apex Pro Wireless ANC',
    model: 'Studio Matte Black • Low Latency',
    serialNumber: 'AP902...7X',
    specs: 'Studio Matte Black • Low Latency',
    warranty: 'Standard Pulse Care',
    warrantyExpiry: 'Sep 2026',
    healthPercent: 100,
    healthStatus: '100% HEALTHY',
    firmware: 'v2.1.0 (Latest)',
    codec: 'LDAC 990KBPS',
    type: 'audio'
  },
  {
    id: 'device-3',
    name: 'Sony Alpha A7 IV Body',
    model: 'Full Frame 33MP • 4K 60p',
    serialNumber: 'SN441...9B',
    specs: 'Full Frame 33MP • 4K 60p',
    warranty: 'Expired',
    warrantyExpiry: 'May 2024',
    healthPercent: 92,
    healthStatus: 'PRE-APPROVED',
    tradeInValue: 1420,
    type: 'camera'
  }
];

export const INITIAL_WISHLIST_ITEMS: Product[] = [
  HERO_PRODUCT,
  FLASH_DEALS[0],
  RECOMMENDED_PRODUCTS[0]
];

export const PREVIOUS_ORDERS = [
  {
    id: 'past-1',
    name: 'Quantum SSD 4TB Gen5',
    date: 'Oct 14',
    price: 389.00,
    status: 'COMPLETED',
    icon: 'memory'
  },
  {
    id: 'past-2',
    name: 'Titanium Thunderbolt 4 Cable (2m)',
    date: 'Sep 28',
    price: 59.00,
    status: 'COMPLETED',
    icon: 'cable'
  }
];

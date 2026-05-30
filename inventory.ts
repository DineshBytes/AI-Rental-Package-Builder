import { Device } from '../types';

export const INVENTORY: Device[] = [
  {
    id: 'macbook-pro-m3',
    name: 'MacBook Pro M3 Max',
    category: 'Laptops',
    specs: '14-inch, 64GB RAM, 1TB SSD, Apple Silicon M3 Max Chips',
    unitPricePerDay: 15000 / 100, // ₹150 / day (scaled dynamically in rupees/dollars)
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 45,
    aiRecommendationTag: 'Best for stable high-performance presentation delivery & live software builds'
  },
  {
    id: 'laser-projector-4k',
    name: '4K Laser Projector',
    category: 'Projectors',
    specs: '6000 Lumens HDR, Ultra Short Throw, HDMI 2.1 Dual Feed',
    unitPricePerDay: 850,
    imageUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 12,
    aiRecommendationTag: 'High-lumen projector recommended to cut through bright daylight-heavy hotel halls'
  },
  {
    id: 'pa-audio-system',
    name: 'PA Audio System',
    category: 'Audio',
    specs: 'Dual Active Speakers with Built-in Mixers & 1200W Subwoofer',
    unitPricePerDay: 425,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 18,
    aiRecommendationTag: 'Optimized response curve for maximum vocal speech clarity & remote stream feed output'
  },
  {
    id: 'wireless-lapel-mic',
    name: 'Wireless Lapel System',
    category: 'Audio',
    specs: 'Quad-channel UHF receivers, omnidirectional clip-on collar units',
    unitPricePerDay: 125,
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 28,
    aiRecommendationTag: 'Offers hand-free mobility with redundancy to eliminate ambient reverb issues'
  },
  {
    id: 'sony-a7r4',
    name: 'Sony A7R IV Alpha Mirrorless',
    category: 'Accessories',
    specs: '61MP Full-Frame Sensor, 24-70mm f/2.8 G-Master Lens, HDMI Output',
    unitPricePerDay: 150,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 15,
    aiRecommendationTag: 'High resolution camera ideal for professional recording, video feeds and live tracking'
  },
  {
    id: 'workstation-display',
    name: '27" 5K Display',
    category: 'Displays',
    specs: 'IPS panel, Thunderbolt Hub, 99% DCI-P3 Color Calibrated profile',
    unitPricePerDay: 95,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 25,
    aiRecommendationTag: 'Studio-grade displays to bundle with development workstations'
  },
  {
    id: 'ergo-chair',
    name: 'Ergo Task Chair',
    category: 'Office',
    specs: 'High Back Mesh Support, Adjustable Armrests and Lumbar tilt lock',
    unitPricePerDay: 45,
    imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 80,
    aiRecommendationTag: 'Ergonomic task seating minimizing developer strain during extended hackathons'
  },
  {
    id: 'networking-hub',
    name: 'Networking Enterprise Switch',
    category: 'Accessories',
    specs: '24-Port 10GbE Switch, Wi-Fi 6E Pro AP Integration, Dual WAN Failover',
    unitPricePerDay: 180,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 10,
    aiRecommendationTag: 'Critical item to hold 50+ concurrent server loads securely without latency spikes'
  },
  {
    id: 'gaming-laptop',
    name: 'ASUS ROG Strix Gaming Laptop',
    category: 'Laptops',
    specs: 'Intel i9, 32GB RAM, 1TB SSD, NVIDIA RTX 4080 GPU, QHD 240Hz screen',
    unitPricePerDay: 180,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 20,
    aiRecommendationTag: 'Ultra high-end GPU-accelerated computing suitable for modern esports and graphics development'
  },
  {
    id: 'gaming-monitor',
    name: '34" Curved Esports Monitor',
    category: 'Displays',
    specs: 'Ultrawide 3440 x 1440 resolution, 165Hz refresh rate, 1ms response latency',
    unitPricePerDay: 110,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 16,
    aiRecommendationTag: 'Curved high-refresh display to complement elite workstation gaming configurations'
  },
  {
    id: 'studio-lights',
    name: 'LED Broadcast Studio Lights',
    category: 'Accessories',
    specs: 'Dual-panel high cri softbox kit, DMX controllable dimming panels, 3200-5600K range',
    unitPricePerDay: 75,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=350',
    inventoryStatus: 'In Stock',
    stockQuantity: 12,
    aiRecommendationTag: 'Studio soft panels providing glare-free, color-accurate illumination for professional live feeds'
  }
];

export function getDeviceById(id: string): Device | undefined {
  return INVENTORY.find(d => d.id === id);
}

export function formatCurrency(amount: number, currency: 'USD' | 'INR' = 'USD'): string {
  if (currency === 'INR') {
    // Standard format for Indian Rupees matching "₹1.42Cr" or direct formatting
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount * 84); // mock exchange rate
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

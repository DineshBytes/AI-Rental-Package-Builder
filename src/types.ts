export interface Device {
  id: string;
  name: string;
  category: 'Laptops' | 'Displays' | 'Projectors' | 'Audio' | 'Accessories' | 'Office';
  specs: string;
  unitPricePerDay: number;
  imageUrl: string;
  inventoryStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  stockQuantity: number;
  aiRecommendationTag: string;
}

export interface RecommendedItem {
  device: Device;
  quantity: number;
}

export interface RentalPackage {
  id: string;
  useCase: string;
  eventType: string;
  budgetRange: string;
  durationDays: number;
  items: RecommendedItem[];
  suitabilityScore: number;
  bestForExplanation: string;
  totalCost: number;
  createdAt: string;
}

export interface ClientDetails {
  companyName: string;
  contactName: string;
  email: string;
  address?: string;
}

export interface Quotation {
  quoteId: string;
  client: ClientDetails;
  durationDays: number;
  startDate: string;
  endDate: string;
  items: {
    deviceName: string;
    specs: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    imageUrl?: string;
  }[];
  subtotal: number;
  supportFee: number;
  tax: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Approved';
}

export interface CustomerRequest {
  id: string;
  customerName: string;
  companyName: string;
  deviceModel: string;
  requestDate: string;
  status: 'PENDING' | 'COMPLETED' | 'IN REVIEW';
}

export interface AnalyticsMetric {
  recentEnquiries: number;
  mostRentedDevices: string;
  aiConversionRate: number;
  monthlyRevenue: number;
}

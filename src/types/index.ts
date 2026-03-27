export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "meal-plan" | "ebook" | "guide" | "course";
  features: string[];
  badge?: string;
  slug: string;
  storagePath: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  author: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  program: string;
  date: string;
  before?: string;
  after?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  paymentStatus: "paid" | "failed";
  purchasedAt: string;
}

export interface PurchasedProduct {
  purchaseId: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  purchasedAt: string;
}

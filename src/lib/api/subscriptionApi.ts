// Mock API service for subscription and payment functionality
// In a real application, this would connect to a backend API and payment processor

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoRenew: boolean;
  paymentMethod: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  paymentMethod: string;
}

// Mock data
const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan_free',
    name: 'Free',
    description: 'Basic access with ads',
    price: 0,
    interval: 'month',
    features: [
      'Access to free content',
      'Standard definition streaming',
      'Ad-supported viewing',
      'Limited access to creator content'
    ]
  },
  {
    id: 'plan_basic',
    name: 'Basic',
    description: 'Ad-free viewing experience',
    price: 9.99,
    interval: 'month',
    features: [
      'Ad-free viewing experience',
      'HD streaming quality',
      'Access to all non-premium content',
      'Download videos for offline viewing',
      'Stream on two devices simultaneously'
    ]
  },
  {
    id: 'plan_premium',
    name: 'Premium',
    description: 'Ultimate streaming experience',
    price: 14.99,
    interval: 'month',
    isPopular: true,
    features: [
      'Ad-free viewing experience',
      '4K Ultra HD streaming quality',
      'Access to all premium content',
      'Download videos for offline viewing',
      'Stream on four devices simultaneously',
      'Early access to StreamX Originals',
      'Exclusive creator content'
    ]
  },
  {
    id: 'plan_premium_annual',
    name: 'Premium Annual',
    description: 'Save 20% with annual billing',
    price: 143.88, // 11.99 per month
    interval: 'year',
    features: [
      'All Premium features',
      'Save 20% compared to monthly billing',
      'Annual billing'
    ]
  }
];

const mockSubscriptions: Subscription[] = [
  {
    id: 'sub_001',
    userId: 'usr_001',
    planId: 'plan_premium',
    planName: 'Premium',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-02-01T00:00:00Z',
    isActive: true,
    autoRenew: true,
    paymentMethod: 'card_visa_1234'
  },
  {
    id: 'sub_002',
    userId: 'usr_003',
    planId: 'plan_basic',
    planName: 'Basic',
    startDate: '2024-02-15T00:00:00Z',
    endDate: '2024-03-15T00:00:00Z',
    isActive: true,
    autoRenew: true,
    paymentMethod: 'card_mastercard_5678'
  }
];

const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    userId: 'usr_001',
    amount: 14.99,
    description: 'Premium Subscription - Monthly',
    status: 'completed',
    date: '2024-01-01T00:00:00Z',
    paymentMethod: 'card_visa_1234'
  },
  {
    id: 'txn_002',
    userId: 'usr_003',
    amount: 9.99,
    description: 'Basic Subscription - Monthly',
    status: 'completed',
    date: '2024-02-15T00:00:00Z',
    paymentMethod: 'card_mastercard_5678'
  }
];

// API functions
export const subscriptionApi = {
  // Get all subscription plans
  getAllPlans: async (): Promise<SubscriptionPlan[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSubscriptionPlans;
  },

  // Get subscription plan by ID
  getPlanById: async (planId: string): Promise<SubscriptionPlan | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    const plan = mockSubscriptionPlans.find(plan => plan.id === planId);
    return plan || null;
  },

  // Get user's current subscription
  getUserSubscription: async (userId: string): Promise<Subscription | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));
    const subscription = mockSubscriptions.find(
      sub => sub.userId === userId && sub.isActive
    );
    return subscription || null;
  },

  // Get user's transaction history
  getUserTransactions: async (userId: string): Promise<Transaction[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockTransactions.filter(txn => txn.userId === userId);
  },

  // Subscribe to a plan
  subscribeToPlan: async (
    userId: string,
    planId: string,
    paymentMethod: string
  ): Promise<Subscription> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the plan
    const plan = mockSubscriptionPlans.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plan not found');
    }
    
    // Check if user already has an active subscription
    const existingSubscription = mockSubscriptions.find(
      sub => sub.userId === userId && sub.isActive
    );
    
    if (existingSubscription) {
      // Cancel existing subscription
      existingSubscription.isActive = false;
      existingSubscription.autoRenew = false;
    }
    
    // Create new subscription
    const startDate = new Date();
    const endDate = new Date(startDate);
    if (plan.interval === 'month') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    const newSubscription: Subscription = {
      id: `sub_${Date.now()}`,
      userId,
      planId,
      planName: plan.name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isActive: true,
      autoRenew: true,
      paymentMethod
    };
    
    // Add to subscriptions
    mockSubscriptions.push(newSubscription);
    
    // Create transaction
    const newTransaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId,
      amount: plan.price,
      description: `${plan.name} Subscription - ${plan.interval === 'month' ? 'Monthly' : 'Annual'}`,
      status: 'completed',
      date: new Date().toISOString(),
      paymentMethod
    };
    
    // Add to transactions
    mockTransactions.push(newTransaction);
    
    return newSubscription;
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const subscriptionIndex = mockSubscriptions.findIndex(sub => sub.id === subscriptionId);
    if (subscriptionIndex === -1) return false;
    
    // Update subscription
    mockSubscriptions[subscriptionIndex].autoRenew = false;
    
    return true;
  },

  // Process payment (for one-time purchases like pay-per-view)
  processPayment: async (
    userId: string,
    amount: number,
    description: string,
    paymentMethod: string
  ): Promise<Transaction> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Create transaction
    const newTransaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId,
      amount,
      description,
      status: 'completed',
      date: new Date().toISOString(),
      paymentMethod
    };
    
    // Add to transactions
    mockTransactions.push(newTransaction);
    
    return newTransaction;
  }
};

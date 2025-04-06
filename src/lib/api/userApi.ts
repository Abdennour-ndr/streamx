// Mock API service for user data
// In a real application, this would connect to a backend API

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  profileImage?: string;
  bio?: string;
  isCreator: boolean;
  subscriptionTier: 'free' | 'basic' | 'premium';
  createdAt: string;
}

export interface Creator extends User {
  subscriberCount: number;
  contentCount: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: 'usr_001',
    username: 'admin',
    email: 'admin@streamx.com',
    fullName: 'Admin User',
    profileImage: '/images/users/admin.jpg',
    isCreator: false,
    subscriptionTier: 'premium',
    createdAt: '2023-12-01'
  },
  {
    id: 'usr_002',
    username: 'creator1',
    email: 'creator1@streamx.com',
    fullName: 'Creator One',
    profileImage: '/images/users/creator1.jpg',
    bio: 'Professional content creator specializing in gaming and tech reviews.',
    isCreator: true,
    subscriptionTier: 'premium',
    createdAt: '2024-01-15'
  },
  {
    id: 'usr_003',
    username: 'viewer1',
    email: 'viewer1@streamx.com',
    fullName: 'Viewer One',
    isCreator: false,
    subscriptionTier: 'basic',
    createdAt: '2024-02-20'
  }
];

const mockCreators: Creator[] = [
  {
    id: 'usr_002',
    username: 'creator1',
    email: 'creator1@streamx.com',
    fullName: 'Creator One',
    profileImage: '/images/users/creator1.jpg',
    bio: 'Professional content creator specializing in gaming and tech reviews.',
    isCreator: true,
    subscriptionTier: 'premium',
    createdAt: '2024-01-15',
    subscriberCount: 15000,
    contentCount: 45
  },
  {
    id: 'usr_004',
    username: 'musiclover',
    email: 'music@streamx.com',
    fullName: 'Music Lover',
    profileImage: '/images/users/musiclover.jpg',
    bio: 'Sharing my passion for music with the world. Live sessions every Friday!',
    isCreator: true,
    subscriptionTier: 'premium',
    createdAt: '2024-01-20',
    subscriberCount: 8500,
    contentCount: 32
  },
  {
    id: 'usr_005',
    username: 'fitnessguru',
    email: 'fitness@streamx.com',
    fullName: 'Fitness Guru',
    profileImage: '/images/users/fitnessguru.jpg',
    bio: 'Helping you achieve your fitness goals with practical workout routines and nutrition advice.',
    isCreator: true,
    subscriptionTier: 'premium',
    createdAt: '2024-02-05',
    subscriberCount: 12300,
    contentCount: 28
  }
];

// API functions
export const userApi = {
  // Get user by ID
  getUserById: async (id: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = mockUsers.find(user => user.id === id);
    return user || null;
  },

  // Get user by email (for authentication)
  getUserByEmail: async (email: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    const user = mockUsers.find(user => user.email === email);
    return user || null;
  },

  // Get user by username
  getUserByUsername: async (username: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    const user = mockUsers.find(user => user.username === username);
    return user || null;
  },

  // Get all creators
  getAllCreators: async (): Promise<Creator[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockCreators;
  },

  // Get creator by ID
  getCreatorById: async (id: string): Promise<Creator | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const creator = mockCreators.find(creator => creator.id === id);
    return creator || null;
  },

  // Get popular creators
  getPopularCreators: async (limit: number = 5): Promise<Creator[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...mockCreators].sort((a, b) => b.subscriberCount - a.subscriberCount).slice(0, limit);
  },

  // Update user profile
  updateUserProfile: async (
    userId: string, 
    data: { fullName?: string; bio?: string; profileImage?: string }
  ): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) return null;
    
    // Update user data
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...data
    };
    
    return mockUsers[userIndex];
  },

  // Update subscription tier
  updateSubscriptionTier: async (
    userId: string, 
    tier: 'free' | 'basic' | 'premium'
  ): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 450));
    
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) return null;
    
    // Update subscription tier
    mockUsers[userIndex].subscriptionTier = tier;
    
    return mockUsers[userIndex];
  },

  // Apply to become a creator
  applyForCreator: async (userId: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) return false;
    
    // Update user to creator status
    mockUsers[userIndex].isCreator = true;
    
    // Add to creators list
    mockCreators.push({
      ...mockUsers[userIndex],
      subscriberCount: 0,
      contentCount: 0
    });
    
    return true;
  }
};

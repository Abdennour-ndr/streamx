// Mock API service for live streaming functionality
// In a real application, this would connect to a backend API and WebRTC services

import { APIError, ValidationError, NotFoundError, handleAPIError } from './errors';

export interface LiveStream {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorImage?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  streamKey: string;
  status: 'offline' | 'live' | 'ended';
  scheduledStart?: string;
  actualStart?: string;
  actualEnd?: string;
  viewerCount: number;
  isPremium: boolean;
  category?: string;
  tags?: string[];
}

export interface LiveChatMessage {
  id: string;
  streamId: string;
  username: string;
  message: string;
  timestamp: string;
  isCreator: boolean;
  isDonation: boolean;
  donationAmount?: number;
}

export interface StreamData {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  status: 'live' | 'ended' | 'scheduled';
  startTime: string;
  endTime?: string;
  viewerCount: number;
}

// Mock data
const mockLiveStreams: LiveStream[] = [
  {
    id: 'stream_001',
    creatorId: 'usr_002',
    creatorName: 'Creator One',
    creatorImage: '/images/users/creator1.jpg',
    title: 'Friday Night Gaming',
    description: 'Join me as I play the latest releases and chat with viewers!',
    thumbnailUrl: '/images/streams/gaming-stream.jpg',
    streamKey: 'stream_key_001',
    status: 'live',
    actualStart: new Date(Date.now() - 3600000).toISOString(), // Started 1 hour ago
    viewerCount: 1250,
    isPremium: false,
    category: 'Gaming',
    tags: ['Gaming', 'FPS', 'Multiplayer']
  },
  {
    id: 'stream_002',
    creatorId: 'usr_004',
    creatorName: 'Music Lover',
    creatorImage: '/images/users/musiclover.jpg',
    title: 'Live Music Session - Acoustic Covers',
    description: 'Relaxing acoustic covers of your favorite songs. Taking requests in chat!',
    thumbnailUrl: '/images/streams/music-stream.jpg',
    streamKey: 'stream_key_002',
    status: 'live',
    actualStart: new Date(Date.now() - 1800000).toISOString(), // Started 30 minutes ago
    viewerCount: 875,
    isPremium: false,
    category: 'Music',
    tags: ['Music', 'Acoustic', 'Covers']
  },
  {
    id: 'stream_003',
    creatorId: 'usr_005',
    creatorName: 'Fitness Guru',
    creatorImage: '/images/users/fitnessguru.jpg',
    title: 'Morning Workout Routine - Full Body HIIT',
    description: 'Start your day with this energizing full-body HIIT workout. Suitable for all fitness levels!',
    thumbnailUrl: '/images/streams/fitness-stream.jpg',
    streamKey: 'stream_key_003',
    status: 'offline',
    scheduledStart: new Date(Date.now() + 86400000).toISOString(), // Scheduled for tomorrow
    viewerCount: 0,
    isPremium: true,
    category: 'Fitness',
    tags: ['Fitness', 'HIIT', 'Workout']
  }
];

const mockChatMessages: Record<string, LiveChatMessage[]> = {
  'stream_001': [
    {
      id: 'msg_001',
      streamId: 'stream_001',
      username: 'viewer1',
      message: 'Hey, great stream!',
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      isCreator: false,
      isDonation: false
    },
    {
      id: 'msg_002',
      streamId: 'stream_001',
      username: 'Creator One',
      message: 'Thanks for joining everyone!',
      timestamp: new Date(Date.now() - 240000).toISOString(), // 4 minutes ago
      isCreator: true,
      isDonation: false
    },
    {
      id: 'msg_003',
      streamId: 'stream_001',
      username: 'gamer123',
      message: 'Love the gameplay! Keep it up!',
      timestamp: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
      isCreator: false,
      isDonation: true,
      donationAmount: 5.00
    }
  ],
  'stream_002': [
    {
      id: 'msg_004',
      streamId: 'stream_002',
      username: 'musicfan',
      message: 'Can you play some Ed Sheeran?',
      timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
      isCreator: false,
      isDonation: false
    },
    {
      id: 'msg_005',
      streamId: 'stream_002',
      username: 'Music Lover',
      message: 'Sure, I\'ll play "Perfect" next!',
      timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
      isCreator: true,
      isDonation: false
    }
  ]
};

// API functions
export const liveStreamApi = {
  // Get all live streams
  getAllLiveStreams: async (): Promise<LiveStream[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLiveStreams;
  },

  // Get live streams by status
  getLiveStreamsByStatus: async (status: 'offline' | 'live' | 'ended'): Promise<LiveStream[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockLiveStreams.filter(stream => stream.status === status);
  },

  // Get live stream by ID
  getLiveStreamById: async (id: string): Promise<LiveStream | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const stream = mockLiveStreams.find(stream => stream.id === id);
    return stream || null;
  },

  // Get live streams by creator
  getLiveStreamsByCreator: async (creatorId: string): Promise<LiveStream[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 450));
    return mockLiveStreams.filter(stream => stream.creatorId === creatorId);
  },

  // Get chat messages for a stream
  getChatMessages: async (streamId: string): Promise<LiveChatMessage[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockChatMessages[streamId] || [];
  },

  // Send a chat message
  sendChatMessage: async (
    streamId: string,
    userId: string,
    username: string,
    message: string,
    isDonation: boolean = false,
    donationAmount?: number
  ): Promise<LiveChatMessage> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Get the stream to check if the user is the creator
    const stream = mockLiveStreams.find(s => s.id === streamId);
    const isCreator = stream?.creatorId === userId;
    
    // Create new message
    const newMessage: LiveChatMessage = {
      id: `msg_${Date.now()}`,
      streamId,
      username,
      message,
      timestamp: new Date().toISOString(),
      isCreator,
      isDonation,
      donationAmount
    };
    
    // Add to messages
    if (!mockChatMessages[streamId]) {
      mockChatMessages[streamId] = [];
    }
    mockChatMessages[streamId].push(newMessage);
    
    return newMessage;
  },

  // Start a new live stream
  startLiveStream: async (
    creatorId: string,
    title: string,
    description: string,
    thumbnailUrl: string,
    category?: string,
    tags?: string[],
    isPremium: boolean = false
  ): Promise<LiveStream> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Create new stream
    const newStream: LiveStream = {
      id: `stream_${Date.now()}`,
      creatorId,
      creatorName: 'Current User', // This would be fetched from user data in a real app
      title,
      description,
      thumbnailUrl,
      streamKey: `stream_key_${Date.now()}`,
      status: 'live',
      actualStart: new Date().toISOString(),
      viewerCount: 0,
      isPremium,
      category,
      tags
    };
    
    // Add to streams
    mockLiveStreams.push(newStream);
    
    return newStream;
  },

  // End a live stream
  endLiveStream: async (streamId: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const streamIndex = mockLiveStreams.findIndex(stream => stream.id === streamId);
    if (streamIndex === -1) return false;
    
    // Update stream status
    mockLiveStreams[streamIndex].status = 'ended';
    mockLiveStreams[streamIndex].actualEnd = new Date().toISOString();
    
    return true;
  },

  // Schedule a live stream
  scheduleLiveStream: async (
    creatorId: string,
    title: string,
    description: string,
    thumbnailUrl: string,
    scheduledStart: string,
    category?: string,
    tags?: string[],
    isPremium: boolean = false
  ): Promise<LiveStream> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Create new scheduled stream
    const newStream: LiveStream = {
      id: `stream_${Date.now()}`,
      creatorId,
      creatorName: 'Current User', // This would be fetched from user data in a real app
      title,
      description,
      thumbnailUrl,
      streamKey: `stream_key_${Date.now()}`,
      status: 'offline',
      scheduledStart,
      viewerCount: 0,
      isPremium,
      category,
      tags
    };
    
    // Add to streams
    mockLiveStreams.push(newStream);
    
    return newStream;
  }
};

export async function createStream(data: Omit<StreamData, 'id' | 'viewerCount'>): Promise<StreamData> {
  try {
    // التحقق من صحة البيانات
    if (!data.title?.trim()) {
      throw new ValidationError('عنوان البث مطلوب');
    }
    if (!data.creatorId) {
      throw new ValidationError('معرف المنشئ مطلوب');
    }

    const response = await fetch('/api/streams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error.message, response.status, error.code);
    }

    return response.json();
  } catch (error) {
    throw handleAPIError(error);
  }
}

export async function getStream(streamId: string): Promise<StreamData> {
  try {
    const response = await fetch(`/api/streams/${streamId}`);

    if (response.status === 404) {
      throw new NotFoundError('البث المباشر');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error.message, response.status, error.code);
    }

    return response.json();
  } catch (error) {
    throw handleAPIError(error);
  }
}

export async function sendChatMessage(message: Omit<LiveChatMessage, 'id' | 'timestamp'>): Promise<LiveChatMessage> {
  try {
    // التحقق من صحة البيانات
    if (!message.streamId) {
      throw new ValidationError('معرف البث مطلوب');
    }
    if (!message.username) {
      throw new ValidationError('اسم المستخدم مطلوب');
    }
    if (!message.message?.trim()) {
      throw new ValidationError('الرسالة مطلوبة');
    }

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error.message, response.status, error.code);
    }

    return response.json();
  } catch (error) {
    throw handleAPIError(error);
  }
}

export async function getChatMessages(streamId: string, limit: number = 50): Promise<LiveChatMessage[]> {
  try {
    const response = await fetch(`/api/chat/${streamId}?limit=${limit}`);

    if (response.status === 404) {
      throw new NotFoundError('البث المباشر');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error.message, response.status, error.code);
    }

    return response.json();
  } catch (error) {
    throw handleAPIError(error);
  }
}

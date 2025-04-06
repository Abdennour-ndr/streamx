// AI recommendation engine for StreamX
// This simulates AI-powered content recommendations based on user preferences and behavior

import { Content } from './contentApi';

export interface UserPreference {
  userId: string;
  preferredGenres: string[];
  preferredCreators: string[];
  watchTimePreference: 'morning' | 'afternoon' | 'evening' | 'night';
  contentLengthPreference: 'short' | 'medium' | 'long';
  lastUpdated: string;
}

export interface WatchHistory {
  userId: string;
  contentId: string;
  watchDuration: number;
  completed: boolean;
  timestamp: string;
}

// Mock data
const mockUserPreferences: Record<string, UserPreference> = {
  'usr_001': {
    userId: 'usr_001',
    preferredGenres: ['Action', 'Sci-Fi', 'Adventure'],
    preferredCreators: ['usr_002'],
    watchTimePreference: 'evening',
    contentLengthPreference: 'medium',
    lastUpdated: '2024-03-15T00:00:00Z'
  },
  'usr_003': {
    userId: 'usr_003',
    preferredGenres: ['Comedy', 'Romance', 'Drama'],
    preferredCreators: ['usr_004'],
    watchTimePreference: 'night',
    contentLengthPreference: 'long',
    lastUpdated: '2024-03-20T00:00:00Z'
  }
};

const mockWatchHistory: WatchHistory[] = [
  {
    userId: 'usr_001',
    contentId: 'cnt_001',
    watchDuration: 6500,
    completed: true,
    timestamp: '2024-03-10T20:00:00Z'
  },
  {
    userId: 'usr_001',
    contentId: 'cnt_002',
    watchDuration: 1800,
    completed: false,
    timestamp: '2024-03-12T21:00:00Z'
  },
  {
    userId: 'usr_003',
    contentId: 'cnt_003',
    watchDuration: 5400,
    completed: true,
    timestamp: '2024-03-15T22:00:00Z'
  }
];

// AI recommendation functions
export const aiRecommendationEngine = {
  // Get personalized recommendations for a user
  getPersonalizedRecommendations: async (
    userId: string,
    availableContent: Content[],
    limit: number = 10
  ): Promise<Content[]> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get user preferences
    const userPreferences = mockUserPreferences[userId];
    
    if (!userPreferences) {
      // If no preferences, return popular content
      return [...availableContent]
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, limit);
    }
    
    // Get user watch history
    const userHistory = mockWatchHistory.filter(h => h.userId === userId);
    const watchedContentIds = userHistory.map(h => h.contentId);
    
    // Filter out already watched content
    const unwatchedContent = availableContent.filter(
      content => !watchedContentIds.includes(content.id)
    );
    
    // Score each content item based on user preferences
    const scoredContent = unwatchedContent.map(content => {
      let score = 0;
      
      // Score based on genres
      if (content.genres) {
        const genreMatch = content.genres.filter(genre => 
          userPreferences.preferredGenres.includes(genre)
        ).length;
        score += genreMatch * 10;
      }
      
      // Score based on creator
      if (content.creatorId && userPreferences.preferredCreators.includes(content.creatorId)) {
        score += 15;
      }
      
      // Score based on content length preference
      if (content.duration) {
        const contentLength = 
          content.duration < 1800 ? 'short' :
          content.duration < 5400 ? 'medium' : 'long';
        
        if (contentLength === userPreferences.contentLengthPreference) {
          score += 5;
        }
      }
      
      // Add some popularity factor
      score += Math.log(content.viewCount) * 2;
      
      return { content, score };
    });
    
    // Sort by score and return top recommendations
    return scoredContent
      .sort((a, b) => b.score - a.score)
      .map(item => item.content)
      .slice(0, limit);
  },

  // Get similar content recommendations
  getSimilarContent: async (
    contentId: string,
    availableContent: Content[],
    limit: number = 5
  ): Promise<Content[]> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find the reference content
    const referenceContent = availableContent.find(c => c.id === contentId);
    
    if (!referenceContent) {
      return [];
    }
    
    // Filter out the reference content itself
    const otherContent = availableContent.filter(c => c.id !== contentId);
    
    // Score each content item based on similarity
    const scoredContent = otherContent.map(content => {
      let score = 0;
      
      // Score based on same category
      if (content.category === referenceContent.category) {
        score += 10;
      }
      
      // Score based on genre overlap
      if (content.genres && referenceContent.genres) {
        const genreOverlap = content.genres.filter(genre => 
          referenceContent.genres?.includes(genre)
        ).length;
        score += genreOverlap * 15;
      }
      
      // Score based on same creator
      if (content.creatorId && content.creatorId === referenceContent.creatorId) {
        score += 20;
      }
      
      // Score based on similar duration
      if (content.duration && referenceContent.duration) {
        const durationDiff = Math.abs(content.duration - referenceContent.duration);
        score += Math.max(0, 10 - Math.floor(durationDiff / 600)); // Deduct points based on difference
      }
      
      return { content, score };
    });
    
    // Sort by score and return top similar content
    return scoredContent
      .sort((a, b) => b.score - a.score)
      .map(item => item.content)
      .slice(0, limit);
  },

  // Update user preferences based on watch behavior
  updateUserPreferences: async (
    userId: string,
    contentId: string,
    watchDuration: number,
    completed: boolean
  ): Promise<UserPreference> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Add to watch history
    const newHistoryEntry: WatchHistory = {
      userId,
      contentId,
      watchDuration,
      completed,
      timestamp: new Date().toISOString()
    };
    
    mockWatchHistory.push(newHistoryEntry);
    
    // Get or create user preferences
    let userPreferences = mockUserPreferences[userId];
    
    if (!userPreferences) {
      userPreferences = {
        userId,
        preferredGenres: [],
        preferredCreators: [],
        watchTimePreference: 'evening',
        contentLengthPreference: 'medium',
        lastUpdated: new Date().toISOString()
      };
    }
    
    // In a real AI system, this would analyze the user's watch history
    // and update preferences accordingly. For this mock, we'll just
    // return the existing preferences with an updated timestamp.
    
    userPreferences.lastUpdated = new Date().toISOString();
    mockUserPreferences[userId] = userPreferences;
    
    return userPreferences;
  },

  // Get trending content based on recent popularity
  getTrendingContent: async (
    availableContent: Content[],
    limit: number = 10
  ): Promise<Content[]> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real system, this would analyze recent views, shares, and engagement
    // For this mock, we'll just sort by view count
    return [...availableContent]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  },

  // Get content tags using AI analysis
  getContentTags: async (
    title: string,
    description: string
  ): Promise<string[]> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // In a real system, this would use NLP to extract relevant tags
    // For this mock, we'll return some generic tags based on keywords
    
    const combinedText = (title + ' ' + description).toLowerCase();
    const tags: string[] = [];
    
    // Check for common genres/categories
    if (combinedText.includes('adventure') || combinedText.includes('journey')) {
      tags.push('Adventure');
    }
    
    if (combinedText.includes('space') || combinedText.includes('cosmic') || combinedText.includes('universe')) {
      tags.push('Sci-Fi');
    }
    
    if (combinedText.includes('love') || combinedText.includes('romantic')) {
      tags.push('Romance');
    }
    
    if (combinedText.includes('funny') || combinedText.includes('comedy') || combinedText.includes('laugh')) {
      tags.push('Comedy');
    }
    
    if (combinedText.includes('scary') || combinedText.includes('horror') || combinedText.includes('thriller')) {
      tags.push('Horror');
    }
    
    if (combinedText.includes('game') || combinedText.includes('gaming') || combinedText.includes('play')) {
      tags.push('Gaming');
    }
    
    if (combinedText.includes('music') || combinedText.includes('song') || combinedText.includes('concert')) {
      tags.push('Music');
    }
    
    // Add some generic tags if we don't have enough
    if (tags.length < 3) {
      if (!tags.includes('Entertainment')) {
        tags.push('Entertainment');
      }
      
      if (!tags.includes('Trending') && tags.length < 3) {
        tags.push('Trending');
      }
      
      if (!tags.includes('Featured') && tags.length < 3) {
        tags.push('Featured');
      }
    }
    
    return tags;
  }
};

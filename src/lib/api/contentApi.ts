// Mock API service for content data
// In a real application, this would connect to a backend API

import type {
  ApiResponse,
  PaginatedResponse,
  SearchParams,
  ContentType as ContentTypeEnum,
  ContentCategory,
  MovieContent,
  SeriesContent,
  LiveContent,
  VideoContent,
  Content,
  Episode,
  ContentWithGenres
} from '../types';

import { APIError, ValidationError, NotFoundError } from './errors';

// Mock data with proper typing
const mockMovies: (MovieContent & { category: ContentCategory })[] = [
  {
    id: 'cnt_001',
    title: 'مغامرة البداية',
    description: 'رحلة ملحمية عبر أراضٍ غير مكتشفة، حيث يصنع الأبطال ويولد الأساطير.',
    thumbnailUrl: '/images/adventure-begins.jpg',
    contentUrl: '/videos/adventure-begins.mp4',
    contentType: 'movie',
    category: 'cinema',
    duration: 7200,
    releaseDate: '2024-01-15',
    isPremium: false,
    viewCount: 15420,
    rating: 4.7,
    genres: ['مغامرة', 'أكشن', 'خيال'],
    cast: ['جون سميث', 'إيما جونسون', 'مايكل براون'],
    director: 'روبرت ويليامز'
  }
];

const mockSeries: (SeriesContent & { category: ContentCategory })[] = [
  {
    id: 'cnt_002',
    title: 'رحلة الفضاء',
    description: 'رحلة عبر الفضاء والزمن، تستكشف أسرار الكون.',
    thumbnailUrl: '/images/cosmic-odyssey.jpg',
    contentUrl: '/videos/cosmic-odyssey.mp4',
    contentType: 'series',
    category: 'originals',
    duration: 3600,
    releaseDate: '2024-02-20',
    isPremium: true,
    viewCount: 8750,
    rating: 4.9,
    genres: ['خيال علمي', 'دراما', 'غموض'],
    cast: ['سارة باركر', 'ديفيد ويلسون', 'ليزا طومسون'],
    director: 'جيمس أندرسون',
    totalEpisodes: 10,
    totalSeasons: 1
  }
];

// Combine all content types
const mockContent: Content[] = [...mockMovies, ...mockSeries];

// Remove incorrect mock episodes and fix type handling
const mockEpisodes: Episode[] = [
  {
    id: 'ep_001',
    contentId: 'cnt_002',
    title: 'البداية',
    description: 'تبدأ الرحلة عندما ينطلق أبطالنا لاستكشاف الكون.',
    episodeNumber: 1,
    seasonNumber: 1,
    thumbnailUrl: '/images/cosmic-ep1.jpg',
    videoUrl: '/videos/cosmic-ep1.mp4',
    duration: 3600,
    releaseDate: '2024-02-20'
  },
  {
    id: 'ep_002',
    contentId: 'cnt_002',
    title: 'Strange New Worlds',
    description: 'The crew discovers a mysterious planet with unusual properties.',
    episodeNumber: 2,
    seasonNumber: 1,
    thumbnailUrl: '/images/cosmic-ep2.jpg',
    videoUrl: '/videos/cosmic-ep2.mp4',
    duration: 3600,
    releaseDate: '2024-02-27'
  },
  {
    id: 'ep_003',
    contentId: 'cnt_002',
    title: 'The Anomaly',
    description: 'A space anomaly threatens the ship and its crew.',
    episodeNumber: 3,
    seasonNumber: 1,
    thumbnailUrl: '/images/cosmic-ep3.jpg',
    videoUrl: '/videos/cosmic-ep3.mp4',
    duration: 3600,
    releaseDate: '2024-03-05'
  }
];

// Type guards
function isMovieContent(content: Content): content is MovieContent {
  return content.contentType === 'movie';
}

function isSeriesContent(content: Content): content is SeriesContent {
  return content.contentType === 'series';
}

function isContentWithGenres(content: Content): content is ContentWithGenres {
  return isMovieContent(content) || isSeriesContent(content);
}

// Helper function to compare genres
function hasMatchingGenres(content1: Content, content2: Content): boolean {
  if (!isContentWithGenres(content1) || !isContentWithGenres(content2)) {
    return false;
  }
  return content1.genres.some(genre => content2.genres.includes(genre));
}

// API functions
export const contentApi = {
  // Get all content
  getAllContent: async (): Promise<Content[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockContent;
  },

  // Get content by ID
  getContentById: async (id: string): Promise<Content | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = mockContent.find(item => item.id === id);
    return content || null;
  },

  // Get content by category
  getContentByCategory: async (category: string): Promise<Content[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockContent.filter(item => item.category === category);
  },

  // Get featured content
  getFeaturedContent: async (): Promise<Content[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));
    // Return top 3 by view count
    return [...mockContent].sort((a, b) => b.viewCount - a.viewCount).slice(0, 3);
  },

  // Get episodes for a series
  getEpisodes: async (contentId: string): Promise<Episode[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 450));
    return mockEpisodes.filter(episode => episode.contentId === contentId);
  },

  // Get episode by ID
  getEpisodeById: async (episodeId: string): Promise<Episode | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    const episode = mockEpisodes.find(item => item.id === episodeId);
    return episode || null;
  },

  // Get recommended content based on content ID
  getRecommendations: async (contentId: string): Promise<Content[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find the current content
    const currentContent = mockContent.find(item => item.id === contentId);
    
    if (!currentContent) {
      return [];
    }
    
    // Filter content by same category or genre
    return mockContent
      .filter(item => item.id !== contentId) // Exclude current content
      .filter(item => 
        item.category === currentContent.category || 
        (item.genres && currentContent.genres && 
         item.genres.some(genre => currentContent.genres?.includes(genre)))
      )
      .slice(0, 5); // Limit to 5 recommendations
  },

  // Search content
  searchContent: async (query: string): Promise<Content[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 550));
    
    const lowerQuery = query.toLowerCase();
    
    return mockContent.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery) ||
      (item.genres && item.genres.some(genre => genre.toLowerCase().includes(lowerQuery))) ||
      (item.cast && item.cast.some(actor => actor.toLowerCase().includes(lowerQuery))) ||
      (item.director && item.director.toLowerCase().includes(lowerQuery))
    );
  }
};

export async function getContent(contentId: string): Promise<ApiResponse<Content>> {
  try {
    const content = mockContent.find(c => c.id === contentId);
    
    if (!content) {
      throw new NotFoundError('المحتوى');
    }

    return {
      success: true,
      data: content
    };
  } catch (error) {
    throw error instanceof APIError ? error : new APIError('فشل في جلب المحتوى', 500);
  }
}

export async function searchContent(params: SearchParams): Promise<PaginatedResponse<Content[]>> {
  try {
    let filteredContent = [...mockContent];

    // Apply filters
    if (params.query) {
      const searchQuery = params.query.toLowerCase();
      filteredContent = filteredContent.filter(content => {
        const baseMatch = content.title.toLowerCase().includes(searchQuery) ||
                         content.description.toLowerCase().includes(searchQuery);
        
        if (baseMatch) return true;
        
        // Search in genres and cast for content with genres
        if (isContentWithGenres(content)) {
          return content.genres.some(genre => genre.toLowerCase().includes(searchQuery)) ||
                 content.cast.some(actor => actor.toLowerCase().includes(searchQuery));
        }
        
        return false;
      });
    }

    if (params.contentType) {
      filteredContent = filteredContent.filter(content => content.contentType === params.contentType);
    }

    if (params.category) {
      filteredContent = filteredContent.filter(content => content.category === params.category);
    }

    if (typeof params.isPremium === 'boolean') {
      filteredContent = filteredContent.filter(content => content.isPremium === params.isPremium);
    }

    // الترتيب
    if (params.sortBy) {
      filteredContent.sort((a, b) => {
        const order = params.order === 'desc' ? -1 : 1;
        
        switch (params.sortBy) {
          case 'date':
            return order * ((a.releaseDate ?? '').localeCompare(b.releaseDate ?? ''));
          case 'views':
            return order * (a.viewCount - b.viewCount);
          case 'rating':
            return order * ((a.rating ?? 0) - (b.rating ?? 0));
          default:
            return 0;
        }
      });
    }

    // التصفح
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContent = filteredContent.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedContent,
      page,
      totalPages: Math.ceil(filteredContent.length / limit),
      totalItems: filteredContent.length,
      itemsPerPage: limit
    };
  } catch (error) {
    throw error instanceof APIError ? error : new APIError('فشل في البحث عن المحتوى', 500);
  }
}

export async function getEpisodes(contentId: string): Promise<ApiResponse<Episode[]>> {
  try {
    const episodes = mockEpisodes.filter(ep => ep.contentId === contentId);
    
    if (!episodes.length) {
      throw new NotFoundError('الحلقات');
    }

    return {
      success: true,
      data: episodes
    };
  } catch (error) {
    throw error instanceof APIError ? error : new APIError('فشل في جلب الحلقات', 500);
  }
}

export async function getEpisode(episodeId: string): Promise<ApiResponse<Episode>> {
  try {
    const episode = mockEpisodes.find(ep => ep.id === episodeId);
    
    if (!episode) {
      throw new NotFoundError('الحلقة');
    }

    return {
      success: true,
      data: episode
    };
  } catch (error) {
    throw error instanceof APIError ? error : new APIError('فشل في جلب الحلقة', 500);
  }
}

export async function getRecommendedContent(
  contentId: string,
  limit: number = 5
): Promise<ApiResponse<Content[]>> {
  try {
    const currentContent = mockContent.find(c => c.id === contentId);
    
    if (!currentContent) {
      throw new NotFoundError('المحتوى');
    }

    // Find similar content based on type and genres
    const similarContent = mockContent
      .filter(c => c.id !== contentId)
      .filter(c => {
        // Compare genres for movies and series
        if (hasMatchingGenres(currentContent, c)) {
          return true;
        }

        // For other content types, just match by category
        return c.category === currentContent.category;
      })
      .slice(0, limit);

    return {
      success: true,
      data: similarContent
    };
  } catch (error) {
    throw error instanceof APIError ? error : new APIError('فشل في جلب التوصيات', 500);
  }
}

export type ContentType = 'movie' | 'series' | 'live' | 'video';
export type ContentCategory = 'cinema' | 'originals' | 'play' | 'prime' | 'studio' | 'creators';

// Base interface for all content types
export interface BaseContent {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  duration?: number;
  releaseDate?: string;
  isPremium: boolean;
  viewCount: number;
  rating?: number;
  category: ContentCategory;
  contentType: ContentType;
}

// Interface for content with genres and cast
export interface GenredContent extends BaseContent {
  genres: string[];
  cast: string[];
  director: string;
}

// Specific content types
export interface MovieContent extends GenredContent {
  contentType: 'movie';
}

export interface SeriesContent extends GenredContent {
  contentType: 'series';
  totalEpisodes: number;
  totalSeasons: number;
}

export interface LiveContent extends BaseContent {
  contentType: 'live';
  creatorId: string;
  creatorName: string;
  isLive: boolean;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
}

export interface VideoContent extends BaseContent {
  contentType: 'video';
  creatorId: string;
  creatorName: string;
  tags?: string[];
}

// Main content type
export type Content = MovieContent | SeriesContent | LiveContent | VideoContent;

// Type for content with genres
export type ContentWithGenres = Extract<Content, GenredContent>;

export interface Episode {
  id: string;
  contentId: string;
  title: string;
  description: string;
  episodeNumber: number;
  seasonNumber: number;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  releaseDate?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface SearchParams {
  query?: string;
  contentType?: ContentType;
  category?: ContentCategory;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'views' | 'rating';
  order?: 'asc' | 'desc';
  isPremium?: boolean;
} 
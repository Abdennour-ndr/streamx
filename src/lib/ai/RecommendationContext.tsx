import React from 'react';
import { Content } from '@/lib/api/contentApi';
import { aiRecommendationEngine } from '@/lib/ai/recommendationEngine';

interface RecommendationContextType {
  personalizedRecommendations: Content[];
  trendingContent: Content[];
  loadPersonalizedRecommendations: (userId: string, availableContent: Content[]) => Promise<void>;
  loadTrendingContent: (availableContent: Content[]) => Promise<void>;
  getSimilarContent: (contentId: string, availableContent: Content[]) => Promise<Content[]>;
  isLoading: boolean;
}

const RecommendationContext = React.createContext<RecommendationContextType | undefined>(undefined);

export const RecommendationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalizedRecommendations, setPersonalizedRecommendations] = React.useState<Content[]>([]);
  const [trendingContent, setTrendingContent] = React.useState<Content[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadPersonalizedRecommendations = async (userId: string, availableContent: Content[]) => {
    setIsLoading(true);
    try {
      const recommendations = await aiRecommendationEngine.getPersonalizedRecommendations(
        userId,
        availableContent
      );
      setPersonalizedRecommendations(recommendations);
    } catch (error) {
      console.error('Error loading personalized recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingContent = async (availableContent: Content[]) => {
    setIsLoading(true);
    try {
      const trending = await aiRecommendationEngine.getTrendingContent(availableContent);
      setTrendingContent(trending);
    } catch (error) {
      console.error('Error loading trending content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSimilarContent = async (contentId: string, availableContent: Content[]): Promise<Content[]> => {
    try {
      return await aiRecommendationEngine.getSimilarContent(contentId, availableContent);
    } catch (error) {
      console.error('Error getting similar content:', error);
      return [];
    }
  };

  const value = {
    personalizedRecommendations,
    trendingContent,
    loadPersonalizedRecommendations,
    loadTrendingContent,
    getSimilarContent,
    isLoading
  };

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendations = () => {
  const context = React.useContext(RecommendationContext);
  if (context === undefined) {
    throw new Error('useRecommendations must be used within a RecommendationProvider');
  }
  return context;
};

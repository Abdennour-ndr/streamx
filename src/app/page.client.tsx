import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/shared/HeroSection';
import ContentGrid from '@/components/shared/ContentGrid';
import ContentCard from '@/components/shared/ContentCard';
import { contentApi, Content } from '@/lib/api/contentApi';
import { useRecommendations } from '@/lib/ai/RecommendationContext';
import { useAuth } from '@/lib/auth/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { loadPersonalizedRecommendations, loadTrendingContent, personalizedRecommendations, trendingContent, isLoading } = useRecommendations();
  const [featuredContent, setFeaturedContent] = React.useState<Content[]>([]);
  const [allContent, setAllContent] = React.useState<Content[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch all content
        const content = await contentApi.getAllContent();
        setAllContent(content);
        
        // Fetch featured content
        const featured = await contentApi.getFeaturedContent();
        setFeaturedContent(featured);
        
        // Load recommendations
        if (user) {
          await loadPersonalizedRecommendations(user.id, content);
        }
        
        // Load trending content
        await loadTrendingContent(content);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [user, loadPersonalizedRecommendations, loadTrendingContent]);

  if (loading || isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-white">Loading amazing content...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {featuredContent.length > 0 && (
        <HeroSection
          title={featuredContent[0].title}
          subtitle={featuredContent[0].description}
          backgroundImage={featuredContent[0].thumbnailUrl}
          actionButton={{
            text: 'Watch Now',
            href: `/${featuredContent[0].category}/${featuredContent[0].id}`
          }}
          secondaryButton={{
            text: 'More Info',
            href: `/${featuredContent[0].category}/${featuredContent[0].id}/details`
          }}
        />
      )}
      
      {user && personalizedRecommendations.length > 0 && (
        <ContentGrid title="Recommended for You" viewAllLink="/recommendations">
          {personalizedRecommendations.slice(0, 5).map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              title={content.title}
              description={content.description}
              thumbnailUrl={content.thumbnailUrl}
              category={content.category}
              isPremium={content.isPremium}
              duration={content.duration}
              creatorName={content.creatorName}
            />
          ))}
        </ContentGrid>
      )}
      
      {trendingContent.length > 0 && (
        <ContentGrid title="Trending Now" viewAllLink="/trending">
          {trendingContent.slice(0, 5).map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              title={content.title}
              description={content.description}
              thumbnailUrl={content.thumbnailUrl}
              category={content.category}
              isPremium={content.isPremium}
              duration={content.duration}
              creatorName={content.creatorName}
            />
          ))}
        </ContentGrid>
      )}
      
      <ContentGrid title="StreamX Cinema" viewAllLink="/cinema">
        {allContent
          .filter(content => content.category === 'cinema')
          .slice(0, 5)
          .map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              title={content.title}
              description={content.description}
              thumbnailUrl={content.thumbnailUrl}
              category={content.category}
              isPremium={content.isPremium}
              duration={content.duration}
            />
          ))}
      </ContentGrid>
      
      <ContentGrid title="StreamX Originals" viewAllLink="/originals">
        {allContent
          .filter(content => content.category === 'originals')
          .slice(0, 5)
          .map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              title={content.title}
              description={content.description}
              thumbnailUrl={content.thumbnailUrl}
              category={content.category}
              isPremium={content.isPremium}
              duration={content.duration}
            />
          ))}
      </ContentGrid>
      
      <ContentGrid title="Live Streams" viewAllLink="/live">
        {allContent
          .filter(content => content.contentType === 'live')
          .slice(0, 5)
          .map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              title={content.title}
              description={content.description}
              thumbnailUrl={content.thumbnailUrl}
              category={content.category}
              isPremium={content.isPremium}
              creatorName={content.creatorName}
            />
          ))}
      </ContentGrid>
      
      <ContentGrid title="Creator Content" viewAllLink="/creators">
        {allContent
          .filter(content => content.category === 'creators')
          .slice(0, 5)
          .map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              title={content.title}
              description={content.description}
              thumbnailUrl={content.thumbnailUrl}
              category={content.category}
              isPremium={content.isPremium}
              duration={content.duration}
              creatorName={content.creatorName}
            />
          ))}
      </ContentGrid>
    </MainLayout>
  );
};

export default HomePage;

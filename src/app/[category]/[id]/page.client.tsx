import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import VideoPlayer from '@/components/player/VideoPlayer';
import MainLayout from '@/components/layout/MainLayout';
import ContentDetails from '@/components/cinematic/ContentDetails';
import RecommendationSection from '@/components/shared/RecommendationSection';
import CommentSection from '@/components/shared/CommentSection';
import { contentApi, Content } from '@/lib/api/contentApi';
import { useRecommendations } from '@/lib/ai/RecommendationContext';
import AuthGuard from '@/components/auth/AuthGuard';

interface ContentViewPageProps {
  contentId: string;
}

const ContentViewPage: React.FC<ContentViewPageProps> = ({ contentId }) => {
  const { user } = useAuth();
  const { getSimilarContent } = useRecommendations();
  const [content, setContent] = React.useState<Content | null>(null);
  const [recommendations, setRecommendations] = React.useState<Content[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch content details
        const contentData = await contentApi.getContentById(contentId);
        setContent(contentData);
        
        if (contentData) {
          // Fetch all content for recommendations
          const allContent = await contentApi.getAllContent();
          
          // Get similar content recommendations
          const similarContent = await getSimilarContent(contentId, allContent);
          setRecommendations(similarContent);
        }
        
        // Mock comments data
        setComments([
          {
            id: 'comment1',
            username: 'viewer1',
            profileImage: '/images/users/viewer1.jpg',
            text: 'This is amazing content! I really enjoyed watching it.',
            timestamp: '2 hours ago',
            likes: 15,
            isLiked: false,
            replies: [
              {
                id: 'reply1',
                username: 'fan123',
                text: 'I agree! The production quality is outstanding.',
                timestamp: '1 hour ago',
                likes: 3,
                isLiked: false
              }
            ]
          },
          {
            id: 'comment2',
            username: 'moviebuff',
            text: 'The storyline was captivating from start to finish.',
            timestamp: '1 day ago',
            likes: 27,
            isLiked: true
          }
        ]);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [contentId, getSimilarContent]);

  const handleAddComment = (text: string) => {
    const newComment = {
      id: `comment${Date.now()}`,
      username: user?.username || 'Anonymous',
      profileImage: user?.profileImage,
      text,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
      replies: []
    };
    
    setComments([newComment, ...comments]);
  };

  const handleAddReply = (commentId: string, text: string) => {
    const newReply = {
      id: `reply${Date.now()}`,
      username: user?.username || 'Anonymous',
      profileImage: user?.profileImage,
      text,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId && comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
              isLiked: !reply.isLiked
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-white">Loading content...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!content) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Content Not Found</h2>
            <p className="mt-4 text-gray-400">The content you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Check if content is premium and user doesn't have premium subscription
  const isPremiumContent = content.isPremium && (!user || user.subscriptionTier !== 'premium');

  return (
    <AuthGuard requireAuth={isPremiumContent}>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            {isPremiumContent ? (
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="bg-blue-600 inline-block p-3 rounded-full mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Premium Content</h2>
                  <p className="text-gray-400 mb-6">This content is available exclusively to Premium subscribers.</p>
                  <a 
                    href="/subscription/upgrade" 
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                  >
                    Upgrade to Premium
                  </a>
                </div>
              </div>
            ) : (
              <VideoPlayer
                videoUrl={content.contentUrl}
                thumbnailUrl={content.thumbnailUrl}
                title={content.title}
                autoPlay={false}
              />
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContentDetails
                id={content.id}
                title={content.title}
                description={content.description}
                releaseYear={content.releaseDate ? new Date(content.releaseDate).getFullYear() : undefined}
                duration={content.duration}
                rating={content.rating}
                genres={content.genres}
                isPremium={content.isPremium}
              />
              
              <div className="mt-8">
                <CommentSection
                  contentId={content.id}
                  comments={comments}
                  onAddComment={handleAddComment}
                  onAddReply={handleAddReply}
                  onLikeComment={handleLikeComment}
                  onLikeReply={handleLikeReply}
                />
              </div>
            </div>
            
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden p-6">
                <h3 className="text-xl font-bold text-white mb-4">More Like This</h3>
                <div className="space-y-4">
                  {recommendations.map((item) => (
                    <a 
                      key={item.id} 
                      href={`/${item.category}/${item.id}`}
                      className="flex items-start hover:bg-gray-800 p-2 rounded-lg transition-colors"
                    >
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        className="w-24 h-16 object-cover rounded mr-3"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-white line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {recommendations.length > 0 && (
            <div className="mt-12">
              <RecommendationSection
                title="You May Also Like"
                recommendations={recommendations.map(item => ({
                  id: item.id,
                  title: item.title,
                  thumbnailUrl: item.thumbnailUrl,
                  category: item.category,
                  isPremium: item.isPremium
                }))}
              />
            </div>
          )}
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default ContentViewPage;

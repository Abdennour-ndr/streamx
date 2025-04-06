import React from 'react';

interface RecommendationSectionProps {
  title: string;
  recommendations: {
    id: string;
    title: string;
    thumbnailUrl: string;
    category: string;
    isPremium?: boolean;
  }[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  title,
  recommendations
}) => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recommendations.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg bg-gray-800 transition-all hover:scale-105">
              <a href={`/${item.category}/${item.id}`}>
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={item.thumbnailUrl} 
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  
                  {item.isPremium && (
                    <div className="absolute top-2 right-2 bg-blue-600 px-2 py-1 text-xs font-bold text-white rounded">
                      PREMIUM
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="text-sm font-medium text-white line-clamp-1">{item.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;

import React from 'react';

interface LiveStreamCardProps {
  id: string;
  title: string;
  creatorName: string;
  creatorImage?: string;
  thumbnailUrl: string;
  viewerCount: number;
  isLive: boolean;
  category?: string;
  isPremium?: boolean;
}

const LiveStreamCard: React.FC<LiveStreamCardProps> = ({
  id,
  title,
  creatorName,
  creatorImage,
  thumbnailUrl,
  viewerCount,
  isLive,
  category,
  isPremium = false
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-800 transition-all hover:scale-105">
      <a href={`/live/${id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={thumbnailUrl || '/images/placeholder.jpg'} 
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          
          {/* Live badge */}
          {isLive && (
            <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 text-xs font-bold text-white rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              LIVE
            </div>
          )}
          
          {/* Viewer count */}
          <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 text-xs text-white rounded flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {viewerCount.toLocaleString()}
          </div>
          
          {/* Premium badge */}
          {isPremium && (
            <div className="absolute top-2 right-2 bg-blue-600 px-2 py-1 text-xs font-bold text-white rounded">
              PREMIUM
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-white line-clamp-1">{title}</h3>
          
          <div className="mt-2 flex items-center">
            {creatorImage && (
              <img 
                src={creatorImage} 
                alt={creatorName} 
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <p className="text-sm text-gray-400">
              {creatorName}
            </p>
          </div>
          
          {category && (
            <div className="mt-2 text-xs text-gray-500">
              {category}
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default LiveStreamCard;

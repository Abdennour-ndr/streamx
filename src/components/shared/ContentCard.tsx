import React from 'react';
import Link from 'next/link';

interface ContentCardProps {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  category: string;
  isPremium?: boolean;
  duration?: number;
  creatorName?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  description,
  thumbnailUrl,
  category,
  isPremium = false,
  duration,
  creatorName
}) => {
  // Format duration from seconds to MM:SS or HH:MM:SS
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-800 transition-all hover:scale-105">
      <Link href={`/${category}/${id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={thumbnailUrl || '/images/placeholder.jpg'} 
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
            </div>
          </div>
          
          {/* Duration badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs text-white rounded">
              {formatDuration(duration)}
            </div>
          )}
          
          {/* Premium badge */}
          {isPremium && (
            <div className="absolute top-2 right-2 bg-blue-600 px-2 py-1 text-xs font-bold text-white rounded">
              PREMIUM
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-white line-clamp-1">{title}</h3>
          
          {creatorName && (
            <p className="mt-1 text-sm text-gray-400">
              {creatorName}
            </p>
          )}
          
          <div className="mt-2 flex items-center text-xs text-gray-400">
            <span className="capitalize">{category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;

import React from 'react';

interface MovieCardProps {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  duration: number;
  releaseYear?: number;
  rating?: number;
  isPremium?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  description,
  thumbnailUrl,
  duration,
  releaseYear,
  rating,
  isPremium = false
}) => {
  // Format duration from seconds to HH:MM:SS
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-800 transition-all hover:scale-105">
      <a href={`/cinema/${id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={thumbnailUrl || '/images/placeholder.jpg'} 
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
            </div>
          </div>
          
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs text-white rounded">
            {formatDuration(duration)}
          </div>
          
          {/* Premium badge */}
          {isPremium && (
            <div className="absolute top-2 right-2 bg-blue-600 px-2 py-1 text-xs font-bold text-white rounded">
              PREMIUM
            </div>
          )}
          
          {/* Rating badge */}
          {rating && (
            <div className="absolute top-2 left-2 bg-yellow-600 px-2 py-1 text-xs font-bold text-white rounded flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating.toFixed(1)}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-white line-clamp-1">{title}</h3>
          
          {releaseYear && (
            <p className="mt-1 text-sm text-gray-400">
              {releaseYear}
            </p>
          )}
        </div>
      </a>
    </div>
  );
};

export default MovieCard;

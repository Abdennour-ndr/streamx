import React from 'react';

interface ContentDetailsProps {
  id: string;
  title: string;
  description: string;
  releaseYear?: number;
  duration?: number;
  rating?: number;
  genres?: string[];
  cast?: string[];
  director?: string;
  isPremium?: boolean;
}

const ContentDetails: React.FC<ContentDetailsProps> = ({
  id,
  title,
  description,
  releaseYear,
  duration,
  rating,
  genres,
  cast,
  director,
  isPremium = false
}) => {
  // Format duration from seconds to HH:MM:SS
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        
        {isPremium && (
          <span className="bg-blue-600 px-3 py-1 text-sm font-bold text-white rounded">
            PREMIUM
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-4 mb-6 text-sm">
        {releaseYear && (
          <span className="text-gray-400">{releaseYear}</span>
        )}
        
        {duration && (
          <span className="text-gray-400">{formatDuration(duration)}</span>
        )}
        
        {rating && (
          <div className="flex items-center text-yellow-400">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-300 mb-6">
        {description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {genres && genres.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {cast && cast.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Cast</h3>
            <p className="text-gray-300">
              {cast.join(', ')}
            </p>
          </div>
        )}
        
        {director && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Director</h3>
            <p className="text-gray-300">
              {director}
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex space-x-4">
        <a 
          href={`/cinema/${id}/watch`} 
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Watch Now
        </a>
        <button 
          className="px-6 py-3 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default ContentDetails;

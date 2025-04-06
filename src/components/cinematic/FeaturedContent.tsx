import React from 'react';

interface FeaturedContentProps {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  logoImage?: string;
  category: string;
  duration?: number;
  releaseYear?: number;
  rating?: number;
  isPremium?: boolean;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({
  id,
  title,
  description,
  backgroundImage,
  logoImage,
  category,
  duration,
  releaseYear,
  rating,
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
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
        {logoImage ? (
          <img 
            src={logoImage} 
            alt={title} 
            className="w-64 mb-6"
          />
        ) : (
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        )}
        
        <div className="flex items-center space-x-4 mb-4">
          {rating && (
            <div className="flex items-center text-yellow-400">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
          
          {releaseYear && (
            <span className="text-gray-300">{releaseYear}</span>
          )}
          
          {duration && (
            <span className="text-gray-300">{formatDuration(duration)}</span>
          )}
          
          {isPremium && (
            <span className="bg-blue-600 px-2 py-1 text-xs font-bold text-white rounded">
              PREMIUM
            </span>
          )}
          
          <span className="text-gray-300 capitalize">{category}</span>
        </div>
        
        <p className="text-gray-300 text-lg mb-8 line-clamp-3">
          {description}
        </p>
        
        <div className="flex space-x-4">
          <a 
            href={`/${category}/${id}`} 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play
          </a>
          <a 
            href={`/${category}/${id}/details`} 
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            More Info
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;

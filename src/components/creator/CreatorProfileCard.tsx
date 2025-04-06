import React from 'react';

interface CreatorProfileCardProps {
  id: string;
  username: string;
  fullName?: string;
  profileImage?: string;
  bio?: string;
  subscriberCount: number;
  contentCount: number;
  isSubscribed?: boolean;
  onSubscribe?: () => void;
}

const CreatorProfileCard: React.FC<CreatorProfileCardProps> = ({
  id,
  username,
  fullName,
  profileImage,
  bio,
  subscriberCount,
  contentCount,
  isSubscribed = false,
  onSubscribe
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <img 
            src={profileImage || '/images/default-avatar.png'} 
            alt={fullName || username}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-xl font-bold text-white">{fullName || username}</h3>
            <p className="text-sm text-gray-400">@{username}</p>
          </div>
        </div>
        
        {bio && (
          <p className="mt-4 text-gray-300">
            {bio}
          </p>
        )}
        
        <div className="mt-6 flex space-x-4">
          <div className="text-center">
            <p className="text-xl font-bold text-white">{subscriberCount.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Subscribers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">{contentCount.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Content</p>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onSubscribe}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isSubscribed 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfileCard;

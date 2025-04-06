import React from 'react';

interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  onSelect?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  isPopular = false,
  buttonText = 'Subscribe',
  onSelect
}) => {
  return (
    <div className={`rounded-lg overflow-hidden ${isPopular ? 'border-2 border-blue-500 scale-105' : 'border border-gray-700'}`}>
      {isPopular && (
        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 bg-gray-800">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-extrabold text-white">{price}</span>
          <span className="ml-1 text-xl font-medium text-gray-400">/month</span>
        </div>
        
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-blue-400 shrink-0 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={onSelect}
          className={`mt-8 w-full py-3 px-4 rounded-md text-white font-medium ${
            isPopular 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;

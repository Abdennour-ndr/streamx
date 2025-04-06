import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  actionButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage = '/images/hero-bg.jpg',
  actionButton,
  secondaryButton
}) => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
          {title}
        </h1>
        
        {subtitle && (
          <p className="mt-3 text-lg text-gray-300 sm:text-xl md:mt-5">
            {subtitle}
          </p>
        )}
        
        {(actionButton || secondaryButton) && (
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {actionButton && (
              <a 
                href={actionButton.href} 
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                {actionButton.text}
              </a>
            )}
            
            {secondaryButton && (
              <a 
                href={secondaryButton.href} 
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                {secondaryButton.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

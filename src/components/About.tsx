'use client';

export default function About() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About StreamX
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Your Ultimate Streaming Platform
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/images/about-hero.jpg"
                alt="StreamX Team"
              />
            </div>
          </div>
          <div className="lg:col-start-2">
            <div className="text-base text-gray-500">
              <p className="mt-6">
                StreamX is a revolutionary streaming platform that brings together the best of entertainment and technology. 
                Our mission is to provide high-quality content to viewers worldwide while supporting content creators.
              </p>
              <p className="mt-4">
                Founded in 2024, StreamX has quickly become a leader in the streaming industry, offering:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="ml-3">4K Ultra HD streaming</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="ml-3">Multi-device support</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="ml-3">Advanced content recommendation</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="ml-3">Creator-friendly monetization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
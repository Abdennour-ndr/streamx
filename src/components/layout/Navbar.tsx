import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  user?: {
    id: string;
    username: string;
    isCreator: boolean;
    subscriptionTier: string;
  } | null;
}

const Navbar: React.FC<NavbarProps> = ({ user = null }) => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-blue-400 font-bold text-xl">
                StreamX
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Cinematic Hub Links */}
              <Link href="/cinema" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Cinema
              </Link>
              <Link href="/originals" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Originals
              </Link>
              <Link href="/play" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Play
              </Link>
              <Link href="/prime" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Prime
              </Link>
              <Link href="/studio" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Studio
              </Link>
              
              {/* Creator Hub Links */}
              <Link href="/creators" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Creators
              </Link>
              <Link href="/live" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Live
              </Link>
              <Link href="/hub" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Hub
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center">
                {user.isCreator && (
                  <Link href="/creator/dashboard" className="text-blue-400 hover:text-blue-300 px-3 py-2 text-sm font-medium">
                    Creator Dashboard
                  </Link>
                )}
                <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Profile
                </Link>
                <button className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link href="/auth/signin" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

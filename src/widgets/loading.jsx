// -------------------- OTHER IMPORT FILES -------------------- //
import React from 'react';
import AppLogo from "./logo";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95 z-50">
      <div className="relative">
        <AppLogo
          width={120}
          height={120}
          className="animate-bounce"
        />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
      <p className="mt-12 text-gray-600 font-medium">Loading your groceries...</p>
    </div>
  );
};

export default Loading;

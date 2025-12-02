import React from 'react';
import { Sprout } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            作物<span className="text-green-600">卫士</span> AI
          </h1>
        </div>
        <nav>
          <a 
            href="#" 
            className="text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
          >
            历史记录
          </a>
        </nav>
      </div>
    </header>
  );
};
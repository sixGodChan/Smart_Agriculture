import React from 'react';
import { ScanLine, Loader2 } from 'lucide-react';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <ScanLine className="w-16 h-16 text-green-600 animate-bounce relative z-10" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-gray-900">正在分析作物...</h3>
      <p className="text-gray-500 mt-2 text-sm max-w-xs text-center">
        AI 正在检测图片中的病虫害特征，请稍候。
      </p>
      <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
        <Loader2 className="w-4 h-4 animate-spin" />
        处理中
      </div>
    </div>
  );
};
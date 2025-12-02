import React, { useCallback, useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (base64: string, mimeType: string) => void;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件。');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onImageSelect(base64String, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ease-in-out text-center
          ${isDragging 
            ? 'border-green-500 bg-green-50 scale-[1.02]' 
            : 'border-gray-300 hover:border-green-400 bg-white'
          }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-green-50 rounded-full">
            <UploadCloud className="w-10 h-10 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              上传作物图片
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              拖拽图片到此处，或点击下方按钮选择受影响的植物照片
            </p>
          </div>

          <div className="flex gap-3 mt-2">
             <label className="cursor-pointer group relative flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md">
              <ImageIcon className="w-5 h-5" />
              <span>选择照片</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
            
            {/* Hidden capture input for mobile visual completeness */}
            <label className="cursor-pointer md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all">
               <Camera className="w-5 h-5" />
               <input
                type="file"
                className="hidden"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center gap-8 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          支持 JPG, PNG
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          最大 10MB
        </div>
      </div>
    </div>
  );
};
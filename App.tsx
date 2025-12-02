import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { LoadingOverlay } from './components/LoadingOverlay';
import { AnalysisState, AnalysisResult } from './types';
import { analyzeCropImage } from './services/geminiService';
import { Sprout } from 'lucide-react';

function App() {
  const [state, setState] = useState<AnalysisState>({
    status: 'idle',
    imageUri: null,
    result: null,
    error: null,
  });

  const handleImageSelect = async (base64: string, mimeType: string) => {
    setState(prev => ({ ...prev, status: 'analyzing', imageUri: base64, error: null }));

    try {
      const result = await analyzeCropImage(base64, mimeType);
      setState(prev => ({ ...prev, status: 'success', result }));
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        status: 'error', 
        error: error.message || '出错了，请稍后重试。' 
      }));
    }
  };

  const handleReset = () => {
    setState({
      status: 'idle',
      imageUri: null,
      result: null,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-stone-50 text-gray-900 font-sans selection:bg-green-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {state.status === 'idle' && (
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-2xl mb-6">
              <Sprout className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              守护您的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">丰收</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              利用 AI 即时识别植物病虫害。几秒钟内获得准确的诊断和专业的治疗建议，助您科学种植。
            </p>
          </div>
        )}

        {state.status === 'error' && (
           <div className="max-w-xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
             <div className="p-2 bg-red-100 rounded-full">
               <span className="font-bold text-xl">!</span>
             </div>
             <div>
               <p className="font-semibold">分析失败</p>
               <p className="text-sm">{state.error}</p>
             </div>
             <button onClick={handleReset} className="ml-auto text-sm underline hover:text-red-800">重试</button>
           </div>
        )}

        <div className="relative w-full transition-all">
          
          {/* Main Content Area */}
          {state.status === 'success' && state.result ? (
            <div className="flex flex-col gap-8">
              <div className="w-full max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-100">
                 <img src={state.imageUri!} alt="上传的作物图片" className="w-full h-auto object-cover" />
              </div>
              <ResultCard result={state.result} onReset={handleReset} />
            </div>
          ) : (
            <div className="relative">
               {/* Show uploader when idle or analyzing */}
              {(state.status === 'idle' || state.status === 'analyzing' || state.status === 'error') && (
                 <div className="relative">
                    {state.status === 'analyzing' && <LoadingOverlay />}
                    <ImageUploader 
                      onImageSelect={handleImageSelect} 
                      isLoading={state.status === 'analyzing'} 
                    />
                 </div>
              )}
            </div>
          )}

        </div>
      </main>

      <footer className="border-t border-gray-100 mt-auto py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} 作物卫士 (CropGuard AI). 由 Google Gemini 2.5 驱动。</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
import React from 'react';
import { AnalysisResult } from '../types';
import { AlertCircle, CheckCircle, Droplet, Shield, ThermometerSun, AlertTriangle, Leaf } from 'lucide-react';

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  if (!result.isPlant) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-red-100 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">未能识别为植物</h2>
        <p className="text-gray-600 mb-6">
          上传的图片似乎不是农作物或植物。请上传清晰的植物叶片、茎或果实照片，以便准确识别。
        </p>
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          重试
        </button>
      </div>
    );
  }

  // Check for Chinese "健康" or English "healthy"
  const isHealthy = result.condition.includes('健康') || result.condition.toLowerCase().includes('healthy');
  const scoreColor = result.confidence > 80 ? 'text-green-600' : result.confidence > 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className={`p-1 h-2 ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-500 mb-1">
                <Leaf className="w-4 h-4" />
                {result.plantName}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{result.condition}</h2>
              <p className="text-gray-600 leading-relaxed">{result.description}</p>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shrink-0">
               <div className="text-right">
                 <p className="text-xs text-gray-500 font-medium">置信度</p>
                 <p className={`text-xl font-bold ${scoreColor}`}>{Math.round(result.confidence)}%</p>
               </div>
               <div className="w-10 h-10 rounded-full border-4 border-current opacity-20" style={{ color: isHealthy ? '#22c55e' : '#ef4444' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Symptoms */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900">识别到的症状</h3>
          </div>
          <ul className="space-y-3">
            {result.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                {symptom}
              </li>
            ))}
          </ul>
        </div>

        {/* Treatment */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <ThermometerSun className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-gray-900">建议治疗方案</h3>
          </div>
          <ul className="space-y-3">
            {result.treatment.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prevention */}
      <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-green-600" />
          <h3 className="font-bold text-green-900">预防措施</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.prevention.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-green-800 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-0.5"
        >
          识别另一张照片
        </button>
      </div>
    </div>
  );
};
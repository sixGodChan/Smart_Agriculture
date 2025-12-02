export interface AnalysisResult {
  isPlant: boolean;
  plantName: string;
  condition: string; // Disease name or "Healthy"
  confidence: number; // 0-100
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
}

export interface AnalysisState {
  status: 'idle' | 'uploading' | 'analyzing' | 'success' | 'error';
  imageUri: string | null;
  result: AnalysisResult | null;
  error: string | null;
}

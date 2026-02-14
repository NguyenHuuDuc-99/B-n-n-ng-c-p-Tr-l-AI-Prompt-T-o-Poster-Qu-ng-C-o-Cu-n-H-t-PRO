export type Language = 'en' | 'vi';

export interface StrategyData {
  concept: string;
  composition: string;
  colorPalette: string;
  product: string;
  background: string;
  typography: string;
  textContent: string;
  lighting: string;
  props: string;
  artStyle: string;
  techSpecs: string;
  [key: string]: string; // Allow indexing
}

export interface PromptResponse {
  strategy: StrategyData;
  finalPrompt: string;
  suggestions: string[];
}

export interface LoadingState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

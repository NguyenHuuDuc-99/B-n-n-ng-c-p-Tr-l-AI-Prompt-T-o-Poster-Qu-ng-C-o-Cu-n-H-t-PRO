import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import StrategyCard from './components/StrategyCard';
import PromptResult from './components/PromptResult';
import { PromptResponse, LoadingState, Language, StrategyData } from './types';
import { generateCreativePrompt } from './services/geminiService';
import { MessageSquarePlus, Sparkles } from 'lucide-react';
import { translations } from './utils/translations';

const App: React.FC = () => {
  const [loading, setLoading] = useState<LoadingState>({ status: 'idle' });
  const [data, setData] = useState<PromptResponse | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  const handleGenerate = async (input: string) => {
    setLoading({ status: 'loading' });
    setData(null);
    try {
      const result = await generateCreativePrompt(input, language);
      setData(result);
      setLoading({ status: 'success' });
    } catch (error) {
      setLoading({ status: 'error', message: 'Something went wrong. Please check your API key or try again.' });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const refinement = language === 'en' 
      ? `Based on the previous result, ${suggestion}` 
      : `Dựa trên kết quả trước, ${suggestion}`;
    handleGenerate(refinement);
  };

  const handleStrategyUpdate = (field: keyof StrategyData, value: string) => {
    if (data) {
      setData({
        ...data,
        strategy: {
          ...data.strategy,
          [field]: value,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header language={language} setLanguage={setLanguage} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-12 space-y-4">
           <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
             {t.headline}
           </h2>
           <p className="text-lg text-gray-400 max-w-2xl mx-auto">
             {t.subtext}
           </p>
        </div>

        <InputForm 
          onSubmit={handleGenerate} 
          isLoading={loading.status === 'loading'} 
          language={language}
        />

        {loading.status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-center mb-8 animate-in fade-in slide-in-from-bottom-4">
            {loading.message}
          </div>
        )}

        {data && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <StrategyCard 
              strategy={data.strategy} 
              language={language} 
              onUpdate={handleStrategyUpdate} 
            />
            <PromptResult 
              prompt={data.finalPrompt} 
              language={language} 
            />
            
            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                {t.suggestionsTitle}
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-700 hover:border-purple-500 hover:bg-gray-800 hover:text-purple-400 transition-all text-sm text-gray-300"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {loading.status === 'idle' && !data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center opacity-40 mt-12">
             <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/30">
                <div className="w-10 h-10 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center text-xl">🎨</div>
                <h3 className="font-semibold text-gray-300 mb-2">{t.styleAnalysisTitle}</h3>
                <p className="text-sm text-gray-500">{t.styleAnalysisDesc}</p>
             </div>
             <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/30">
                <div className="w-10 h-10 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center text-xl">💡</div>
                <h3 className="font-semibold text-gray-300 mb-2">{t.stratBreakdownTitle}</h3>
                <p className="text-sm text-gray-500">{t.stratBreakdownDesc}</p>
             </div>
             <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/30">
                <div className="w-10 h-10 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center text-xl">🚀</div>
                <h3 className="font-semibold text-gray-300 mb-2">{t.prodReadyTitle}</h3>
                <p className="text-sm text-gray-500">{t.prodReadyDesc}</p>
             </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-900 py-6 text-center text-gray-600 text-sm">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};

export default App;
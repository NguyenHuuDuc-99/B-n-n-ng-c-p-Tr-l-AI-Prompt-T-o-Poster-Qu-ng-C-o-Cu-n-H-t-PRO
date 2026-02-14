import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface InputFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  language: Language;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, language }) => {
  const [input, setInput] = useState('');
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      if (input.trim() && !isLoading) {
        onSubmit(input);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.inputPlaceholder}
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 p-5 min-h-[120px] focus:outline-none resize-none text-lg"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center px-5 py-3 bg-gray-800/50 border-t border-gray-800">
            <span className="text-xs text-gray-500 font-medium hidden sm:block">
              {t.proTip}
            </span>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`ml-auto flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200
                ${!input.trim() || isLoading 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-gray-900 hover:bg-gray-200 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95'
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.thinking}</span>
                </>
              ) : (
                <>
                  <span>{t.generateBtn}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
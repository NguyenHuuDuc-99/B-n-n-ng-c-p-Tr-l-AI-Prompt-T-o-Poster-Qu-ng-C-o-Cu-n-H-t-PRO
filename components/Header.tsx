import React from 'react';
import { Sparkles, Palette, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const t = translations[language];

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-lg">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {t.appTitle}
            </h1>
            <p className="text-xs text-gray-400 font-medium">{t.appSubtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-800/50 rounded-lg p-1 border border-gray-700">
             <button 
               onClick={() => setLanguage('en')}
               className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${language === 'en' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
             >
               EN
             </button>
             <button 
               onClick={() => setLanguage('vi')}
               className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${language === 'vi' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
             >
               VI
             </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="hidden md:inline">{t.poweredBy}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
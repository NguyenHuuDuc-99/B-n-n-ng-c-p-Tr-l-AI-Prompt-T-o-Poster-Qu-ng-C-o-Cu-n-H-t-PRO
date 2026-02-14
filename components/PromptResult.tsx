import React, { useState } from 'react';
import { Copy, Check, Terminal, Command } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface PromptResultProps {
  prompt: string;
  language: Language;
}

const PromptResult: React.FC<PromptResultProps> = ({ prompt, language }) => {
  const [copied, setCopied] = useState(false);
  const t = translations[language];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
      <div className="relative bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="bg-gray-900/80 px-4 py-3 border-b border-gray-800 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-gray-200">{t.promptTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
          </div>
        </div>

        <div className="p-6 relative">
          <pre className="font-mono text-sm sm:text-base text-cyan-50 leading-relaxed whitespace-pre-wrap break-words">
            {prompt}
          </pre>
          
          <button
            onClick={handleCopy}
            className={`absolute top-4 right-4 p-2 rounded-lg border backdrop-blur-md transition-all duration-200 flex items-center gap-2
              ${copied 
                ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-xs font-semibold">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-xs font-semibold">{t.copyPrompt}</span>
              </>
            )}
          </button>
        </div>

        <div className="px-4 py-2 bg-gray-900 border-t border-gray-800 flex items-center justify-between">
           <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
             <Command className="w-3 h-3" />
             <span>Designed for Midjourney v6 / Stable Diffusion XL</span>
           </div>
           <div className="text-xs text-gray-600 font-mono">
             --ar present --v 6.0
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptResult;
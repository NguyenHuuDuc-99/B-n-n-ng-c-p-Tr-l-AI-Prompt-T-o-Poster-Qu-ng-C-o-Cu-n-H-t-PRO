import React from 'react';
import { StrategyData, Language } from '../types';
import { translations } from '../utils/translations';
import { 
  Lightbulb, Layout, Palette, Package, Image as ImageIcon, 
  Type, AlignLeft, Sun, Component, Brush, Sliders, Edit2
} from 'lucide-react';

interface StrategyCardProps {
  strategy: StrategyData;
  language: Language;
  onUpdate: (field: keyof StrategyData, value: string) => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, language, onUpdate }) => {
  const t = translations[language];

  const items: { key: keyof StrategyData; label: string; icon: any; color: string }[] = [
    { key: 'concept', label: t.labels.concept, icon: Lightbulb, color: 'text-yellow-400' },
    { key: 'composition', label: t.labels.composition, icon: Layout, color: 'text-blue-400' },
    { key: 'colorPalette', label: t.labels.colorPalette, icon: Palette, color: 'text-pink-400' },
    { key: 'product', label: t.labels.product, icon: Package, color: 'text-green-400' },
    { key: 'background', label: t.labels.background, icon: ImageIcon, color: 'text-purple-400' },
    { key: 'typography', label: t.labels.typography, icon: Type, color: 'text-indigo-400' },
    { key: 'textContent', label: t.labels.textContent, icon: AlignLeft, color: 'text-gray-400' },
    { key: 'lighting', label: t.labels.lighting, icon: Sun, color: 'text-orange-400' },
    { key: 'props', label: t.labels.props, icon: Component, color: 'text-red-400' },
    { key: 'artStyle', label: t.labels.artStyle, icon: Brush, color: 'text-cyan-400' },
    { key: 'techSpecs', label: t.labels.techSpecs, icon: Sliders, color: 'text-teal-400' },
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg mb-8">
      <div className="bg-gray-800/60 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
          {t.strategyTitle}
        </h2>
        <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-1 rounded">{t.strategySubtitle}</span>
      </div>
      
      <div className="p-6 grid gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 group">
            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-gray-600 transition-colors`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="space-y-1 w-full">
              <div className="flex items-center justify-between">
                 <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{item.label}</h3>
                 <Edit2 className="w-3 h-3 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <textarea
                value={strategy[item.key]}
                onChange={(e) => onUpdate(item.key, e.target.value)}
                className="w-full bg-transparent text-gray-200 text-sm leading-relaxed border border-transparent hover:border-gray-700 focus:border-purple-500 focus:bg-gray-800/50 rounded p-1 -ml-1 transition-all focus:outline-none resize-y min-h-[40px] overflow-hidden"
                style={{ height: 'auto', minHeight: '1.5em' }}
                rows={Math.max(2, strategy[item.key].split('\n').length)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategyCard;
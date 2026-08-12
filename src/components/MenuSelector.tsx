import React from 'react';
import { MenuItem } from '../types';
import { Check, Sparkles } from 'lucide-react';

interface MenuSelectorProps {
  items: MenuItem[];
  selectedItem: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const MenuSelector: React.FC<MenuSelectorProps> = ({
  items,
  selectedItem,
  onSelect
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
          <Sparkles className="text-amber-400" size={18} />
          Escolha o Menu em Destaque
        </h2>
        <span className="text-xs text-amber-300/80 font-sans">1 de Nossos Itens Artesanais</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
        {items.map((item) => {
          const isSelected = item.id === selectedItem.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`group relative flex flex-col justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                  : 'bg-stone-900/60 border-stone-800 hover:border-amber-700/60 hover:bg-stone-800/80'
              }`}
            >
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 filter brightness-90"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-sm font-semibold text-stone-100 truncate group-hover:text-amber-200">
                      {item.name}
                    </h3>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-amber-500 text-stone-950">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-800/60 text-xs">
                <span className="text-amber-400 font-bold">{item.price}</span>
                <span className="text-[10px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded uppercase font-mono">
                  {item.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

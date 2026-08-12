import React, { useState } from 'react';
import { MENU_ITEMS } from './mockData';
import { MenuItem } from './types';
import { VideoPlayer } from './components/VideoPlayer';
import { MenuSelector } from './components/MenuSelector';
import { ScriptGenerator } from './components/ScriptGenerator';
import { Coffee, ExternalLink, Flame, Sparkles, Share2, Download, Heart } from 'lucide-react';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem>(MENU_ITEMS[0]);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [customCaptions, setCustomCaptions] = useState<string[] | undefined>(undefined);

  const handleScriptGenerated = (script: { headline: string; captions: string[] }) => {
    if (script.captions && script.captions.length > 0) {
      setCustomCaptions(script.captions);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Banner */}
      <header className="border-b border-stone-800/80 bg-stone-900/60 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold shadow-md">
              <Coffee size={20} />
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-amber-100 tracking-wide">
                Breakfast in Bed LX
              </h1>
              <p className="text-[10px] text-amber-400/80 font-mono">
                Lisbon Luxury In-Room Breakfast
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.breakfasinbedlx.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30 text-xs font-medium transition-all"
            >
              Visitar Site Oficial <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Intro Hero Badge */}
        <section className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-700/40 text-amber-300 text-xs font-medium">
            <Sparkles size={14} className="text-amber-400" />
            <span>Vídeo de Marketing em Destaque</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-50">
            A Experiência Premium de Café da Manhã no Quarto em Lisboa
          </h2>
          <p className="text-sm text-stone-400 leading-relaxed">
            Destacando nossos itens artesanais exclusivos preparados todas as manhãs para elevar o seu dia em hotéis e alojamentos locais.
          </p>
        </section>

        {/* Video & Menu Selector Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Video Player Section */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <VideoPlayer
              selectedItem={selectedItem}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              customCaptions={customCaptions}
            />

            {/* Campaign Quick Actions */}
            <div className="w-full max-w-md mt-4 flex items-center justify-between text-xs text-stone-400 px-2">
              <div className="flex items-center gap-1.5">
                <Flame size={14} className="text-amber-500" />
                <span>Vídeo pronto para Instagram Reels / TikTok</span>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Breakfast in Bed LX',
                      url: 'https://www.breakfasinbedlx.com/'
                    }).catch(() => {});
                  }
                }}
                className="flex items-center gap-1 hover:text-amber-300 transition-colors"
              >
                <Share2 size={13} /> Compartilhar
              </button>
            </div>
          </div>

          {/* Right / Menu Selection & Script Customizer */}
          <div className="lg:col-span-6 space-y-6">
            <MenuSelector
              items={MENU_ITEMS}
              selectedItem={selectedItem}
              onSelect={(item) => {
                setSelectedItem(item);
                setCustomCaptions(undefined);
              }}
            />

            <ScriptGenerator
              selectedItem={selectedItem}
              onScriptGenerated={handleScriptGenerated}
            />

            {/* Item Detail Card */}
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono">
                  Item Selecionado para o Vídeo
                </span>
                <h4 className="text-base font-serif font-bold text-stone-100 mt-0.5">
                  {selectedItem.name}
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  {selectedItem.tagline}
                </p>
              </div>
              <a
                href="https://www.breakfasinbedlx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1 flex-shrink-0"
              >
                Fazer Pedido <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/60 bg-stone-950 py-6 mt-12 text-center text-xs text-stone-500">
        <p>
          © {new Date().getFullYear()} Breakfast in Bed LX — Experiência Premium de Café da Manhã no Alojamento em Lisboa.
        </p>
        <p className="mt-1">
          Visite <a href="https://www.breakfasinbedlx.com/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">www.breakfasinbedlx.com</a> para encomendas até às 23h.
        </p>
      </footer>
    </div>
  );
}

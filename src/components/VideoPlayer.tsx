import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Smartphone, Monitor, Download, Copy, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';

interface VideoPlayerProps {
  selectedItem: MenuItem;
  aspectRatio: '9:16' | '16:9';
  setAspectRatio: (ratio: '9:16' | '16:9') => void;
  customCaptions?: string[];
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  selectedItem,
  aspectRatio,
  setAspectRatio,
  customCaptions
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const defaultSlides = [
    {
      title: "WAKE UP. WE HANDLE BREAKFAST.",
      subtitle: "Acorda. Nós tratamos do pequeno-almoço.",
      image: selectedItem.image,
    },
    {
      title: selectedItem.name,
      subtitle: customCaptions?.[0] || selectedItem.description,
      image: selectedItem.image,
    },
    {
      title: "PREPARADO FRESCO TODAS AS MANHÃS",
      subtitle: customCaptions?.[1] || "Ingredientes artesanais de alta qualidade.",
      image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "DELIVERED TO YOUR HOTEL OR AIRBNB",
      subtitle: customCaptions?.[2] || "Entregue no teu hotel ou alojamento em Lisboa.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "YOUR LISBON MORNING STARTS HERE",
      subtitle: "A tua manhã em Lisboa começa aqui. Reserva até às 23h.",
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    }
  ];

  const slideDuration = 3500; // ms

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % defaultSlides.length);
      }, slideDuration);
    }
    return () => clearInterval(timer);
  }, [isPlaying, defaultSlides.length]);

  const currentSlide = defaultSlides[currentSlideIndex];

  const fullTextScript = `🥐 BREAKFAST IN BED LX — VÍDEO DE MARKETING
Menu em Destaque: ${selectedItem.name}
Site Oficial: https://www.breakfasinbedlx.com/

Roteiro dos Slides:
1. ${defaultSlides[0].title} - ${defaultSlides[0].subtitle}
2. ${defaultSlides[1].title} - ${defaultSlides[1].subtitle}
3. ${defaultSlides[2].title} - ${defaultSlides[2].subtitle}
4. ${defaultSlides[3].title} - ${defaultSlides[3].subtitle}
5. ${defaultSlides[4].title} - ${defaultSlides[4].subtitle}

Hashtags Recomendadas:
#BreakfastInBedLX #LisbonBreakfast #VisitLisbon #LisboaGourmet #PequenoAlmocoEmLisboa #LisbonHotelFood`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(fullTextScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col items-center w-full bg-stone-900/40 rounded-2xl p-4 md:p-6 backdrop-blur-md border border-amber-950/30">
      {/* Controls Bar above video */}
      <div className="flex items-center justify-between w-full max-w-md mb-4 text-xs font-sans">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAspectRatio('9:16')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              aspectRatio === '9:16'
                ? 'bg-amber-600 text-white font-medium shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Smartphone size={14} /> 9:16 Story
          </button>
          <button
            onClick={() => setAspectRatio('16:9')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              aspectRatio === '16:9'
                ? 'bg-amber-600 text-white font-medium shadow-sm'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Monitor size={14} /> 16:9 Landscape
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg bg-stone-800/80 text-stone-300 hover:bg-stone-700"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div
        className={`relative overflow-hidden rounded-2xl shadow-2xl bg-black transition-all duration-300 border border-amber-900/20 ${
          aspectRatio === '9:16' ? 'w-full max-w-[320px] aspect-[9/16]' : 'w-full max-w-[640px] aspect-[16/9]'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.05]"
            />

            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

            {/* Video Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
              {/* Top Branding */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest bg-amber-500/80 text-amber-950 font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  www.breakfasinbedlx.com
                </span>
                <span className="text-xs font-mono text-amber-200/80">
                  00:0{currentSlideIndex + 1} / 00:05
                </span>
              </div>

              {/* Center/Bottom Animated Captions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-2 mb-4"
              >
                <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-100 leading-tight tracking-tight drop-shadow-md">
                  {currentSlide.title}
                </h3>
                <p className="text-xs md:text-sm font-sans text-stone-200 line-clamp-2 bg-black/40 backdrop-blur-xs p-2 rounded-lg border border-white/10">
                  {currentSlide.subtitle}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-amber-300 font-sans tracking-wider uppercase font-medium">
                    Lisboa Premium Breakfast
                  </span>
                  <span className="text-xs bg-white text-stone-900 font-bold px-3 py-1 rounded-md shadow-lg">
                    Peça Já
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bars */}
        <div className="absolute top-2 left-3 right-3 flex gap-1 z-20">
          {defaultSlides.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-amber-400 transition-all duration-300 ${
                  idx < currentSlideIndex
                    ? 'w-full'
                    : idx === currentSlideIndex
                    ? 'w-full animate-pulse'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video Action Controls */}
      <div className="flex items-center gap-3 mt-5 text-stone-300">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-md flex items-center justify-center"
          title={isPlaying ? "Pausar" : "Reproduzir"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          onClick={() => {
            setCurrentSlideIndex(0);
            setIsPlaying(true);
          }}
          className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all"
          title="Reiniciar vídeo"
        >
          <RotateCcw size={18} />
        </button>

        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-semibold transition-all shadow-sm"
        >
          <Download size={15} /> Exportar / Copiar Roteiro
        </button>
      </div>

      {/* Export / Download Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-amber-800/40 rounded-2xl max-w-lg w-full p-6 text-stone-100 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2">
              <Download className="text-amber-400" size={20} />
              <h3 className="text-lg font-serif font-bold text-amber-100">
                Exportar Vídeo & Roteiro de Marketing
              </h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              O teu vídeo com o menu <strong className="text-amber-300">{selectedItem.name}</strong> está pronto a ser utilizado nas tuas redes sociais (Instagram Reels, TikTok, Stories).
            </p>

            {/* Script Text Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Roteiro Completo & Legendas</span>
                <button
                  onClick={copyScriptToClipboard}
                  className="flex items-center gap-1 text-amber-400 hover:underline font-medium"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? 'Copiado!' : 'Copiar Texto'}
                </button>
              </div>
              <textarea
                readOnly
                value={fullTextScript}
                rows={8}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs text-stone-300 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={selectedItem.image}
                target="_blank"
                download={`breakfast-in-bed-lx-${selectedItem.id}.jpg`}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl text-center transition-all flex items-center justify-center gap-2"
              >
                <Download size={14} /> Descarregar Imagem Principal do Slide
              </a>

              <button
                onClick={() => setShowExportModal(false)}
                className="w-full py-2 text-xs text-stone-400 hover:text-stone-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

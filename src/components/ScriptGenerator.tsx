import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Sparkles, Wand2, RefreshCw } from 'lucide-react';

interface ScriptGeneratorProps {
  selectedItem: MenuItem;
  onScriptGenerated: (script: { headline: string; captions: string[] }) => void;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({
  selectedItem,
  onScriptGenerated
}) => {
  const [loading, setLoading] = useState(false);
  const [audience, setAudience] = useState('Turistas e Casais em Alojamentos Local');
  const [tone, setTone] = useState('Premium & Desejável');
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menuItem: selectedItem,
          targetAudience: audience,
          tone: tone
        })
      });

      const data = await response.json();
      if (data && !data.error) {
        setResult(data);
        onScriptGenerated({
          headline: data.headline,
          captions: data.captions
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-900/40 rounded-xl p-4 border border-stone-800 space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="text-amber-400" size={16} />
        <h3 className="text-sm font-semibold text-stone-200">Gerador AI de Legendas (Gemini)</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-stone-400 mb-1">Público-Alvo</label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-stone-400 mb-1">Tom de Comunicação</label>
          <input
            type="text"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-semibold py-2 px-4 rounded-lg text-xs transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <RefreshCw size={14} className="animate-spin" /> Gerando Roteiro com AI...
          </>
        ) : (
          <>
            <Wand2 size={14} /> Personalizar Roteiro com Gemini AI
          </>
        )}
      </button>

      {result && (
        <div className="mt-3 p-3 bg-stone-950/80 rounded border border-amber-900/30 text-xs space-y-1.5">
          <p className="text-amber-300 font-semibold">{result.headline}</p>
          <p className="text-stone-300 italic">{result.subheadline}</p>
        </div>
      )}
    </div>
  );
};

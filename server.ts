import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for generating marketing video script / captions via Gemini
  app.post('/api/generate-script', async (req, res) => {
    try {
      const { menuItem, targetAudience, tone } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY is missing. Please set it in secrets.'
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Cria um roteiro e frases chamativas de vídeo de marketing em Português para o serviço "Breakfast in Bed LX" (www.breakfasinbedlx.com).
Item em destaque do menu: ${menuItem?.name || 'Itens artesanais exclusivos'}
Descrição: ${menuItem?.description || 'Pequeno-almoço premium entregue no quarto de hotel ou Airbnb em Lisboa.'}
Público-alvo: ${targetAudience || 'Turistas e casais em alojamentos de Lisboa'}
Tom: ${tone || 'Premium, acolhedor e irresistível'}

Retorna uma resposta em JSON no seguinte formato:
{
  "headline": "Frase principal impactante",
  "subheadline": "Segunda frase com o apelo de conveniência",
  "callToAction": "Chamada para ação clara com link breakfasinbedlx.com",
  "captions": ["Frase do Slide 1", "Frase do Slide 2", "Frase do Slide 3", "Frase de Encerramento"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      } else {
        return res.status(500).json({ error: 'Nenhuma resposta gerada do Gemini.' });
      }
    } catch (err: any) {
      console.error('Error generating script:', err);
      return res.status(500).json({ error: err?.message || 'Falha ao gerar roteiro.' });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

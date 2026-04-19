import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { SynapseOrchestrator } from './orchestrator';

const app = express();
const port = 3000;
const orchestrator = new SynapseOrchestrator();

app.use(cors());
app.use(express.json());

// Servir le Dashboard (Front)
app.use(express.static(path.join(__dirname, '../')));

// API pour lancer la Squad (Back)
app.post('/api/run', async (req: Request, res: Response) => {
  const { intent } = req.body;
  console.log(`[Server] Lancement de la campagne pour : ${intent}`);
  
  try {
    const finalStore = await orchestrator.run(intent);
    res.json(finalStore);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la simulation" });
  }
});

app.listen(port, () => {
  console.log(`
  🚀 SYNAPSE BACKEND DÉMARRÉ
  --------------------------
  Front-end : http://localhost:${port}
  API : http://localhost:${port}/api/run
  `);
});

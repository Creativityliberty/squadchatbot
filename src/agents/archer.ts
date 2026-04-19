import { SharedStore } from '../lib/store';
import { callLLM } from '../lib/llm';

/**
 * AGENT ARCHER (Le Stratège)
 * Mission : Analyser l'intention et définir l'angle d'attaque psychologique.
 */
export class ArcherAgent {
  async exec(store: SharedStore): Promise<string> {
    const strategyPrompt = `
Tu es l'agent Archer, le stratège de la Squad Synapse pour la Librairie de France.
TON ANALYSE :
Intention du client : "${store.intent}"

DÉFINIS LA STRATÉGIE DE VENTE :
1. Choisis un angle (ex: Émotionnel, Urgent, Découverte, Nostalgie).
2. Définis le ton (ex: Dynamique, Calme, Mystérieux).
3. Donne une directive claire au Scribe.

Réponds UNIQUEMENT un court paragraphe décrivant ta stratégie.
`;

    // Archer utilise le modèle Pro pour une analyse de haut vol
    const strategy = await callLLM(strategyPrompt, "gemini-3.1-pro-preview");
    store.strategy = strategy;
    
    return 'strategy_defined';
  }
}

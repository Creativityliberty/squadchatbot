import fs from 'fs';
import { SharedStore } from '../lib/store';
import { callLLM } from '../lib/llm';

/**
 * AGENT SCOUT (Le Sourceur)
 * Mission : Parcourir le catalogue et trouver les produits qui matchent l'intention.
 */
export class ScoutAgent {
  private catalogPath = './config/catalog-produits.json';

  async exec(store: SharedStore): Promise<string> {
    const catalog = JSON.parse(fs.readFileSync(this.catalogPath, 'utf8'));
    
    const searchPrompt = `
Tu es l'agent Scout. Trouve UNIQUEMENT les 2 meilleurs produits dans ce catalogue pour l'intention suivante : "${store.intent}".
CATALOGUE (JSON) :
${JSON.stringify(catalog)}

Réponds UNIQUEMENT au format JSON strict : envoie une liste d'objets [{}, {}].
`;

    // Modèle Lite car c'est une tâche de traitement de données simple
    const response = await callLLM(searchPrompt, "gemini-3.1-flash-lite-preview");

    try {
      // Nettoyage robuste : on cherche ce qui est entre les premiers [ et les derniers ]
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? jsonMatch[0] : response;
      
      const selected = JSON.parse(jsonStr);
      store.selectedProducts = selected;
      return 'found';
    } catch (e) {
      console.error("[Scout] Erreur selection produits, utilisation du fallback...", e);
      // Fallback : on prend les deux premiers du catalogue (qui est une liste directe)
      store.selectedProducts = [catalog[0], catalog[1]].filter(Boolean);
      return 'fallback';
    }
  }
}

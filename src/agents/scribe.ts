import { SharedStore } from '../lib/store';
import { callLLM } from '../lib/llm';
import fs from 'fs';

/**
 * AGENT SCRIBE (Libraire Synapse)
 */
export class ScribeAgent {
  private systemPromptPath = './config/synapse-system-prompt.md';

  async exec(store: SharedStore): Promise<string> {
    const systemPrompt = fs.readFileSync(this.systemPromptPath, 'utf8');
    const products = store.selectedProducts.map(p => `- ${p.nom} (${p.prix} ${p.devise}): ${p.recit}`).join('\n');

    const feedback = store.auditResult?.status === 'rejected' 
      ? `\n⚠️ ATTENTION (CORRECTION DEMANDÉE) :\nL'audit précédent a rejeté ton script pour la raison suivante : "${store.auditResult.feedback}".\nMerci de corriger ces erreurs impérativement.`
      : '';

    const userPrompt = `
CONTEXTE : 
Intention : ${store.intent}
STRATÉGIE ARCHER : ${store.strategy}

Produits sélectionnés :
${products}
${feedback}

Rédige le script de vente proactif complet (avec monologue intérieur).
    `;

    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
    
    // Appel réel au modèle Flash de ta liste
    const script = await callLLM(fullPrompt, "gemini-3-flash-preview");

    // Extraction du raisonnement pour le store
    const monologueMatch = script.match(/\[Monologue Intérieur\]([\s\S]*?)\n\n/);
    if (monologueMatch) {
      store.reasoning = monologueMatch[1].trim();
    }

    store.generatedScript = script;
    return 'script_generated';
  }
}

import { SharedStore } from '../lib/store';
import { callLLM } from '../lib/llm';
import { CatalogService } from '../lib/catalog';

export class ScoutAgent {
  private catalogService = CatalogService.getInstance();

  async exec(store: SharedStore): Promise<string> {
    // On présélectionne 10 produits via une recherche sémantique simple
    const relevantSubset = this.catalogService.search(store.intent, 15);
    
    if (relevantSubset.length === 0) {
        console.warn("[Scout] Aucun produit trouvé pour l'intention :", store.intent);
        store.selectedProducts = [];
        return 'not_found';
    }

    const searchPrompt = `
Tu es l'agent Scout de la Librairie de France. 
OBJECTIF : Trouve UNIQUEMENT les 2 meilleurs produits dans cette sélection pour l'intention : "${store.intent}".

SÉLECTION DE PRODUITS DISPONIBLES :
${JSON.stringify(relevantSubset)}

CONSIGNES :
1. Réponds UNIQUEMENT au format JSON strict : envoie une liste d'objets [{}, {}].
2. Si un produit correspond parfaitement, privilégie-le.
3. Si aucun produit ne correspond, renvoie une liste vide [].
`;

    const response = await callLLM(searchPrompt, "gemini-3.1-flash-lite-preview");

    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? jsonMatch[0] : response;
      const selected = JSON.parse(jsonStr);
      store.selectedProducts = selected;
      return selected.length > 0 ? 'found' : 'not_found';
    } catch (e) {
      console.error("[Scout] Erreur parsing, fallback sur premier résultat...", e);
      store.selectedProducts = [relevantSubset[0]];
      return 'fallback';
    }
  }
}

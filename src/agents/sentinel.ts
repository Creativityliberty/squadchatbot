import { SharedStore } from '../lib/store';
import { callLLM } from '../lib/llm';
import { CatalogService } from '../lib/catalog';

export class SentinelAgent {
  private catalogService = CatalogService.getInstance();

  async exec(store: SharedStore): Promise<'approved' | 'rejected'> {
    // On récupère le catalogue complet pour validation stricte
    const fullCatalog = this.catalogService.getAll();
    
    const auditPrompt = `
Tu es l'agent Sentinel de la Librairie de France. Ta mission est d'auditer le script de vente pour garantir ZÉRO ERREUR.

RÈGLES D'AUDIT STRICTES :
1. PRODUITS : Vérifie que CHAQUE produit cité existe dans cette liste officielle : ${JSON.stringify(fullCatalog)}.
2. HALLUCINATIONS : Interdiction d'inventer des sites web (sauf https://www.librairiedefrance.net), des boutiques ou des garanties imaginaires.
3. STRATÉGIE : Si aucun produit n'est en stock, le script doit l'admettre avec transparence (Règle d'or Archer).

SCRIPT À ANALYSER :
"${store.generatedScript}"

MÉTHODE DE RÉFLEXION (Chain of Thought) :
Étape 1 : Liste les produits cités dans le script.
Étape 2 : Vérifie leur prix et nom dans le catalogue.
Étape 3 : Vérifie les URLs et les promesses techniques.
Étape 4 : Prends une décision finale.

Réponds UNIQUEMENT au format JSON :
{
  "thought": "étape par étape...",
  "status": "approved" ou "rejected",
  "feedback": "raison précise du rejet"
}
`;

    // Modèle PRO pour une analyse sans faille
    const response = await callLLM(auditPrompt, "gemini-3.1-pro-preview");
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : response;
      const result = JSON.parse(jsonStr);
      store.auditResult = result;
      return result.status;
    } catch (e) {
      console.error("[Sentinel] Erreur de jugement, rejet par sécurité.", e);
      return 'rejected';
    }
  }
}

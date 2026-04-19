import { SharedStore } from '../lib/store';
import { callLLM } from '../lib/llm';
import fs from 'fs';

/**
 * AGENT SENTINEL (Le Gardien)
 * Mission : Vérifier l'exactitude des prix et du ton.
 */
export class SentinelAgent {
  private catalogPath = './config/catalog-produits.json';

  async exec(store: SharedStore): Promise<'approved' | 'rejected'> {
    const catalog = JSON.parse(fs.readFileSync(this.catalogPath, 'utf8'));
    
    const auditPrompt = `
Tu es l'agent Sentinel. Ta mission est d'auditer le script de vente suivant.
BUREAU D'AUDIT :
1. PRODUITS : Les noms et prix doivent être EXACTEMENT dans cette liste : ${JSON.stringify(catalog)}. AUCUN AUTRE PRODUIT n'est autorisé.
2. INSTITUTION : L'enseigne "Librairie de France" et l'URL "https://www.librairiedefrance.net" sont AUTORISÉES et recommandées.
3. LOGIQUE : Le script ne doit pas inventer de garanties ou de politiques de retour non spécifiées.
4. TON : Professionnel et proactif.

SCRIPT À AUDITER :
${store.generatedScript}

Réponds UNIQUEMENT au format JSON :
{
  "status": "approved" ou "rejected",
  "feedback": "raison du rejet si applicable"
}
`;

    // Utilisation du modèle PRO pour une réflexion maximale
    const response = await callLLM(auditPrompt, "gemini-3.1-pro-preview");
    
    try {
      // Nettoyage robuste : on cherche ce qui est entre les premières { et les dernières }
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : response;
      
      const result = JSON.parse(jsonStr);
      store.auditResult = result;
      return result.status;
    } catch (e) {
      console.error("[Sentinel] Erreur de parsing JSON", e);
      return 'rejected';
    }
  }
}

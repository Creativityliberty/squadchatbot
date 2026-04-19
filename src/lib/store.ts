/**
 * Shared Store pour la Squad Synapse.
 * Permet aux agents de partager le contexte de la vente.
 */
export interface SharedStore {
  intent: string;              // Ce que l'utilisateur veut (ex: "Vendre du sport")
  strategy?: string;           // Nouvelle stratégie définie par Archer
  plan: string[];              // Les étapes décidées par Archer
  selectedProducts: any[];     // Produits trouvés par Scout
  generatedScript: string;     // Le script écrit par Scribe (avec monologue)
  auditResult?: {
    status: 'approved' | 'rejected';
    feedback: string;
  };
  iteration: number;
  status: 'planning' | 'searching' | 'writing' | 'auditing' | 'done' | 'failed';
  logs: string[];              // Pour le Dashboard
  reasoning?: string;          // Raisonnement global de la Squad
}

export const createInitialStore = (intent: string): SharedStore => ({
  intent,
  plan: [],
  selectedProducts: [],
  generatedScript: '',
  iteration: 0,
  status: 'planning',
  logs: [`Démarrage de la campagne Synapse pour : "${intent}"`]
});

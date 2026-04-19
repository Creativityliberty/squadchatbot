import { createInitialStore, SharedStore } from './lib/store';
import { ScoutAgent } from './agents/scout';
import { ScribeAgent } from './agents/scribe';
import { SentinelAgent } from './agents/sentinel';
import { ArcherAgent } from './agents/archer';

/**
 * ORCHESTRATEUR SYNAPSE V2 (Avec Sentinel)
 * Gère le flux entre les agents et la boucle de correction.
 */
export class SynapseOrchestrator {
  private archer = new ArcherAgent();
  private scout = new ScoutAgent();
  private scribe = new ScribeAgent();
  private sentinel = new SentinelAgent();

  async run(intent: string) {
    const store = createInitialStore(intent);
    let isApproved = false;
    
    // 0. ARCHER : Stratégie
    store.logs.push(`🏹 Archer analyse la stratégie pour : "${intent}"`);
    await this.archer.exec(store);
    
    // 2. BOUCLE DE GÉNÉRATION & AUDIT
    while (!isApproved && store.iteration < 3) {
      store.iteration++;
      store.logs.push(`--- Tentative #${store.iteration} ---`);
      
      // 1. SCOUT : Recherche (Seulement à la première itération ou si besoin)
      if (store.selectedProducts.length === 0) {
        store.status = 'searching';
        store.logs.push('🔍 Scout explore le catalogue...');
        await this.scout.exec(store);
      }

      // 2. SCRIBE : Rédige
      store.status = 'writing';
      store.logs.push('🧙🏾‍♂️ Scribe rédige le script avec monologue intérieur...');
      await this.scribe.exec(store);
      
      // 3. SENTINEL : Vérifie
      store.status = 'auditing';
      store.logs.push('🛡️ Sentinel audite la qualité et les prix...');
      const status = await this.sentinel.exec(store);
      
      if (status === 'approved') {
        isApproved = true;
        store.status = 'done';
        store.logs.push('✅ Script validé par Sentinel !');
      } else {
        store.logs.push(`⚠️ Rejeté : ${store.auditResult?.feedback}`);
        store.logs.push('🔄 Tentative de correction...');
      }
    }

    if (isApproved) {
      console.log('\n--- ✅ MISSION RÉUSSIE ---');
      console.log(store.generatedScript);
    } else {
      store.status = 'failed';
      console.error('\n--- ❌ ÉCHEC : Impossible de valider le script après 3 tentatives.');
    }
    
    return store;
  }
}

// Script de test
const orchestrator = new SynapseOrchestrator();
const userGoal = process.argv[2] || "Vendre du fitness";
orchestrator.run(userGoal);

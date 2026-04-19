# 🚀 Squad Synapse : IA de Vente Proactive (Librairie de France)

Synapse est un système multi-agents autonome conçu pour automatiser les campagnes de vente personnalisées. Il combine recherche catalogue, rédaction émotionnelle et audit de conformité.

## 🛠 Architecture "PocketFlow"
Le système utilise une boucle intelligente inspirée du framework PocketFlow :
1.  **Réflexion** : Chaque agent génère un monologue intérieur avant d'agir (stocké dans `store.reasoning`).
2.  **Action** : 
    - **Scout** (Recherche) : Fouille le catalogue JSON.
    - **Scribe** (Rédaction) : Écrit le script proactif avec un ton premium.
3.  **Audit** : 
    - **Sentinel** : Valide chaque script. S'il y a une erreur de prix ou de ton, le système boucle pour corriger (max 3 tentatives).

## 📁 Structure du Projet
- `src/` : Code source TypeScript (Agents & Orchestrateur).
- `config/` : Prompts (`synapse-system-prompt.md`), agents (`agent.yaml`) et catalogue (`catalog-produits.json`).
- `docs/` : Guide de style, Blueprint et Design System.
- `index.html` : Dashboard de contrôle visuel (Glassmorphism).

## 🖥 Installation & Lancement
Installez les dépendances :
```bash
npm install
```
Lancez une campagne via le terminal :
```bash
npm start "Vendre du fitness haut de gamme"
```
Ou testez directement avec ts-node :
```bash
npx ts-node src/orchestrator.ts "Besoin de livres de cuisine"
```

## ✨ Dashboard Visuel
Ouvrez `index.html` dans votre navigateur pour visualiser l'interface de contrôle de la Squad.

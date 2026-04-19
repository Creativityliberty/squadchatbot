# BLUEPRINT : Système Multi-Agents "Libraire Synapse"

## 📋 Executive Summary
Ce projet vise à automatiser la création de campagnes de vente proactives pour la **Librairie de France**. Le système repose sur une escouade de 4 agents spécialisés qui transforment un catalogue brut en scripts de vente émotionnels et ultra-personnalisés.

## 🎯 Objectifs
1.  **Automatisation** : Passer d'un produit brut à un script de vente proactif en moins de 10 secondes.
2.  **Qualité Synapse** : Maintenir le style "Libraire Synapse" (Monologue intérieur + Récits).
3.  **Précision** : Zéro erreur sur les prix et les spécifications produits.

## 🏗️ L'Escouade d'Agents

### 1. Agent Archer (Le Stratège) 🏹
- **Rôle** : Décomposer l'intention.
- **Mission** : Si on lui dit "Vends-moi du sport", il décide d'appeler le Scout pour les tapis de yoga et le Scribe pour le script.
- **Prompt** : `Decompose-intent-prompt.md`

### 2. Agent Scout (Le Sourceur) 🔎
- **Rôle** : Extraction de données.
- **Mission** : Interroge `catalog-produits.json` et sélectionne les "Stories" les plus impactantes.
- **Outil** : Lecteur JSON / Recherche Sémantique.

### 3. Agent Scribe (Le Libraire Synapse) 🧙🏾‍♂️
- **Rôle** : Rédaction Émotionnelle.
- **Mission** : Applique le script proactif avec le monologue intérieur.
- **Prompt** : `synapse-system-prompt.md`

### 4. Agent Sentinel (Le Gardien) 🛡️
- **Rôle** : Audit & Compliance.
- **Mission** : Vérifie que le Scribe n'a pas inventé de prix et que l'URL de la boutique est correcte.

## 📅 Timeline & Milestones
- **Phase 1** : Structure des fichiers et Prompts (FAIT ✅)
- **Phase 2** : Moteur d'orchestration (en cours)
- **Phase 3** : Simulation d'une campagne complète.

## 📈 Success Metrics
- Taux de conversion simulé (Engagement du script).
- Rapidité de génération de la squad.

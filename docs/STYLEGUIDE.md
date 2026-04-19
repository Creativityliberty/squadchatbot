# 🎨 STYLEGUIDE : Synapse Dashboard

Ce guide contient les variables CSS et les principes de design basés sur les fichiers fournis, optimisés pour l'escouade Synapse.

## 🛠 Variables CSS (Root)

Copiez ce bloc dans votre fichier CSS principal :

```css
:root {
  /* Colors - Light Mode */
  --background: #ffffff;
  --foreground: #020817;
  --card: #ffffff;
  --card-foreground: #020817;
  --primary: #0f172a;
  --primary-foreground: #f8fafc;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --border: #e2e8f0;
  
  /* Synapse Identity */
  --synapse-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  --synapse-glow: 0 0 20px rgba(99, 102, 241, 0.3);
  
  /* Utils */
  --radius: 1rem;
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --glass-bg: rgba(255, 255, 255, 0.5);
}

[data-theme="dark"] {
  --background: #020817;
  --foreground: #f8fafc;
  --card: #020817;
  --card-foreground: #f8fafc;
  --primary: #f8fafc;
  --primary-foreground: #0f172a;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --accent: #1e293b;
  --border: #1e293b;
  --glass-bg: rgba(2, 8, 23, 0.5);
}
```

## 🏗 Composants Clés

### 🧠 Carte Agent (Archer/Scribe)
Utiliser une bordure discrète et un fond ultra-léger.
```css
.agent-card {
  backdrop-filter: blur(12px);
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-lg);
}
```

### 🧙🏾‍♂️ Bouton Vendre (Synapse Action)
C'est le bouton principal utilisant le dégradé.
```css
.btn-synapse {
  background: var(--synapse-gradient);
  color: white;
  font-weight: 600;
  border-radius: var(--radius);
  transition: transform 0.2s;
}
.btn-synapse:hover {
  transform: translateY(-2px);
  box-shadow: var(--synapse-glow);
}
```

## 📜 Typographie
Police recommandée : **Inter** (Google Fonts).

- **Heading 1** : 2.25rem, semibold, letter-spacing -0.025em.
- **Body** : 1rem, regular, line-height 1.6.
- **Monologue** (Inside Thinking) : 0.875rem, italic, color: var(--muted-foreground).

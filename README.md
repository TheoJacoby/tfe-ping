# Application de Gestion de Club de Tennis de Table

Application web développée avec **Nuxt 3**, **Supabase**, **TypeScript** et **Tailwind CSS** pour la gestion d'un club de tennis de table.

## 📋 Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** ou **pnpm** ou **yarn**

## 🚀 Installation et configuration

### 1. Récupérer le projet

```bash
# Cloner ou télécharger le projet
cd tfe-ping
npm install
```

### 2. Configuration des variables d'environnement


Les clés Supabase suivantes sont fournies via Smartschool:
- `SUPABASE_URL`
- `SUPABASE_KEY`

Créer un fichier `.env` à la racine du dossier `nuxt-app/` :

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY= ...
```

---

## ▶️ Lancement de l'application

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`


## 🔐 Comptes de test
Fournis via Smartschool.


## 📁 Structure du projet

```
nuxt-app/
├── app/
│   ├── assets/          # Assets (CSS, images)
│   ├── middleware/      # Middleware de sécurité
│   ├── pages/           # Pages de l'application
│   │   ├── login.vue
│   │   ├── admin/
│   │   ├── comite/
│   │   └── joueur/
│   ├── types/           # Types TypeScript
│   └── app.vue          # Point d'entrée
├── public/              # Fichiers statiques
├── .env                 # Variables d'environnement (à créer)
├── nuxt.config.ts       # Configuration Nuxt
└── package.json         # Dépendances
```

## 🛠️ Technologies utilisées

- **Nuxt 3** (v4.2.2) - Framework Vue.js
- **Supabase** - Backend (Auth + Database)
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **Vue 3** - Framework JavaScript


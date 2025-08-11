# Portfolio React | Slup-Dev

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Un portfolio professionnel moderne développé avec React, présentant mes compétences, projets et expériences en développement web.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Déploiement](#déploiement)
- [Structure du projet](#structure-du-projet)
- [Dépannage](#dépannage)
- [Contact](#contact)

## 🔍 Aperçu

Ce portfolio a été conçu pour présenter mon travail et mes compétences en développement web de manière interactive et visuellement attrayante. Il comprend des sections pour mes projets, mon parcours professionnel, mes compétences techniques et mes coordonnées.

Site en ligne: [https://portfolio.mon-viso.fr](https://portfolio.mon-viso.fr)

## ✨ Fonctionnalités

- **Design responsive** - S'adapte parfaitement à tous les appareils
- **Animations fluides** - Utilisation de Framer Motion et GSAP pour des transitions élégantes
- **Mode sombre/clair** - Option de changement de thème
- **Formulaire de contact** - Intégration avec EmailJS
- **Projets interactifs** - Présentation détaillée de chaque projet
- **Optimisé pour les performances** - Temps de chargement rapide et expérience utilisateur fluide

## 🛠️ Technologies utilisées

- **React** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **React Router** - Navigation entre les pages
- **Styled Components** - Stylisation des composants
- **Framer Motion** - Animations et transitions
- **GSAP** - Animations avancées
- **Font Awesome** - Icônes
- **EmailJS** - Fonctionnalité de formulaire de contact

## 💻 Installation

Pour exécuter ce projet localement, suivez ces étapes:

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/portfolio_react.git

# Accéder au répertoire du projet
cd portfolio_react

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 🚀 Déploiement

Pour déployer l'application en production:

```bash
# Créer une version optimisée pour la production
npm run build
```

Cette commande génère une version optimisée de l'application dans le dossier `build/`.

### Configuration du serveur Apache

Si vous déployez sur un serveur Apache, assurez-vous d'avoir un fichier `.htaccess` correctement configuré dans le dossier `build/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Configurer les types MIME correctement
<IfModule mod_mime.c>
  AddType text/css .css
  AddType application/javascript .js
  AddType application/json .json
</IfModule>
```

## 📁 Structure du projet

```
portfolio_react/
├── public/                  # Fichiers statiques
│   ├── index.html           # Page HTML principale
│   ├── manifest.json        # Manifest pour PWA
│   └── ...
├── src/                     # Code source
│   ├── components/          # Composants React réutilisables
│   ├── pages/               # Pages principales
│   ├── assets/              # Images, polices, etc.
│   ├── styles/              # Styles globaux
│   ├── App.js               # Composant principal
│   └── index.js             # Point d'entrée
├── package.json             # Dépendances et scripts
└── README.md                # Documentation
```

## 🔧 Dépannage

### Problèmes courants

#### Les fichiers CSS/JS ne se chargent pas correctement

Si vous rencontrez des erreurs MIME type lors du déploiement:

1. Vérifiez que votre fichier `.htaccess` est correctement nommé (pas `.htacess`)
2. Assurez-vous que les types MIME sont correctement configurés
3. Vérifiez que votre hébergeur supporte les fichiers `.htaccess`

#### Erreurs avec Font Awesome

Si les icônes ne s'affichent pas:

1. Vérifiez que vous utilisez les composants React de Font Awesome et non les classes CSS
2. Assurez-vous d'importer correctement les icônes et le composant FontAwesomeIcon

```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Utilisation correcte
<FontAwesomeIcon icon={faGithub} />
```

## 📞 Contact

Pour toute question ou suggestion concernant ce projet, n'hésitez pas à me contacter:

- **Site Web**: [portfolio.mon-viso.fr](https://portfolio.mon-viso.fr)
- **GitHub**: [github.com/votre-username](https://github.com/wapin-dev)
- **LinkedIn**: [linkedin.com/in/votre-profil](https://linkedin.com/in/dorian)

---

© 2025 Slup-Dev. Tous droits réservés.

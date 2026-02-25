# Workflows Utilisateurs - Yatalko

> Ce document decrit tous les parcours utilisateur possibles sur la plateforme Yatalko.

---

## Table des matieres

1. [Roles utilisateur](#roles-utilisateur)
2. [Parcours Visiteur (non connecte)](#1-parcours-visiteur-non-connecte)
3. [Parcours Authentification](#2-parcours-authentification)
4. [Parcours Etudiant](#3-parcours-etudiant)
5. [Parcours Ambassadeur](#4-parcours-ambassadeur)
6. [Parcours Administrateur](#5-parcours-administrateur)
7. [Systeme de Gamification](#6-systeme-de-gamification)
8. [Diagrammes de flux](#7-diagrammes-de-flux)

---

## Roles utilisateur

| Role | Description | Permissions |
|------|-------------|-------------|
| **STUDENT** | Etudiant inscrit | Poster, repondre, voter, telecharger documents |
| **AMBASSADOR** | Etudiant verifie | + Epingler posts, moderer contenu, verifier documents |
| **ADMIN** | Administrateur | Acces total, gestion utilisateurs, statistiques |

---

## 1. Parcours Visiteur (non connecte)

### Actions possibles

```
┌─────────────────────────────────────────────────────────────┐
│                    VISITEUR ANONYME                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Voir la page d'accueil                                   │
│  ✅ Voir les posts publics (lecture seule)                   │
│  ✅ Voir les posts trending                                  │
│  ✅ Rechercher des posts                                     │
│  ✅ Voir les profils publics                                 │
│                                                              │
│  ❌ Creer un post                                            │
│  ❌ Repondre                                                 │
│  ❌ Voter                                                    │
│  ❌ Telecharger des documents                                │
│  ❌ Acceder au feed personnalise                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Workflow: Decouverte de la plateforme

```
Visiteur arrive sur Yatalko
         │
         ▼
┌─────────────────────┐
│  Page d'accueil     │
│  - Posts trending   │
│  - Statistiques     │
└─────────────────────┘
         │
         ├──────────────────────┐
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│ Parcourir posts │    │ S'inscrire      │
│ (lecture seule) │    │ pour interagir  │
└─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Clic sur "Repondre" ou "Voter" │
│ → Redirection vers inscription │
└─────────────────────────────────┘
```

---

## 2. Parcours Authentification

### 2.1 Inscription

```
┌────────────────────────────────────────────────────────────────┐
│                        INSCRIPTION                              │
└────────────────────────────────────────────────────────────────┘

Etape 1: Formulaire d'inscription
┌─────────────────────────────────┐
│  POST /api/auth/register        │
│                                 │
│  - Email (@ucad.sn recommande)  │
│  - Mot de passe (min 8 chars)   │
│  - Prenom                       │
│  - Nom                          │
│  - Universite                   │
│  - Faculte                      │
│  - Filiere                      │
│  - Niveau (L1, L2, L3, M1, M2)  │
└─────────────────────────────────┘
         │
         ▼
Etape 2: Verification email (optionnel)
┌─────────────────────────────────┐
│  Email de verification envoye  │
│  → Clic sur le lien            │
│  POST /api/auth/verify-email   │
└─────────────────────────────────┘
         │
         ▼
Etape 3: Compte actif
┌─────────────────────────────────┐
│  ✅ Compte cree                 │
│  ✅ Access token recu           │
│  ✅ Refresh token recu          │
│  → Redirection vers dashboard   │
└─────────────────────────────────┘
```

### 2.2 Connexion

```
┌────────────────────────────────────────────────────────────────┐
│                         CONNEXION                               │
└────────────────────────────────────────────────────────────────┘

POST /api/auth/login
┌─────────────────────────────────┐
│  - Email                        │
│  - Mot de passe                 │
└─────────────────────────────────┘
         │
         ├─────────── Succes ────────────┐
         │                               ▼
         │                    ┌─────────────────────┐
         │                    │ Tokens recus:       │
         │                    │ - accessToken (15m) │
         │                    │ - refreshToken (7j) │
         │                    └─────────────────────┘
         │
         └─────────── Echec ─────────────┐
                                         ▼
                              ┌─────────────────────┐
                              │ 401 Unauthorized    │
                              │ → Reessayer         │
                              │ → Mot de passe      │
                              │   oublie?           │
                              └─────────────────────┘
```

### 2.3 Mot de passe oublie

```
┌────────────────────────────────────────────────────────────────┐
│                    MOT DE PASSE OUBLIE                          │
└────────────────────────────────────────────────────────────────┘

Etape 1: Demande de reset
┌─────────────────────────────────┐
│  POST /api/auth/forgot-password │
│  - Email                        │
└─────────────────────────────────┘
         │
         ▼
Etape 2: Email recu
┌─────────────────────────────────┐
│  Lien de reset avec token       │
│  (valide 1 heure)               │
└─────────────────────────────────┘
         │
         ▼
Etape 3: Nouveau mot de passe
┌─────────────────────────────────┐
│  POST /api/auth/reset-password  │
│  - Token                        │
│  - Nouveau mot de passe         │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  ✅ Mot de passe mis a jour     │
│  → Redirection vers login       │
└─────────────────────────────────┘
```

### 2.4 Refresh Token

```
Access token expire (apres 15 min)
         │
         ▼
┌─────────────────────────────────┐
│  POST /api/auth/refresh         │
│  - refreshToken                 │
└─────────────────────────────────┘
         │
         ├─────── Token valide ──────┐
         │                           ▼
         │                ┌─────────────────────┐
         │                │ Nouveau accessToken │
         │                │ + nouveau refresh   │
         │                └─────────────────────┘
         │
         └─────── Token invalide ────┐
                                     ▼
                          ┌─────────────────────┐
                          │ 401 → Reconnexion   │
                          │ necessaire          │
                          └─────────────────────┘
```

---

## 3. Parcours Etudiant

### 3.1 Dashboard personnel

```
┌────────────────────────────────────────────────────────────────┐
│                      DASHBOARD ETUDIANT                         │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Points    │  │   Badges    │  │   Niveau    │             │
│  │    125      │  │     3       │  │  HELPER     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌───────────────────────────────────────────────┐             │
│  │  Feed personnalise                            │             │
│  │  - Posts de ma filiere                        │             │
│  │  - Posts de mon niveau                        │             │
│  │  - Posts trending                             │             │
│  └───────────────────────────────────────────────┘             │
│                                                                 │
│  ┌───────────────────────────────────────────────┐             │
│  │  Notifications                                │             │
│  │  - Reponses a mes posts                       │             │
│  │  - Votes recus                                │             │
│  │  - Badges obtenus                             │             │
│  └───────────────────────────────────────────────┘             │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 3.2 Creer un post

```
┌────────────────────────────────────────────────────────────────┐
│                       CREER UN POST                             │
└────────────────────────────────────────────────────────────────┘

POST /api/posts
┌─────────────────────────────────┐
│  Type de post:                  │
│  ○ QUESTION (poser une question)│
│  ○ DISCUSSION (debat, avis)     │
│  ○ RESOURCE (partager ressource)│
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Contenu:                       │
│  - Titre (obligatoire)          │
│  - Contenu (Markdown supporte)  │
│  - Tags (ex: java, examen, L2)  │
│  - Matiere (optionnel)          │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  ✅ Post cree                   │
│  +5 points gagnes               │
│  → Visible dans le feed         │
└─────────────────────────────────┘
```

### 3.3 Interagir avec les posts

```
┌────────────────────────────────────────────────────────────────┐
│                    INTERACTIONS POSTS                           │
└────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  POST: "Comment resoudre cet exercice de Java?"                 │
│  ───────────────────────────────────────────────────────────────│
│  @moussa - il y a 2h - 15 vues                                  │
│                                                                 │
│  [Code Java ici...]                                             │
│                                                                 │
│  Tags: #java #poo #exercice                                     │
│                                                                 │
│  ┌────────┐  ┌────────┐  ┌──────────┐  ┌────────────┐          │
│  │ ▲ 12   │  │ ▼      │  │ Repondre │  │ Partager   │          │
│  └────────┘  └────────┘  └──────────┘  └────────────┘          │
└─────────────────────────────────────────────────────────────────┘

Actions disponibles:

┌─────────────────┐
│    UPVOTE       │  POST /api/posts/{id}/vote?type=UPVOTE
│    (+1 point    │  → +1 point pour l'auteur
│    pour auteur) │
└─────────────────┘

┌─────────────────┐
│   DOWNVOTE      │  POST /api/posts/{id}/vote?type=DOWNVOTE
│   (-1 point     │  → -1 point pour l'auteur
│   pour auteur)  │
└─────────────────┘

┌─────────────────┐
│   REPONDRE      │  POST /api/posts/{id}/replies
│   (+3 points    │  → +3 points pour le repondeur
│   si accepte)   │
└─────────────────┘
```

### 3.4 Repondre a un post

```
┌────────────────────────────────────────────────────────────────┐
│                      REPONDRE A UN POST                         │
└────────────────────────────────────────────────────────────────┘

POST /api/posts/{postId}/replies
┌─────────────────────────────────┐
│  Contenu de la reponse          │
│  (Markdown supporte)            │
│                                 │
│  [Envoyer]                      │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Reponse publiee                │
│  +2 points gagnes               │
└─────────────────────────────────┘
         │
         ▼
Si l'auteur du post accepte ta reponse:
┌─────────────────────────────────┐
│  ✅ Reponse acceptee!           │
│  +10 points bonus               │
│  Badge "HELPER" possible        │
└─────────────────────────────────┘
```

### 3.5 Reponses imbriquees (threads)

```
┌────────────────────────────────────────────────────────────────┐
│                    REPONSES IMBRIQUEES                          │
└────────────────────────────────────────────────────────────────┘

POST: "Question sur les threads Java"
│
├── Reponse de @fatou (✅ Acceptee)
│   │   "Voici comment faire..."
│   │
│   ├── Reponse de @ibra
│   │   │   "Merci, mais j'ai une question..."
│   │   │
│   │   └── Reponse de @fatou
│   │           "Pour preciser..."
│   │
│   └── Reponse de @awa
│           "Autre approche..."
│
└── Reponse de @omar
        "Tu peux aussi utiliser..."

API:
- POST /api/replies/{parentReplyId}/replies  → Reponse imbriquee
- PUT /api/replies/{id}/accept               → Accepter une reponse (auteur du post)
```

### 3.6 Documents

```
┌────────────────────────────────────────────────────────────────┐
│                        DOCUMENTS                                │
└────────────────────────────────────────────────────────────────┘

UPLOADER UN DOCUMENT:
┌─────────────────────────────────┐
│  POST /api/documents/upload     │
│                                 │
│  - Fichier (PDF, DOCX, etc.)    │
│  - Titre                        │
│  - Description                  │
│  - Matiere                      │
│  - Type (cours, TD, examen)     │
│  - Annee academique             │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Document uploade               │
│  Status: PENDING (en attente    │
│  de verification)               │
│  +5 points                      │
└─────────────────────────────────┘
         │
         ▼ (Apres verification par Ambassador)
┌─────────────────────────────────┐
│  ✅ Document VERIFIED           │
│  +15 points bonus               │
│  Badge "CONTRIBUTOR" possible   │
└─────────────────────────────────┘


RECHERCHER DES DOCUMENTS:
┌─────────────────────────────────┐
│  GET /api/documents/search      │
│                                 │
│  Filtres:                       │
│  - Matiere                      │
│  - Type                         │
│  - Annee                        │
│  - Filiere                      │
│  - Mots-cles                    │
└─────────────────────────────────┘


TELECHARGER:
┌─────────────────────────────────┐
│  GET /api/documents/{id}/download│
│                                 │
│  → Fichier telecharge           │
│  → +1 telechargement comptabilise│
└─────────────────────────────────┘
```

### 3.7 Feed et recherche

```
┌────────────────────────────────────────────────────────────────┐
│                      FEED & RECHERCHE                           │
└────────────────────────────────────────────────────────────────┘

FEED PERSONNALISE:
┌─────────────────────────────────┐
│  GET /api/feed                  │
│                                 │
│  Algorithme:                    │
│  1. Posts de ma filiere         │
│  2. Posts de mon niveau         │
│  3. Posts trending              │
│  4. Posts avec mes tags suivis  │
└─────────────────────────────────┘

FEED TRENDING:
┌─────────────────────────────────┐
│  GET /api/feed/trending         │
│                                 │
│  Score = votes + vues + reponses│
│  Periode: 24h / 7j / 30j        │
└─────────────────────────────────┘

RECHERCHE AVANCEE:
┌─────────────────────────────────┐
│  GET /api/posts?search=...      │
│                                 │
│  Filtres:                       │
│  - ?type=QUESTION               │
│  - ?subjectId=...               │
│  - ?tags=java,poo               │
│  - ?authorId=...                │
│  - ?hasAcceptedReply=true       │
└─────────────────────────────────┘
```

### 3.8 Profil utilisateur

```
┌────────────────────────────────────────────────────────────────┐
│                      PROFIL UTILISATEUR                         │
└────────────────────────────────────────────────────────────────┘

VOIR MON PROFIL:
┌─────────────────────────────────────────────────────────────────┐
│  GET /api/users/me                                              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  👤 Moussa DIOP                                          │  │
│  │  📧 moussa@ucad.sn                                       │  │
│  │  🏛️ UCAD - FST - Informatique - L3                       │  │
│  │  📅 Membre depuis Janvier 2024                           │  │
│  │                                                          │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐         │  │
│  │  │ 125 pts│  │ 15     │  │ 8      │  │ 45     │         │  │
│  │  │ Points │  │ Posts  │  │ Accepted│ │ Replies│         │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘         │  │
│  │                                                          │  │
│  │  Badges: 🏆 HELPER  📚 CONTRIBUTOR  ⭐ ACTIVE            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

MODIFIER MON PROFIL:
┌─────────────────────────────────┐
│  PUT /api/users/me              │
│                                 │
│  - Prenom / Nom                 │
│  - Bio                          │
│  - Photo de profil              │
│  - Numero etudiant              │
└─────────────────────────────────┘
```

### 3.9 Notifications

```
┌────────────────────────────────────────────────────────────────┐
│                       NOTIFICATIONS                             │
└────────────────────────────────────────────────────────────────┘

GET /api/notifications

Types de notifications:
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🔔 Nouvelle reponse                                            │
│     "Fatou a repondu a votre question"                          │
│                                                                 │
│  ✅ Reponse acceptee                                            │
│     "Votre reponse a ete acceptee! +10 points"                  │
│                                                                 │
│  👍 Vote recu                                                   │
│     "Votre post a recu 5 nouveaux votes"                        │
│                                                                 │
│  🏆 Badge obtenu                                                │
│     "Felicitations! Vous avez obtenu le badge HELPER"           │
│                                                                 │
│  📄 Document verifie                                            │
│     "Votre document a ete verifie et approuve"                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Actions:
- PUT /api/notifications/{id}/read     → Marquer comme lu
- PUT /api/notifications/read-all      → Tout marquer comme lu
- GET /api/notifications/unread-count  → Nombre non lus
```

---

## 4. Parcours Ambassadeur

### Permissions supplementaires

```
┌────────────────────────────────────────────────────────────────┐
│                        AMBASSADEUR                              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Toutes les permissions STUDENT +                               │
│                                                                 │
│  ✅ Epingler des posts importants                               │
│  ✅ Verifier des documents                                      │
│  ✅ Signaler du contenu inapproprie                             │
│  ✅ Voir les statistiques de sa filiere                         │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 4.1 Epingler un post

```
┌────────────────────────────────────────────────────────────────┐
│                      EPINGLER UN POST                           │
└────────────────────────────────────────────────────────────────┘

PUT /api/posts/{id}/pin

┌─────────────────────────────────┐
│  Post epingle                   │
│  → Apparait en haut du feed     │
│  → Visible par tous les         │
│    etudiants de la filiere      │
└─────────────────────────────────┘

Cas d'usage:
- Annonce importante
- Ressource utile pour examens
- Post de qualite exceptionnelle
```

### 4.2 Verifier un document

```
┌────────────────────────────────────────────────────────────────┐
│                    VERIFIER UN DOCUMENT                         │
└────────────────────────────────────────────────────────────────┘

GET /api/documents?status=PENDING
         │
         ▼
┌─────────────────────────────────┐
│  Liste des documents en attente │
│  de verification                │
└─────────────────────────────────┘
         │
         ▼
PUT /api/documents/{id}/verify
┌─────────────────────────────────┐
│  ○ APPROVE - Document valide    │
│  ○ REJECT  - Document refuse    │
│    (avec raison)                │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Document verifie               │
│  → Notification a l'auteur      │
│  → Points attribues si approuve │
└─────────────────────────────────┘
```

---

## 5. Parcours Administrateur

### Permissions completes

```
┌────────────────────────────────────────────────────────────────┐
│                       ADMINISTRATEUR                            │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Toutes les permissions AMBASSADOR +                            │
│                                                                 │
│  ✅ Gerer les utilisateurs (roles, bans)                        │
│  ✅ Gerer les universites/facultes/filieres                     │
│  ✅ Voir toutes les statistiques                                │
│  ✅ Supprimer tout contenu                                      │
│  ✅ Promouvoir des ambassadeurs                                 │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 5.1 Gestion des utilisateurs

```
┌────────────────────────────────────────────────────────────────┐
│                   GESTION UTILISATEURS                          │
└────────────────────────────────────────────────────────────────┘

LISTE DES UTILISATEURS:
┌─────────────────────────────────┐
│  GET /api/admin/users           │
│                                 │
│  Filtres:                       │
│  - ?role=STUDENT                │
│  - ?university=...              │
│  - ?isVerified=true             │
└─────────────────────────────────┘

CHANGER LE ROLE:
┌─────────────────────────────────┐
│  PUT /api/admin/users/{id}/role │
│                                 │
│  - STUDENT → AMBASSADOR         │
│  - AMBASSADOR → STUDENT         │
│  - Tout role → ADMIN            │
└─────────────────────────────────┘

DESACTIVER UN COMPTE:
┌─────────────────────────────────┐
│  DELETE /api/admin/users/{id}   │
│                                 │
│  → Soft delete (compte desactive│
│    mais donnees conservees)     │
└─────────────────────────────────┘
```

### 5.2 Statistiques

```
┌────────────────────────────────────────────────────────────────┐
│                       STATISTIQUES                              │
└────────────────────────────────────────────────────────────────┘

GET /api/admin/stats

┌─────────────────────────────────────────────────────────────────┐
│  STATISTIQUES GLOBALES                                          │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  👥 Utilisateurs: 1,250 (+45 cette semaine)                     │
│  📝 Posts: 3,420 (+120 cette semaine)                           │
│  💬 Reponses: 8,950                                             │
│  📄 Documents: 890 (dont 95% verifies)                          │
│                                                                 │
│  TOP UNIVERSITES:                                               │
│  1. UCAD - 850 utilisateurs                                     │
│  2. UGB - 230 utilisateurs                                      │
│  3. UASZ - 120 utilisateurs                                     │
│                                                                 │
│  TOP CONTRIBUTORS:                                              │
│  1. @fatou - 450 points                                         │
│  2. @ibra - 380 points                                          │
│  3. @awa - 320 points                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Systeme de Gamification

### Points

| Action | Points |
|--------|--------|
| Creer un post | +5 |
| Repondre a un post | +2 |
| Reponse acceptee | +10 |
| Recevoir un upvote | +1 |
| Recevoir un downvote | -1 |
| Uploader un document | +5 |
| Document verifie | +15 |
| Premier post du jour | +3 |

### Badges

| Badge | Condition | Icone |
|-------|-----------|-------|
| **NEWCOMER** | Compte cree | 🆕 |
| **FIRST_POST** | Premier post publie | 📝 |
| **HELPER** | 10 reponses acceptees | 🤝 |
| **EXPERT** | 50 reponses acceptees | 🎓 |
| **CONTRIBUTOR** | 10 documents verifies | 📚 |
| **POPULAR** | Post avec 50+ votes | ⭐ |
| **ACTIVE** | Connexion 30 jours consecutifs | 🔥 |
| **AMBASSADOR** | Promu ambassadeur | 🏆 |

### Niveaux

```
Points      Niveau
─────────────────────
0-49        NEWBIE
50-199      ACTIVE
200-499     HELPER
500-999     EXPERT
1000+       MASTER
```

---

## 7. Diagrammes de flux

### Flux complet: Poser une question et obtenir une reponse

```
┌──────────────┐
│   ETUDIANT   │
│   (Moussa)   │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│ 1. Creer un post QUESTION    │
│    "Comment faire X en Java?"│
│    Tags: #java #poo          │
│    +5 points                 │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 2. Post visible dans:        │
│    - Feed de sa filiere      │
│    - Recherche par tags      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐        ┌──────────────┐
│ 3. Autres etudiants voient   │◄───────│   ETUDIANT   │
│    le post                   │        │   (Fatou)    │
└──────────────┬───────────────┘        └──────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 4. Fatou repond              │
│    "Voici comment faire..."  │
│    +2 points pour Fatou      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 5. Moussa recoit notification│
│    "Nouvelle reponse!"       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 6. Moussa accepte la reponse │
│    +10 points pour Fatou     │
│    Badge HELPER possible     │
└──────────────────────────────┘
```

### Flux complet: Partager un document

```
┌──────────────┐
│   ETUDIANT   │
│   (Ibra)     │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│ 1. Uploader document         │
│    "Cours Algorithmique L2"  │
│    Type: COURS               │
│    +5 points                 │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 2. Document en attente       │
│    Status: PENDING           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐        ┌──────────────┐
│ 3. Ambassadeur voit le doc   │◄───────│  AMBASSADEUR │
│    dans la liste a verifier  │        │   (Awa)      │
└──────────────┬───────────────┘        └──────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 4. Awa verifie et approuve   │
│    Status: VERIFIED          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 5. Ibra recoit notification  │
│    +15 points bonus          │
│    Badge CONTRIBUTOR possible│
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 6. Document visible pour     │
│    tous les etudiants        │
│    → Telechargements         │
└──────────────────────────────┘
```

---

## Endpoints API - Resume

### Authentification
| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |
| POST | `/api/auth/logout` | Deconnexion |
| POST | `/api/auth/refresh` | Rafraichir token |
| POST | `/api/auth/forgot-password` | Demande reset password |
| POST | `/api/auth/reset-password` | Reset password |
| POST | `/api/auth/verify-email` | Verifier email |

### Posts
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/posts` | Liste des posts |
| POST | `/api/posts` | Creer un post |
| GET | `/api/posts/{id}` | Voir un post |
| PUT | `/api/posts/{id}` | Modifier un post |
| DELETE | `/api/posts/{id}` | Supprimer un post |
| POST | `/api/posts/{id}/vote` | Voter |
| PUT | `/api/posts/{id}/pin` | Epingler (Ambassador+) |

### Replies
| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/posts/{id}/replies` | Repondre a un post |
| POST | `/api/replies/{id}/replies` | Reponse imbriquee |
| PUT | `/api/replies/{id}/accept` | Accepter une reponse |
| DELETE | `/api/replies/{id}` | Supprimer une reponse |

### Feed
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/feed` | Feed personnalise |
| GET | `/api/feed/trending` | Posts trending |

### Documents
| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/documents/upload` | Uploader |
| GET | `/api/documents/search` | Rechercher |
| GET | `/api/documents/{id}/download` | Telecharger |
| PUT | `/api/documents/{id}/verify` | Verifier (Ambassador+) |

### Users
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users/me` | Mon profil |
| PUT | `/api/users/me` | Modifier profil |
| GET | `/api/users/{id}` | Voir un profil |
| GET | `/api/users/{id}/gamification` | Stats gamification |

### Notifications
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/notifications` | Mes notifications |
| PUT | `/api/notifications/{id}/read` | Marquer comme lu |
| PUT | `/api/notifications/read-all` | Tout marquer lu |

### Admin
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/users` | Liste utilisateurs |
| PUT | `/api/admin/users/{id}/role` | Changer role |
| DELETE | `/api/admin/users/{id}` | Desactiver compte |
| GET | `/api/admin/stats` | Statistiques |

---

*Derniere mise a jour : Phase 9 - Production Ready*

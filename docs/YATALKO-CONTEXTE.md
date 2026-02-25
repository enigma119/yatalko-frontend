# 📚 Yatalko - Contexte Projet

## 🎯 Vue d'ensemble

**Yatalko** est une plateforme web collaborative pour les étudiants universitaires au Sénégal, initialement ciblant l'**Université Cheikh Anta Diop (UCAD)** à Dakar.

**Nom :** Yatalko (Wolof - signifie "discuter", "échanger")  
**Mission :** Organiser la vie académique des étudiants, faciliter le partage de connaissances et améliorer la réussite scolaire.  
**Vision long terme :** Devenir le réseau inter-universitaire de référence en Afrique de l'Ouest francophone.

---

## 🔥 Le Problème

### Situation actuelle à l'UCAD

**Communication chaotique :**
- Les étudiants utilisent **des dizaines de groupes WhatsApp** par filière
- Messages importants noyés dans les conversations
- Impossible de retrouver anciens sujets d'examen
- Information dispersée et désorganisée

**Conséquences :**
- ⏰ **Perte de temps** : Chercher documents pendant des heures
- 😰 **Stress accru** : Peur de rater infos importantes
- 📉 **Performance académique** : Manque de ressources fiables
- 🤝 **Collaboration inefficace** : Pas d'espace structuré pour s'entraider

### Exemple concret

> **Situation réelle :** Un étudiant en L2 Informatique cherche le sujet d'examen d'Algorithmique de 2023. Il doit :
> 1. Fouiller 5 groupes WhatsApp différents
> 2. Demander dans chaque groupe (spam)
> 3. Recevoir des versions contradictoires
> 4. Ne jamais être sûr d'avoir le bon document
> 
> **Résultat :** 2h perdues, stress, pas de garantie de qualité.

---

## 💡 La Solution : Yatalko

### Concept central

**Un espace centralisé par matière** où chaque étudiant peut :

1. **Trouver des documents** officiels et vérifiés (anciens sujets, cours, exercices)
2. **Poser des questions** et obtenir des réponses de qualité
3. **Partager des ressources** et être reconnu pour sa contribution
4. **Collaborer** de manière organisée

### Principes de design

**🎓 Académique d'abord**
- Organisation par **Université → Filière → Niveau → Matière**
- Pas de distractions, focus sur l'apprentissage
- Validation par ambassadeurs étudiants

**🤝 Collaboration structurée**
- Discussions par matière (pas de spam général)
- Questions/Réponses avec meilleure réponse
- Système de réputation pour valoriser l'entraide

**📱 Mobile-first**
- Adapté connexions 3G/4G africaines
- Compression agressive des fichiers
- Progressive Web App (installation possible)

**🎮 Gamification**
- Points pour contributions utiles
- Badges de reconnaissance
- Leaderboard par université
- **But :** Motiver le partage de qualité

---

## 🏗️ Architecture Technique

### Stack Choisi : Spring Boot + PostgreSQL

**Pourquoi Spring Boot ?**
- ✅ **Écosystème mature** pour applications entreprise
- ✅ **Performance & Scalabilité** : Supporte 10K+ utilisateurs
- ✅ **Employabilité** : Très demandé au Sénégal (banques, télécoms)
- ✅ **Apprentissage** : Patterns professionnels dès le début
- ✅ **Communauté** : Énorme base de ressources

**Pourquoi PostgreSQL ?**
- ✅ **Relationnel** : Structure académique claire (université → filière → matière)
- ✅ **JSONB** : Flexibilité pour permissions, préférences
- ✅ **Full-text search** : Recherche documents en français
- ✅ **Performance** : Indexes avancés, triggers
- ✅ **Gratuit** : Open-source, pas de coûts licensing

### Architecture en Couches

```
┌─────────────────────────────────────┐
│         Frontend (Future)           │
│    React/Next.js + TailwindCSS      │
└──────────────┬──────────────────────┘
               │ REST API (JSON)
┌──────────────▼──────────────────────┐
│          BACKEND (Spring Boot)      │
├─────────────────────────────────────┤
│  Controllers  │  DTO Validation     │
│  ────────────────────────────────── │
│  Services     │  Business Logic     │
│  ────────────────────────────────── │
│  Repositories │  Spring Data JPA    │
│  ────────────────────────────────── │
│  Entities     │  JPA/Hibernate      │
└──────────────┬──────────────────────┘
               │ JDBC
┌──────────────▼──────────────────────┐
│      PostgreSQL Database            │
│  Tables • Indexes • Triggers        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       Services Externes             │
├─────────────────────────────────────┤
│  Cloudinary    │  Stockage fichiers │
│  SendGrid      │  Emails            │
│  Firebase      │  Notifs push       │
└─────────────────────────────────────┘
```

### Patterns Appliqués

**1. Layered Architecture**
- **Controller** : Endpoints REST, validation input
- **Service** : Logique métier, transactions
- **Repository** : Accès données (Spring Data JPA)
- **Entity** : Modèle de données (JPA)

**2. DTO Pattern**
- Séparation Entity ↔ DTO pour API
- MapStruct pour mapping automatique
- Validation avec Bean Validation

**3. Repository Pattern**
- Abstraction accès données
- Queries custom avec @Query
- Pagination avec Spring Data

**4. Dependency Injection**
- Spring IoC container
- @Autowired / Constructor injection
- Facilite tests unitaires

---

## 🎓 Contexte Universitaire UCAD

### Structure Académique

```
UCAD (Université Cheikh Anta Diop)
├── FST (Faculté des Sciences et Techniques)
│   ├── Licence Informatique (L1, L2, L3)
│   │   ├── L1 : Bases programmation, maths
│   │   ├── L2 : Algorithmique, POO, BDD, Réseaux
│   │   └── L3 : Génie logiciel, IA, Sécurité
│   ├── Licence Mathématiques
│   └── Licence Physique-Chimie
├── FASEG (Faculté Sciences Éco & Gestion)
└── ... autres facultés
```

### Cible MVP : Licence Informatique L2

**Pourquoi L2 Informatique ?**
- ✅ **Niche claire** : ~200-300 étudiants
- ✅ **Tech-savvy** : Adoptent facilement nouvelles plateformes
- ✅ **Pain point fort** : Beaucoup de matières techniques nécessitant ressources
- ✅ **Ambassadeurs faciles** : Étudiants L3/M1 motivés pour aider
- ✅ **Validation rapide** : Feedback en 2-3 semaines

**Matières L2 (Semestre 3 & 4) :**
1. Algorithmique et Structures de Données (INFO201)
2. Programmation Orientée Objet (INFO202)
3. Bases de Données (INFO203)
4. Réseaux Informatiques (INFO204)
5. Systèmes d'Exploitation (INFO205)
6. Développement Web (INFO206)

### Contraintes Locales

**Connectivité :**
- 📶 Connexion 3G/4G majoritaire (pas toujours stable)
- 💰 Data coûteuse (compression obligatoire)
- ⚡ Coupures électriques fréquentes

**Équipement :**
- 📱 Smartphones principalement (Android)
- 💻 Peu d'accès ordinateurs personnels
- 🏛️ Salles info limitées

**Culture :**
- 🗣️ Wolof + Français
- 🤝 Entraide communautaire forte
- 🎓 Respect hiérarchie (professeurs, aînés)

---

## 🚀 Fonctionnalités Principales

### Phase 1 : MVP (Licence Info L2 UCAD)

#### 1. **Authentification**
```
Inscription :
- Email (universitaire ou personnel)
- Validation manuelle par Campus Lead si pas d'email UCAD
- Vérification email obligatoire

Login :
- JWT tokens (access + refresh)
- Session 15min (access), 7 jours (refresh)
```

#### 2. **Espaces par Matière**
```
Navigation :
UCAD → FST → Licence Info → L2 → Algorithmique

Actions :
- Rejoindre/quitter matière
- Voir membres actifs
- Stats (posts, documents, activité)
```

#### 3. **Discussions Structurées**
```
Types de posts :
- Question (avec réponse acceptée)
- Annonce (épinglable par ambassadeur)
- Discussion générale

Features :
- Upvote/Downvote
- Réponses imbriquées
- Marquer réponse comme solution
- Tags (#examen, #tp, #cours)
- Search full-text
```

#### 4. **Partage de Documents**
```
Types :
- Anciens sujets d'examen
- Cours/Slides
- Exercices corrigés
- Projets exemples

Métadonnées :
- Année (2023, 2024)
- Semestre (S3, S4)
- Professeur
- Catégorie (exam, course, exercise)

Validation :
- Upload par tous
- Vérification par ambassadeur
- Badge "Vérifié" sur documents validés
```

#### 5. **Gamification**
```
Points :
+5  : Créer post
+3  : Répondre à question
+15 : Réponse acceptée
+10 : Partager document
+20 : Document vérifié (ambassadeur)
+2  : Recevoir upvote

Badges :
🎯 Helper      : 10 réponses
🏆 Expert      : 5 réponses acceptées
📚 Contributeur: 10 documents partagés
✅ Curateur    : 5 documents vérifiés (ambassadeur)
⭐ Populaire   : 50 upvotes reçus

Leaderboard :
- Top 20 par université
- Réinitialisé chaque semestre
```

#### 6. **Notifications**
```
Déclencheurs :
- Réponse à ma question
- Réponse acceptée
- Nouveau document dans mes matières
- Post épinglé
- Badge gagné
- Upvote reçu

Canaux :
- In-app (toujours)
- Email (configurable)
- Push (future)
```

### Phase 2 : Expansion Multi-Universités

**Nouvelles features :**
- Sélecteur université à l'inscription
- Forum national par filière (discussions inter-univ)
- Badges "Helper National"
- Comparaison universités (stats anonymisées)

**Universités cibles :**
- UGB (Saint-Louis)
- UASZ (Ziguinchor)
- UGBB (Bambey)
- UVS (Virtuelle)

---

## 👥 Système de Rôles

### Student (Étudiant)
**Peut :**
- ✅ Rejoindre matières
- ✅ Créer posts/réponses
- ✅ Upvote/Downvote
- ✅ Upload 5 documents/jour (10MB max)
- ✅ Télécharger documents

**Ne peut pas :**
- ❌ Épingler posts
- ❌ Vérifier documents
- ❌ Modérer

### Ambassador (Ambassadeur)
**Étudiant senior (L3/M1) responsable de 2-3 matières**

**Peut tout ce que Student + :**
- ✅ Épingler/Dé-épingler posts importants
- ✅ Vérifier documents (badge "Vérifié")
- ✅ Upload 20 documents/jour (50MB max)
- ✅ Supprimer spam/contenu inapproprié

**Sélection :**
- Recommandé par professeur OU
- Top 5 leaderboard semestre précédent OU
- Volontaire validé par Campus Lead

### Campus Lead
**1 par université - Coordinateur général**

**Peut tout ce que Ambassador + :**
- ✅ Créer/modifier structure académique (programmes, matières)
- ✅ Nommer/révoquer ambassadeurs
- ✅ Valider inscriptions manuelles
- ✅ Accès analytics plateforme
- ✅ Modération globale université

**Sélection :**
- Étudiant M1/M2 motivé
- Recommandé par administration faculté
- Formation par équipe Yatalko

### Admin
**Équipe Yatalko - Contrôle total**

**Peut tout + :**
- ✅ Créer universités
- ✅ Nommer Campus Leads
- ✅ Configuration système
- ✅ Accès DB directe

---

## 🎨 Expérience Utilisateur

### Parcours Typique Étudiant

**1. Découverte (via WhatsApp/bouche-à-oreille)**
```
"Hé, il y a une nouvelle plateforme Yatalko
pour partager anciens sujets et s'entraider.
J'ai trouvé tous les examens d'algo là-bas !"
```

**2. Inscription (2 minutes)**
```
- Visite yatalko.com
- Inscription email
- Sélectionne : UCAD → FST → Licence Info → L2
- Vérifie email
- Login
```

**3. Onboarding (30 secondes)**
```
Popup :
"Bienvenue ! Rejoins tes matières pour commencer.
Voici tes matières L2 recommandées : [Liste]"

Action : Click "Rejoindre tout" → Accès immédiat
```

**4. Première utilisation**
```
Cas 1 - Chercher ancien sujet :
→ Matières → Algorithmique → Documents → Filter "Examen 2023"
→ Trouve sujet + corrigé vérifiés
→ Télécharge (count +1, uploader gagne +1 point)

Cas 2 - Poser question :
→ Matières → Bases de Données → Discussions → Nouvelle question
→ "Comment faire une jointure LEFT vs RIGHT ?"
→ 3 réponses en 2h, 1 acceptée (+15 points au répondeur)

Cas 3 - Partager document :
→ Upload ancien sujet perso
→ +10 points immédiatement
→ Ambassadeur vérifie → +20 points bonus + badge "Vérifié"
```

**5. Engagement régulier**
```
Semaine type :
- Lundi : Check nouveaux posts matières
- Mercredi : Upload TD corrigé
- Vendredi : Répond 2-3 questions (accumule points)
- Dimanche : Télécharge sujets pour révisions

Notification push :
"📢 Nouveau sujet d'examen partagé en Réseaux !"
```

### Design Principles

**Simplicité :**
- Max 3 clics pour action importante
- Pas de features cachées
- Feedback immédiat (toasts, loaders)

**Mobile-first :**
- Touch targets 44px minimum
- Navigation bottom bar
- Swipe gestures (future)

**Performance :**
- Lazy loading lists (pagination 20 items)
- Images compressées (WebP)
- Cache agressif (Service Worker)

**Accessibilité :**
- Français simple (niveau B1)
- Contraste élevé
- Text-to-speech compatible

---

## 📊 Métriques de Succès

### MVP (3 premiers mois)

**Adoption :**
- ✅ 150+ étudiants L2 Info inscrits (>50% promo)
- ✅ 40+ étudiants actifs/semaine
- ✅ 3-5 ambassadeurs engagés

**Engagement :**
- ✅ 200+ posts créés
- ✅ 500+ réponses
- ✅ 100+ documents partagés
- ✅ 1000+ téléchargements documents

**Qualité :**
- ✅ 70%+ documents vérifiés
- ✅ 80%+ questions avec réponse acceptée
- ✅ Satisfaction utilisateurs >4/5

**Rétention :**
- ✅ 60%+ utilisateurs actifs chaque mois
- ✅ 3+ sessions/semaine par utilisateur

### Phase 2 (6-12 mois)

**Scale :**
- 🎯 3-5 universités sénégalaises
- 🎯 2000+ étudiants total
- 🎯 5000+ documents

**Impact :**
- 🎯 Temps économisé : 2h/semaine/étudiant
- 🎯 Taux de réussite examens +15%
- 🎯 Satisfaction >4.5/5

---

## 💰 Modèle Économique (Long Terme)

### Phase 1-2 : Gratuit Total
**Focus :** Adoption + Impact social  
**Financement :** Bootstrapped / Grants éducation

### Phase 3 : Premium Optionnel (Future)
```
Gratuit (Always) :
✅ Accès toutes matières
✅ Posts/Discussions illimités
✅ Upload documents
✅ Téléchargement documents

Premium (5000 FCFA/mois = ~8€) :
⭐ Résumés de cours IA-générés
⭐ Mentorat 1-on-1 avec étudiants M1/M2
⭐ Préparation examens personnalisée
⭐ Stats détaillées progression
⭐ Badge Premium visible
⭐ Accès anticipé nouvelles features
```

### Phase 4 : B2B Partenariats
```
Librairies universitaires :
- Affichage offres fournitures
- Commission sur ventes

Centres de formation :
- Publicité ciblée formations
- Partenariats certifications

Entreprises :
- Offres de stages
- Recrutement juniors
- Sponsoring événements
```

**Objectif :** Rester accessible tout en devenant durable.

---

## 🛣️ Roadmap Technique

### Milestone 1 : MVP Backend (Semaines 1-10)
- [x] Setup infrastructure
- [x] Entities + DB schema
- [ ] Auth JWT complète
- [ ] API Posts & Discussions
- [ ] Upload documents Cloudinary
- [ ] Gamification basique
- [ ] Notifications email

### Milestone 2 : Frontend MVP (Semaines 11-14)
- [ ] Next.js setup + auth
- [ ] Pages : Login, Dashboard, Subjects
- [ ] Interface discussions
- [ ] Upload/Browse documents
- [ ] Profil utilisateur + leaderboard

### Milestone 3 : Beta Testing (Semaines 15-16)
- [ ] Déploiement staging
- [ ] Tests 20 étudiants L2 Info
- [ ] Corrections bugs critiques
- [ ] Optimisations performance

### Milestone 4 : Launch UCAD (Semaine 17)
- [ ] Déploiement production
- [ ] Campagne WhatsApp + affiches
- [ ] Support Campus Lead + ambassadeurs
- [ ] Monitoring erreurs/performance

### Milestone 5 : Itération & Growth (Mois 2-6)
- [ ] Features demandées (mobile app?)
- [ ] Extension L1/L3 Informatique
- [ ] Extension autres filières FST
- [ ] Préparation multi-universités

---

## 🔧 Décisions Techniques Importantes

### 1. Pourquoi JWT et pas Sessions ?
**Problème :** Sessions nécessitent sticky sessions ou Redis distribué  
**Solution :** JWT stateless → Scale horizontal facile  
**Trade-off :** Révocation complexe (solution : refresh token rotation)

### 2. Pourquoi Soft Deletes ?
**Problème :** Supprimer data = perte audit trail  
**Solution :** `isDeleted` flag → restore possible, analytics préservées  
**Trade-off :** Queries doivent toujours filter `isDeleted = false`

### 3. Pourquoi JSONB pour Permissions ?
**Problème :** Structure permissions peut évoluer (nouveaux rôles)  
**Solution :** JSONB flexible → pas de migration DB à chaque changement  
**Trade-off :** Validation côté application obligatoire

### 4. Pourquoi Cloudinary et pas S3 direct ?
**Problème MVP :** S3 requiert setup complexe (buckets, IAM, CloudFront)  
**Solution :** Cloudinary free tier (25GB) + compression auto  
**Migration future :** S3 quand > 500 users pour réduire coûts

### 5. Pourquoi PostgreSQL Arrays pour levels ?
**Problème :** Program peut avoir 3-5 niveaux (variable)  
**Solution :** Array PostgreSQL `TEXT[]` → query simple, pas de join  
**Alternative rejetée :** Table `program_levels` (over-engineering MVP)

### 6. Pourquoi Dénormalisation Stats ?
**Problème :** Count(*) sur replies/votes = slow à grande échelle  
**Solution :** Colonnes `repliesCount`, `upvotesCount` dans Post  
**Maintenance :** Triggers DB ou Event listeners Spring

---

## 🚨 Contraintes & Challenges

### Techniques
- **Bande passante limitée** → Compression, lazy loading, CDN
- **Devices variés** → Responsive design, testing Android low-end
- **Coupures réseau** → Offline mode partiel (Service Worker cache)

### Business
- **Adoption initiale** → Chicken-egg (besoin contenu pour attirer users)
  - Solution : Seed 50+ documents manuellement avant launch
- **Modération qualité** → Éviter spam/contenus inappropriés
  - Solution : Ambassadeurs + rate limiting + reports
- **Competition WhatsApp** → Habitudes ancrées
  - Solution : Proposition valeur claire (recherche documents)

### Légal
- **RGPD** → Stockage données personnelles
  - Solution : Privacy policy, consent, export/delete data
- **Propriété intellectuelle** → Documents cours/examens
  - Solution : Disclaimer, responsabilité uploadeur

---

## 📖 Glossaire

**UCAD** : Université Cheikh Anta Diop (Dakar, Sénégal)  
**FST** : Faculté des Sciences et Techniques  
**L1/L2/L3** : Licence année 1/2/3 (Bachelor)  
**M1/M2** : Master année 1/2  
**Campus Lead** : Étudiant coordinateur plateforme pour son université  
**Ambassadeur** : Étudiant senior modérateur de matières  
**Matière** : Cours/Subject universitaire (ex: Algorithmique)  
**Sujet d'examen** : Énoncé examen passé (ressource précieuse)  
**FCFA** : Franc CFA (monnaie Afrique de l'Ouest, 1€ ≈ 655 FCFA)

---

## 🎯 Pourquoi ce Projet Compte

### Impact Social
**Démocratisation éducation :**
- Accès égal ressources pédagogiques (riches/pauvres)
- Valorisation mérite via gamification
- Communauté entraide au lieu de compétition

**Employabilité :**
- Compétences collaboration (profil GitHub étudiant)
- Réputation visible (badges, points)
- Networking inter-universités

### Impact Personnel (Développeur)
**Apprentissage :**
- Spring Boot production-grade
- Architecture scalable
- Patterns entreprise (DDD, CQRS potentiel)

**Portfolio :**
- Vrai produit, vrais utilisateurs
- Metrics mesurables (X étudiants, Y documents)
- Open-source potential (visibilité)

**Sens :**
- Aider communauté étudiante
- Résoudre problème réel vécu personnellement
- Fierté voir impact quotidien

---

## 📞 Contacts & Ressources

**Développeur Principal :** [Ton nom]  
**Campus Lead UCAD :** [À recruter]  
**Ambassadeurs :** [À recruter - 3 étudiants L3 Info]

**Ressources Externes :**
- Spring Boot Docs : https://spring.io/projects/spring-boot
- PostgreSQL Docs : https://www.postgresql.org/docs/
- Cloudinary Docs : https://cloudinary.com/documentation
- Baeldung (Spring tutorials) : https://www.baeldung.com/

**Repos :**
- Backend : [github.com/username/yatalko-backend]
- Frontend : [github.com/username/yatalko-frontend]
- Docs : [github.com/username/yatalko-docs]

---

## 🙏 Remerciements

Ce projet existe grâce à :
- **Étudiants UCAD** qui ont partagé leurs frustrations quotidiennes
- **Communauté Spring Boot** pour documentation exceptionnelle
- **Anthropic Claude** pour assistance développement
- **Famille et amis** pour support moral

---

**Version :** 1.0  
**Dernière mise à jour :** Février 2025  
**Statut :** En développement (MVP Backend)

---

## 📝 Notes pour Claude Code

**Quand tu travailles sur ce projet, rappelle-toi :**

1. **Chaque ligne de code sert un étudiant réel** qui lutte pour réussir
2. **Performance compte** → Connexions 3G, data limitée
3. **Simplicité > Features** → MVP d'abord, polish après
4. **Qualité > Quantité** → Documents vérifiés > masse non vérifiée
5. **Communauté > Individu** → Encourager partage, pas thésaurisation

**Priorités décisions techniques :**
1. 🎯 **Impact utilisateur** (résout-il le problème ?)
2. ⚡ **Performance** (3G-friendly ?)
3. 🛡️ **Sécurité** (data étudiants protégée ?)
4. 📈 **Scalabilité** (tiendra avec 10K users ?)
5. 🧪 **Maintenabilité** (code clair, testé ?)

**En cas de doute sur une implémentation, demande-toi :**
> "Est-ce que ça aide vraiment l'étudiant à réussir son exam ?"

Si oui → Go.  
Si non → YAGNI (You Aren't Gonna Need It).

---

**Bon code ! 🚀**

# 🎨 Identité Visuelle - Yatalko

## 🎯 Positionnement Brand

**Yatalko n'est PAS :**
- ❌ Une plateforme "study abroad" internationale
- ❌ Un LMS (Learning Management System)
- ❌ Un réseau social généraliste

**Yatalko EST :**
- ✅ La **communauté digitale** des étudiants universitaires africains
- ✅ L'**espace d'entraide** académique structuré
- ✅ Le **hub de ressources** pédagogiques fiables
- ✅ La **plateforme gamifiée** qui valorise le partage

**Tone of Voice :**
- 🎓 **Académique** mais **accessible** (pas pompeux)
- 🤝 **Communautaire** et **encourageant**
- 🚀 **Motivant** sans être agressif
- 🇸🇳 **Localement ancré** (références culturelles sénégalaises)

---

## 🎨 Palette de Couleurs

### Couleur Primaire : Vert Académique

**Pourquoi le vert ?**
- 🌱 Croissance, apprentissage, évolution
- 📗 Couleur associée aux livres scolaires en Afrique
- 🇸🇳 Présent dans drapeau sénégalais (optimisme)
- 🌍 Fraîcheur, jeunesse, modernité

**Vert Principal :**
```css
--primary-500: #10B981;  /* Emerald-500 Tailwind */
--primary-600: #059669;  /* Hover states */
--primary-700: #047857;  /* Active states */
--primary-400: #34D399;  /* Light accents */
--primary-50:  #ECFDF5;  /* Backgrounds */
```

### Couleurs Secondaires

**Jaune Soleil (Accents)**
```css
--accent-500: #F59E0B;   /* Amber-500 - Soleil africain */
--accent-600: #D97706;   /* Hover */
```
Usage : Badges, notifications, succès

**Bleu Confiance (Support)**
```css
--blue-500: #3B82F6;     /* Blue-500 - Liens, info */
--blue-600: #2563EB;
```
Usage : Liens, boutons secondaires

### Couleurs Neutres

**Gris Moderne**
```css
--gray-900: #111827;     /* Texte principal */
--gray-700: #374151;     /* Texte secondaire */
--gray-500: #6B7280;     /* Texte disabled */
--gray-300: #D1D5DB;     /* Borders */
--gray-100: #F3F4F6;     /* Backgrounds */
--gray-50:  #F9FAFB;     /* Surfaces */
```

### Couleurs Système

**Success / Error / Warning**
```css
--success: #10B981;      /* Vert primaire */
--error:   #EF4444;      /* Red-500 */
--warning: #F59E0B;      /* Jaune accent */
--info:    #3B82F6;      /* Bleu */
```

### Gradient Hero

```css
background: linear-gradient(135deg, #10B981 0%, #059669 100%);
```

---

## 📝 Typographie

### Choix Fonts

**Headings (Titres) :**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 700; /* Bold */
```
- Clean, moderne, excellent lisibilité
- Gratuit, Google Fonts

**Body (Corps de texte) :**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 400; /* Regular */
```
- Même famille pour cohérence
- Variations weights : 400, 500, 600, 700

**Monospace (Code) :**
```css
font-family: 'Fira Code', 'Courier New', monospace;
```
- Pour extraits code dans posts

### Scale Typographique

```css
/* Headings */
--text-5xl: 3rem;      /* 48px - Hero title */
--text-4xl: 2.25rem;   /* 36px - Page title */
--text-3xl: 1.875rem;  /* 30px - Section title */
--text-2xl: 1.5rem;    /* 24px - Card title */
--text-xl:  1.25rem;   /* 20px - Subtitle */
--text-lg:  1.125rem;  /* 18px - Large body */

/* Body */
--text-base: 1rem;     /* 16px - Default */
--text-sm:   0.875rem; /* 14px - Small */
--text-xs:   0.75rem;  /* 12px - Captions */
```

### Line Heights

```css
--leading-tight:  1.25;  /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Long paragraphs */
```

---

## 🧱 Composants UI (Design System)

### Boutons

**Primary Button**
```jsx
<button className="
  bg-primary-500 
  hover:bg-primary-600 
  text-white 
  font-semibold 
  px-6 py-3 
  rounded-lg 
  transition-colors
  shadow-sm
">
  Rejoindre Yatalko
</button>
```

**Secondary Button**
```jsx
<button className="
  bg-white 
  border-2 border-primary-500 
  text-primary-600 
  hover:bg-primary-50
  font-semibold 
  px-6 py-3 
  rounded-lg
">
  En savoir plus
</button>
```

**Ghost Button**
```jsx
<button className="
  text-primary-600 
  hover:bg-primary-50 
  font-medium 
  px-4 py-2 
  rounded-lg
">
  Voir tout
</button>
```

### Cards

**Card Matière**
```jsx
<div className="
  bg-white 
  border border-gray-200 
  rounded-xl 
  p-6 
  hover:shadow-lg 
  transition-shadow
  cursor-pointer
">
  <h3 className="text-xl font-bold text-gray-900">
    Algorithmique
  </h3>
  <p className="text-sm text-gray-600 mt-2">
    L2 • Semestre 3 • 6 crédits
  </p>
  <div className="flex gap-4 mt-4 text-sm text-gray-500">
    <span>📚 45 documents</span>
    <span>💬 128 discussions</span>
  </div>
</div>
```

**Card Post**
```jsx
<div className="
  bg-white 
  border-l-4 border-primary-500 
  rounded-lg 
  p-4 
  shadow-sm
">
  <div className="flex items-center gap-2 mb-2">
    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
      Question
    </span>
    <span className="text-xs text-gray-500">Il y a 2h</span>
  </div>
  <h4 className="font-semibold text-gray-900">
    Comment implémenter un arbre AVL ?
  </h4>
  <p className="text-sm text-gray-600 mt-2">
    Je ne comprends pas la rotation...
  </p>
  <div className="flex gap-4 mt-3 text-sm text-gray-500">
    <span>👍 12</span>
    <span>💬 5 réponses</span>
  </div>
</div>
```

### Badges

**Badge Points**
```jsx
<span className="
  inline-flex items-center 
  px-3 py-1 
  bg-accent-100 
  text-accent-700 
  text-sm font-semibold 
  rounded-full
">
  🏆 450 points
</span>
```

**Badge Rôle**
```jsx
<span className="
  inline-flex items-center 
  px-2 py-0.5 
  bg-primary-100 
  text-primary-700 
  text-xs font-medium 
  rounded
">
  Ambassadeur
</span>
```

### Navigation

**Desktop Header**
```jsx
<nav className="
  bg-white 
  border-b border-gray-200 
  sticky top-0 
  z-50 
  shadow-sm
">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo + Nav + Actions */}
    </div>
  </div>
</nav>
```

**Mobile Bottom Navigation**
```jsx
<nav className="
  fixed bottom-0 left-0 right-0 
  bg-white 
  border-t border-gray-200 
  pb-safe
  md:hidden
">
  <div className="flex justify-around items-center h-16">
    {/* Icons: Home, Subjects, Upload, Notifications, Profile */}
  </div>
</nav>
```

---

## 🖼️ Iconographie

### Icon Library : **Lucide React**

```bash
npm install lucide-react
```

**Icons Yatalko :**
```jsx
import { 
  Home,           // Dashboard
  BookOpen,       // Matières
  MessageSquare,  // Discussions
  FileText,       // Documents
  Upload,         // Upload
  Award,          // Gamification
  Bell,           // Notifications
  User,           // Profil
  Search,         // Recherche
  TrendingUp,     // Leaderboard
  Check,          // Vérifié
  Pin,            // Épinglé
} from 'lucide-react';
```

### Taille Icons

```jsx
// Small (inline text)
<BookOpen size={16} />

// Medium (buttons, cards)
<FileText size={20} />

// Large (feature blocks)
<Award size={32} />

// Extra Large (empty states)
<Upload size={64} />
```

---

## 📐 Spacing & Layout

### Container Widths

```css
--container-sm:  640px;  /* Mobile landscape */
--container-md:  768px;  /* Tablet */
--container-lg:  1024px; /* Desktop */
--container-xl:  1280px; /* Large desktop */
--container-2xl: 1536px; /* Extra large */
```

### Spacing Scale (Tailwind)

```css
/* Gap entre éléments */
gap-2  /* 8px  - Tight */
gap-4  /* 16px - Normal */
gap-6  /* 24px - Comfortable */
gap-8  /* 32px - Spacious */

/* Padding sections */
py-12  /* 48px - Section mobile */
py-16  /* 64px - Section desktop */
py-24  /* 96px - Hero sections */
```

### Border Radius

```css
rounded-sm   /* 2px  - Subtle */
rounded      /* 4px  - Default */
rounded-lg   /* 8px  - Cards */
rounded-xl   /* 12px - Featured cards */
rounded-2xl  /* 16px - Modals */
rounded-full /* Pills, avatars */
```

---

## 🌈 Illustrations & Images

### Style Illustrations

**Recommandation : undraw.co ou storyset.com**
- Style : Modern, flat, colorful
- Palette : Adapter aux couleurs Yatalko (vert primaire)
- Usage : Hero sections, empty states, onboarding

**Exemples :**
- Hero landing : Étudiants collaborant avec laptops
- Empty state documents : Personne uploadant fichier
- Empty state discussions : Personnes discutant
- 404 Page : Personne perdue avec map

### Photos Étudiants

**Source : Unsplash / Pexels**
- Mots-clés : "african students", "university campus", "study group"
- Style : Naturel, lumineux, authentique
- Diversité : Représenter vraie diversité étudiante africaine

### Placeholders Avatars

```jsx
// Avatar par défaut (initiales)
<div className="
  w-10 h-10 
  bg-primary-500 
  text-white 
  font-semibold 
  rounded-full 
  flex items-center justify-center
">
  JD
</div>
```

---

## 🎭 États & Feedback

### Loading States

**Skeleton Loader**
```jsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

**Spinner**
```jsx
<div className="
  animate-spin 
  rounded-full 
  h-8 w-8 
  border-b-2 border-primary-500
"></div>
```

### Empty States

```jsx
<div className="text-center py-12">
  <Upload size={64} className="mx-auto text-gray-400 mb-4" />
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    Aucun document pour l'instant
  </h3>
  <p className="text-gray-600 mb-4">
    Soyez le premier à partager un document dans cette matière
  </p>
  <button className="btn-primary">
    Partager un document
  </button>
</div>
```

### Toasts (Notifications)

```jsx
// Success
<div className="
  bg-green-50 
  border border-green-200 
  text-green-800 
  px-4 py-3 
  rounded-lg
">
  ✅ Document uploadé avec succès !
</div>

// Error
<div className="
  bg-red-50 
  border border-red-200 
  text-red-800 
  px-4 py-3 
  rounded-lg
">
  ❌ Erreur lors de l'upload
</div>
```

---

## 📱 Responsive Breakpoints

### Tailwind Breakpoints

```css
/* Mobile first */
sm:  640px   /* Landscape mobile */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Usage

```jsx
// Stack mobile, grid desktop
<div className="
  grid 
  grid-cols-1      /* Mobile: 1 column */
  md:grid-cols-2   /* Tablet: 2 columns */
  lg:grid-cols-3   /* Desktop: 3 columns */
  gap-6
">
  {/* Cards */}
</div>

// Hide on mobile
<div className="hidden lg:block">
  {/* Desktop sidebar */}
</div>

// Show only mobile
<div className="lg:hidden">
  {/* Mobile menu */}
</div>
```

---

## 🎬 Animations & Transitions

### Hover Transitions

```css
transition-colors    /* Couleurs (boutons) */
transition-shadow    /* Ombres (cards) */
transition-transform /* Scale, translate */
transition-all       /* Tout (use sparingly) */
```

### Hover Effects

```jsx
// Card lift
<div className="
  transition-shadow 
  hover:shadow-xl 
  hover:-translate-y-1
">

// Button scale
<button className="
  transition-transform 
  hover:scale-105 
  active:scale-95
">
```

### Page Transitions (Framer Motion)

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Page content */}
</motion.div>
```

---

## 🌍 Adaptations Culturelles

### Langue

**Français prioritaire :**
- Interface 100% en français
- Ton tutoiement ("Rejoins ta communauté")
- Expressions locales ("Yatalko", "Waxoon" = discuter en wolof)

### Références Locales

**Visuals :**
- Campus UCAD reconnaissables
- Étudiants africains (pas stock photos américaines)
- Couleurs drapeaux sénégalais subtiles (vert-jaune-rouge)

**Copy :**
- "Ton espace d'entraide à l'UCAD"
- "Partage tes docs de cours comme si c'était la veille d'exam"
- "Plus de groupes WhatsApp en chaos"

---

## ✅ Checklist Design System

Pour chaque nouveau composant :

- [ ] Utilise palette couleurs Yatalko
- [ ] Typographie scale respectée
- [ ] Spacing cohérent (4, 8, 16, 24px)
- [ ] Responsive mobile-first
- [ ] Hover states définis
- [ ] Loading state prévu
- [ ] Empty state prévu
- [ ] Accessible (contraste, focus states)
- [ ] Icons Lucide React
- [ ] Transitions smooth

---

## 📦 Stack UI Recommandé

```bash
# Core
npm install tailwindcss @tailwindcss/forms @tailwindcss/typography

# Icons
npm install lucide-react

# Components (optionnel - accélère dev)
npm install @headlessui/react  # Modals, Dropdowns unstyled
# ou
npm install @radix-ui/react-*  # Primitives accessibles

# Animations
npm install framer-motion

# Forms
npm install react-hook-form zod @hookform/resolvers
```

---

## 🎨 Figma / Design Files

**Optionnel mais recommandé :**
- Créer Figma avec composants réutilisables
- Exporter design tokens CSS variables
- Collaborer avec designers futurs

**Alternative rapide :**
- Utiliser Tailwind UI components (payant)
- Adapter shadcn/ui (gratuit)

---

**Version :** 1.0  
**Dernière mise à jour :** Février 2025  
**Statut :** Brand Identity Yatalko définie

---

## 📝 Notes pour Claude Code

Quand tu crées des composants frontend, rappelle-toi :

1. **Mobile-first TOUJOURS** (80% users sur mobile)
2. **Performance** : Lazy load images, code splitting
3. **Accessibilité** : aria-labels, keyboard navigation
4. **Cohérence** : Utilise design tokens, pas de valeurs hardcodées
5. **Simplicité** : Composants réutilisables, pas de sur-engineering

**Priorité UI :**
1. 🎯 Fonctionnalité (marche ?)
2. 📱 Mobile UX (utilisable au doigt ?)
3. 🎨 Esthétique (plaisant ?)
4. ✨ Animations (polish)

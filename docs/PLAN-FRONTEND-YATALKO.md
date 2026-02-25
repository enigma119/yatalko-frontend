# 🎨 Plan Frontend Condensé - Yatalko Next.js
## Format optimisé Claude Code

**Total : 48 tickets sur 6 phases**  
**Durée : 6-8 semaines**

---

## 🏗️ Architecture Frontend

```
yatalko-frontend/
├── app/
│   ├── (public)/          # Routes publiques
│   │   ├── page.tsx       # Landing page
│   │   ├── about/
│   │   └── contact/
│   ├── (auth)/            # Auth pages
│   │   ├── login/
│   │   ├── register/
│   │   └── verify-email/
│   ├── (app)/             # App authentifiée
│   │   ├── dashboard/
│   │   ├── subjects/
│   │   ├── posts/
│   │   ├── documents/
│   │   ├── profile/
│   │   └── leaderboard/
│   └── layout.tsx
├── components/
│   ├── ui/                # Composants base (Button, Card...)
│   ├── features/          # Composants métier (PostCard, DocumentCard...)
│   └── layouts/           # Layouts (Header, Footer, Sidebar...)
├── lib/
│   ├── api.ts             # Axios client + interceptors
│   ├── auth.ts            # JWT handling
│   ├── utils.ts           # Helpers
│   └── constants.ts       # Config
├── hooks/                 # Custom hooks
├── stores/                # Zustand stores
├── types/                 # TypeScript types
└── public/
    ├── images/
    └── icons/
```

---

## PHASE 0 : Setup & Configuration (5 tickets - 1 jour)

### ✅ T0.1 : Init Next.js Project
**Tâches :**
- `npx create-next-app@latest yatalko-frontend`
- TypeScript, App Router, Tailwind CSS, ESLint
- Configurer tailwind.config.ts avec couleurs Yatalko
- Supprimer boilerplate default

**Config Tailwind :**
```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        accent: {
          500: '#F59E0B',
          600: '#D97706',
        }
      }
    }
  }
}
```

**Test :** `npm run dev` démarre sur http://localhost:3000

---

### ✅ T0.2 : Install Dependencies
**Tâches :**
```bash
# Core
npm install axios @tanstack/react-query zustand

# UI
npm install lucide-react clsx tailwind-merge

# Forms
npm install react-hook-form zod @hookform/resolvers

# Animations
npm install framer-motion

# Utils
npm install date-fns js-cookie
```

**Test :** Pas d'erreur compilation

---

### ✅ T0.3 : API Client Setup
**Tâches :**
- Créer `lib/api.ts` avec Axios instance
- Base URL depuis env (`NEXT_PUBLIC_API_URL`)
- Interceptors pour JWT
- Error handling global

**Code minimal :**
```typescript
// lib/api.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh token logic
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Test :** Import fonctionne

---

### ✅ T0.4 : Auth Store (Zustand)
**Tâches :**
- Créer `stores/authStore.ts`
- State : user, isAuthenticated, login, logout, setUser
- Persist token in cookies

**Code minimal :**
```typescript
// stores/authStore.ts
import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  points: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (tokens: any, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (tokens, user) => {
    Cookies.set('accessToken', tokens.accessToken);
    Cookies.set('refreshToken', tokens.refreshToken);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    set({ user: null, isAuthenticated: false });
  },
  setUser: (user) => set({ user }),
}));
```

**Test :** Store utilisable

---

### ✅ T0.5 : UI Components Base (shadcn-style)
**Tâches :**
- Créer `components/ui/Button.tsx`
- Créer `components/ui/Input.tsx`
- Créer `components/ui/Card.tsx`
- Variants avec Tailwind

**Button exemple :**
```tsx
// components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'px-6 py-3 rounded-lg font-semibold transition-colors',
          {
            'bg-primary-500 hover:bg-primary-600 text-white': variant === 'primary',
            'bg-white border-2 border-primary-500 text-primary-600': variant === 'secondary',
            'text-primary-600 hover:bg-primary-50': variant === 'ghost',
          },
          className
        )}
        {...props}
      />
    );
  }
);

export default Button;
```

**Test :** Boutons s'affichent

---

## PHASE 1 : Landing Page (10 tickets - 4 jours)

### ✅ T1.1 : Header Navigation
**Tâches :**
- Créer `components/layouts/Header.tsx`
- Logo Yatalko (SVG ou image)
- Navigation : Accueil, Fonctionnalités, À propos
- Boutons : Connexion, Inscription
- Mobile menu (burger)

**Structure :**
```tsx
<header className="sticky top-0 bg-white border-b z-50">
  <nav className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
    <Logo />
    <NavLinks className="hidden md:flex" />
    <div className="hidden md:flex gap-4">
      <Button variant="ghost">Connexion</Button>
      <Button variant="primary">Inscription</Button>
    </div>
    <MobileMenuButton className="md:hidden" />
  </nav>
</header>
```

**Test :** Header responsive

---

### ✅ T1.2 : Hero Section
**Tâches :**
- Section hero avec gradient background
- Titre accrocheur + description
- CTA buttons (Inscription, En savoir plus)
- Image/Illustration étudiants (côté droit)

**Structure :**
```tsx
<section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
  <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12">
    <div>
      <h1 className="text-5xl font-bold mb-6">
        Ton espace d'entraide académique à l'UCAD
      </h1>
      <p className="text-xl mb-8">
        Trouve des anciens sujets, pose tes questions, partage tes documents.
        Rejoins la communauté étudiante Yatalko.
      </p>
      <div className="flex gap-4">
        <Button>Rejoindre gratuitement</Button>
        <Button variant="secondary">Découvrir</Button>
      </div>
    </div>
    <div>
      <img src="/hero-illustration.svg" alt="Students" />
    </div>
  </div>
</section>
```

**Test :** Hero responsive et attrayant

---

### ✅ T1.3 : Stats Section
**Tâches :**
- 3-4 statistiques clés
- Nombres animés (compteur)
- Icons

**Structure :**
```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
    <StatCard icon={<Users />} number="500+" label="Étudiants actifs" />
    <StatCard icon={<FileText />} number="1,200+" label="Documents partagés" />
    <StatCard icon={<MessageSquare />} number="3,000+" label="Questions résolues" />
    <StatCard icon={<Award />} number="15K+" label="Points attribués" />
  </div>
</section>
```

**Test :** Stats affichées

---

### ✅ T1.4 : Features Section
**Tâches :**
- Grid 3 colonnes (mobile: 1 col)
- 6 features clés Yatalko
- Icon + Titre + Description

**Features :**
1. 📚 Bibliothèque de documents
2. 💬 Discussions par matière
3. 🎯 Questions/Réponses
4. 🏆 Gamification
5. ✅ Documents vérifiés
6. 📱 Mobile-first

**Structure :**
```tsx
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      Tout ce dont tu as besoin pour réussir
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard 
        icon={<BookOpen />}
        title="Bibliothèque complète"
        description="Anciens sujets, cours, exercices..."
      />
      {/* ... autres features */}
    </div>
  </div>
</section>
```

**Test :** Features grid responsive

---

### ✅ T1.5 : How It Works Section
**Tâches :**
- 4 steps processus
- Numérotés (1, 2, 3, 4)
- Icons + Description

**Steps :**
1. Inscris-toi gratuitement
2. Rejoins tes matières
3. Pose des questions / Partage des docs
4. Gagne des points et badges

**Structure :**
```tsx
<section className="py-16 bg-primary-50">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      Comment ça marche ?
    </h2>
    <div className="grid md:grid-cols-4 gap-8">
      <StepCard number={1} title="Inscris-toi" description="..." />
      <StepCard number={2} title="Rejoins tes matières" description="..." />
      <StepCard number={3} title="Participe" description="..." />
      <StepCard number={4} title="Gagne des badges" description="..." />
    </div>
  </div>
</section>
```

**Test :** Steps clairs

---

### ✅ T1.6 : Universities Section
**Tâches :**
- Section "Universités partenaires"
- Logos universités (UCAD pour l'instant)
- Grid logos avec hover effect

**Test :** Logos affichés

---

### ✅ T1.7 : Popular Subjects Preview
**Tâches :**
- Carrousel matières populaires
- Cards matières avec stats
- Link "Voir toutes les matières"

**Structure :**
```tsx
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold mb-12">Matières populaires</h2>
    <div className="grid md:grid-cols-3 gap-6">
      <SubjectCard 
        name="Algorithmique"
        level="L2"
        posts={128}
        documents={45}
      />
      {/* ... autres matières */}
    </div>
  </div>
</section>
```

**Test :** Cards matières affichées

---

### ✅ T1.8 : Testimonials Section
**Tâches :**
- 3 témoignages étudiants
- Cards avec photo, nom, citation
- Optionnel : Carousel

**Structure :**
```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      Ce que disent les étudiants
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <TestimonialCard 
        avatar="/avatars/1.jpg"
        name="Fatou Sarr"
        role="L3 Informatique"
        quote="Yatalko m'a sauvé la vie pendant les révisions..."
      />
      {/* ... autres témoignages */}
    </div>
  </div>
</section>
```

**Test :** Témoignages affichés

---

### ✅ T1.9 : CTA Final Section
**Tâches :**
- Section CTA avant footer
- Gradient background
- Titre + Description + Bouton

**Structure :**
```tsx
<section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
  <div className="max-w-4xl mx-auto text-center px-4">
    <h2 className="text-4xl font-bold mb-6">
      Prêt à rejoindre la communauté ?
    </h2>
    <p className="text-xl mb-8">
      Inscription gratuite. Aucune carte bancaire requise.
    </p>
    <Button size="lg" className="bg-white text-primary-600">
      Créer mon compte gratuitement
    </Button>
  </div>
</section>
```

**Test :** CTA visible et clair

---

### ✅ T1.10 : Footer
**Tâches :**
- 3-4 colonnes (À propos, Liens, Contact, Social)
- Logo Yatalko
- Copyright
- Links : CGU, Confidentialité, Contact

**Structure :**
```tsx
<footer className="bg-gray-900 text-white py-12">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
    <div>
      <Logo white />
      <p className="text-gray-400 mt-4">
        La plateforme d'entraide des étudiants africains
      </p>
    </div>
    <FooterColumn title="Produit" links={['Fonctionnalités', 'Prix']} />
    <FooterColumn title="Ressources" links={['Blog', 'Aide']} />
    <FooterColumn title="Légal" links={['CGU', 'Confidentialité']} />
  </div>
  <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
    © 2025 Yatalko. Tous droits réservés.
  </div>
</footer>
```

**Test :** Footer complet

---

## PHASE 2 : Authentication (6 tickets - 2 jours)

### ✅ T2.1 : Login Page
**Tâches :**
- Page `/login`
- Form : Email + Password
- Submit appelle API `/auth/login`
- Stocke tokens + redirect dashboard
- Link "Mot de passe oublié"

**Structure :**
```tsx
// app/(auth)/login/page.tsx
<div className="min-h-screen flex items-center justify-center bg-gray-50">
  <Card className="w-full max-w-md p-8">
    <h1 className="text-2xl font-bold mb-6">Connexion</h1>
    <form onSubmit={handleLogin}>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Mot de passe" />
      <Button type="submit" className="w-full">Se connecter</Button>
    </form>
    <Link href="/register">Pas encore de compte ? S'inscrire</Link>
  </Card>
</div>
```

**Test :** Login fonctionne, redirect dashboard

---

### ✅ T2.2 : Register Page
**Tâches :**
- Page `/register`
- Form : Email, Password, FirstName, LastName, University, Program, Level
- Validation avec react-hook-form + zod
- Submit appelle API `/auth/register`
- Redirect `/verify-email`

**Validation schema :**
```typescript
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  universityId: z.number(),
  programId: z.number(),
  level: z.enum(['L1', 'L2', 'L3', 'M1', 'M2']),
});
```

**Test :** Register fonctionne

---

### ✅ T2.3 : Email Verification Page
**Tâches :**
- Page `/verify-email`
- Message : "Vérifiez votre email"
- Link pour renvoyer email
- Auto-redirect si déjà vérifié

**Test :** Page affichée après register

---

### ✅ T2.4 : Protected Route HOC
**Tâches :**
- Créer middleware auth
- Vérifier token existe
- Si non connecté → redirect /login
- Si connecté → allow access

**Code :**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  
  if (!token && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/app/:path*',
};
```

**Test :** Routes `/app/*` protégées

---

### ✅ T2.5 : User Profile Provider
**Tâches :**
- React Context pour user
- Fetch user profile au mount
- Refresh si token valide

**Test :** User data accessible globalement

---

### ✅ T2.6 : Logout Function
**Tâches :**
- Bouton logout dans header
- Clear cookies
- Clear zustand state
- Redirect login

**Test :** Logout fonctionne

---

## PHASE 3 : Dashboard & Navigation (8 tickets - 3 jours)

### ✅ T3.1 : App Layout
**Tâches :**
- Créer `app/(app)/layout.tsx`
- Header authentifié (Logo, Search, Notifications, Avatar)
- Sidebar desktop (Navigation)
- Bottom nav mobile

**Structure :**
```tsx
<div className="min-h-screen flex">
  <Sidebar className="hidden lg:block" />
  <div className="flex-1">
    <AppHeader />
    <main className="p-6">
      {children}
    </main>
  </div>
  <BottomNav className="lg:hidden" />
</div>
```

**Test :** Layout responsive

---

### ✅ T3.2 : Dashboard Page
**Tâches :**
- Page `/app/dashboard`
- Welcome message avec prénom user
- Stats personnelles (points, badges, posts)
- Matières rejointes (cards)
- Activité récente

**Structure :**
```tsx
<div>
  <h1>Bonjour {user.firstName} 👋</h1>
  <StatsGrid points={user.points} badges={user.badges.length} />
  <MySubjects />
  <RecentActivity />
</div>
```

**Test :** Dashboard affiche data

---

### ✅ T3.3 : Subjects List Page
**Tâches :**
- Page `/app/subjects`
- Filtres : University, Program, Level, Search
- Grid matières avec stats
- Bouton "Rejoindre" si pas membre

**Test :** Liste matières filtrables

---

### ✅ T3.4 : Subject Detail Page
**Tâches :**
- Page `/app/subjects/[id]`
- Header matière (nom, code, crédits)
- Tabs : Discussions, Documents, Membres
- Stats matière

**Test :** Detail matière avec tabs

---

### ✅ T3.5 : Join/Leave Subject
**Tâches :**
- Bouton "Rejoindre" dans subject detail
- API call POST `/subjects/{id}/join`
- Update UI optimistically
- Bouton "Quitter" si déjà membre

**Test :** Join/leave fonctionne

---

### ✅ T3.6 : Search Global
**Tâches :**
- Input search dans header
- Search posts, documents, subjects
- Debounce 300ms
- Dropdown résultats

**Test :** Search fonctionne

---

### ✅ T3.7 : Notifications Dropdown
**Tâches :**
- Icon bell avec badge count
- Dropdown liste notifications
- Marquer lu au click
- Link vers post/document concerné

**Test :** Notifications affichées

---

### ✅ T3.8 : User Profile Dropdown
**Tâches :**
- Avatar menu dropdown
- Links : Profil, Paramètres, Logout
- Points + Badges affichés

**Test :** Dropdown menu fonctionne

---

## PHASE 4 : Posts & Discussions (10 tickets - 4 jours)

### ✅ T4.1 : Posts List Component
**Tâches :**
- Composant liste posts avec pagination
- Filter par type (Question, Announcement, Discussion)
- Sort (recent, popular)
- Infinite scroll ou pagination

**Test :** Posts liste affichée

---

### ✅ T4.2 : Post Card Component
**Tâches :**
- Card post réutilisable
- Avatar auteur, nom, timestamp
- Titre, preview content (truncate)
- Stats (upvotes, replies, views)
- Badges (pinned, resolved)

**Test :** Post card design OK

---

### ✅ T4.3 : Create Post Modal
**Tâches :**
- Modal "Nouvelle question/discussion"
- Form : Title, Content (textarea), Type, Tags
- Rich text editor simple (optionnel)
- Submit API POST `/posts`

**Test :** Créer post fonctionne

---

### ✅ T4.4 : Post Detail Page
**Tâches :**
- Page `/app/posts/[id]`
- Afficher post complet
- Auteur info + timestamp
- Stats + actions (upvote, pin si ambassadeur)
- Liste réponses en dessous

**Test :** Detail post complet

---

### ✅ T4.5 : Reply Component
**Tâches :**
- Card reply
- Avatar, nom auteur, timestamp
- Content
- Upvote button
- "Accepter réponse" si auteur post

**Test :** Replies affichées

---

### ✅ T4.6 : Create Reply Form
**Tâches :**
- Form en bas du post detail
- Textarea content
- Submit API POST `/posts/{id}/replies`
- Append reply optimistically

**Test :** Créer reply fonctionne

---

### ✅ T4.7 : Upvote/Downvote
**Tâches :**
- Boutons upvote/downvote sur posts + replies
- API call POST `/posts/{id}/upvote`
- Toggle (click again = remove)
- Update count optimistically

**Test :** Upvote fonctionne

---

### ✅ T4.8 : Accept Reply
**Tâches :**
- Bouton "Accepter" sur replies (si auteur post)
- API POST `/replies/{id}/accept`
- Badge "Accepted" sur reply
- Update post status "Resolved"

**Test :** Accept reply fonctionne

---

### ✅ T4.9 : Pin Post (Ambassadeur)
**Tâches :**
- Bouton "Épingler" si user = ambassadeur
- API POST `/posts/{id}/pin`
- Badge "Épinglé" sur post
- Posts épinglés en haut liste

**Test :** Pin fonctionne (ambassadeur only)

---

### ✅ T4.10 : Delete Post/Reply
**Tâches :**
- Bouton delete (3 dots menu) si auteur ou ambassadeur
- Confirmation modal
- API DELETE `/posts/{id}`
- Remove from UI

**Test :** Delete fonctionne

---

## PHASE 5 : Documents (8 tickets - 3 jours)

### ✅ T5.1 : Documents List Component
**Tâches :**
- Liste documents avec filtres
- Filter : Category, Year, Verified
- Sort : Recent, Downloads, Upvotes
- Grid ou liste view toggle

**Test :** Documents liste

---

### ✅ T5.2 : Document Card Component
**Tâches :**
- Card document
- Thumbnail PDF (première page) ou icon
- Titre, description, category
- Stats (downloads, upvotes)
- Badge "Vérifié" si vérifié
- Uploader info

**Test :** Document cards

---

### ✅ T5.3 : Upload Document Modal
**Tâches :**
- Modal upload
- Drag & drop file + browse
- Form : Title, Description, Category, Year, Semester
- Validation taille (10MB student, 50MB ambassador)
- Upload API POST `/documents/upload` avec FormData
- Progress bar

**Test :** Upload fonctionne

---

### ✅ T5.4 : Document Detail Modal
**Tâches :**
- Modal preview document
- Iframe PDF viewer ou link download
- Metadata (uploader, date, category, etc.)
- Bouton download
- Upvote button
- Comments section (optionnel)

**Test :** Detail document

---

### ✅ T5.5 : Download Document
**Tâches :**
- Bouton download
- API GET `/documents/{id}/download` (redirect Cloudinary)
- Track download count

**Test :** Download fonctionne

---

### ✅ T5.6 : Verify Document (Ambassadeur)
**Tâches :**
- Bouton "Vérifier" si ambassadeur
- API POST `/documents/{id}/verify`
- Badge "Vérifié" apparaît

**Test :** Verify fonctionne

---

### ✅ T5.7 : Upvote Document
**Tâches :**
- Bouton upvote sur document card + detail
- API POST `/documents/{id}/upvote`
- Update count

**Test :** Upvote doc fonctionne

---

### ✅ T5.8 : Delete Document
**Tâches :**
- Bouton delete si auteur
- Confirmation
- API DELETE `/documents/{id}`

**Test :** Delete doc fonctionne

---

## PHASE 6 : Gamification & Profile (6 tickets - 2 jours)

### ✅ T6.1 : Leaderboard Page
**Tâches :**
- Page `/app/leaderboard`
- Liste top 20 users par points
- Filter par université
- Avatar, nom, points, badges
- Highlight current user

**Test :** Leaderboard affichée

---

### ✅ T6.2 : User Profile Page
**Tâches :**
- Page `/app/profile/[id]`
- Avatar, nom, email (caché si pas soi)
- Stats : Points, badges, contributions
- Liste posts créés
- Liste documents partagés

**Test :** Profil affiche data

---

### ✅ T6.3 : Edit Profile
**Tâches :**
- Page `/app/profile/edit`
- Form : Avatar upload, Bio, Préférences notifications
- API PATCH `/users/me`

**Test :** Edit profile fonctionne

---

### ✅ T6.4 : Badges Display
**Tâches :**
- Composant badge grid
- Icons badges
- Tooltip description
- Badges earned vs locked (grayed out)

**Test :** Badges affichés

---

### ✅ T6.5 : Points History
**Tâches :**
- Page ou section "Historique points"
- Liste actions avec points gagnés
- Timestamp

**Test :** Historique visible

---

### ✅ T6.6 : My Stats Dashboard
**Tâches :**
- Section stats perso sur dashboard
- Graphiques simples (bar chart, line chart)
- Points par semaine
- Contributions par type

**Test :** Stats graphiques

---

## PHASE 7 : Polish & Optimisation (5 tickets - 2 jours)

### ✅ T7.1 : Loading States
**Tâches :**
- Skeletons pour listes (posts, documents, subjects)
- Spinners pour actions (upload, submit)
- Suspense boundaries

**Test :** Loading UX smooth

---

### ✅ T7.2 : Empty States
**Tâches :**
- Empty state documents (illustration + CTA upload)
- Empty state posts (CTA create)
- Empty state notifications
- Empty state search results

**Test :** Empty states clairs

---

### ✅ T7.3 : Error Handling
**Tâches :**
- Error boundaries React
- Toast notifications (success, error)
- Form validation errors
- 404 page custom
- 500 page custom

**Test :** Errors gérées gracefully

---

### ✅ T7.4 : SEO & Meta Tags
**Tâches :**
- Metadata Next.js pour chaque page
- Open Graph tags
- Twitter cards
- Sitemap.xml
- robots.txt

**Test :** SEO tags présents

---

### ✅ T7.5 : Performance Optimization
**Tâches :**
- Image optimization (next/image)
- Code splitting (dynamic imports)
- React Query cache configuration
- Lazy loading components lourds

**Test :** Lighthouse score > 90

---

## 📝 Utilisation avec Claude Code

### Format de demande :

```
Implémente le ticket T3.2 (Dashboard Page) :

Tâches :
- Créer page app/(app)/dashboard/page.tsx
- Welcome message avec user.firstName depuis authStore
- Grid stats personnelles (points, badges count, posts créés)
- Section "Mes Matières" : fetch + afficher cards matières rejointes
- Section "Activité Récente" : derniers 5 posts/replies user

API :
- GET /users/me (déjà dans authStore)
- GET /subjects/my-subjects
- GET /users/me/activity

Critères :
- Responsive grid (1 col mobile, 2-3 cols desktop)
- Loading states (skeleton)
- Error handling si API fail
- Links vers matières et posts
```

### Stack Rappel :

```bash
# Déjà installé Phase 0
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios + React Query
- Zustand
- Lucide React icons
- React Hook Form + Zod
- Framer Motion
```

---

## 🎯 Roadmap Frontend

**Semaine 1 :** Phase 0 + Phase 1 (Landing + Setup)  
**Semaine 2 :** Phase 2 + Phase 3 (Auth + Dashboard)  
**Semaine 3-4 :** Phase 4 (Posts & Discussions)  
**Semaine 5 :** Phase 5 (Documents)  
**Semaine 6 :** Phase 6 + Phase 7 (Gamification + Polish)  

**Total : 6 semaines pour MVP frontend complet**

---

## 🚀 Déploiement Frontend

### Vercel (Recommandé)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**Configuration :**
```json
// vercel.json
{
  "env": {
    "NEXT_PUBLIC_API_URL": "https://yatalko-api.onrender.com"
  }
}
```

---

## ✅ Checklist Validation Frontend

- [ ] Landing page complète et responsive
- [ ] Login/Register fonctionnent
- [ ] Dashboard affiche data user
- [ ] Liste matières avec filtres
- [ ] Créer post + réponses
- [ ] Upload + download documents
- [ ] Upvote posts/documents
- [ ] Leaderboard visible
- [ ] Profil éditable
- [ ] Notifications fonctionnent
- [ ] Mobile UX excellente
- [ ] Loading states partout
- [ ] Error handling graceful
- [ ] Lighthouse score > 85
- [ ] Déployé sur Vercel

---

**Total : 48 tickets**  
**Prêt pour Claude Code ✅**

# Yatalko Frontend

Frontend Next.js 14 pour **Yatalko** - La plateforme d'entraide academique pour les etudiants universitaires au Senegal.

## Stack Technique

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (global) + React Query (server state)
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repo
git clone https://github.com/your-username/yatalko-frontend.git
cd yatalko-frontend

# Installer les dependances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer l'URL de l'API backend
# Editer .env.local et modifier NEXT_PUBLIC_API_URL
```

### Development

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

### Build

```bash
npm run build
npm run start
```

## Structure du Projet

```
src/
├── app/                    # Routes Next.js (App Router)
│   ├── (public)/          # Pages publiques
│   ├── (auth)/            # Pages authentification
│   └── (app)/             # Pages app (protegees)
├── components/
│   ├── ui/                # Composants base (Button, Input, Card)
│   ├── features/          # Composants metier
│   └── layouts/           # Layouts (Header, Footer, Sidebar)
├── lib/
│   ├── api.ts             # Client Axios + interceptors JWT
│   ├── utils.ts           # Helpers
│   └── constants.ts       # Constantes (routes, endpoints)
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
└── types/                 # TypeScript types
```

## Design System

Couleurs Yatalko:
- **Primary** (Vert): #10B981 - Academique, croissance
- **Accent** (Jaune): #F59E0B - Soleil africain
- **Gray**: Echelle neutre pour textes et backgrounds

## Documentation

- `docs/YATALKO-CONTEXTE.md` - Vision et contexte du projet
- `docs/FRONTEND-CONTEXTE.md` - Patterns et conventions frontend
- `docs/IDENTITE-VISUELLE-YATALKO.md` - Design system
- `docs/PLAN-FRONTEND-YATALKO.md` - Plan de developpement

## License

MIT

# Universal Unit Converter

A modern, responsive web application for performing unit conversions — built with React 19, TypeScript, Vite, and Tailwind CSS.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)

## Modules

| Converter | Description |
|-----------|-------------|
| **Height Converter** | Convert between meters, feet, inches, centimeters, and more |
| **Weight Converter** | Convert between kilograms, pounds, ounces, grams, and more |
| **Volume Converter** | Convert between liters, gallons, cups, milliliters, and more |
| **Currency Converter** | Live currency conversion with up-to-date exchange rates |
| **Planet Weight Converter** | Calculate your weight on other planets and celestial bodies |

## Quick Start

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 1. Install Dependencies

```bash
# Navigate to the frontend directory
cd frontend

# Install all required packages
npm install
```

### 2. Run the Development Server

```bash
# Start the Vite dev server (from the frontend directory)
npm run dev
```

This starts the app at **http://localhost:5173** with hot module replacement for instant updates.

### 3. Open in Browser

Open your browser and go to:

```
http://localhost:5173
```

The app loads immediately with the Home page showing all available converters.

## Project Structure

```
universal-converter/
├── frontend/                    # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── components/          # Reusable UI, layout, and common components
│   │   ├── config/              # App configuration & converter registry
│   │   ├── constants/           # App constants & theme tokens
│   │   ├── context/             # React Context providers (Theme, App, Settings)
│   │   ├── converters/          # Converter modules (height, weight, volume, currency, planet-gravity)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── layouts/             # Page layout components
│   │   ├── pages/               # Page components (Home, NotFound, converter pages)
│   │   ├── routes/              # React Router configuration
│   │   ├── services/            # API services & caching
│   │   ├── styles/              # CSS (Tailwind, theme tokens, animations)
│   │   ├── types/               # TypeScript type definitions
│   │   └── utils/               # Utility functions
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/                     # ⏳ Express.js API (coming soon)
├── .gitignore
└── README.md
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on source files |

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type-safe JavaScript |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **React Router DOM 6** | Client-side routing |
| **Framer Motion 11** | Animations & transitions |
| **Lucide React** | Icon library |

> All converters except Currency are computed entirely on the frontend with no API calls.

## Design System

- **Glassmorphism** with frosted glass effects and backdrop blur
- **Dark/Light themes** with persistent user preference
- **Smooth animations** powered by Framer Motion
- **Responsive layout** from mobile to 4K displays
- **Keyboard accessible** with proper focus states

## Adding a New Converter

1. Create a converter module at `frontend/src/converters/<name>/` with subfolders: `components/`, `hooks/`, `services/`, `utils/`, `constants/`, `types/`
2. Export a barrel `index.ts` from the module
3. Register in `frontend/src/config/converterRegistry.ts`
4. Add the route in `frontend/src/routes/routeConfig.tsx`
5. Add the page component in `frontend/src/pages/converters/`

## Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

## License

MIT

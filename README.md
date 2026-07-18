# Portfolio - Krish

A professional, high-performance, and visually engaging developer portfolio built with [Astro](https://astro.build) and [React](https://react.dev). The application leverages [GSAP](https://gsap.com) and [Framer Motion](https://framermotion.framer.com) for fluid, physics-based, and scroll-driven animations.

## 🚀 Tech Stack

- **Framework:** [Astro v7](https://astro.build) (Static Site Generation / Hybrid rendering)
- **UI Library:** [React v19](https://react.dev) (for interactive components)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com) (Utility-first styling)
- **Animations:** [GSAP](https://gsap.com) & [Framer Motion](https://framermotion.framer.com)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Package Manager:** [Bun](https://bun.sh)

## ✨ Features

- **Performance-First:** Pre-rendered HTML using Astro's component architecture, achieving fast page-load speeds.
- **Dynamic Animations:** Scroll-reveals, custom headers/footers, interactive panels, and fluid marquee transitions.
- **Interactive Particle Portrait:** A physics-driven canvas-based interactive particle portrait element.
- **Responsive Layout:** Sleek modern styling adapting gracefully to all screen sizes.
- **Modular Architecture:** Clean segregation of static Astro layouts and dynamic React hydration islands.

## 📂 Project Structure

```text
├── public/                # Static assets (images, icons)
├── src/
│   ├── assets/            # Project-specific assets (global CSS)
│   ├── components/        # Components (Astro & React islands)
│   │   ├── layout/        # Layout components
│   │   ├── sections/      # Home sections (Hero, Work, Contact, etc.)
│   │   └── ui/            # UI components (ParticlePortrait, PhotoMarquee, etc.)
│   ├── layouts/           # Astro page layouts
│   └── pages/             # Astro routing (pages & endpoints)
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind configuration
└── package.json           # Scripts & dependencies
```

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Krish-0p/Portfolio_Krish.git
   cd Portfolio_Krish/Krish_portfolio
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Development

To start the local development server:
```bash
bun run dev
```
The application will run on `http://localhost:4321`.

### Production Build

To build the static site for production:
```bash
bun run build
```
To preview the production build locally:
```bash
bun run preview
```

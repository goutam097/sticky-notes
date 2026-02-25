# 📌 StickyBoard — Next.js Sticky Notes App

A beautiful, feature-rich sticky notes application built with **Next.js 14**, TypeScript, and CSS Modules.

![StickyBoard Preview](https://via.placeholder.com/800x400?text=StickyBoard+App)

## ✨ Features

- 📝 **Create, edit & delete** sticky notes in real-time
- 🎨 **5 color themes** per note: Yellow, Pink, Blue, Green, Purple
- 🌙 **Dark / Light mode** with system preference detection
- 💾 **localStorage persistence** — notes survive page refresh
- 🔍 **Live search** across note titles and content
- 📱 **Responsive layout** — masonry grid that adapts to any screen
- ⚡ **Instant updates** — no save button needed

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/sticky-notes-app.git
cd sticky-notes-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🏗️ Project Structure

```
sticky-notes-app/
├── app/
│   ├── layout.tsx          # Root layout with fonts + metadata
│   ├── page.tsx            # Main page (notes grid)
│   ├── page.module.css     # Page styles
│   └── globals.css         # Global styles + CSS variables (light/dark)
│
├── components/
│   ├── Header.tsx          # App header (search, theme toggle, add button)
│   ├── Header.module.css
│   ├── NoteCard.tsx        # Individual note card (CRUD + color picker)
│   └── NoteCard.module.css
│
├── hooks/
│   ├── useNotes.ts         # Notes CRUD + localStorage persistence
│   └── useTheme.ts         # Dark/Light mode toggle + persistence
│
├── lib/
│   └── types.ts            # TypeScript types
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # GitHub Actions CI/CD pipeline
│
├── vercel.json             # Vercel deployment config
└── README.md
```

---

## 🔄 CI/CD Pipeline

The project uses **GitHub Actions** for CI/CD and deploys automatically to **Vercel**.

### Pipeline Stages

```
Push / PR
    │
    ├─► [Lint & Type Check] ─► ESLint + TypeScript
    │           │
    │           ▼
    ├─► [Build] ─► next build (production bundle)
    │           │
    │     ┌─────┴──────┐
    │     │            │
    ▼     ▼            ▼
   PR   main         develop
    │     │
    ▼     ▼
Preview  Production
(Vercel) (Vercel)
```

### Workflow Triggers
- **Push to `main`** → Full CI + Production deploy
- **Push to `develop`** → Full CI (no deploy)
- **Pull Request to `main`** → Full CI + Preview deploy

---

## 🌐 Deploying to Vercel

### Option A: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/sticky-notes-app)

### Option B: Manual Setup

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login & Link Project**
   ```bash
   vercel login
   vercel link
   ```

3. **Get your IDs** (needed for GitHub Actions)
   ```bash
   cat .vercel/project.json
   # Note: projectId and orgId
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Option C: Automatic via GitHub Actions (Recommended)

Add these secrets to your GitHub repo (**Settings → Secrets → Actions**):

| Secret Name | How to Get |
|-------------|-----------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Run `vercel link`, then check `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | Same file → `projectId` |

Once set, every push to `main` will **automatically deploy to production** 🎉

---

## 🎨 Color System

| Color | Light BG | Accent |
|-------|----------|--------|
| 🌟 Yellow | `#FFF9C4` | `#F9A825` |
| 🌸 Pink | `#FCE4EC` | `#E91E63` |
| 🌊 Blue | `#E3F2FD` | `#1565C0` |
| 🌿 Green | `#E8F5E9` | `#2E7D32` |
| 🔮 Purple | `#F3E5F5` | `#7B1FA2` |

Dark mode automatically adjusts all card backgrounds while preserving accent colors.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Custom Properties
- **Fonts**: Caveat (display) + Inter (body) via Google Fonts
- **Storage**: localStorage (client-side)
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel

---

## 📄 License

MIT
# CareerPilot AI — Autonomous Career Intelligence & ATS Platform

An AI-powered career mentor, neural skill roadmaps, and future job intelligence platform designed for engineers across multiple disciplines (CSE, IT, ECE, EEE, Mechanical, Civil, Automobile).

---

## 🚀 Live Demo & Links

- **Live Production URL**: [https://gollasaisre.github.io/Golla-Saisree/](https://gollasaisre.github.io/Golla-Saisree/)
- **GitHub Repository**: [https://github.com/gollasaisre/Golla-Saisree](https://github.com/gollasaisre/Golla-Saisree)
- **Secondary Repository**: [https://github.com/gollasaisre/smart-career-](https://github.com/gollasaisre/smart-career-)

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.3 (Turbopack) & React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4, Glassmorphism UI
- **Database & ORM**: SQLite (`dev.db`), Prisma ORM 6.19
- **Authentication**: NextAuth.js
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Icons**: Lucide React
- **CI/CD & Hosting**: GitHub Actions & GitHub Pages (Static Export) / Vercel-ready

---

## 📁 Folder Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated CI/CD pipeline for GitHub Pages
├── prisma/
│   ├── schema.prisma          # Database schema (User, Profile, Skill, Career, Jobs, Assessment)
│   ├── seed.ts                # Database seed script with sample data
│   └── prisma.config.ts       # Prisma configuration
├── public/
│   ├── .nojekyll              # Disables Jekyll processing on GitHub Pages
│   └── favicon.ico            # Site favicon
├── src/
│   ├── app/
│   │   ├── agent/page.tsx     # Autonomous AI Career Agent chat
│   │   ├── api/               # Serverless API routes (profile, jobs, recommendations)
│   │   ├── assessment/        # Technical skill assessments and quiz engine
│   │   ├── chat/              # AI Career Mentor interactive chat
│   │   ├── dashboard/         # User career analytics and readiness dashboard
│   │   ├── jobs/              # Curated engineering jobs and internship portal
│   │   ├── prep/              # Placement interview prep and practice modules
│   │   ├── profile/           # User portfolio, skills management, and GitHub sync
│   │   ├── recommendations/   # AI-powered career matching recommendations
│   │   ├── resume/            # ATS split-screen resume builder with live preview
│   │   ├── roadmap/[id]/      # Interactive department career roadmaps
│   │   ├── study/             # Department study guides and curriculum resources
│   │   ├── tracker/           # Job application Kanban tracking board
│   │   ├── layout.tsx         # Root app layout & theme provider
│   │   └── page.tsx           # Modern animated landing page
│   ├── components/
│   │   ├── layout/AppShell.tsx# Main layout wrapper (sidebar & header)
│   │   ├── ui/Header.tsx      # Top bar navigation & GitHub quick-link
│   │   └── ui/Sidebar.tsx     # Collapsible navigation sidebar
│   ├── data/
│   │   └── departmentCourses.ts# Curated study curriculum & course data
│   └── lib/
│       ├── ai.ts              # Gemini AI service integration
│       ├── auth.ts            # NextAuth options & security
│       └── prisma.ts          # Singleton Prisma client instance
├── .env.example               # Template environment configuration
├── next.config.ts             # Dynamic Next.js static export & multi-repo basePath config
├── package.json               # Dependencies and build scripts
└── tailwind.config.js         # Tailwind theme & design tokens
```

---

## 📋 Prerequisites

- **Node.js**: `v20.x` or higher (LTS recommended)
- **Package Manager**: `npm` (v10+), `yarn`, or `pnpm`
- **Git**: Installed and configured on your system

---

## 💻 Installation & Local Development (Windows / macOS / Linux)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gollasaisre/Golla-Saisree.git
   cd Golla-Saisree
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. **Initialize database & generate Prisma client**:
   ```bash
   npx prisma generate
   ```

5. **Start local development server**:
   ```bash
   npm run dev
   ```

6. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Production Build Commands

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 🚀 Deployment

### Option A: GitHub Pages (Automated via GitHub Actions)
Every `git push` to `main` automatically triggers `.github/workflows/deploy.yml`.
Ensure GitHub repository settings have:
- **Settings** -> **Pages** -> **Source**: select **"GitHub Actions"**.

### Option B: Vercel (1-Click Deployment)
1. Navigate to [https://vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import `gollasaisre/Golla-Saisree`.
3. Click **Deploy**. Vercel natively supports all dynamic API routes and SSR features.

---

## 🔧 Troubleshooting

- **Localhost 404 Error**: Ensure `basePath` is empty locally (handled automatically by `next.config.ts`).
- **Styles missing on GitHub Pages**: Ensure `public/.nojekyll` exists so GitHub doesn't ignore `_next` assets.
- **Port 3000 in use**: Run `taskkill /PID <PID> /F` (Windows) or `kill -9 $(lsof -t -i:3000)` (Mac/Linux).

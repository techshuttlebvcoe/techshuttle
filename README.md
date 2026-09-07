# 🚀 Tech Shuttle - Official Website

Welcome to the official repository for the **Tech Shuttle** technical society website. Built with modern web technologies, sleek dark aesthetics, and interactive components.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript
- **Deployment**: [Vercel](https://vercel.com/)

---

## 💻 Getting Started Locally

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### 2. Installation
Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Development Server
Run the development server with hot-reloading:

```bash
npm run dev
```

Open [http://localhost:8443](http://localhost:8443) (or the port specified in terminal) in your browser.

### 4. Production Build
To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

### Option 1: Vercel Dashboard (Recommended)
1. Push your code to your GitHub/GitLab/Bitbucket repository.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import this repository.
4. Vercel will automatically detect the settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

### Option 2: Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. Run deployment:
   ```bash
   vercel
   ```
3. For production deployment:
   ```bash
   vercel --prod
   ```

---

## 📂 Project Structure

```
├── public/               # Static assets
├── src/
│   ├── imports/          # Team photos, logos, event images
│   ├── App.tsx           # Main application and interactive UI components
│   ├── index.css         # Global CSS & Tailwind CSS v4 styling
│   ├── main.tsx          # React application root
│   └── vite-env.d.ts     # TypeScript environment declarations
├── index.html            # Vite entry HTML
├── vercel.json           # Vercel deployment & rewrite configuration
├── vite.config.ts        # Vite configuration with Tailwind CSS v4
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project scripts and dependencies
```

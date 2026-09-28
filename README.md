# Tap & Fill — Color by Number 🎨

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://tapfill.vercel.app/)
[![CrazyGames Ready](https://img.shields.io/badge/CrazyGames-SDK%20v3-orange?style=for-the-badge)](https://sdk.crazygames.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A soothing, vector color-by-number puzzle web game engineered for web browsers, mobile viewports, and platforms like CrazyGames. Created by **Ravi Solanki**.

### 🌐 Live Demo
Play the game directly in your browser:  
👉 **[https://tapfill.vercel.app/](https://tapfill.vercel.app/)**

---

## 🎨 Features
- **200+ Handcrafted & Vector Puzzles**: Diverse categories including Animals, Nature, Products, Shapes, Mandalas, Easter, and Landscapes.
- **Precision Color-by-Number Engine**: Smooth SVG region filling, number matching highlights, and intuitive palette feedback.
- **Zoom & Pan Controls**: Easily inspect detailed geometry with 1x / 1.5x / 2x zoom and smooth drag panning.
- **Responsive Gallery**: Adaptive fluid grid with category tabs, completion tracking, and persistent local progress.
- **Synthesized Soundscapes**: Built-in WebAudio synthesis for soft chimes, error clicks, and victory fanfares without external audio file overhead.
- **CrazyGames SDK v3 Integration**: Platform lifecycle support (`loadingStart`/`Stop`, `gameplayStart`/`Stop`, `happytime`, platform audio mute sync), responsive landscape rotation overlay, and launch compliance.

---

## 🎮 Controls
- **Select Color**: Tap or click any color swatch in the bottom palette.
- **Fill Region**: Tap or click matching numbered shapes on the canvas.
- **Zoom & Pan**: Tap the magnifying glass in the top bar to toggle zoom levels. Click and drag the canvas to pan when zoomed in.
- **Hint**: Tap the lightbulb button to automatically find and fill a target region.
- **Audio**: Toggle background music and SFX with the audio buttons.

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation
```bash
npm install
```

### Local Development
Start the local development server:
```bash
npm run dev
```
Open `http://localhost:5180` in your browser.

### Production Build
Build the optimized production bundle for deployment:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

### CrazyGames Packaging
Create a validated, compliant `.zip` archive ready for upload to CrazyGames:
```bash
npm run package
```

---

## 🚀 Deployment

The game is deployed live on Vercel:
👉 **[https://tapfill.vercel.app/](https://tapfill.vercel.app/)**

The repository includes a ready-to-deploy `vercel.json` configuration configured with `npm run build` and output directory `dist/`.

---

## 📄 License
MIT License. Created by **Ravi Solanki**.

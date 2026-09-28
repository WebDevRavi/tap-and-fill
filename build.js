import { build } from 'vite';
import fs from 'fs';
import path from 'path';

async function runBuild() {
  try {
    await build({
      configFile: false,
      root: process.cwd(),
      base: './'
    });

    const distDir = path.resolve(process.cwd(), 'dist');
    const filesToCopy = ['levels-data.js', 'logo-brush.png'];
    for (const file of filesToCopy) {
      const src = path.resolve(process.cwd(), file);
      const dest = path.resolve(distDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} to dist/`);
      }
    }

    // Safety: ensure logo-brush exists at every possible relative path CrazyGames could query
    const logoSrc = path.resolve(process.cwd(), 'logo-brush.png');
    const assetsDir = path.resolve(distDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    // 1. Root fallbacks
    fs.copyFileSync(logoSrc, path.resolve(distDir, 'logo-brush.png'));
    fs.copyFileSync(logoSrc, path.resolve(distDir, 'logo-brush-BHqyc53x.png'));
    // 2. Assets folder fallbacks
    fs.copyFileSync(logoSrc, path.resolve(assetsDir, 'logo-brush.png'));
    fs.copyFileSync(logoSrc, path.resolve(assetsDir, 'logo-brush-BHqyc53x.png'));

    // Post-process dist/index.html to guarantee 100% relative paths without leading slashes
    const distIndex = path.resolve(distDir, 'index.html');
    if (fs.existsSync(distIndex)) {
      let content = fs.readFileSync(distIndex, 'utf-8');
      // Convert any remaining "/assets/" to "./assets/"
      content = content.replace(/(src|href)=["']\/assets\//g, '$1="./assets/');
      fs.writeFileSync(distIndex, content, 'utf-8');
      console.log('Sanitized dist/index.html to ensure relative asset paths.');
    }

    console.log('Build completed successfully.');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

runBuild();

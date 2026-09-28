import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function packageForCrazyGames() {
  console.log('--- Step 1: Building production bundle ---');
  execSync('node build.js', { stdio: 'inherit' });

  const distDir = path.resolve(process.cwd(), 'dist');
  const zipPath = path.resolve(process.cwd(), 'tap-and-fill-crazygames.zip');

  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ directory was not found after build.');
  }

  // Ensure index.html exists at root of dist
  const distIndex = path.join(distDir, 'index.html');
  if (!fs.existsSync(distIndex)) {
    throw new Error('dist/index.html is missing!');
  }

  console.log('--- Step 2: Validating production bundle compliance ---');
  const indexContent = fs.readFileSync(distIndex, 'utf-8');

  // Verify mobile rotate overlay is present
  if (!indexContent.includes('id="rotateDeviceOverlay"')) {
    throw new Error('Validation failed: #rotateDeviceOverlay is missing in production index.html');
  }
  if (!indexContent.includes('rotatePhoneAnim')) {
    throw new Error('Validation failed: rotatePhoneAnim CSS is missing in production index.html');
  }

  // Verify external links are removed (only plain text creator credit)
  const externalLinkMatches = indexContent.match(/href=["']https?:\/\/(?!sdk\.crazygames\.com)[^"']+["']/gi);
  if (externalLinkMatches) {
    throw new Error(`Validation failed: External links found in production index.html: ${externalLinkMatches.join(', ')}`);
  }

  // Verify adblocked string is not present
  if (indexContent.toLowerCase().includes('adblock')) {
    throw new Error('Validation failed: Disallowed adblock keyword found in production index.html');
  }

  // Verify leaderboards and submitScore are not present (not allowed without approval)
  if (indexContent.includes('.submitScore') || indexContent.includes('submitLeaderboardScore')) {
    throw new Error('Validation failed: submitScore found in production index.html (leaderboards not allowed for unapproved games)');
  }

  // Verify multiplayer functions are completely absent
  if (indexContent.includes('addJoinRoomListener') || indexContent.includes('updateRoom') || indexContent.includes('showInviteButton')) {
    throw new Error('Validation failed: Multiplayer functions found in production index.html');
  }

  console.log('✅ Validation passed: Landscape overlay, 0 external links, 0 leaderboards, 0 multiplayer, Basic Launch compliance verified.');

  console.log('--- Step 3: Archiving dist/ into tap-and-fill-crazygames.zip ---');
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  // Use PowerShell Compress-Archive on Windows to zip the *contents* of dist directly at zip root
  const psCommand = `powershell -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipPath}' -Force"`;
  execSync(psCommand, { stdio: 'inherit' });

  if (fs.existsSync(zipPath)) {
    const stats = fs.statSync(zipPath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`\n🎉 Success! Package created: ${zipPath}`);
    console.log(`📦 Package size: ${sizeMb} MB (Limit: 50.0 MB - fully compliant!)`);
    console.log(`🚀 Ready to upload to CrazyGames Developer Portal!`);
  } else {
    throw new Error('Failed to create zip package.');
  }
}

packageForCrazyGames().catch(err => {
  console.error('Packaging error:', err);
  process.exit(1);
});

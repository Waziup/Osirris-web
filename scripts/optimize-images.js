#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * Automatically optimizes all images in public/uploads/ directory
 * Converts to WebP and AVIF formats for better compression
 * 
 * Usage:
 *   node scripts/optimize-images.js
 * 
 * Or add to package.json:
 *   "optimize-images": "node scripts/optimize-images.js"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const uploadsDir = path.join(__dirname, '../public/uploads');
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];

// Check if ImageMagick is installed
function checkDependencies() {
  try {
    execSync('which convert', { stdio: 'ignore' });
    console.log('✓ ImageMagick found');
  } catch {
    console.error('✗ ImageMagick not installed');
    console.error('Install with: apt-get install imagemagick (Linux) or brew install imagemagick (Mac)');
    process.exit(1);
  }
}

// Get all image files
function getImageFiles() {
  if (!fs.existsSync(uploadsDir)) {
    console.log('No uploads directory found');
    return [];
  }

  return fs.readdirSync(uploadsDir)
    .filter(file => supportedFormats.includes(path.extname(file).toLowerCase()))
    .map(file => path.join(uploadsDir, file));
}

// Optimize single image
function optimizeImage(imagePath) {
  const filename = path.basename(imagePath);
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);
  
  try {
    // Get original file size
    const originalSize = fs.statSync(imagePath).size;
    
    // Optimize original image (reduce quality slightly)
    if (ext === '.png') {
      execSync(`convert "${imagePath}" -strip -quality 90 "${imagePath}"`, { stdio: 'pipe' });
    } else if (['.jpg', '.jpeg'].includes(ext)) {
      execSync(`convert "${imagePath}" -strip -quality 85 "${imagePath}"`, { stdio: 'pipe' });
    }
    
    // Convert to WebP
    const webpPath = path.join(uploadsDir, `${basename}.webp`);
    if (!fs.existsSync(webpPath)) {
      execSync(`convert "${imagePath}" -quality 80 "${webpPath}"`, { stdio: 'pipe' });
      const webpSize = fs.statSync(webpPath).size;
      console.log(`  ✓ WebP: ${filename} → ${basename}.webp (${formatBytes(webpSize)})`);
    }
    
    // Convert to AVIF (if not already WebP)
    if (ext !== '.webp') {
      const avifPath = path.join(uploadsDir, `${basename}.avif`);
      if (!fs.existsSync(avifPath)) {
        try {
          execSync(`convert "${imagePath}" -quality 75 "${avifPath}"`, { stdio: 'pipe' });
          const avifSize = fs.statSync(avifPath).size;
          console.log(`  ✓ AVIF: ${filename} → ${basename}.avif (${formatBytes(avifSize)})`);
        } catch {
          console.log(`  ⚠ AVIF conversion skipped for ${filename} (may not be supported)`);
        }
      }
    }
    
    // Get optimized file size
    const optimizedSize = fs.statSync(imagePath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${filename} optimized (${reduction}% reduction)`);
  } catch (error) {
    console.error(`✗ Error optimizing ${filename}: ${error.message}`);
  }
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Main execution
console.log('🖼️  Image Optimization Script');
console.log('============================\n');

checkDependencies();

const images = getImageFiles();
if (images.length === 0) {
  console.log('No images found in public/uploads/');
  process.exit(0);
}

console.log(`Found ${images.length} image(s) to optimize\n`);

images.forEach(imagePath => {
  optimizeImage(imagePath);
});

console.log('\n✓ Image optimization complete!');
console.log('\nTips:');
console.log('- WebP format: ~30% smaller than JPEG');
console.log('- AVIF format: ~50% smaller than JPEG');
console.log('- Modern browsers support both formats');
console.log('- Fallback to original format for older browsers');

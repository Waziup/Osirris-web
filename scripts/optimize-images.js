#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * Automatically optimizes all images in public/uploads/ directory
 * - Compresses original images
 * - Converts to WebP format (~30% smaller)
 * - Converts to AVIF format (~50% smaller)
 * 
 * Supports: JPG, PNG, WebP
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
    
    // Optimize original image based on format
    if (ext === '.png') {
      // PNG: Compress with quality 90, strip metadata
      execSync(`convert "${imagePath}" -strip -quality 90 "${imagePath}"`, { stdio: 'pipe' });
      console.log(`✓ PNG optimized: ${filename} (${formatBytes(originalSize)})`);
    } else if (['.jpg', '.jpeg'].includes(ext)) {
      // JPEG: Compress with quality 85, strip metadata
      execSync(`convert "${imagePath}" -strip -quality 85 "${imagePath}"`, { stdio: 'pipe' });
      console.log(`✓ JPEG optimized: ${filename} (${formatBytes(originalSize)})`);
    } else if (ext === '.webp') {
      // WebP: Re-compress with quality 80 to reduce size
      const tempPath = path.join(uploadsDir, `${basename}-temp.webp`);
      execSync(`convert "${imagePath}" -quality 80 "${tempPath}"`, { stdio: 'pipe' });
      
      const originalWebpSize = fs.statSync(imagePath).size;
      const compressedWebpSize = fs.statSync(tempPath).size;
      
      if (compressedWebpSize < originalWebpSize) {
        // Replace original with compressed version
        fs.unlinkSync(imagePath);
        fs.renameSync(tempPath, imagePath);
        const reduction = ((originalWebpSize - compressedWebpSize) / originalWebpSize * 100).toFixed(1);
        console.log(`✓ WebP optimized: ${filename} (${reduction}% reduction, now ${formatBytes(compressedWebpSize)})`);
      } else {
        // Keep original if compression doesn't help
        fs.unlinkSync(tempPath);
        console.log(`✓ WebP already optimized: ${filename} (${formatBytes(originalWebpSize)})`);
      }
      return; // Skip creating WebP from WebP
    }
    
    // Convert to WebP (if not already WebP)
    if (ext !== '.webp') {
      const webpPath = path.join(uploadsDir, `${basename}.webp`);
      if (!fs.existsSync(webpPath)) {
        execSync(`convert "${imagePath}" -quality 80 "${webpPath}"`, { stdio: 'pipe' });
        const webpSize = fs.statSync(webpPath).size;
        const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        console.log(`  ✓ WebP created: ${basename}.webp (${reduction}% smaller, ${formatBytes(webpSize)})`);
      } else {
        const webpSize = fs.statSync(webpPath).size;
        console.log(`  ✓ WebP exists: ${basename}.webp (${formatBytes(webpSize)})`);
      }
    }
    
    // Convert to AVIF (if not already WebP)
    if (ext !== '.webp') {
      const avifPath = path.join(uploadsDir, `${basename}.avif`);
      if (!fs.existsSync(avifPath)) {
        try {
          execSync(`convert "${imagePath}" -quality 75 "${avifPath}"`, { stdio: 'pipe' });
          const avifSize = fs.statSync(avifPath).size;
          const reduction = ((originalSize - avifSize) / originalSize * 100).toFixed(1);
          console.log(`  ✓ AVIF created: ${basename}.avif (${reduction}% smaller, ${formatBytes(avifSize)})`);
        } catch {
          console.log(`  ⚠ AVIF conversion skipped for ${filename} (may not be supported)`);
        }
      } else {
        const avifSize = fs.statSync(avifPath).size;
        console.log(`  ✓ AVIF exists: ${basename}.avif (${formatBytes(avifSize)})`);
      }
    }
    
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

// Calculate total savings
function calculateTotalSavings(images) {
  let totalOriginal = 0;
  let totalOptimized = 0;

  images.forEach(imagePath => {
    const ext = path.extname(imagePath).toLowerCase();
    const basename = path.basename(imagePath, ext);
    
    // Original size
    totalOriginal += fs.statSync(imagePath).size;
    
    // Check for WebP
    const webpPath = path.join(uploadsDir, `${basename}.webp`);
    if (fs.existsSync(webpPath)) {
      totalOptimized += fs.statSync(webpPath).size;
    }
    
    // Check for AVIF
    const avifPath = path.join(uploadsDir, `${basename}.avif`);
    if (fs.existsSync(avifPath)) {
      totalOptimized += fs.statSync(avifPath).size;
    }
  });

  return { totalOriginal, totalOptimized };
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

// Calculate and display savings
const { totalOriginal, totalOptimized } = calculateTotalSavings(images);
const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);

console.log('\n============================');
console.log('📊 Optimization Summary');
console.log('============================');
console.log(`Original total:  ${formatBytes(totalOriginal)}`);
console.log(`Optimized total: ${formatBytes(totalOptimized)}`);
console.log(`Total savings:   ${totalSavings}%`);
console.log('\n✓ Image optimization complete!');
console.log('\n💡 Tips:');
console.log('- WebP format: ~30% smaller than JPEG');
console.log('- AVIF format: ~50% smaller than JPEG');
console.log('- Modern browsers support both formats');
console.log('- Fallback to original format for older browsers');
console.log('- Commit optimized images: git add public/uploads/');

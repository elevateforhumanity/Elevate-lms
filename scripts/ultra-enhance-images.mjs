import sharp from 'sharp';
import { join } from 'path';

const publicDir = '/workspaces/fix2/public';

// Images to ultra-enhance for crystal clear quality (Avon-style)
const imagesToEnhance = [
  // Program images
  'media/programs/cna-hd.jpg',
  'media/programs/hvac-hd.jpg',
  'media/programs/cdl-hd.jpg',
  'media/programs/barber-hd.jpg',
  'media/programs/healthcare-professional-1-hd.jpg',
  
  // Location images
  'images/location-4.jpg',
  'images/location-5.jpg',
  'images/location-9.jpg',
];

async function ultraEnhanceImage(inputPath) {
  try {
    const fullInputPath = join(publicDir, inputPath);
    const tempPath = fullInputPath + '.tmp';
    
    console.log(`🎨 Ultra-enhancing: ${inputPath}`);
    
    // Ultra enhancement - Avon-style crystal clear
    await sharp(fullInputPath)
      .resize(2560, 1440, {
        fit: 'cover',
        position: 'center',
        kernel: 'lanczos3', // Best quality resampling
        withoutEnlargement: false
      })
      .sharpen({
        sigma: 2.5,      // More sharpening
        m1: 1.5,         // Increased sharpening
        m2: 0.9,
        x1: 3,
        y2: 15,
        y3: 15
      })
      .modulate({
        brightness: 1.15,  // Brighter like Avon
        saturation: 1.25,  // More vibrant
        hue: 0
      })
      .linear(1.2, -(128 * 0.15)) // Increase contrast significantly
      .gamma(1.1)                  // Brighten midtones
      .normalize()                 // Normalize histogram for clarity
      .jpeg({
        quality: 100,              // Maximum quality
        chromaSubsampling: '4:4:4', // No chroma subsampling
        mozjpeg: true,
        optimizeCoding: true,
        trellisQuantisation: true
      })
      .withMetadata({
        density: 300
      })
      .toFile(tempPath);
    
    // Replace original
    const { rename } = await import('fs/promises');
    await rename(tempPath, fullInputPath);
    
    console.log(`✅ Ultra-enhanced: ${inputPath}`);
  } catch (error) {
    console.error(`❌ Failed: ${inputPath}:`, error.message);
  }
}

async function enhanceAll() {
  console.log('🌟 ULTRA IMAGE ENHANCEMENT - AVON QUALITY\n');
  console.log('Target: Crystal clear, bright, vibrant images\n');
  
  for (const imagePath of imagesToEnhance) {
    await ultraEnhanceImage(imagePath);
  }
  
  console.log('\n✅ All images ultra-enhanced!');
  console.log('Resolution: 2560x1440 (2K)');
  console.log('DPI: 300');
  console.log('Quality: 100% (Maximum)');
  console.log('Brightness: +15%');
  console.log('Saturation: +25%');
  console.log('Contrast: Enhanced');
  console.log('Sharpness: Crystal clear');
}

enhanceAll();

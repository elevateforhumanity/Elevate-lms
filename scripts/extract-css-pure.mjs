#!/usr/bin/env node

/**
 * Pure Node.js CSS Extractor - Zero Dependencies
 * Extracts CSS and styling from elevateforhumanity.org
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_URL = 'https://elevateforhumanity.org';
const OUTPUT_DIR = path.join(process.cwd(), 'extracted-styles');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve(data);
          });
        }
      )
      .on('error', reject);
  });
}

async function extractCSS() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🤖 CSS Extraction Worker - Pure Node.js');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log(`Target: ${TARGET_URL}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('');

  try {
    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Fetch homepage
    console.log('[1/5] Fetching homepage...');
    const html = await httpsGet(TARGET_URL);
    console.log(`✅ Fetched ${html.length} bytes`);
    console.log('');

    // Extract inline styles
    console.log('[2/5] Extracting inline styles...');
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    const inlineStyles = [];
    let match;
    while ((match = styleRegex.exec(html)) !== null) {
      inlineStyles.push(match[1]);
    }

    const allInlineCSS = inlineStyles.join('\n\n');
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'inline-styles.css'),
      allInlineCSS,
      'utf-8'
    );
    console.log(`✅ Extracted ${inlineStyles.length} inline style blocks`);
    console.log('');

    // Extract external stylesheets
    console.log('[3/5] Extracting external stylesheets...');
    const linkRegex = /<link[^>]+rel=["']stylesheet["'][^>]*>/gi;
    const stylesheetUrls = [];
    while ((match = linkRegex.exec(html)) !== null) {
      const hrefMatch = match[0].match(/href=["']([^"']+)["']/);
      if (hrefMatch) {
        stylesheetUrls.push(hrefMatch[1]);
      }
    }

    let externalCSS = '';
    for (const href of stylesheetUrls) {
      try {
        const cssUrl = href.startsWith('http')
          ? href
          : href.startsWith('//')
            ? `https:${href}`
            : `${TARGET_URL}${href.startsWith('/') ? '' : '/'}${href}`;

        console.log(`   Fetching: ${cssUrl}`);
        const css = await httpsGet(cssUrl);
        externalCSS += `/* Source: ${cssUrl} */\n${css}\n\n`;
      } catch (error) {
        console.log(`   ⚠️  Failed to fetch ${href}: ${error.message}`);
      }
    }

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'external-stylesheets.css'),
      externalCSS,
      'utf-8'
    );
    console.log(`✅ Extracted ${stylesheetUrls.length} external stylesheets`);
    console.log('');

    // Combine all CSS
    const allCSS = allInlineCSS + '\n\n' + externalCSS;
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'all-styles.css'),
      allCSS,
      'utf-8'
    );

    // Extract design tokens from CSS
    console.log('[4/5] Extracting design tokens...');
    const tokens = {
      colors: extractColors(allCSS),
      fonts: extractFonts(allCSS),
      fontSizes: extractFontSizes(allCSS),
      spacing: extractSpacing(allCSS),
      borderRadius: extractBorderRadius(allCSS),
      boxShadows: extractBoxShadows(allCSS),
      cssVariables: extractCSSVariables(allCSS),
    };

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'design-tokens.json'),
      JSON.stringify(tokens, null, 2),
      'utf-8'
    );

    console.log('✅ Extracted design tokens:');
    console.log(`   - ${tokens.colors.length} colors`);
    console.log(`   - ${tokens.fonts.length} font families`);
    console.log(`   - ${tokens.fontSizes.length} font sizes`);
    console.log(`   - ${tokens.spacing.length} spacing values`);
    console.log(
      `   - ${Object.keys(tokens.cssVariables).length} CSS variables`
    );
    console.log('');

    // Extract HTML structure
    console.log('[5/5] Extracting HTML structure...');
    const structure = {
      title: extractTag(html, 'title'),
      metaDescription: extractMetaContent(html, 'description'),
      headers: extractTags(html, 'header'),
      navigation: extractTags(html, 'nav'),
      buttons: extractTags(html, 'button'),
      forms: extractTags(html, 'form'),
      footer: extractTags(html, 'footer'),
    };

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'html-structure.json'),
      JSON.stringify(structure, null, 2),
      'utf-8'
    );
    console.log('✅ Extracted HTML structure');
    console.log('');

    // Generate Tailwind config
    const tailwindConfig = generateTailwindConfig(tokens);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'tailwind.config.js'),
      tailwindConfig,
      'utf-8'
    );

    // Save raw HTML for reference
    await fs.writeFile(path.join(OUTPUT_DIR, 'homepage.html'), html, 'utf-8');

    // Generate summary
    const summary = {
      extractedAt: new Date().toISOString(),
      targetUrl: TARGET_URL,
      stats: {
        htmlSize: html.length,
        inlineStyles: inlineStyles.length,
        externalStylesheets: stylesheetUrls.length,
        totalCSSSize: allCSS.length,
        colors: tokens.colors.length,
        fonts: tokens.fonts.length,
        cssVariables: Object.keys(tokens.cssVariables).length,
        components: {
          headers: structure.headers.length,
          navigation: structure.navigation.length,
          buttons: structure.buttons.length,
          forms: structure.forms.length,
          footer: structure.footer.length,
        },
      },
      stylesheetUrls,
      files: [
        'homepage.html',
        'inline-styles.css',
        'external-stylesheets.css',
        'all-styles.css',
        'design-tokens.json',
        'html-structure.json',
        'tailwind.config.js',
      ],
    };

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'extraction-summary.json'),
      JSON.stringify(summary, null, 2),
      'utf-8'
    );

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ CSS Extraction Complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📊 Summary:');
    console.log(
      `   - HTML size: ${(summary.stats.htmlSize / 1024).toFixed(2)} KB`
    );
    console.log(`   - Inline styles: ${summary.stats.inlineStyles}`);
    console.log(
      `   - External stylesheets: ${summary.stats.externalStylesheets}`
    );
    console.log(
      `   - Total CSS size: ${(summary.stats.totalCSSSize / 1024).toFixed(2)} KB`
    );
    console.log(`   - Colors: ${summary.stats.colors}`);
    console.log(`   - Fonts: ${summary.stats.fonts}`);
    console.log(`   - CSS Variables: ${summary.stats.cssVariables}`);
    console.log('');
    console.log('📁 Output directory:');
    console.log(`   ${OUTPUT_DIR}`);
    console.log('');
    console.log('📄 Generated files:');
    summary.files.forEach((file) => {
      console.log(`   - ${file}`);
    });
    console.log('');
    console.log('🎯 Next steps:');
    console.log(
      '   1. Review extracted-styles/design-tokens.json for color palette'
    );
    console.log('   2. Check extracted-styles/all-styles.css for complete CSS');
    console.log(
      '   3. Use extracted-styles/tailwind.config.js as starting point'
    );
    console.log(
      '   4. Review extracted-styles/html-structure.json for components'
    );
    console.log('');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function extractColors(css) {
  const colors = new Set();
  const colorRegex = /#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
  const matches = css.match(colorRegex) || [];
  matches.forEach((color) => colors.add(color));
  return Array.from(colors).sort();
}

function extractFonts(css) {
  const fonts = new Set();
  const fontRegex = /font-family:\s*([^;]+);/g;
  let match;
  while ((match = fontRegex.exec(css)) !== null) {
    fonts.add(match[1].trim());
  }
  return Array.from(fonts);
}

function extractFontSizes(css) {
  const sizes = new Set();
  const sizeRegex = /font-size:\s*([^;]+);/g;
  let match;
  while ((match = sizeRegex.exec(css)) !== null) {
    sizes.add(match[1].trim());
  }
  return Array.from(sizes).sort();
}

function extractSpacing(css) {
  const spacing = new Set();
  const spacingRegex = /(?:padding|margin):\s*([^;]+);/g;
  let match;
  while ((match = spacingRegex.exec(css)) !== null) {
    const value = match[1].trim();
    if (value !== '0' && value !== '0px') {
      spacing.add(value);
    }
  }
  return Array.from(spacing);
}

function extractBorderRadius(css) {
  const radius = new Set();
  const radiusRegex = /border-radius:\s*([^;]+);/g;
  let match;
  while ((match = radiusRegex.exec(css)) !== null) {
    const value = match[1].trim();
    if (value !== '0' && value !== '0px') {
      radius.add(value);
    }
  }
  return Array.from(radius);
}

function extractBoxShadows(css) {
  const shadows = new Set();
  const shadowRegex = /box-shadow:\s*([^;]+);/g;
  let match;
  while ((match = shadowRegex.exec(css)) !== null) {
    const value = match[1].trim();
    if (value !== 'none') {
      shadows.add(value);
    }
  }
  return Array.from(shadows);
}

function extractCSSVariables(css) {
  const variables = {};
  const varRegex = /--([\w-]+):\s*([^;]+);/g;
  let match;
  while ((match = varRegex.exec(css)) !== null) {
    variables[`--${match[1]}`] = match[2].trim();
  }
  return variables;
}

function extractTag(html, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

function extractMetaContent(html, name) {
  const regex = new RegExp(
    `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`,
    'i'
  );
  const match = html.match(regex);
  return match ? match[1] : '';
}

function extractTags(html, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push({
      html: match[1].substring(0, 500),
      fullTag: match[0].substring(0, 100),
    });
  }
  return matches;
}

function generateTailwindConfig(tokens) {
  // Create color palette
  const colorPalette = {};
  tokens.colors.slice(0, 30).forEach((color, idx) => {
    colorPalette[`extracted-${idx + 1}`] = color;
  });

  // Create font families
  const fontFamilies = {};
  tokens.fonts.slice(0, 5).forEach((font, idx) => {
    fontFamilies[`extracted-${idx + 1}`] = font;
  });

  return `/** @type {import('tailwindcss').Config} */
/**
 * Tailwind Config - Extracted from elevateforhumanity.org
 * Generated: ${new Date().toISOString()}
 */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(colorPalette, null, 8)},
      fontFamily: ${JSON.stringify(fontFamilies, null, 8)},
    },
  },
  plugins: [],
};
`;
}

// Run extraction
extractCSS();

#!/usr/bin/env node

/**
 * Site Diagnostic Tool
 * Fetches and analyzes the deployed site
 */

const SITE_URL = 'https://main--elevateforhumanityfix.netlify.app';

async function diagnose() {
  console.log('🔍 SITE DIAGNOSTIC REPORT');
  console.log('='.repeat(60));
  console.log('');

  // Test 1: Homepage
  console.log('📄 Test 1: Homepage');
  try {
    const response = await fetch(SITE_URL);
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Content-Type: ${response.headers.get('content-type')}`);

    const html = await response.text();
    console.log(`   HTML Size: ${html.length} bytes`);
    console.log(
      `   Has <div id="root">: ${html.includes('id="root"') ? '✅' : '❌'}`
    );
    console.log(
      `   Has script tags: ${html.includes('<script') ? '✅' : '❌'}`
    );

    // Check for common issues
    const hasDoctype = html.toLowerCase().includes('<!doctype html>');
    const hasTitle = html.includes('<title>');
    const hasRoot = html.includes('id="root"');
    const hasScripts = html.match(/<script[^>]*src="[^"]*"/g);

    console.log(`   Has DOCTYPE: ${hasDoctype ? '✅' : '❌'}`);
    console.log(`   Has title: ${hasTitle ? '✅' : '❌'}`);
    console.log(`   Script count: ${hasScripts ? hasScripts.length : 0}`);

    if (hasScripts && hasScripts.length > 0) {
      console.log('   Main bundle: ' + hasScripts[0].match(/src="([^"]*)"/)[1]);
    }

    // Check if it's actually blank (no content in root)
    const rootContent = html.match(/<div id="root">(.*?)<\/div>/s);
    if (rootContent) {
      const content = rootContent[1].trim();
      console.log(
        `   Root content: ${content.length > 0 ? content.substring(0, 50) + '...' : 'EMPTY (SPA will hydrate)'}`
      );
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('');

  // Test 2: Main JS Bundle
  console.log('📦 Test 2: JavaScript Bundle');
  try {
    const htmlResponse = await fetch(SITE_URL);
    const html = await htmlResponse.text();
    const scriptMatch = html.match(/src="(\/assets\/index-[^"]+\.js)"/);

    if (scriptMatch) {
      const bundleUrl = SITE_URL + scriptMatch[1];
      console.log(`   Bundle URL: ${scriptMatch[1]}`);

      const bundleResponse = await fetch(bundleUrl);
      console.log(
        `   Status: ${bundleResponse.status} ${bundleResponse.statusText}`
      );
      console.log(
        `   Content-Type: ${bundleResponse.headers.get('content-type')}`
      );

      const bundle = await bundleResponse.text();
      console.log(`   Size: ${(bundle.length / 1024).toFixed(2)} KB`);

      // Check for common issues in bundle
      const hasReact = bundle.includes('react');
      const hasReactDOM = bundle.includes('react-dom');
      const hasRouter = bundle.includes('react-router');

      console.log(`   Contains React: ${hasReact ? '✅' : '❌'}`);
      console.log(`   Contains ReactDOM: ${hasReactDOM ? '✅' : '❌'}`);
      console.log(`   Contains Router: ${hasRouter ? '✅' : '❌'}`);
    } else {
      console.log('   ❌ Could not find main bundle in HTML');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('');

  // Test 3: API Endpoints
  console.log('🔌 Test 3: API Endpoints');
  const endpoints = ['/sitemap.xml', '/robots.txt', '/_redirects'];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(SITE_URL + endpoint);
      console.log(`   ${endpoint}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`   ${endpoint}: ❌ ${error.message}`);
    }
  }

  console.log('');

  // Test 4: Check for blank page indicators
  console.log('🎨 Test 4: Blank Page Check');
  try {
    const response = await fetch(SITE_URL);
    const html = await response.text();

    // Remove all whitespace and check if root is truly empty
    const cleanHtml = html.replace(/\s+/g, '');
    const rootMatch = cleanHtml.match(/<divid="root">(.*?)<\/div>/);

    if (rootMatch) {
      const rootContent = rootMatch[1];
      if (rootContent.length === 0) {
        console.log('   ⚠️  Root div is EMPTY (waiting for JS hydration)');
        console.log('   This is NORMAL for SPAs - JS should populate it');
      } else {
        console.log('   ✅ Root div has content');
      }
    }

    // Check for error messages in HTML
    const hasError =
      html.toLowerCase().includes('error') ||
      html.toLowerCase().includes('failed') ||
      html.toLowerCase().includes('crash');

    if (hasError) {
      console.log('   ⚠️  HTML contains error-related text');
    } else {
      console.log('   ✅ No error messages in HTML');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('');
  console.log('💡 DIAGNOSIS:');
  console.log('');
  console.log('If the site shows a blank page:');
  console.log('1. Check browser console (F12) for JavaScript errors');
  console.log('2. Verify env vars are set in Netlify');
  console.log('3. Check if ErrorBoundary is catching something');
  console.log('4. Look for network errors in Network tab');
  console.log('');
  console.log('The site structure looks correct - blank page is likely:');
  console.log('- Runtime JS error (check console)');
  console.log('- Missing env var causing crash');
  console.log('- Network request blocking render');
  console.log('');
}

diagnose().catch(console.error);

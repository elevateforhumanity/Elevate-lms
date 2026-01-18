import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.elevateforhumanity.org';

// Routes that should NOT be in sitemap (private/auth routes)
const EXCLUDED_PREFIXES = [
  '/admin',
  '/lms',
  '/student',
  '/staff',
  '/api',
  '/auth',
  '/login',
  '/signup',
  '/partners/admin',
  '/partners/dashboard',
  '/checkout',
  '/payment',
  '/invoice',
  '/demo',
  '/test',
  '/dev',
  '/debug',
];

// Priority mapping based on route patterns
function getPriority(route: string): number {
  if (route === '/') return 1.0;
  if (route === '/apply' || route === '/programs') return 1.0;
  if (route.startsWith('/programs/')) return 0.9;
  if (route.startsWith('/apprenticeships')) return 0.9;
  if (route === '/employers' || route === '/how-it-works') return 0.9;
  if (route.startsWith('/about') || route === '/contact') return 0.8;
  if (route.startsWith('/funding') || route.startsWith('/career')) return 0.8;
  if (route.startsWith('/courses')) return 0.7;
  if (route.startsWith('/blog') || route.startsWith('/resources')) return 0.7;
  if (route.startsWith('/policies') || route.startsWith('/privacy') || route.startsWith('/terms')) return 0.4;
  return 0.6;
}

// Change frequency based on route patterns
function getChangeFreq(route: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  if (route === '/' || route === '/apply') return 'daily';
  if (route.startsWith('/programs') || route.startsWith('/blog')) return 'weekly';
  if (route.startsWith('/policies') || route.startsWith('/privacy')) return 'yearly';
  return 'monthly';
}

// Recursively find all page.tsx files
function findAllPages(dir: string, basePath: string = ''): string[] {
  const routes: string[] = [];
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        // Skip dynamic routes [param] and route groups (name)
        if (item.name.startsWith('[') || item.name.startsWith('_')) continue;
        
        // Handle route groups - strip the parentheses
        let routePart = item.name;
        if (item.name.startsWith('(') && item.name.endsWith(')')) {
          routePart = '';
        }
        
        const newBasePath = routePart ? `${basePath}/${routePart}` : basePath;
        routes.push(...findAllPages(fullPath, newBasePath));
      } else if (item.name === 'page.tsx' || item.name === 'page.ts') {
        routes.push(basePath || '/');
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }
  
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  
  // Find all pages in the app directory
  const appDir = path.join(process.cwd(), 'app');
  const allRoutes = findAllPages(appDir);
  
  // Filter out excluded routes and deduplicate
  const publicRoutes = [...new Set(allRoutes)]
    .filter(route => !EXCLUDED_PREFIXES.some(prefix => route.startsWith(prefix)))
    .sort();
  
  // Generate sitemap entries
  const entries: MetadataRoute.Sitemap = publicRoutes.map(route => ({
    url: `${BASE_URL}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: getChangeFreq(route),
    priority: getPriority(route),
  }));
  
  return entries;
}

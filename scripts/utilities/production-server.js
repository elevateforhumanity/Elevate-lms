/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

import express from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.', { maxAge: '1d' }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.get('/api/emergency-sale', (req, res) => {
  res.json({
    active: true,
    deadline: '72 hours remaining',
    products: [
      {
        id: 'complete-platform',
        name: 'Complete Workforce Platform',
        originalPrice: 9999,
        salePrice: 2999,
        savings: 7000,
        features: [
          '33+ Programs',
          'Federal Partnerships',
          'Revenue Sharing',
          'Full Source Code',
        ],
      },
      {
        id: 'source-code',
        name: 'Source Code Only',
        originalPrice: 4999,
        salePrice: 999,
        savings: 4000,
        features: ['Complete Codebase', 'All Programs', 'Documentation'],
      },
    ],
  });
});

// Stripe integration
app.post('/api/checkout', async (req, res) => {
  try {
    const { productId, amount } = req.body;

    // Placeholder for actual SMS handler or logging

    // Return success URL for demo
    res.json({
      url: `/payment-success.html?product=${productId}&amount=${amount}`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: 'Checkout failed' });
  }
});

// Emergency sale tracking
app.post('/api/track-view', async (req, res) => {
  try {
    const { page, source } = req.body;
    // Placeholder for actual SMS handler or logging
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

// Sister site routes
const sisterSites = [
  'hub',
  'programs',
  'lms',
  'connect',
  'compliance',
  'pay',
  'partners',
  'account',
];
sisterSites.forEach((site) => {
  app.get(`/${site}`, (req, res) => {
    const filePath = path.join(__dirname, `${site}.html`);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.redirect('/');
    }
  });
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all for HTML files
app.get('/*.html', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Page not found');
  }
});

// Error handling
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {

  // Placeholder for startup alert
});

// Graceful shutdown
process.on('SIGTERM', () => {
  process.exit(0);
});

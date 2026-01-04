/**
 * Video Generation Server
 * Express server for video generation API
 */

import express from 'express';
import compression from 'compression';
import videoApiRouter from './video-api';

const app = express();
const PORT = process.env.VIDEO_API_PORT || 3001;

// Middleware
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.use('/api/video', videoApiRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Video Generation API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/video/health',
      generate: 'POST /api/video/generate',
      tts: 'POST /api/video/tts',
      status: 'GET /api/video/status/:jobId',
      download: 'GET /api/video/download/:jobId',
      list: 'GET /api/video/videos',
      delete: 'DELETE /api/video/videos/:jobId',
    },
  });
});

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Server error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
);

// Start server
app.listen(PORT, '0.0.0.0', () => {
});

export default app;

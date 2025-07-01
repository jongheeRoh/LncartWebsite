import { createServer } from 'http';
import express from 'express';
import { registerRoutes } from '../server/routes.js';

const app = express();

// Initialize the app with all routes
registerRoutes(app).then(() => {
  console.log('Routes registered successfully');
}).catch(error => {
  console.error('Failed to register routes:', error);
});

// For Vercel, we need to export the app directly
export default app;
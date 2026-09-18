import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Explicit route for Thank You page (before static to avoid directory 301 redirect)
app.get(['/thank-you', '/thank-you/'], (req, res) => {
  res.sendFile(path.join(__dirname, 'thank-you.html'));
});

// Serve static assets with support for range requests (video streaming)
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html',
  setHeaders: (res, filePath) => {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  }
}));

// Fallback to index.html for SPA / client routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 8910;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(ROOT, urlPath);
    // prevent path traversal
    if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isDirectory()) filePath = path.join(filePath, 'index.html');
      fs.readFile(filePath, (e, data) => {
        if (e) { res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'}); return res.end('<h1>404</h1>'); }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {'Content-Type': TYPES[ext] || 'application/octet-stream'});
        res.end(data);
      });
    });
  } catch (ex) { res.writeHead(500); res.end('Error'); }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Serving ${ROOT} at http://localhost:${PORT}/`);
});

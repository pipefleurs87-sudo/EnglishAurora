/* English Aurora — dependency-free dev server.
   Serves the whole Dummy_alfa sandbox so the landing can reach the real
   Lesson/Practice/Test pages (../leccion, ../preview, ../evaluacion, ../audio).
   '/' redirects to the prototype landing at /englishaurora/.
   Usage: npm run dev -- --port 7100   (or: node server.js --port 7100) */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
function arg(name, dflt){
  const i = argv.indexOf('--' + name);
  if (i >= 0 && argv[i+1]) return argv[i+1];
  const kv = argv.find(a => a.startsWith('--' + name + '='));
  return kv ? kv.split('=')[1] : dflt;
}
const PORT = parseInt(arg('port', process.env.PORT || '7100'), 10);
const HOST = arg('host', '127.0.0.1');
const ROOT = path.resolve(__dirname, '..');   // Dummy_alfa/

const MIME = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml',
  '.mp3':'audio/mpeg', '.ico':'image/x-icon', '.txt':'text/plain; charset=utf-8',
  '.xml':'application/xml; charset=utf-8', '.md':'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') {
    res.writeHead(302, { 'Location': '/englishaurora/' });
    res.end();
    return;
  }
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + urlPath); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
                         'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(PORT, HOST, () => {
  console.log('English Aurora dev server → http://' + HOST + ':' + PORT + '/');
});

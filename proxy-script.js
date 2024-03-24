const http = require('http');
const https = require('https');
const url = require('url');

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
    path: parsedUrl.path,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = (parsedUrl.protocol === 'https:' ? https : http).request(options, (proxyRes) => {
    // Setze die CORS-Header im Response-Objekt
    res.setHeader('Access-Control-Allow-Origin', '*'); // Erlaubt Zugriff von allen Ursprüngen

    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });

  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.statusCode = 500;
    res.end('Proxy request failed');
  });
}).listen(8080, () => {
  console.log('Proxy server running on port 8080');
});


const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'SWE_PROJECT' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('SWE_PROJECT is live on Render\n');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`SWE_PROJECT listening on port ${port}`);
});

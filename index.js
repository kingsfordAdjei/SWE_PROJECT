const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'SWE_PROJECT' }));
    return;
  }

  if (req.url === '/supabase') {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'error', error: 'Supabase env vars missing' }));
      return;
    }

    fetch(url.replace(/\/$/, '') + '/rest/v1/', {
      headers: { apikey: key, Authorization: 'Bearer ' + key }
    })
      .then((r) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', supabase: 'connected', http: r.status }));
      })
      .catch((e) => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', error: String(e) }));
      });
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('SWE_PROJECT is live on Render\n');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`SWE_PROJECT listening on port ${port}`);
});

const http = require('http');
http.createServer((req, res) => {
  res.end('Hello');
}).listen(5050, () => console.log('Simple server running on 5050')); 
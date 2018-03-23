var http = require('http');

var server = http.createServer(function(req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hi everybody!');
});
server.listen(8080);
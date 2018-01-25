var http = require('http');

http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<script>location.replace("index.html")</script>')
    res.end();
    
}).listen(process.env.PORT || 8080);

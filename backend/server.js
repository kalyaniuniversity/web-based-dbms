const http = require('http');

const server = http.createServer((request, response) => {
    console.log(request);
    console.log(response);
});

server.listen(8091);
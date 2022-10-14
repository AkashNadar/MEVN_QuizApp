
const http = require('http');
const app = require('./src/app.js');
require('dotenv').config();

const server = http.createServer(app);

server.listen(process.env.PORT || 3500, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
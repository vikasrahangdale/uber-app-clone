const http = require('http');

const app = require('./app');
const { initializeSocket } = require('./service/socket'); // Import the initializeSocket function

const port = process.env.PORT || 3000;
const server = http.createServer(app);

initializeSocket(server); // Initialize socket.io with the server

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
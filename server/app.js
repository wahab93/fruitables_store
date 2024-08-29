const dotenv = require('dotenv');
const express = require('express');
const http = require('http'); // Import http to create a server
const cookieParser = require("cookie-parser");
const cors = require('cors');
const socketIO = require('socket.io'); // Import socket.io

const app = express();

// Create an HTTP server with Express
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = socketIO(server);

app.use('/public', express.static('public'));
app.use(cors());
app.use(cookieParser());

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Database Connection
require('./db/conn');

// Convert data to JSON
app.use(express.json());

// Middleware to pass io instance to routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Link Router file
app.use(require('./router/auth'));

// Define the port
const port = process.env.PORT || 5000;

// Start the server
server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

// Handle socket connections (optional if you need to handle global events)
io.on('connection', (socket) => {
    console.log('A socket connected in app.js:', socket.id);

    socket.on('disconnect', () => {
        console.log('A socket disconnected in app.js:', socket.id);
    });
});
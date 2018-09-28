// index.js

const config = require('./config');
const Server = require('./src').Server;
const cleanup = require('./src').cleanup;

// Main

if (process.env.NODE_ENV !== 'production') 
    process.env.NODE_ENV = 'development';

process.on('SIGINT', function () {
    process.exit(2);
});

process.on('exit', function () {
    console.log(' exit event...');
    cleanup();
});

// Server
const server = new Server(config).getServer();


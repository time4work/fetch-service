// src/server/index.js

const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const reactViews = require('express-react-views');
const http = require('http');

const router = require('./router');

let server = null;

// Server class
module.exports = class {

    constructor (config) {
        if (server) return; // singleton
        server = express();
        
        server.set('port', config.server.port);
        server.set('views', `src/client/views`);
        server.set('view engine', 'jsx');
        server.engine('jsx', reactViews.createEngine());
        
        // Express Middleware
        server.use(favicon(`src/client/public/favicon.ico`));
	    server.use(express.static(`src/client/public`));
        server.use(bodyParser.json({limit: '5mb'}));
        server.use(bodyParser.urlencoded({ 
            extended: false,
            limit: '5mb', 
            parameterLimit: 5000 
        }));

        // Express Router
        server.use('/', router.getRouter(config));

        // Server Error Handler 
        server.use(function(err, req, res, next) {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });

        // Server Listening
        http.createServer(server).listen(server.get('port'), () => {
            console.log('( Server ) running on port', server.get('port'));
        });
    }

    getServer () { return server; }

    // close Server
    static close () {
        if (server) {
            if (server.close) 
                server.close();
            server = null;
        }
        console.log(`( Server ) closed`);
    }
}
// src/db/redis.js

const redis = require('redis');

let client = null;

// Redis class
module.exports = class {

    constructor (config) { 
        if (!config) throw new Error(`( Redis ) no config specified`)
        this.config = config;
        createClient(config); 
    }

    getClient () {
        if (client) return client;
        createClient(this.config);
    }
    
    // find (title, year, cb) {}
    // insert (title, year, state, data) {}

    static close () {
        if (client) {
            client.end(true);
            client = null;
        }
        console.log(`( Redis ) closed`);
    }
}

const createClient = (config) => {
    if (client) return; // singleton

    client = redis.createClient(config.port, config.host, (er, res) => {
        console.log({er, res});
    });
    
    client.on('connect', function() {
        console.log(`( Redis ) client ready`);
    });
    
    client.on('error', function (err) {
        throw new Error('( Redis ) ' + err);
    }); 
}
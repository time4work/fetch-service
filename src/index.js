// src/index.js


// Server Cluster 
const _Server = require('./server');
exports.Server = _Server;


// no need use ... for now
// Server Communication ( ZeroMQ ) 
const _Communication = require('./communication');
exports.Communication = _Communication; 


// Redis DataBase
const _Redis = require('./db/redis');
exports.Redis = _Redis;
// exports.db = new _Redis();


// Mysql DataBase
const _Mysql = require('./db/mysql');
exports.Mysql = _Mysql;


// Cleanup action just before node.js exits
const cleanup = function () {
    console.log(`( Tools ) cleaning`);
    _Server.close();
    _Redis.close();
    _Communication.close();
}
exports.cleanup = cleanup;

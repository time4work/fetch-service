// src/server/router.js

const express = require('express');

const Redis = require('../db/redis');
const Mysql = require('../db/mysql');
const Scrapper = require('../scrapper');

function requestMonitor (req, res, next){
    const date = new Date(Date.now()).toLocaleDateString();
    const time = new Date(Date.now()).toLocaleTimeString();
    const log = `
        Request
            URL: ${req.originalUrl}
            Type: ${req.method}
            Time: ${date} ${time} 
    `;
    console.log(log);
    next();
}

// Server Router
exports.getRouter = function(config) {
    try {
        const router = express.Router();

        // db clients
        const redis = new Redis(config.redis);
        // const mysql = await Mysql.create(config.mysql);
        const mysql = Mysql.create(config.mysql);

        // scrapper client 
        const scrapper = new Scrapper(config.omdb);


        // request monitor 
        router.use(requestMonitor);

        router.get('/', (req, res) => {
            res.render('index', { title: 'Sadness' });
        });

        router.post('/search', async (req, res) => {
            const title = req.body.title;
            const year = req.body.year;
            // console.log(req.body);
            if (!title || !year)
                res.send({status: 'err', err: 'wrong request args'});
            else 
                console.log('searching...');
                scrapper.find(title, year, (result, err) => {
                    if (err) res.send({status: 'err', err: err});
                    else {
                        res.send({status: 'ok', data: result});
                    }
                });
                // await db.find(title, year, async (err, result) => {
                //     if (err)
                //         res.send({status: 'err', err: err});

                //     else if (result.exist) // DATA EXIST -> respond with DATA
                //         res.send({status: 'ok', data: result.data});

                //     else { // DATA NOT EXIST -> find
                //         await scrapper.find(title, year, async (result) => {
                //             if (result.found) { 
                //                 await db.insert(title, year, 'FOUND', result.data);
                //                 res.send({status: 'ok', data: result.data});
                //             } else { // nothing was found
                //                 await db.insert(title, year, 'NO RESULT', {});
                //                 res.send({status: 'ok', state: state});
                //             }
                //         });
                //     }
                // });
        });

        return router;
    } catch (e) {
        throw new Error(`router: ${e}`);
    }
}

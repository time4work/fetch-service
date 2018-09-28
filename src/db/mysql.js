// src/db/redis.js

const mysql = require('mysql2/promise');


const asyncSqlClient = async (config, cb) => {
    return await mysql.createConnection({
		host     : config.host,
		user     : config.user,
		password : config.password,
		database : config.database
	}, cb);
}

// const asyncMysqlPool = async (config, cb) => {
// 	return  await mysql.createPool({
// 		host     : config.host,
// 		user     : config.user,
// 		password : config.password,
// 		database : config.database
// 	}, cb);
// };


class Mysql {

    async query (query, params, callback) {
        try {
            const connection = await asyncSqlClient(this.config);
            const result = await connection.execute( query, params );
            connection.end();

            if(callback)
                await  callback( result, params );
            return result[0];

        } catch (e) {
            throw new Error(`query: ${e}`);
        }
    }

    static async create (config) {
        try {
            if (!config) throw new Error(`no config specified`)
            const obj = new Mysql();
            await obj.init(config);
            console.log(`( Mysql ) client ready`);
            return obj;
        } catch (e) {
            throw new Error(`create: ${e}`);
        }
    }

    async init (config) {
        try {
            this.config = config;
            await this.schemaInit(); 
            await this.tableInit(); 
        } catch (e) {
            throw new Error(`init: ${e}`);
        }
    }

    async schemaInit () {
        try {
            const schema_query = `
                CREATE DATABASE IF NOT EXISTS  
                ${this.config.database} 
                CHARACTER SET utf8 
                COLLATE utf8_general_ci      
            `;
            const connection = await mysql.createConnection({
                host     : this.config.host,
                user     : this.config.user,
                password : this.config.password,
            });
            await connection.execute( schema_query );
            connection.end();
        } catch (e) {
            throw new Error(`schemaInit: ${e}`);
        }
    }

    async tableInit () {
        try {
            const schema_query = `
                CREATE TABLE IF NOT EXISTS
                movies (
                    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    year INT(4),
                    released VARCHAR(50),
                    poster INT(4),
                    country VARCHAR(50),
                    actors VARCHAR(150),
                    genre VARCHAR(150),
                    rating VARCHAR(10)
                ) ENGINE = InnoDB     
            `;
            const connection = await mysql.createConnection({
                host     : this.config.host,
                user     : this.config.user,
                password : this.config.password,
                database : this.config.database,
            });
            await connection.execute( schema_query );
            connection.end();
        } catch (e) {
            throw new Error(`tableInit: ${e}`);
        }
    }

    async findFilmData (title, year, cb) {
        try {
            if (!title || !year) throw new Error(`film title or year not specified`)
            const query = `
                SELECT *
                FROM movies
                WHERE title = ? 
                AND year = ?
            `;
            const result = await myquery(query, [ title, year ]);

            if (cb) cb(result);
            return result;
        } catch (e) {
            throw new Error(`findFilmData: ${e}`)
        }
    }

    async insertFilmData (data) {
        try {
            if (!data) throw new Error(`film data not specified`)
            const query = `
                INSERT INTO movies (
                    title,
                    year,
                    released,
                    poster,
                    country,
                    actors,
                    genre,
                    rating
                ) VALUES (?,?,?,?,?,?,?,?)
            `;
            const result = await myquery(query, [ 
                data.title,
                data.year,
                data.released,
                data.poster,
                data.country,
                data.actors,
                data.genre,
                data.rating
             ]);

            if (cb) cb(result);
            return result;
        } catch (e) {
            throw new Error(`insertFilmData: ${e}`)
        }
    }
}

module.exports = Mysql;

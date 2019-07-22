require('dotenv').config();

const path = require('path');
const fs = require('fs');

fastify = require('fastify')({
    logger: true,
    /*https: {
        key: fs.readFileSync(path.join(__dirname, '/certificate/', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '/certificate/', 'cert.pem'))
    }*/
});

module.exports = function (fastify, opts, next) {
    // Register sensible defaults
    fastify.register(require('fastify-sensible'));

    // Register PostgreSQL
    fastify.register(require('fastify-postgres'), {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        ssl: (process.env.DATABASE_USESSL.toLowerCase() == 'true')
    });

    // Register Swagger
    fastify.register(require('fastify-swagger'), {
        routePrefix: '/documentation',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Flooring API',
                description: 'REST API for Flooring',
                version: '1.0.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: process.env.HOST_AND_PORT,
            schemes: ['http'/*, 'https'*/],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    });

    // Register Static
    fastify.register(require('fastify-static'), {
        root: path.join(__dirname, 'public'),
        serve: false
    });

    // Register routes
    fastify.register(require('./routes'));

    next();
};
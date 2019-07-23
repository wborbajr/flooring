const path = require('path');
const fs = require('fs');

const fastify = require('fastify')({
    logger: true,
    /*https: {
        key: fs.readFileSync(path.join(__dirname, '/certificate/', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '/certificate/', 'cert.pem'))
    }*/
});

module.exports = function (fastify, opts, next) {
    // Register env variables
    const envOptions = {
        schema: {
            type: 'object',
            required: ['FASTIFY_ADDRESS', 'FASTIFY_PORT', 'URI_SCHEMES', 'HOST_AND_PORT', 'DATABASE_PORT', 'DATABASE_NAME', 'DATABASE_USER', 'DATABASE_PASSWORD', 'DATABASE_USESSL'],
            properties: {
                FASTIFY_ADDRESS: {
                    type: 'string',
                    default: '0.0.0.0'
                },
                FASTIFY_PORT: {
                    type: 'integer',
                    default: 3000
                },
                URI_SCHEMES: {
                    type: 'string',
                    default: 'http,https'
                },
                HOST_AND_PORT: {
                    type: 'string',
                    default: '127.0.0.1:3000'
                },
                DATABASE_PORT: {
                    type: 'integer',
                    default: 5432
                },
                DATABASE_NAME: {
                    type: 'string'
                },
                DATABASE_USER: {
                    type: 'string'
                },
                DATABASE_PASSWORD: {
                    type: 'string'
                },
                DATABASE_USESSL: {
                    type: 'boolean',
                    default: true
                }
            }
        }
    };
    fastify.register(require('fastify-env'), envOptions).ready((err) => { if (err) console.error(err) });

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
            schemes: process.env.URI_SCHEMES.split(','),
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
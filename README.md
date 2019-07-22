# Flooring

TODO:
* Use [fastify-postgres](https://github.com/fastify/fastify-postgres) instead of Massive - There's probably no real need for the overhead when all we need is simple queries.
* Implement JWT auth following <https://github.com/mcollina/fastify-auth-mongo-jwt> and <https://medium.com/@goldrydigital/an-authentication-strategy-for-restful-data-and-application-interfaces-built-with-fastify-c34ee661c0e>
* Fix error-handling using <https://www.fastify.io/docs/latest/Server/#setnotfoundhandler> (productController should then use the notFound text when textures cannot be loaded)
* Improve route handling - Get ideas from <https://github.com/czbas23/fastify-api/blob/master/routes/v1.js>
// MAYBE PUT dotenv IN OWN FASTIFY PLUGIN AND REGISTER IN app.js!!!!!!!!
require('dotenv').config();

// PRODUCT LIST CONTROLLERS

// Get all products
module.exports.getProducts = async (fastify, request, reply) => {
    try {
        const result = await fastify.pg.query('SELECT * FROM product');

        let json = {
            "base_url": 'http://' + process.env.HOST_AND_PORT + '/',
            "products": []
        };
        
        if (result.rows.length > 0)
            json.products = result.rows;

        return json;
    }
    catch (err) {
        throw fastify.httpErrors.internalServerError(err);
    }
};

// Get single product by ID
module.exports.getSingleProduct = async (fastify, request, reply) => {
    try {
        const result = await fastify.pg.query('SELECT * FROM product WHERE id=$1', [request.params.id]);

        if (result.rows.length < 1) {
            throw fastify.httpErrors.notFound('Product Not Found');
        }

        return result.rows;
    }
    catch (err) {
        throw fastify.httpErrors.internalServerError(err);
    }
};

// PRODUCT CRUD CONTROLLERS

// Add a new product
/*module.exports.addProduct = async (fastify, request, reply) => {
    
};

// Update an existing product
module.exports.updateProduct = async (fastify, request, reply) => {
    
};

// Delete a product
module.exports.deleteProduct = async (fastify, request, reply) => {
    
};*/

// PRODUCT TEXTURE CONTROLLERS
module.exports.getAlbedoTexture = function (fastify, request, reply) {
    reply.sendFile('textures/' + request.params.id + '/albedo.png');
};
module.exports.getNormalTexture = function (fastify, request, reply) {
    reply.sendFile('textures/' + request.params.id + '/normal.png');
};
module.exports.getAoTexture = function (fastify, request, reply) {
    reply.sendFile('textures/' + request.params.id + '/ao.png');
};
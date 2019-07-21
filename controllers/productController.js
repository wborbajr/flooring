// MAYBE PUT dotenv IN OWN FASTIFY PLUGIN AND REGISTER IN app.js!!!!!!!!
require('dotenv').config();

// PRODUCT LIST CONTROLLERS

// Get all products
module.exports.getProducts = async (fastify, request, reply) => {
    try {
        const result = await fastify.massive.product.find();

        let json = {
            "base_url": 'http://' + process.env.HOST_AND_PORT + '/',
            "products": []
        };

        json.products = result;

        return json;
    }
    catch (err) {
        throw fastify.httpErrors.internalServerError(err);
    }
};

// Get single product by ID
module.exports.getSingleProduct = async (fastify, request, reply) => {
    try {
        const id = request.params.id;
        const result = await fastify.massive.product.findOne(id);

        if (result === null) {
            throw fastify.httpErrors.notFound('Product Not Found');
        }

        return result;
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
// https://github.com/fastify/fastify-static
// FIX ERROR HANDLING USING https://www.fastify.io/docs/latest/Server/#setnotfoundhandler 
module.exports.getAlbedoTexture = async (fastify, request, reply) => {
    try {
        reply.sendFile('textures/' + request.params.id + '/albedo.png');
    }
    catch (err) {
        throw fastify.httpErrors.notFound('Texture Not Found');
    }
};
module.exports.getNormalTexture = async (fastify, request, reply) => {
    try {
        return reply.sendFile('textures/' + request.params.id + '/normal.png');
    }
    catch (err) {
        throw fastify.httpErrors.notFound('Texture Not Found');
    }
};
module.exports.getAoTexture = async (fastify, request, reply) => {
    try {
        reply.sendFile('textures/' + request.params.id + '/ao.png');
    }
    catch (err) {
        throw fastify.httpErrors.notFound('Texture Not Found');
    }
};
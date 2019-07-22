// Import controllers
/*const indexController = require('./controllers/indexController');
const userController = require('./controllers/userController');*/
const categoryController = require('./controllers/categoryController');
const productController = require('./controllers/productController');

async function routes (fastify, options) {
  // Index route
  /*fastify.get('/', async (request, reply) => {
    return indexController.getIndex(fastify, request, reply);
  });*/

  // User list routes
  /*fastify.get('/users', async (request, reply) => {
    return userController.getUsers(fastify, request, reply);
  });
  fastify.get('/users/:id', async (request, reply) => {
    return userController.getSingleUser(fastify, request, reply);
  });*/

  // User CRUD routes
  /*fastify.post('/users', async (request, reply) => {
    return userController.addUser(fastify, request, reply);
  });
  fastify.put('/users/:id', async (request, reply) => {
    return userController.updateUser(fastify, request, reply);
  });
  fastify.delete('/users/:id', async (request, reply) => {
    return userController.deleteUser(fastify, request, reply);
  });*/

  // Category list routes
  fastify.get('/categories', async (request, reply) => {
    return categoryController.getCategories(fastify, request, reply);
  });

  fastify.get('/categories/:id', {
    schema: {
      description: 'Get specific category',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Category ID'
          }
        }
      }
    }
  }, async (request, reply) => {
    return categoryController.getSingleCategory(fastify, request, reply);
  });

  // Category CRUD routes
  /*fastify.post('/categories', async (request, reply) => {
    return categoryController.addCategory(fastify, request, reply);
  });
  fastify.put('/categories/:id', async (request, reply) => {
    return categoryController.updateCategory(fastify, request, reply);
  });
  fastify.delete('/categories/:id', async (request, reply) => {
    return categoryController.deleteCategory(fastify, request, reply);
  });*/

  // Product list routes
  fastify.get('/products', async (request, reply) => {
    return productController.getProducts(fastify, request, reply);
  });

  fastify.get('/products/:id', {
      schema: {
        description: 'Get specific product',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Product ID'
            }
          }
        }
      }
    }, async (request, reply) => {
    return productController.getSingleProduct(fastify, request, reply);
  });

  // Product CRUD routes
  /*fastify.post('/products', async (request, reply) => {
    return productController.addProduct(fastify, request, reply);
  });
  fastify.put('/products/:id', async (request, reply) => {
    return productController.updateProduct(fastify, request, reply);
  });
  fastify.delete('/products/:id', async (request, reply) => {
    return productController.deleteProduct(fastify, request, reply);
  });*/

  // Product texture routes
  fastify.get('/products/:id/albedo', {
    schema: {
      description: 'Get albedo texture for specific product',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Product ID'
          }
        }
      }
    }
  }, function (request, reply) {
    productController.getAlbedoTexture(fastify, request, reply);
  });

  fastify.get('/products/:id/normal', {
    schema: {
      description: 'Get normal texture for specific product',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Product ID'
          }
        }
      }
    }
  }, function (request, reply) {
    productController.getNormalTexture(fastify, request, reply);
  });

  fastify.get('/products/:id/ao', {
    schema: {
      description: 'Get ao texture for specific product',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Product ID'
          }
        }
      }
    }
  }, function (request, reply) {
    productController.getAoTexture(fastify, request, reply);
  });
}

module.exports = routes;
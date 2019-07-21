// Get all categories
module.exports.getCategories = async (fastify, request, reply) => {
    try {
        const result = await fastify.massive.query(
            `SELECT C.name, array_agg(PC.product_id) product_ids
            FROM public.product_category PC
            RIGHT JOIN public.category C ON C.id = PC.category_id
            GROUP BY PC.category_id, C.name
            ORDER BY C.name`
        );

        let json = { "categories": [] };

        result.forEach(function (item) {
            let category = {};
            category[item['name']] = (item['product_ids'][0] != null) ? [item['product_ids']] : [];
            json.categories.push(category);
        });

        return json;
    }
    catch (err) {
        throw fastify.httpErrors.internalServerError(err);
    }
};

// Return products for single category
module.exports.getSingleCategory = async (fastify, request, reply) => {
    try {
        const id = request.params.id;
        const result = await fastify.massive.category.findOne(id);

        if (result === null) {
            throw fastify.httpErrors.notFound('Category Not Found');
        }

        return result;
    }
    catch (err) {
        throw fastify.httpErrors.internalServerError(err);
    }
};

/*
// Add a new category
module.exports.addCategory = async (fastify, request, reply) => {
    
};

// Update an existing category
module.exports.updateCategory = async (fastify, request, reply) => {
    
};

// Delete a category
module.exports.deleteCategory = async (fastify, request, reply) => {
    
}
*/
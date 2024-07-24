const Product = require('../models/productModel');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (error) { 
            console.log(error)
            res.status(500).json({ error: 'Failed to fetch products',error });
        }
    },

    getProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.getById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    },

    createProduct: async (req, res) => {
        const { name, description, price, category_id } = req.body;
        try {
            const productId = await Product.create(name, description, price, category_id);
            res.status(201).json({ id: productId, name, description, price, category_id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to create product' });
        }
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { name, description, price, category_id } = req.body;
        try {
            const affectedRows = await Product.update(id, name, description, price, category_id);
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ id, name, description, price, category_id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to update product' });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Product.delete(id);
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
};

module.exports = productController;

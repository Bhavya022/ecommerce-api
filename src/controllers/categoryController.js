const Category = require('../models/categoryModel');

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    },

    getCategoryById: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Category.getById(id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch category' });
        }
    },

    createCategory: async (req, res) => {
        const { name } = req.body;
        try {
            const categoryId = await Category.create(name);
            res.status(201).json({ id: categoryId, name });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create category' });
        }
    },

    updateCategory: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const affectedRows = await Category.update(id, name);
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json({ id, name });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update category' });
        }
    },

    deleteCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Category.delete(id);
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete category' });
        }
    }
};

module.exports = categoryController;

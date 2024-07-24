const db = require('../utils/db');

const Category = {
    getAll: async () => {
        const [categories] = await db.query('SELECT * FROM categories');
        return categories;
    },

    getById: async (id) => {
        const [category] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
        return category[0];
    },

    create: async (name) => {
        const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, name) => {
        const [result] = await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Category;

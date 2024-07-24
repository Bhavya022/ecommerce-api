const db = require('../utils/db');

const Product = {
    getAll: async () => {
        const [products] = await db.query('SELECT * FROM products');
        return products;
    },

    getById: async (id) => {
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return product[0];
    },

    create: async (name, description, price, category_id) => {
        const [result] = await db.query(
            'INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)',
            [name, description, price, category_id]
        );
        return result.insertId;
    },

    update: async (id, name, description, price, category_id) => {
        const [result] = await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?',
            [name, description, price, category_id, id]
        );
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Product;

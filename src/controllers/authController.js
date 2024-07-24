const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const authController = {
    register: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const userId = await User.create(username, email, password);
            res.status(201).json({ id: userId, username, email });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Registration failed',error });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'kt', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Login failed',error });
        }
    },
    profile: async (req, res) => {
        const userId = req.user.userId;
        try {
            const user = await User.findById(userId);
            res.json({ id: user.id, username: user.username, email: user.email });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Fetching profile failed',error });
        }
    }
};

module.exports = authController;

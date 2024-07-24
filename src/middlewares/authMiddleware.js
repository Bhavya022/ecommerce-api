const jwt = require('jsonwebtoken');
const dotenv = require('dotenv') 
dotenv.config();
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'kt') ;
        req.user = verified;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Invalid token',error });
    }
};

module.exports = authMiddleware;

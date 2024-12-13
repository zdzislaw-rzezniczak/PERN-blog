const jwt = require('jsonwebtoken');

const createSecretToken = (userId, isAdmin) => {
    const payload = {
        id: userId,
        isAdmin: isAdmin, // Dodaj isAdmin
    };

    return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '1d' });
};


module.exports = {createSecretToken}
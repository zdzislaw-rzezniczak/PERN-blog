const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const env = require('dotenv');

env.config();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        const user = data.rows[0]; // Zakładamy, że email jest unikalny

        // console.log(user);
        if (!user) {
            return res.status(400).json({
                error: 'User is not registered, please sign up first.',
            });
        }

        // Porównanie hasła
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(400).json({
                error: 'Incorrect password!',
            });
        }

        // console.log('User data for token:', { email: user.email, admin: user.isadmin, passwd: user.passwordHash });


        // Generowanie tokena JWT
        const token = jwt.sign(
            { email: user.email, isAdmin: user.isadmin,  },
            process.env.TOKEN_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'User signed in!',
            token: token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            error: 'Database error occurred while signing in!',
        });
    }
};

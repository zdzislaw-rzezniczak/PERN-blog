const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Brakowało w Twoim kodzie
const pool = require('../db'); // Upewnij się, że masz poprawne połączenie z bazą danych
const env = require('dotenv');

env.config();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Sprawdź, czy użytkownik istnieje
        const data = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        const user = data.rows[0]; // Zakładamy, że email jest unikalny

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

        // Generowanie tokena JWT
        const token = jwt.sign(
            { email: user.email },
            process.env.TOKEN_KEY,
            { expiresIn: '1h' } // Opcjonalne: ustal czas wygaśnięcia tokena
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

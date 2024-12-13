const pool = require('../db');
const queries = require("../querries/querries");
const bcrypt = require('bcryptjs');


const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}


const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserByID, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const deleteUser = (req, res) => {

    const id = parseInt(req.params.id);
    pool.query(queries.deleteUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json("User deleted successfully.");
    })
}

const createUser = async (request, response) => {
    try {
        const { firstName, email, password } = request.body;

        if (!firstName || !email || !password) {
            return response.status(400).json({ error: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        console.log('Values:', [firstName, email, passwordHash]);

        const results = await pool.query(queries.createUser, [firstName, email, passwordHash]);

        response.status(201).json({ message: "User added", userId: results.insertId });
    } catch (error) {
        console.error("Error creating user:", error);


        if (error.code === "23505") {
            return response.status(409).json({ error: "Email already exists" });
        }

        response.status(500).json({ error: "Internal server error" });
    }
};



module.exports = {
    getUsers,
    getUsersById,
    createUser,
    deleteUser
}
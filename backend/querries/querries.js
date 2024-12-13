const getUsers = "SELECT * FROM users";
const getUserByID = "SELECT * FROM users WHERE id = $1";
const createUser = "INSERT INTO users (\"firstName\", email, \"passwordHash\") VALUES ($1, $2, $3)"
const deleteUserById = "DELETE FROM users WHERE id = $1";


module.exports = {
    getUserByID,
    getUsers,
    createUser,
    deleteUserById
}
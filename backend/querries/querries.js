////USER QUERIES

const getUsers = "SELECT * FROM users";
const getUserByID = "SELECT * FROM users WHERE id = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const createUser = "INSERT INTO users (\"firstName\", email, \"passwordHash\") VALUES ($1, $2, $3)"
const createAdmin = "INSERT INTO users (\"firstName\", email, \"passwordHash\", isAdmin) VALUES ($1, $2, $3, true)"
const deleteUserById = "DELETE FROM users WHERE id = $1";


//// POSTS QUERIES

const getPosts = "SELECT * FROM posts";
const getPostByID = "SELECT * FROM posts WHERE id = $1";
const createPost = "INSERT INTO posts (authorid, title, slug, createdat, content) VALUES ($1, $2, $3, $4, $5);";
const deletePost = "DELETE FROM posts WHERE id = $1";


const getComments = "SELECT * FROM post_comments;";
const getCommentByID = "SELECT * FROM post_comments WHERE id = $1";
const createComment = "INSERT INTO post_comments (\"post_id\", \"created_at\", content, author) VALUES ($1, $2, $3, $4);";
const deleteComment = "DELETE FROM post_comments WHERE id = $1";
const getCommentsByAuthor = "SELECT * FROM post_comments WHERE author = $1";
const getCommentByPostId = "SELECT * FROM post_comments WHERE post_id = $1";

const getPostsByAuthorId = "SELECT * FROM posts WHERE authorid = $1";

module.exports = {
    getUserByID,
    getUsers,
    createUser,
    deleteUserById,
    getUserByEmail,
    createAdmin,

    getPosts,
    getPostByID,
    createPost,
    deletePost,

    getComments,
    getCommentByID,
    createComment,
    deleteComment,
    getCommentsByAuthor,
    getPostsByAuthorId,
    getCommentByPostId,


}
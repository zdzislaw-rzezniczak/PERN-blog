const pool = require('../db');
const queries = require("../querries/querries");
const {verify} = require("jsonwebtoken");
const slugify = require('slugify');


const getPosts = (req, res) => {
    pool.query(queries.getPosts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}


const getPostById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPostByID, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const createPost = async (req, res) => {
    const {title, content} = req.body;
    const createdAt = new Date().toISOString()
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({success: false, message: "Token missing or invalid"});
    }
    let decoded;
    try {
        decoded = verify(token, process.env.TOKEN_KEY);
    } catch (error) {
        return res.status(403).json({success: false, message: "Token is invalid", error});
    }

    const slug = slugify(title, {lower: true,})

    const authorId = decoded.id
    // console.log(title, content, createdAt, authorId, slug);


    const result = await pool.query(queries.createPost, [authorId, title, slug, createdAt, content])
    return res.status(200).json({msg: "post created", content: result})
}



const deletePost = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {

        const result = await pool.query(queries.getPostByID, [id]);
        const post = result.rows[0];

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Usuwanie posta
        await pool.query(queries.deletePost, [id]);
        return res.status(200).json({ msg: "Post deleted" });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};


module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost
}
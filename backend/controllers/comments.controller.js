const pool = require('../db');
const queries = require("../querries/querries");
const {verify} = require("jsonwebtoken");


const getComments = (req, res) => {
    pool.query(queries.getComments, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}


const getCommentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCommentByID, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getCommentByPostId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCommentByPostId, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const createComment = async (req, res) => {
    const {post_id, content} = req.body;
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
    const authorId = decoded.id

    await pool.query(queries.createComment, [post_id, createdAt, content, authorId])
    return res.status(200).json({msg: "Comment created"})

}


const deleteComment = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(querries.deleteComment, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({success: false, message: "Comment deleted successfully."});
    })

}

const getCommentsByAuthor  = async (req, res) => {
    const authorId = parseInt(req.params.id);
    pool.query(queries.getCommentsByAuthor, [authorId], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}






module.exports = {
    getComments,
    getCommentById,
    createComment,
    deleteComment,
    getCommentsByAuthor,
    getCommentByPostId
}
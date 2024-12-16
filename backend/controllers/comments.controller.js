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


const createComment = async (req, res) => {
    const {post_id, content} = req.body;
    const createdAt = new Date().toISOString()

    let decoded;
    try {
        decoded = verify(token, process.env.TOKEN_KEY);
    } catch (error) {
        return res.status(403).json({success: false, message: "Token is invalid", error});
    }
    const authorId = decoded.id

    const result = await pool.query(queries.createComment, [post_id, createdAt, content, authorId])
    return res.status(200).json({msg: "post created", content: result})

}


const deleteComment = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(querries.deleteComment, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({success: false, message: "Comment deleted successfully."});
    })

}






module.exports = {
    getComments,
    getCommentById,
    createComment,
    deleteComment,
}
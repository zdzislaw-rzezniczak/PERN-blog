const {Router} = require('express');
const router = Router();
const controller = require('../controllers/comments.controller');
const {verifyToken} = require("../middleware/jwt.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");

router.get('/', controller.getComments);
router.get('/:id', controller.getCommentById);
router.post('/', verifyToken, controller.createComment);
router.delete('/:id', isAdmin, controller.deleteComment)
router.get('/author/:id', controller.getCommentsByAuthor)
router.get('/post/:id', controller.getCommentByPostId)




module.exports = router;
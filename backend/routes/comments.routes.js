const {Router} = require('express');
const router = Router();
const controller = require('../controllers/comments.controller');
const {verifyToken} = require("../middleware/jwt.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");

router.get('/', controller.getComments);
router.get('/:id', verifyToken, controller.getCommentById);
router.post('/', verifyToken, controller.createComment);
router.delete('/:id', isAdmin, controller.deleteComment)





module.exports = router;
const {Router} = require('express');
const router = Router();
const controller = require('../controllers/posts.controller');
const {verifyToken} = require("../middleware/jwt.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");

router.get('/', controller.getPosts);
router.get('/:id', verifyToken, controller.getPostById);
router.post('/createPost', verifyToken, controller.createPost);
router.delete('/deletePost/:id', isAdmin, controller.deletePost)





module.exports = router;
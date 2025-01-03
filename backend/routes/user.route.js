const {Router} = require('express');
const router = Router();
const controller = require('../controllers/user.controller');
const {verifyToken} = require("../middleware/jwt.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");

router.get('/', controller.getUsers);
router.get('/:id', controller.getUsersById);
router.post('/', controller.createUser);
router.delete('/:id', isAdmin, controller.deleteUser)
router.get('/posts/:id', controller.getPostsByAuthorId)





module.exports = router;
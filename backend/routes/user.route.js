const {Router} = require('express');
const router = Router();
const controller = require('../controllers/user.controller');
const {verifyToken} = require("../middleware/jwt.middleware");

router.get('/', verifyToken, controller.getUsers);
router.get('/:id', verifyToken, controller.getUsersById);
router.post('/createUser', verifyToken, controller.createUser);
router.delete('/deleteUser/:id', verifyToken, controller.deleteUser)





module.exports = router;
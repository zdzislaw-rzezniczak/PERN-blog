const {Router} = require('express');
const router = Router();
const controller = require('../controllers/user.controller');
const {verifyToken} = require("../middleware/jwt.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");

router.get('/', isAdmin, controller.getUsers);
router.get('/:id', isAdmin, controller.getUsersById);
router.post('/createUser', controller.createUser);
router.delete('/deleteUser/:id', isAdmin, controller.deleteUser)





module.exports = router;
const express = require("express");

const {login} = require("../auth/login");
const {verifyToken} = require("../middleware/jwt.middleware");

const router = express.Router();


router.post("/login",  login);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});
module.exports = router;
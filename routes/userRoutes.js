const express = require("express");
const { registerAPI, loginAPI } = require("../controller/userController");


const router = express.Router();


router.post("/register",registerAPI );
router.post("/login",loginAPI);

module.exports = router;

const express = require("express");
const router = express.Router();
const UsersController = require("../controller/adminController");
const admin = require("../middleware/auth").superAdmin;
router.put("/",admin,UsersController.createAdmin);

module.exports = router;
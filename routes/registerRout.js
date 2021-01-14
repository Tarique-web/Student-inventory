const express = require("express");
const router = express.Router();
const UsersController = require("../controller/registerController");
const userAuth = require('../middleware/auth').userAuth;
router.post("/", UsersController.register);
router.put("/update",userAuth,UsersController.updateRegister)
router.delete("/delete",userAuth,UsersController.deleteRegister);
router.get("/profile",userAuth,UsersController.getProfile);
module.exports = router;
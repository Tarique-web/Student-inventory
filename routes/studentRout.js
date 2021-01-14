const express = require("express");
const router = express.Router();
const UsersController = require("../controller/studentController");
const admin = require("../middleware/auth").Admin;
const userAuth = require('../middleware/auth').userAuth;
router.post("/", admin,UsersController.student);
router.put("/update",admin,UsersController.updateStudentsDetails)
router.delete("/delete",admin,UsersController.deleteStudentDetails);
router.get("/getDetails",admin,UsersController.getStudentDetails);
router.get("/getAll",admin,UsersController.getAllStudentDetails);

//logged user can see his student profile
router.get("/profile",userAuth,UsersController.studentDetails);
module.exports = router;
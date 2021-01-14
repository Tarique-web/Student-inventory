
const jwt = require("jsonwebtoken");
const userModel = require("../models/studentModel")

//create student details
exports.student = async (req, res) => {
    /**
        * Request Validation
        */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    if (!req.body.name || req.body.name == "") {
        return res.status(400).send({
            message: "name  can not be empty",
            status: 400
        });
    }

    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }
    if (!req.body.mobile || req.body.mobile == "") {
        return res.status(400).send({
            message: "User mobile can not be empty",
            status: 400
        });
    }
    if (!req.body.DOB || req.body.DOB == "") {
        return res.status(400).send({
            message: "DOB can not be empty",
            status: 400
        });
    }
    if (!req.body.qualification || req.body.qualification == "") {
        return res.status(400).send({
            message: "qualification can not be empty",
            status: 400
        });
    }

    userModel.findOne({ $or: [{ "email": req.body.email }, { "mobile": req.body.mobile }] })
        .then((data) => {
            if (data) {
                res.send({
                    message: 'Student  already created',
                    status: 200
                });

            } else {

                userModel
                    .save(req.body)
                    .then((data) => {

                        res.setHeader('content-type', 'application/json');
                        res.send({
                            success: "successfully!.. Student created",
                            id: data._id,
                            name: data.name,
                            status: 200
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err || "Some error occurred while creating the account.",
                            status: 500
                        });
                    });
            }

        }).catch((err) => {
            res.status(500).send({
                message: err || "Some error occurred while finding users account.",
                status: 500
            });
        })


}

// student profile updating by email or mobile

exports.updateStudentsDetails = (req, res) => {
    /**
      * Request Validation
      */

    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "studentController": "updatestudents:request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }

    if ((!req.body.email || req.body.email == "") && (!req.body.mobile || req.body.mobile == "")) {
        return res.status(400).send({
            message: "Email & Mobile can not be empty",
            status: 400
        });
    }

    userModel.findOneAndUpdate({ $or: [{ "email": req.body.email }, { "mobile": req.body.mobile }] }, req.body, { new: true })

        .then((data) => {
            res.status(200).send({
                message: "successfully!.. student profile is updated",
                name: data.name,
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: err || "student not found",
                status: 500
            })
        })

}

// student profile deleting by email or mobile
exports.deleteStudentDetails = (req, res) => {
      /**
      * Request Validation
      */

     if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "studentController": "deleteStudentDetailsstudents:request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }

    if ((!req.body.email || req.body.email == "") && (!req.body.mobile || req.body.mobile == "")) {
        return res.status(400).send({
            message: "Email & Mobile can not be empty",
            status: 400
        });
    }


    userModel.findOne({ $or: [{ "email": req.body.email }, { "mobile": req.body.mobile }] })
        .remove().then(() => {
            res.status(200).send({
                message: "successfully your account is deleted",
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: message.err || "user not found",
                status: 500
            })
        })

}

//logged student see his profile
exports.getStudentDetails = async (decode, req, res, next) => {

    userModel.findOne({ $or: [{ "email": decode.email }, { "mobile": decode.mobile }] }).then((user) => {

        if (!user) {
            return res.status(404).send({
                message: "user not found",
                status: 404,
            });
        }
        res.status(200).send({
            message: user,
            status: 200,
        });


    }).catch((err) => {
        res.status(500).send({
            message: err || "user not found",
            status: 500
        })
    })

}

//admin can get all students profile
exports.getAllStudentDetails = async (req, res) => {

    userModel.find().then((user) => {

        if (!user) {
            return res.status(404).send({
                message: "user not found",
                status: 404,
            });
        }
        res.status(200).send({
            message: user,
            status: 200,
        });


    }).catch((err) => {
        res.status(500).send({
            message: "user not found" || err,
            status: 500
        })
    })

}

//admin can get student profile by email or mobile
exports.studentDetails = async (req, res) => {
      /**
      * Request Validation
      */

     if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "studentController": "studentDetails:request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }

    if ((!req.body.email || req.body.email == "") && (!req.body.mobile || req.body.mobile == "")) {
        return res.status(400).send({
            message: "Email & Mobile can not be empty",
            status: 400
        });
    }

    userModel.findOne({ $or: [{ "email": req.body.email }, { "mobile": req.body.mobile }] }).then((user) => {

        if (!user) {
            return res.status(404).send({
                message: "user not found",
                status: 404,
            });
        }
        res.status(200).send({
            message: user,
            status: 200,
        });


    }).catch((err) => {
        res.status(500).send({
            message: err || "user not found",
            status: 500
        })
    })

}
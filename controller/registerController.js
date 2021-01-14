const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/registerModel")

exports.register = async (req, res) => {
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
    if (!req.body.password || req.body.password == "") {
        return res.status(400).send({
            message: "password can not be empty",
            status: 400
        });
    }

    //hashing password
    const hash = await bcrypt.hashSync(req.body.password, 10);

    const Users = new userModel({

        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hash

    });

    userModel.findOne({ $or: [{ "email": Users.email }, { "mobile": Users.mobile }] })
        .then((data) => {
            if (data) {
                res.send({
                    message: 'Your account already created',
                    status: 200
                });

            } else {
                console.log(Users);
                Users
                    .save()
                    .then((data) => {

                        res.setHeader('content-type', 'application/json');
                        res.send({
                            success: "you are successfully  account created",
                            id: data._id,
                            name: data.name,
                            status: 200
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err|| "Some error occurred while creating the account.",
                            status: 500
                        });
                    });
            }

        }).catch((err) => {
            res.status(500).send({
                message: err|| "Some error occurred while finding users account.",
                status: 500
            });
        })


}

//user updating his account
exports.updateRegister = (decode, req, res, next) => {


    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "updateRegister:request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }

    userModel.findOneAndUpdate({ $or: [{ "email": decode.email }, { "mobile": decode.mobile }] }, req.body, { new: true })
        .then((data) => {
            res.status(200).send({
                message: "successfully your account is updated",
                name: data.name,
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: err || "user not found",
                status: 500
            })
        })

}

// // User can delete his register account
exports.deleteRegister = (decode, req, res, next) => {



    userModel.findOne({ $or: [{ "email": decode.email }, { "mobile": decode.mobile }] })
        .remove().then(() => {
            res.status(200).send({
                message: "successfully your account is deleted",
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: err || "user not found",
                status: 500
            })
        })

}

// logged user can see his profile
exports.getProfile = async (decode, req, res, next) => {


    userModel.findOne({ $or: [{ "email": decode.email }, { "mobile": decode.mobile }] }).select(["-password"]).then((user) => {

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
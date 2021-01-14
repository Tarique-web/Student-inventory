const jwt = require('jsonwebtoken');
const userModel = require("../models/registerModel");

// Create Admin

exports.createAdmin = (req, res) => {
    /**
        * Request Validation
        */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        return res.status(400).send({
            message: "adminContoller: createAdmin: Request body can not be empty",
            status: 400
        });
    }

    if ((!req.body.email || req.body.email == "") && (!req.body.mobile || req.body.mobile == "")) {
        return res.status(400).send({
            message: "Email & Mobile can not be empty",
            status: 400
        });
    }
    if (!req.body.status || req.body.status == "") {
        return res.status(400).send({
            message: "status can not be empty",
            status: 400
        });

    }


    userModel.findOneAndUpdate({ $or: [{ "email": req.body.email }, { "mobile": req.body.mobile }] }, (req.body), { new: true })
        .then((data) => {
            res.status(200).send({
                message: `successfully!  ${data.name} is Admin`,
                status: 200
            })
        }).catch((err) => {
            res.status(404).send({
                message: "user not found" || err,
                status: 404
            })
        })



}
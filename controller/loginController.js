const userModel = require("../models/registerModel")
const jwt = require("jsonwebtoken"); // jsonwebtoken module for create token
const bcrypt = require("bcryptjs");

exports.login =  (req, res) => {
    /**
         * Request Validation
         */
    if (!req.body || JSON.stringify(req.body) == "{}") {
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

    if (!req.body.password || req.body.password == "") {
        return res.status(400).send({
            message: "password can not be empty",
            status: 400
        });
    }


    // login through email or mobile no
    userModel.findOne({ $or: [{ "email": req.body.email }, { "mobile": req.body.mobile }] })
        .then(async (user) => {
        
            if (user) {

                const isMatch = await bcrypt.compare(req.body.password, user.password);

                if (isMatch) {
                    let token = jwt.sign({ email: user.email, mobile: user.mobile, status: user.status}, process.env.SECRET_KEY, {
                        expiresIn: "7 days",
                    }); // create token here and it will expire in 7 days
                    res.cookie("token", token);
                    res.setHeader("content-type", "application/json");
                    return res.send({
                        name: user.name,
                        message: "login successfully",
                        status: 200,
                        
                    });
                } else {
                    return res.status(400).send({
                        message: "Invalid Password"
                    });
                } 

            }

            res.status(400).send({
                message: "This user doesn't exists! please register it.....",
                status: 400
            });


        }).catch((err) => {
            res.status(500).send({
                message: err,
                status: 500
            })
        })

}

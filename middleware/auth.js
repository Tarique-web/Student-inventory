const jwt = require("jsonwebtoken");

//user Auth for jwt verifying
function userAuth(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        jwt.verify(token.slice(6), process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(400).send({
                    message: err,
                    status: 400
                });
            }
            next(decode);
        });
    } else {
        res.send("login please !");
    }
}


// super admin
function superAdmin(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        jwt.verify(token.slice(6), process.env.SECRET_KEY, (err, decode) => {

            if (!err) {
                if (decode.email == process.env.SUPER_ADMIN) {
                    next()


                } else {
                    return res.status(401).send({
                        message: "Sorry! You are not SuperAdmin",
                        status: 401
                    })
                }
            } else {
                return res.status(500).send({
                    message: "Some error occurred while verify admin account." || err,
                    status: 500
                })
            }
        })
    } else {
        return res.status(401).send({
            message: "Login Please!",
            status: 401
        })
    }

}
//admin
function Admin(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        jwt.verify(token.slice(6), process.env.SECRET_KEY, (err, decode) => {

            if (!err) {
                if ((decode.status == "admin") || (decode.email == process.env.SUPER_ADMIN)) {
                    next()

                } else {
                    return res.status(401).send({
                        message: "Sorry! You are not Admin",
                        status: 401
                    })
                }
            } else {
                return res.status(500).send({
                    message: "Some error occurred while verify admin account." || err,
                    status: 500
                })
            }
        })
    } else {
        return res.status(401).send({
            message: "Login Please!",
            status: 401
        })
    }

}
module.exports = {
    userAuth,
    superAdmin,
    Admin
};
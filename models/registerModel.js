const mongoose = require("../config/db");
const schema = new mongoose.Schema(

    {
        name: {
            desc: "The user's name.",
            trim: true,
            type: String,
            required: true,
        },
        email: {
            desc: "The user's email address.",
            trim: true,
            type: String,
            index: true,
            unique: true,

        },
        mobile: {
            desc: "The user's mobile no",
            trim: true,
            type: Number,
            unique: true
        },
        password: {
            desc: "the user's password",
            trim: true,
            type: String,
            required: true

        },
        status: {
            desc : "the users account's type", //user is admin or not
            trim: true,
            type: String,

        }
    },
    {
        strict: false,
        versionKey: false,
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }

)
module.exports = mongoose.model("signup", schema);

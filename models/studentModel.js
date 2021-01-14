const mongoose = require("../config/db");
const schema = new mongoose.Schema(

    {
        name: {
            desc: "The student's name.",
            trim: true,
            type: String,
            required: true,
        },
        email: {
            desc: "The student's email address.",
            trim: true,
            type: String,
            index: true,
            unique: true,

        },
        qualification: {
            desc: "The students qualifiaction",
            trim: true,
            type: String,
        },
        DOB: {
            desc: "the student's password",
            trim: true,
            type: String,
            required: true

        },
        mobile: {
            desc: "the student's mobile no",
            trim: true,
            type: Number,
            required: true

        }
    },
    {
        strict: false,
        versionKey: false,
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }

)
module.exports = mongoose.model("students", schema);

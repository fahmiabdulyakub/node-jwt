const perf = require("execution-time")();
const { success200, error403, error500 } = require("../response");
const AuthModel = require("../model/AuthModel");
const yup = require("yup");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.AuthRegister = (req, res) => {
    perf.start();
    const schemaInput = yup.object().shape({
        nama_user: yup.string().required("Invalid parameter nama"),
        email: yup.string().required("Invalid parameter email").email("Email tidak valid"),
        username: yup.string().required("Invalid parameter username"),
        password: yup.string().required("Invalid parameter password").min(6, "Password minimal 6 karakter")
    })

    schemaInput.validate(req.body).catch(error => {
        const time = perf.stop().time.toFixed(2);
        error403(error.errors[0], time, req, res);
    }).then(payload => {
        if (payload) {
            AuthModel.findOne({
                $or: [
                    { email: payload.email },
                    { username: payload.username }
                ]
            }).exec().catch(error => {
                const time = perf.stop().time.toFixed(2);
                error500(error, time, req, res);
            }).then(result => {
                if (!result) {
                    new AuthModel(payload).save().catch(error => {
                        const time = perf.stop().time.toFixed(2);
                        error500(error, time, req, res);
                    }).then(() => {
                        const data = { message: "Success insert data" };
                        const time = perf.stop().time.toFixed(2);
                        success200(data, time, req, res);
                    })
                } else {
                    const message = "Username atau email sudah terdaftar";
                    const time = perf.stop().time.toFixed(2);
                    error403(message, time, req, res);
                }
            })
        }
    })
}

exports.AuthLogin = (req, res) => {
    perf.start();
    const dateToken = moment(new Date()).add(7, "days").format("YYY-MM-DD HH:mm:ss");

    const schemaInput = yup.object().shape({
        user: yup.string().required("Invalid parameter user"),
        password: yup.string().required("Invalid parameter password").min(6, "Password minimal 6 karakter")
    })

    schemaInput.validate(req.body).catch(error => {
        const time = perf.stop().time.toFixed(2);
        error403(error.errors[0], time, req, res);
    }).then(payload => {
        if (payload) {
            AuthModel.findOne({
                $or: [
                    { email: payload.user },
                    { username: payload.user }
                ]
            }).exec().catch(error => {
                const time = perf.stop().time.toFixed(2);
                error500(error, time, req, res);
            }).then(result => {
                if (!result) {
                    const message = "Username atau email tidak terdaftar";
                    const time = perf.stop().time.toFixed(2);
                    error403(message, time, req, res);
                } else {
                    if (payload.password !== result.password) {
                        const message = "Password anda salah";
                        const time = perf.stop().time.toFixed(2);
                        error403(message, time, req, res);
                    } else {
                        delete result._doc.password
                        const tokenData = {
                            ...result._doc,
                            token_time: dateToken
                        }
                        const token = jwt.sign(tokenData, process.env.JWT_KEY);
                        const time = perf.stop().time.toFixed(2);
                        success200({ message: "success login", token: token }, time, req, res);
                    }
                }
            })
        }
    })
}
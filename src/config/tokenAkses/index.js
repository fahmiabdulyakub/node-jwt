const perf = require("execution-time")();
const { error401 } = require("../../response");

exports.token = (req, res, next) => {
    perf.start();
    const token = req.headers.authorization;
    if (token) {
        if (token === process.env.TOKEN_LOGIN) {
            next();
        } else {
            const message = "token tidak valid!";
            const time = perf.stop().time.toFixed(2);
            error401(message, time, req, res);
        }
    } else {
        const message = "invalid parameter token!";
        const time = perf.stop().time.toFixed(2);
        error401(message, time, req, res);
    }
}
const cors = require("cors");
const { AuthRegister, AuthLogin } = require("../../controller/AuthController");
const { databaseMongo } = require("../database");
const { token } = require("../tokenAkses");

module.exports = (app) => {
    app.use(cors());
    app.use(token);
    app.use(databaseMongo);

    app.route("/service/auth/register").post(AuthRegister);
    app.route("/service/auth/login").post(AuthLogin);
}
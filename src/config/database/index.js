const mongoose = require("mongoose");
const { error500 } = require("../../response");
const perf = require("execution-time")();

// const authConnect = "mongodb://febriuser:test1234@localhost:3000/febrisyk?authSource=admin";
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
const mongo = mongoose.connect(process.env.DATABASE_MONGO);

exports.databaseMongo = (req, res, next) => {
    perf.start();

    mongo.catch(error => {
        const time = perf.stop().time.toFixed(2);
        error500(error, time, req, res)
    }).then(() => {
        next();
    })
}
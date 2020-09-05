require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./src/config/route");

const app = express();
const port = process.env.SERVER_PORT || 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
route(app);

app.listen(port, () => {
    console.log("Server running on PORT " + port);
})

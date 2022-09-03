const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");



app.use(express.json());
app.use(cookieParser());

const properti = require("./routers/PropertiRouters");
const user = require("./routers/UserRouters");
const indekos = require("./routers/IndekosRouters");

app.use("/api/v2", properti);
app.use("/api/v2", user);
app.use("/api/v2", indekos);

app.use(ErrorHandler);

module.exports = app;

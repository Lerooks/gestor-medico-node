const express = require("express");

const app = express();
const router = require("./src/routes/router");
require("./src/database");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const port = process.env.NODE_LOCAL_PORT || 3000;

app.listen(port, () => {
	console.log(`Worker: process ${process.pid} is up on port ${port}`);
});

module.exports = app;
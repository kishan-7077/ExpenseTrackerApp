require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const MONGO_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT;

mongoose.connect(MONGO_URL).then(() => console.log("DB connected"));

const app = express();

app.use(bodyParser.json());
app.use(cors());

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

app.listen(PORT, (req, res) => {
	console.log(`Listning to port : ${PORT}`);
});

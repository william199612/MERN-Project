const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;

// Connect to MongoDB
mongoose
	.connect("mongodb://localhost:27017/mernDB")
	.then(() => {
		console.log("Connecting to MongoDB...");
	})
	.catch((err) => {
		console.log("MongoDB Error: " + err);
	});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
// only logged in users can create course or enroll courses
// protected by jwt routes
// if request header doesnt contain jwt, it will be considered as unauthorized
app.use(
	"/api/courses",
	passport.authenticate("jwt", { session: false }),
	courseRoute
);

app.listen(8080, () => {
	console.log("Server running on port 8080...");
});

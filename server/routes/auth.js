const router = require("express").Router();
const jwt = require("jsonwebtoken");

const registerValidation =
	require("../validation").registerValidation;
const loginValidation =
	require("../validation").loginValidation;
const User = require("../models").user;

router.use((req, res, next) => {
	console.log("Receiving auth request...");
	next();
});

router.get("/testAPI", (req, res) => {
	return res.send(
		"Successfully connected to auth route..."
	);
});

router.post("/register", async (req, res) => {
	console.log("Registering user...");
	// validate user register info
	let { error } = registerValidation(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	// validate email existed
	const emailExist = await User.findOne({
		email: req.body.email,
	});
	if (emailExist)
		return res.status(400).send("Email already existed!");

	// create new user
	let { username, email, password, role } = req.body;
	let newUser = new User({
		username,
		email,
		password,
		role,
	});
	try {
		let savedUser = await newUser.save();
		return res.status(201).send({
			msg: "User saved successfully",
			savedUser,
		});
	} catch (e) {
		return res.status(500).send("Cannot save user...");
	}
});

router.post("/login", async (req, res) => {
	// validate user register info
	let { error } = loginValidation(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	// validate email existed
	const foundUser = await User.findOne({
		email: req.body.email,
	});
	if (!foundUser)
		return res
			.status(401)
			.send(
				"Cannot find user, please check your email address or use another email."
			);

	foundUser.comparePassword(
		req.body.password,
		(err, isMatch) => {
			if (err) return res.status(500).send(err);

			if (isMatch) {
				// create jwt token
				const tokenObject = {
					_id: foundUser._id,
					email: foundUser.email,
				};
				const token = jwt.sign(
					tokenObject,
					process.env.PASSPORT_SECRET
				);
				return res.send({
					message: "Login successfully",
					token: "JWT " + token,
					user: foundUser,
				});
			} else {
				return res
					.status(401)
					.send("Password incorrect, please try again.");
			}
		}
	);
});

module.exports = router;

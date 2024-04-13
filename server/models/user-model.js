const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	email: {
		type: String,
		required: true,
		minLength: 6,
		maxLength: 50,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 50,
	},
	role: {
		type: String,
		required: true,
		enum: ["student", "instructor"],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// instance methods
userSchema.methods.isStudent = function () {
	return this.role == "student";
};

userSchema.methods.isInstructor = function () {
	return this.role == "instructor";
};

userSchema.methods.comparePassword = async function (
	password,
	callback
) {
	let result;
	try {
		result = await bcrypt.compare(password, this.password);
		return callback(null, result);
	} catch (e) {
		return callback(e, result);
	}
};

// mongoose middlewares
// if new user or changing password, hash the password
// is use arrow func, it wont know what "this" is
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		// password hash
		const hashValue = await bcrypt.hash(this.password, 10);
		this.password = hashValue;
	}
	next();
});

module.exports = mongoose.model("User", userSchema);

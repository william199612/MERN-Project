const router = require("express").Router();
const Course = require("../models").course;
const courseValidation =
	require("../validation").courseValidation;

router.use((req, res, next) => {
	console.log("Course route receiving request...");
	next();
});

// get all courses
router.get("/", async (req, res) => {
	try {
		let foundCourses = await Course.find({})
			.populate("instructor", ["username", "email"])
			.exec();
		return res.status(200).send({
			message: "Courses found successfully",
			foundCourses,
		});
	} catch (e) {
		return res.status(500).send(e);
	}
});

// create courses
router.post("/", async (req, res) => {
	// validate
	let { error } = courseValidation(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	if (req.user.isStudent()) {
		return res
			.status(400)
			.send(
				"Only instructor is allowed to create course. If you are an instructor, please login with the instructor account."
			);
	}

	let { title, description, price } = req.body;

	try {
		let newCourse = new Course({
			title,
			description,
			price,
			instructor: req.user._id,
		});
		let savedCourse = await newCourse.save();
		return res.status(201).send({
			message: "New course created successfully",
			savedCourse,
		});
	} catch (e) {
		// console.log(e);
		return res.status(500).send("Cannot create course...");
	}
});

// get course by _id
router.get("/:_id", async (req, res) => {
	let { _id } = req.params;
	try {
		let foundCourse = await Course.findOne({ _id })
			.populate("instructor", ["username", "email"])
			.exec();
		return res.status(200).send({
			message: "Course retrieved successfully",
			foundCourse,
		});
	} catch (e) {
		return res.status(500).send(e);
	}
});

// get course by instructor id
router.get(
	"/instructor/:_instructor_id",
	async (req, res) => {
		let { _instructor_id } = req.params;
		try {
			let foundCourses = await Course.find({
				instructor: _instructor_id,
			})
				.populate("instructor", ["username", "email"])
				.exec();
			return res.status(200).send({
				message: "Course retrieved successfully",
				foundCourses,
			});
		} catch (e) {
			return res.status(500).send(e);
		}
	}
);

// get course by name
router.get("/search/:name", async (req, res) => {
	let { name } = req.params;
	try {
		let foundCourse = await Course.find({ title: name })
			.populate("instructor", ["username", "email"])
			.exec();
		return res.status(200).send({
			message: "Course retrieved successfully",
			foundCourse,
		});
	} catch (e) {
		return res.status(500).send(e);
	}
});

// update courses
router.patch("/:_id", async (req, res) => {
	// validate
	let { error } = courseValidation(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	let { _id } = req.params;
	// check course exist
	try {
		let foundCourse = await Course.findOne({ _id });
		if (!foundCourse)
			return res
				.status(400)
				.send("Course not found, cannot update course...");

		// update course
		// user must be course owner(instructor)
		if (foundCourse.instructor.equals(req.user._id)) {
			let updatedCourse = await Course.findOneAndUpdate(
				{ _id },
				req.body,
				{
					new: true,
					runValidators: true,
				}
			);
			return res.status(200).send({
				message: "Course updated successfully",
				updatedCourse,
			});
		} else {
			return res
				.status(403)
				.send(
					"Only course onwner(instructor) is allowed to update course details."
				);
		}
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.delete("/:_id", async (req, res) => {
	// validate
	let { error } = courseValidation(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	let { _id } = req.params;
	// check course exist
	try {
		let foundCourse = await Course.findOne({ _id }).exec();
		if (!foundCourse)
			return res
				.status(400)
				.send("Course not found, cannot delete course...");

		// delete course
		// user must be course owner(instructor)
		if (foundCourse.instructor.equals(req.user._id)) {
			await Course.deleteOne({ _id }).exec();
			return res
				.status(200)
				.send("Course deleted successfully.");
		} else {
			return res
				.status(403)
				.send(
					"Only course onwner(instructor) is allowed to delete course details."
				);
		}
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.get("/student/:_student_id", async (req, res) => {
	let { _student_id } = req.params;
	try {
		let foundEnrolledCourses = await Course.find({
			students: _student_id,
		})
			.populate("instructor", ["username", "email"])
			.exec();
		return res.send({
			message: "Course retrieved successfully",
			foundEnrolledCourses,
		});
	} catch (e) {
		res.status(500).send(e);
	}
});

// enroll course by id
router.post("/enroll/:_id", async (req, res) => {
	let { _id } = req.params;
	try {
		// console.log("Finding course here");
		let course = await Course.findOne({ _id }).exec();
		course.students.push(req.user._id);
		await course.save();
		return res.send("Enrolled course!");
	} catch (e) {
		// console.log("error is here");
		return res.status(500).send(e);
	}
});

module.exports = router;

import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
	post(title, description, price) {
		let token;
		if (localStorage.getItem("user")) {
			token = JSON.parse(
				localStorage.getItem("user")
			).token;
		} else {
			token = "";
		}
		return axios.post(
			API_URL,
			{
				title,
				description,
				price,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
	}

	// get courses by instructor id
	get(_id) {
		let token;
		if (localStorage.getItem("user")) {
			token = JSON.parse(
				localStorage.getItem("user")
			).token;
		} else {
			token = "";
		}
		return axios.get(API_URL + "/instructor/" + _id, {
			headers: {
				Authorization: token,
			},
		});
	}

	// get enrolled courses by student id
	getEnrolledCourses(_id) {
		let token;
		if (localStorage.getItem("user")) {
			token = JSON.parse(
				localStorage.getItem("user")
			).token;
		} else {
			token = "";
		}
		return axios.get(API_URL + "/student/" + _id, {
			headers: {
				Authorization: token,
			},
		});
	}

	enroll(_id) {
		let token;
		if (localStorage.getItem("user")) {
			token = JSON.parse(
				localStorage.getItem("user")
			).token;
		} else {
			token = "";
		}
		// console.log("Posting to /enroll/:_id");
		return axios.post(
			API_URL + "/enroll/" + _id,
			{},
			{
				headers: {
					Authorization: token,
				},
			}
		);
	}

	// get course by name
	getCourseByName(name) {
		let token;
		if (localStorage.getItem("user")) {
			token = JSON.parse(
				localStorage.getItem("user")
			).token;
		} else {
			token = "";
		}

		return axios.get(API_URL + "/search/" + name, {
			headers: {
				Authorization: token,
			},
		});
	}
}

export default new CourseService();

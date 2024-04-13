import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CourseService from "../services/course.service";

const CourseComponent = ({
	currentUser,
	setCurrentUser,
}) => {
	const navigate = useNavigate();
	const handleTakeToLogin = () => {
		navigate("/login");
	};

	const [courseData, setCourseData] = useState([]);

	useEffect(() => {
		let _id;
		if (currentUser) {
			_id = currentUser.user._id;
			if (currentUser.user.role === "instructor") {
				CourseService.get(_id)
					.then((data) => {
						// console.log(data);
						setCourseData(data.data.foundCourses);
					})
					.catch((e) => {
						console.log(e);
					});
			} else if (currentUser.user.role === "student") {
				CourseService.getEnrolledCourses(_id)
					.then((data) => {
						// console.log(data);
						setCourseData(data.data.foundEnrolledCourses);
					})
					.catch((e) => {
						console.log(e);
					});
			}
		}
	}, []);

	return (
		<div style={{ padding: "3rem" }}>
			{!currentUser && (
				<div>
					<p>Login to view the course detail.</p>
					<button
						className="btn btn-primary btn-lg"
						onClick={handleTakeToLogin}
					>
						Login
					</button>
				</div>
			)}
			{currentUser &&
				currentUser.user.role === "instructor" && (
					<div>
						<h1>Welcome to Instructor Course Page</h1>
					</div>
				)}
			{currentUser &&
				currentUser.user.role === "student" && (
					<div>
						<h1>Welcome to Student Course Page</h1>
					</div>
				)}
			{currentUser &&
				courseData &&
				courseData.Length != 0 && (
					<div
						style={{ display: "flex", flexWrap: "wrap" }}
					>
						{courseData.map((course) => {
							return (
								<div
									className="card"
									style={{ width: "18rem", margin: "1rem" }}
									key={course._id}
								>
									<div className="card-body">
										<h4 className="card-title">
											{course.title}
										</h4>
										<hr />
										<p
											className="card-text"
											style={{ margin: "0.5rem 0rem" }}
										>
											{course.description}
										</p>
										<p style={{ margin: "0.5rem 0rem" }}>
											Enrolled Students:{" "}
											{course.students.length}
										</p>
										<p style={{ margin: "0.5rem 0rem" }}>
											Price: ${course.price}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				)}
		</div>
	);
};

export default CourseComponent;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = ({
	currentUser,
	setCurrentUser,
}) => {
	const navigate = useNavigate();
	let [searchInput, setSearchInput] = useState("");
	let [searchResult, setSearchResult] = useState(null);
	const handleTakeToLogin = () => {
		navigate("/login");
	};
	const handleChangeInput = (e) => {
		setSearchInput(e.target.value);
	};
	const handleSearch = () => {
		CourseService.getCourseByName(searchInput)
			.then((data) => {
				// console.log(data);
				setSearchResult(data.data.foundCourse);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleEnroll = (e) => {
		// console.log("Enrolling...");
		// console.log(e);
		CourseService.enroll(e.target.id)
			.then(() => {
				window.alert(
					"Enrolled successfully! Redirecting to Course Page."
				);
				navigate("/course");
			})
			.catch((err) => {
				console.log("Enroll Fail!");
				console.log(err);
			});
	};

	return (
		<div style={{ padding: "3rem" }}>
			{!currentUser && (
				<div>
					<p>
						You must login first before searching for
						courses.
					</p>
					<button
						className="btn btn-primary btn-lg"
						onClick={handleTakeToLogin}
					>
						Take me to login page.
					</button>
				</div>
			)}
			{currentUser &&
				currentUser.user.role == "instructor" && (
					<div>
						<h1>Only students can enroll in courses.</h1>
					</div>
				)}
			{currentUser &&
				currentUser.user.role == "student" && (
					<div className="search input-group mb-3">
						<input
							onChange={handleChangeInput}
							type="text"
							className="form-control"
						/>
						<button
							onClick={handleSearch}
							className="btn btn-primary"
						>
							Search
						</button>
					</div>
				)}
			{currentUser &&
				searchResult &&
				searchResult.length != 0 && (
					<div>
						<p>Data retrieved from API</p>
						{searchResult.map((course) => (
							<div
								key={course._id}
								className="card"
								style={{ width: "18rem" }}
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
										Instructor: {course.instructor.username}
									</p>
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
									<a
										href="#"
										onClick={handleEnroll}
										className="card-text btn btn-primary"
										id={course._id}
									>
										Enroll
									</a>
								</div>
							</div>
						))}
					</div>
				)}
		</div>
	);
};

export default EnrollComponent;

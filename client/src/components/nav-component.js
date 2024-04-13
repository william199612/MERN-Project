import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
	const handleLogout = () => {
		authService.logout(); // remove local storage
		window.alert(
			"Logged out! You will be redirect to the home page."
		);
		setCurrentUser(null);
	};

	return (
		<div>
			<nav>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="container-fluid">
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarNav"
							aria-controls="navbarNav"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>

						<div
							className="collapse navbar-collapse"
							id="navbarNav"
						>
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="nav-link active" to="/">
										Home
									</Link>
								</li>
								{!currentUser && (
									<li className="nav-item">
										<Link
											className="nav-link"
											to="/register"
										>
											Sign Up
										</Link>
									</li>
								)}

								{!currentUser && (
									<li className="nav-item">
										<Link className="nav-link" to="/login">
											Sign In
										</Link>
									</li>
								)}

								{currentUser && (
									<li className="nav-item">
										<Link
											onClick={handleLogout}
											className="nav-link"
											to="/"
										>
											Logout
										</Link>
									</li>
								)}

								{currentUser && (
									<li className="nav-item">
										<Link
											className="nav-link"
											to="/profile"
										>
											Profile
										</Link>
									</li>
								)}

								{currentUser && (
									<li className="nav-item">
										<Link className="nav-link" to="/course">
											Courses
										</Link>
									</li>
								)}

								{currentUser &&
									currentUser.user.role ===
										"instructor" && (
										<li className="nav-item">
											<Link
												className="nav-link"
												to="/postCourse"
											>
												Create Courses
											</Link>
										</li>
									)}

								{currentUser &&
									currentUser.user.role === "student" && (
										<li className="nav-item">
											<Link
												className="nav-link"
												to="/enroll"
											>
												Enroll Courses
											</Link>
										</li>
									)}
							</ul>
						</div>
					</div>
				</nav>
			</nav>
		</div>
	);
};

export default NavComponent;

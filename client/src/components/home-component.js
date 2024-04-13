import React from "react";

const HomeComponent = () => {
	return (
		<main>
			<div className="container py-4">
				<div className="p-5 mb-4 bg-light rounded-3">
					<div className="container-fluid py-5">
						<h1 className="display-5 fw-bold">
							Study System
						</h1>
						<p className="col-md-8 fs-4">
							This system utilize React.js as Frontend
							framework, Node.js, MongoDB as the Backend
							Server.
						</p>
						<button
							className="btn btn-primary btn-lg"
							type="button"
						>
							See how it works
						</button>
					</div>
				</div>

				<div className="row align-items-md-stretch">
					<div className="col-md-6">
						<div className="h-100 p-5 text-white bg-dark rounded-3">
							<h2>As a student</h2>
							<p>
								Register to be a student to enroll in
								courses!
							</p>
							<button
								className="btn btn-outline-light"
								type="button"
							>
								Login or register a account
							</button>
						</div>
					</div>
					<div className="col-md-6">
						<div className="h-100 p-5 bg-light border rounded-3">
							<h2>As an instructor</h2>
							<p>
								Register to be an instructor, and start
								creating your first online course!
							</p>
							<button
								className="btn btn-outline-secondary"
								type="button"
							>
								Start creating your course today!
							</button>
						</div>
					</div>
				</div>

				<footer className="pt-3 mt-4 text-muted border-top">
					&copy; 2024 William Hung
				</footer>
			</div>
		</main>
	);
};

export default HomeComponent;

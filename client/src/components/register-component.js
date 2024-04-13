import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
	const navigate = useNavigate();
	let [username, setUsername] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [role, setRole] = useState("");
	let [message, setMessage] = useState("");

	const handleUsername = (e) => {
		setUsername(e.target.value);
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleRole = (e) => {
		setRole(e.target.value);
	};

	const handleRegister = () => {
		AuthService.register(username, email, password, role)
			.then(() => {
				console.log("register");

				window.alert(
					"Register complete! You will be redirected to the login page."
				);
				navigate("/login");
			})
			.catch((e) => {
				// console.log(e);
				setMessage(e.response.data);
			});
	};

	return (
		<div style={{ padding: "3rem" }} className="col-md-12">
			<div>
				{message && (
					<div className="alert alert-danger">
						{message}
					</div>
				)}
				<div>
					<label htmlFor="username">Username:</label>
					<input
						onChange={handleUsername}
						type="text"
						className="form-control"
						name="username"
					/>
				</div>
				<br />
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						onChange={handleEmail}
						type="text"
						className="form-control"
						name="email"
					/>
				</div>
				<br />
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						onChange={handlePassword}
						type="password"
						className="form-control"
						name="password"
						placeholder="more than 6 characters containing numbers and letters."
					/>
				</div>
				<br />
				<div className="form-group">
					<label htmlFor="password">身份：</label>
					<input
						onChange={handleRole}
						type="text"
						className="form-control"
						placeholder="Choose between \'student\' and \'instructors\'."
						name="role"
					/>
				</div>
				<br />
				<button
					onClick={handleRegister}
					className="btn btn-primary"
				>
					<span>Sign Up</span>
				</button>
			</div>
		</div>
	);
};

export default RegisterComponent;

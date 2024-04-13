import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const ProfileComponent = ({
	currentUser,
	setCurrentUser,
}) => {
	return (
		<div style={{ padding: "3rem" }}>
			{!currentUser && (
				<div>You have to login to view your profile.</div>
			)}
			{currentUser && (
				<div>
					<h2>Your Profile:</h2>

					<table className="table">
						<tbody>
							<tr>
								<td>
									<strong>
										Name：{currentUser.user.username}
									</strong>
								</td>
							</tr>
							<tr>
								<td>
									<strong>
										ID: {currentUser.user._id}
									</strong>
								</td>
							</tr>
							<tr>
								<td>
									<strong>
										Email: {currentUser.user.email}
									</strong>
								</td>
							</tr>
							<tr>
								<td>
									<strong>
										Role: {currentUser.user.role}
									</strong>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ProfileComponent;

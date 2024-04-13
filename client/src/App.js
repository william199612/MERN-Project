import { useState } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CourseComponent from "./components/course-component";
import EnrollComponent from "./components/enroll-component";
import PostCourseComponent from "./components/postCourse-component";
import AuthService from "./services/auth.service";

function App() {
	let [currentUser, setCurrentUser] = useState(
		AuthService.getCurrentUser()
	);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Layout
							currentUser={currentUser}
							setCurrentUser={setCurrentUser}
						/>
					}
				>
					<Route index element={<HomeComponent />}></Route>
					<Route
						path="register"
						element={<RegisterComponent />}
					></Route>
					<Route
						path="login"
						element={
							<LoginComponent
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							/>
						}
					></Route>
					<Route
						path="profile"
						element={
							<ProfileComponent
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							/>
						}
					></Route>
					<Route
						path="course"
						element={
							<CourseComponent
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							/>
						}
					></Route>
					<Route
						path="postCourse"
						element={
							<PostCourseComponent
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							/>
						}
					></Route>
					<Route
						path="enroll"
						element={
							<EnrollComponent
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							/>
						}
					></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

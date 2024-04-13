# MERN Project Client Side

This MERN project allows users to choose to login with "student" or "instructor". "student" is allowed to view and search courses and enroll. "instructor" is allowed to post new courses on the website.

## Description

This project using `React` for building the user interface and React Router for handling navigation between different pages. `Axios` is used for making HTTP requests to fetch data from the backend server.

The backend utilizes `Express` as the `Node.js` framework. It stores the data to `MongoDB`, and set the routes following RESTful API, which allows the frontend to fetch data from the database. `passport.js` and `jwt` is used for user authentication.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Clone Prject

```bash
git clone https://github.com/william199612/Udemy_Project9_MERN.git
```

### Frontend Installation

```bash
cd client
npm install
```

### Backend Setup

Set up your own `PASSPORT_SECRET` as the secret key for authentication. For example:

```
PASSPORT_SECRET="thisisaexamplepassportsecret"
```

### Usage

> Before running the frontend server, you need to run the backend server first.

**Backend**

```bash
cd server
node index.js
```

The backend server will be running on port 8080 as default.

**Frontend**

After having the backend server running:

```bash
cd frontend
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Dependencies

Frontend:
- axios: A promise-based HTTP client for making requests.
- react: A JavaScript library for building user interfaces.
- react-dom: A package for rendering React components in the DOM.
- react-router-dom: A package for managing navigation and routing in React applications.

Backend:

- bcrypt: A library for hashing passwords.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- dotenv: Loads environment variables from a .env file into process.env.
- express: Fast, unopinionated, minimalist web framework for Node.js.
- joi: Schema description language and data validator for JavaScript objects.
- jsonwebtoken: Implementation of JSON Web Tokens (JWT) for authentication.
- mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
- passport: Authentication middleware for Node.js.
- passport-jwt: Passport strategy for authenticating with JSON Web Tokens (JWT).
- passport-local: Passport strategy for authenticating with a username and password.

## Contribution

This project is learned from Udemy Course.
["2024 Full Stack Web Development" by Wilson Ren](https://www.udemy.com/course/wilson-full-stack-web-development/)

## License

[ISC](https://choosealicense.com/licenses/isc/)
# NexaGPT Backend Repository

## Project Overview
NexaGPT is a full-stack application leveraging GPT-based APIs to enable conversational AI functionalities. The backend of this project is built using Node.js and Express, providing a RESTful API to interact with the front-end. This repository focuses on the back-end, including authentication, API routes, and integration with databases.

## Features
- **Authentication**: Implemented user authentication using JWT tokens for secure login and session management.
- **Dark/Light Theme**: The backend supports theme-based customization, enabling users to switch between dark and light modes.
- **API Routes**: Various routes are set up to handle chat sessions, user management, and authentication.
- **CI/CD**: Continuous integration and continuous deployment pipelines set up to automate testing and deployment using GitHub Actions.
  
## Technologies Used
- **Node.js** - JavaScript runtime for the server.
- **Express** - Web framework for building REST APIs.
- **JWT (JSON Web Tokens)** - Secure user authentication.
- **MongoDB (or any other DB)** - Database for storing user data and chat history.
- **GitHub Actions** - CI/CD for automation of tests, build, and deployment.

## Authentication (JWT Implementation)
### Overview
The backend uses **JWT (JSON Web Tokens)** for secure user authentication. Users must register and log in with a username and password, after which a JWT token is issued for session management.

### Registration Route:
- **POST /api/auth/register**
  - Registers a new user with a username and password.
  - **Response**: Success or failure message with validation errors if any.

### Login Route:
- **POST /api/auth/login**
  - Logs in an existing user and generates a JWT token.
  - **Request Body**:
    ```json
    {
      "username": "user",
      "password": "password"
    }
    ```
  - **Response**: JWT token that will be used for authenticating subsequent requests.

### Middleware (JWT Verification)
The server uses a middleware to verify the JWT token on protected routes:
- **JWT Middleware**
  - This middleware checks if the `Authorization` header contains a valid JWT token and allows access to the requested route if the token is verified.

## Dark/Light Theme Support
### Overview
The backend provides an endpoint that the front-end uses to toggle between dark and light themes. This feature allows users to personalize their experience according to their preference.

### Theme Toggle Route:
- **POST /api/user/theme**
  - Switches between dark and light themes for a user.
  - **Request Body**:
    ```json
    {
      "theme": "dark" // or "light"
    }
    ```
  - **Response**: The new theme setting is saved and reflected in the user's preferences.

## Folder Structure
- **middleware**: Contains authentication-related middleware for verifying JWT tokens.
- **models**: Defines the database models, including `User.js` for user data and `Thread.js` for storing chat history.
- **routes**: Contains the API routes, including authentication, user management, and chat routes.
- **tests**: Includes unit and integration tests for the API endpoints.
- **utils**: Utility functions, such as for hashing passwords or handling error messages.
- **server.js**: The entry point for the backend server, where routes and middleware are initialized.

## CI/CD Pipeline
The backend repository includes an automated CI/CD pipeline using **GitHub Actions**. This pipeline automates the process of:
1. Running tests on each commit to ensure code integrity.
2. Deploying the latest build to the server.
3. Notifying the development team in case of a failure.

### GitHub Actions Workflow:
- **Tests**: Every time a commit is pushed to the `main` branch, GitHub Actions triggers the test suite to ensure that the new code does not break any existing functionality.
- **Deployment**: After successful tests, the code is deployed to the cloud server automatically (if configured).

## Deployment
### Deployed Link:
Currently, the live demo is hosted on EC2, but it has been temporarily paused due to resource constraints. The application was initially deployed and fully operational with the CI/CD pipelines working as expected.


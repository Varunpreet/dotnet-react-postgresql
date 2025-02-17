User Management Project

Overview:
This project is a full-stack User Management system that allows you to view, add, and delete users. It consists of a .NET 8 Web API backend and a Vite+React frontend. The backend provides RESTful endpoints, handles authentication using JWT, and follows clean architecture principles. The frontend uses React with Context API for state management and Material UI for styling. Unit tests are included for both the backend and frontend components.

Features:
Backend (ASP.NET 8):
- RESTful API Endpoints:
  - `GET /api/users`: Retrieve a list of all users.
  - `POST /api/users`: Add a new user (requires valid JWT token).
  - `DELETE /api/users/{id}`: Delete a user by ID (requires valid JWT token).
- Authentication:
  - JWT-based authentication is implemented.
  - Endpoints for user registration and login are provided in the `AuthController`.
- Data Access:
  - Uses Entity Framework Core.
  - Configured to use PostgreSQL in production and an in-memory database for testing.
- Unit Testing:
  - Unit tests written using xUnit for core business logic and controllers.

Frontend (Vite + React):
- User Interface:
  - A login page for authentication.
  - A dashboard displaying the user list with options to add and delete users.
- State Management:
  - Global state is managed using React Context API (in `UserContext`).
  - Loading indicators are shown while data is being fetched.
  - Error handling is performed with popups (using Material UI Snackbar and Alert) to notify users of issues like expired tokens.
- Routing:
  - React Router is used to switch between the login screen and the dashboard.
- Unit Testing:
  - Frontend unit tests are written using Vitest and React Testing Library.

Technology Stack:
- Backend: .NET 8 Web API, Entity Framework Core, PostgreSQL (or InMemory for testing), JWT Authentication.
- Frontend: Vite, React, Material UI, React Router, Context API.
- Testing: xUnit (backend), Vitest & React Testing Library (frontend).

Prerequisites:
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js and npm](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/) 

Database details:
•	Port-5432
•	Database-user_management
•	Username-postgres
•	Password-varun

Installation and Running the Project:
Backend Setup:
1.	 Navigate to the Backend Directory:  
Open a terminal and change directory to the backend project (e.g., `UserManagementApi`).
2.	Restore NuGet Packages:  
   dotnet restore
3.	Configure the Application:
Ensure that your appsettings.json (and appsettings.Development.json) files have the correct connection strings and JWT settings.
4.	Run the Backend API:
dotnet build
dotnet run
5.	The API will launch (with Swagger available in development mode) and listen on the configured port.

Frontend Setup:
1.	Navigate to the Frontend Directory:
Change directory to the frontend project (user-management-ui).
2.	Install npm Dependencies:
npm install
3.	Run the Frontend Application:
npm run dev
This will start the Vite development server. Open http://localhost:5173 in your browser to access the application.

Testing Backend Endpoints Using Swagger UI:
Once you have the backend API running (using `dotnet run`), you can use Swagger UI to manually test the user endpoints. Follow these steps:
•	Open Swagger UI:
   - Open your web browser and navigate to the URL (by default, it might be):
     http://localhost:5155/swagger/index.html
     (check the port number in the console)
•	Explore the API Documentation:
   - The Swagger UI page lists all available endpoints, including:
     - `GET /api/users` – Retrieves all users.
     - `POST /api/users` – Adds a new user (authentication required).
     - `DELETE /api/users/{id}` – Deletes a user by ID (authentication required).
     - Endpoints for authentication such as `POST /api/auth/login` and `POST /api/auth/register`.
•	Testing Unprotected Endpoints:
   - Click on the `GET /api/users` endpoint.
   - Click on the “Try it out” button, then click on Execute.
   - The response pane will show the list of users (if any exist).
•	Obtaining a JWT Token:
   - To test protected endpoints (`POST /api/users` and `DELETE /api/users/{id}`), you need a valid token.
   - Use the `POST /api/auth/login` endpoint:
     - Click “Try it out”.
     - Provide valid login details (as per your registered user).
     - Execute the request and copy the returned token from the response.
•	Authorize Swagger UI:
   - Click the Authorize button (at the top-right of the Swagger UI page).
   - In the popup, enter the token in the following format: your-jwt-token 
     Replace `your-jwt-token` with the token you obtained. (for example: eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp…..)
   - Click Authorize and then Close the dialog.
•	Testing Protected Endpoints:
   - With the token set, click on the `POST /api/users` endpoint.
     - Click Try it out, fill in the required fields (e.g., Name, Email, Age, and Password).
     - Click Execute to add a new user.
   - Similarly, test `DELETE /api/users/{id}` by providing a valid user ID and clicking Execute.
•	Review Responses:
   - Swagger UI will display the HTTP status codes and response data for each operation.
   - Use these responses to verify that your endpoints work as expected.
Following these steps in Swagger UI allows you to fully test your backend user management endpoints without writing any additional client code.

Testing Frontend with the User Interface:
•	Start the Frontend Application:
   - Open a terminal and navigate to the frontend project directory: user-management-ui`
   - Install dependencies if not already installed: npm install
   - Start the development server: npm run dev
   - The Vite development server will start and typically serve the app at [http://localhost:5173](http://localhost:5173).
•	Open the Application in Your Browser:
   - Open your web browser and navigate to [http://localhost:5173](http://localhost:5173).
   - The application should display the login page as the default route.
•	Testing the Login Process:
   - On the login page, enter your credentials (use valid credentials corresponding to an existing user registered via the backend or via the registration endpoint).
   - Click the Login button.
   - Upon successful login, the application stores the token in local storage and automatically navigates to the dashboard.
•	Dashboard Functionality:
   - On the dashboard, you will see a loading indicator while the user list is being fetched.
   - Once loaded, the dashboard displays the list of users along with options to add or delete users.
   - Test the Add User functionality:
     - Fill in the form with valid user details.
     - Click the Add User button.
     - The newly added user should appear in the list.
   - Test the Delete User functionality:
     - Click the delete icon next to a user.
     - Confirm the deletion when prompted.
     - The user should be removed from the list.

Backend Tests:
1.	Navigate to the Backend Test Directory: UserManagementApi.Tests
2.	Execute the Tests:
dotnet test

Frontend Tests:
1.	Ensure Vitest is Installed:
(Vitest is installed as a dev dependency.)
2.	Run the Tests:
From the frontend project root, execute:
npm run test

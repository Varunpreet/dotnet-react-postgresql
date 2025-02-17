# User Management Project

## Overview

This project is a full-stack **User Management System** that allows you to **view, add, and delete users**. It consists of:

- **Backend:** .NET 8 Web API
- **Frontend:** Vite + React
- **Database:** PostgreSQL (production) / In-memory database (testing)

The backend provides **RESTful endpoints**, handles **JWT-based authentication**, and follows **clean architecture principles**. The frontend uses **React with Context API** for state management and **Material UI** for styling. Unit tests are included for both the backend and frontend.

---

## Features

### **Backend (ASP.NET 8)**
 **RESTful API Endpoints**:
- `GET /api/users` → Retrieve all users
- `POST /api/users` → Add a new user (**requires JWT token**)
- `DELETE /api/users/{id}` → Delete a user by ID (**requires JWT token**)

 **Authentication**:
- JWT-based authentication is implemented.
- Endpoints for user **registration** and **login** are provided in `AuthController`.

 **Data Access**:
- Uses **Entity Framework Core**.
- Configured to use **PostgreSQL** (production) and **in-memory database** (testing).

 **Unit Testing**:
- Written using **xUnit** for core business logic and controllers.

---

### **Frontend (Vite + React)**
 **User Interface**:
- **Login Page** for authentication.
- **Dashboard** displaying the user list with options to **add and delete users**.

 **State Management**:
- Uses **React Context API** (`UserContext`) for global state.
- **Loading indicators** for API calls.
- **Error handling** via **Material UI Snackbar & Alert** (e.g., expired token notifications).

 **Routing**:
- **React Router** for navigation between **Login** and **Dashboard**.

 **Unit Testing**:
- Written using **Vitest** and **React Testing Library**.

---

## **Technology Stack**
| Component  | Technology |
|------------|------------|
| **Backend** | .NET 8 Web API, Entity Framework Core, PostgreSQL, JWT Authentication |
| **Frontend** | Vite, React, Material UI, React Router, Context API |
| **Testing** | xUnit (backend), Vitest & React Testing Library (frontend) |

---

## **Prerequisites**
Ensure you have the following installed before proceeding:

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

---

## Installation & Running the Project

### Backend Setup
```sh
# Navigate to the Backend Directory
cd UserManagementApi

# Restore NuGet Packages
dotnet restore

# Ensure that appsettings.json and appsettings.Development.json have the correct database connection strings and JWT settings.

# Run the Backend API
dotnet run
```
The API will launch, and **Swagger** will be available in development mode.

### Frontend Setup
```sh
# Navigate to the Frontend Directory
cd user-management-ui

# Install npm Dependencies
npm install

# Run the Frontend Application
npm run dev
```
The frontend will be available at **[http://localhost:5173](http://localhost:5173)**.

### Running Tests

#### Backend Tests
```sh
# Navigate to the Backend Test Directory
cd UserManagementApi.Tests

# Execute the Tests
dotnet test
```

#### Frontend Tests
```sh
# Ensure Vitest is Installed (already a dev dependency)

# Run the Tests
npm run test
```

### Database Details
```
Port: 5432
Database Name: user_management
Username: postgres
Password: varun
```

## Testing Backend Endpoints Using Swagger UI

### Steps:
1. **Start the Backend API**
   ```sh
   dotnet run
   ```
   - The API will be available at `http://localhost:5155` (or another configured port).
   - Swagger UI will be available at `http://localhost:5155/swagger`.

2. **Open Swagger UI**
   - Navigate to `http://localhost:5155/swagger` in your browser.
   - You will see a list of all available API endpoints.


3. **Test Endpoints**
   - Click on an endpoint (e.g., `GET /api/users`).
   - Click the **Try it out** button and click **Execute**.
   - Review the response in the **Response Body** section.

4. **Authentication Testing**
   - Register and then log in using the **AuthController** endpoints with required parameters.
   - Copy the JWT token from the login response.
   - Click on **Authorize** (top right).
   - Paste the token and click **Authorize**.

5. **Test Secured Endpoints**
   - Now that the token is set, test **POST /api/users** and **DELETE /api/users/{id}**.
   - Ensure the appropriate responses are returned.

---

## Testing Frontend with the User Interface

### Steps:
1. **Start the Frontend Application**
   ```sh
   npm run dev
   ```
   - The application will be available at `http://localhost:5173`.

2. **Login**
   - Navigate to `http://localhost:5173/login`.
   - Enter a valid **username** and **password**.
   - Click **Login**.
   - If successful, you will be redirected to the **Dashboard**.

3. **Test User Management Features**
   - **View Users**
     - The dashboard should display a list of users retrieved from the backend.
   - **Add a New User**
     - Click on the **"Add User"** button.
     - Fill in the required fields.
     - Click **Add User**.
     - A success message should appear, and the new user should be listed.
   - **Delete a User**
     - Click on the **"Delete"** button next to a user.
     - Confirm the deletion.
     - The user should be removed from the list.


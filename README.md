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
✅ **RESTful API Endpoints**:
- `GET /api/users` → Retrieve all users
- `POST /api/users` → Add a new user (**requires JWT token**)
- `DELETE /api/users/{id}` → Delete a user by ID (**requires JWT token**)

✅ **Authentication**:
- JWT-based authentication is implemented.
- Endpoints for user **registration** and **login** are provided in `AuthController`.

✅ **Data Access**:
- Uses **Entity Framework Core**.
- Configured to use **PostgreSQL** (production) and **in-memory database** (testing).

✅ **Unit Testing**:
- Written using **xUnit** for core business logic and controllers.

---

### **Frontend (Vite + React)**
✅ **User Interface**:
- **Login Page** for authentication.
- **Dashboard** displaying the user list with options to **add and delete users**.

✅ **State Management**:
- Uses **React Context API** (`UserContext`) for global state.
- **Loading indicators** for API calls.
- **Error handling** via **Material UI Snackbar & Alert** (e.g., expired token notifications).

✅ **Routing**:
- **React Router** for navigation between **Login** and **Dashboard**.

✅ **Unit Testing**:
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

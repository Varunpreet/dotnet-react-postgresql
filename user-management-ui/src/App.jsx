import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { Container, Typography, Box, Paper } from "@mui/material";
import "./App.css";

const Dashboard = () => {
  const { logoutUser } = useUserContext();

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, textAlign: "center", color: "black" }}
      >
        User Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "20px",
        }}
      >
        {/* Left Side - Add User Form + Logout Button */}
        <Paper
          sx={{
            p: 3,
            minWidth: "45%",
            minHeight: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <UserForm />
          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </Paper>

        {/* Right Side - User List */}
        <Paper
          sx={{
            p: 3,
            minWidth: "45%",
            minHeight: "350px",
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <UserList />
        </Paper>
      </Box>
    </Container>
  );
};

const App = () => {
  const { token } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginForm /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        {/* Default route redirects to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setToken } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5155/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwordHash: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid email or password.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", mb: 2, color: "black" }}
      >
        User Login
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;

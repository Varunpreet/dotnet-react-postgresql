import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { TextField, Button, Paper, Typography, Box, Container } from "@mui/material";
import axios from "axios";

const LoginForm = () => {
  const { login } = useUserContext();
  const [formData, setFormData] = useState({ email: "", passwordHash: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔹 Sending login request:", formData); // ✅ Debugging Log
      const response = await axios.post("http://localhost:5155/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true // ✅ Ensures cookies & authentication headers are sent
      });

      console.log("✅ Login successful, Token Received:", response.data.token); // ✅ Debugging Log
      login(response.data.token);
    } catch (error) {
      console.error("❌ Login error:", error.response ? error.response.data : error.message);
      setError("Invalid email or password.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f8" }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom color="primary">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
            <TextField fullWidth label="Password" name="passwordHash" value={formData.passwordHash} onChange={handleChange} required type="password" />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginForm;

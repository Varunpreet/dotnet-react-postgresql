import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { TextField, Button, Box, Grid } from "@mui/material";

const UserForm = () => {
  const { addUser } = useUserContext();
  const [formData, setFormData] = useState({ name: "", email: "", age: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.age && formData.password) {
      addUser({ ...formData, age: Number(formData.age), passwordHash: formData.password });
      setFormData({ name: "", email: "", age: "", password: "" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2, width:"100%", maxWidth:"400px" }}>
      <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
      <TextField fullWidth label="Age" name="age" value={formData.age} onChange={handleChange} required type="number" />
      <TextField fullWidth label="Password" name="password" value={formData.password} onChange={handleChange} required type="password" />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add User
      </Button>
    </Box>
  );
};

export default UserForm;

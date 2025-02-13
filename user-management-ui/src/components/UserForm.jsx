import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { TextField, Button, Box, Grid } from "@mui/material";

const UserForm = () => {
  const { addUser } = useUserContext();
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.age) {
      addUser({ ...formData, age: Number(formData.age) }); // Convert age to number
      setFormData({ name: "", email: "", age: "" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
      <TextField fullWidth label="Age" name="age" value={formData.age} onChange={handleChange} required type="number" />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add User
      </Button>
    </Box>
  );
};

export default UserForm;

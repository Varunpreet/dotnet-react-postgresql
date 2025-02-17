import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { TextField, Button, Container, Typography, Stack } from "@mui/material";

const UserForm = () => {
  const { addUser } = useUserContext();
  const [user, setUser] = useState({ name: "", email: "", age: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user.name || !user.email || !user.age || !user.password) {
      alert("All fields are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      alert("Enter a valid email address.");
      return;
    }
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    await addUser(user);
    setUser({ name: "", email: "", age: "", password: "" });
  };

  return (
    <Container>
      <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
        Add New User
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={user.name} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Email" name="email" type="email" value={user.email} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Age" name="age" type="number" value={user.age} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Password" name="password" type="password" value={user.password} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />

        <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ width: "70%", alignSelf: "center" }}>
            Add User
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default UserForm;

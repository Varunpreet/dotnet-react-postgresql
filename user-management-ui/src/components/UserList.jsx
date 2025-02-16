import React from "react";
import { useUserContext } from "../context/UserContext";
import { List, ListItem, ListItemText, IconButton, CircularProgress, Typography, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserList = () => {
  const { users, loading, deleteUser } = useUserContext();

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
        User List
      </Typography>
      <List>
        {users.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No users found.
          </Typography>
        ) : (
          users.map((user) => (
            <ListItem key={user.id} secondaryAction={
              <IconButton
                edge="end"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this user?")) {
                    deleteUser(user.id);
                  }
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={`${user.name} (${user.email})`} secondary={`Age: ${user.age}`} />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default UserList;

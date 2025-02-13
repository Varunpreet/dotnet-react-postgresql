import { useUserContext } from "../context/UserContext";
import { List, ListItem, ListItemText, Typography, CircularProgress, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserList = () => {
  const { users, loading, error, deleteUser } = useUserContext();

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto" }} />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 3, textAlign: "center" }}>
      <Typography variant="h6" align="center" gutterBottom>
        User List
      </Typography>
      <List>
        {users.length > 0 ? (
          users.map((user) => (
            <ListItem key={user.id} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deleteUser(user.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))
        ) : (
          <Typography align="center">No users found. Add a user above.</Typography>
        )}
      </List>
    </Paper>
  );
};

export default UserList;

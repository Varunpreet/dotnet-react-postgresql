import { UserProvider, useUserContext } from "./context/UserContext";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import LoginForm from "./components/LoginForm";
import { Container, Paper, Typography, Box, Button } from "@mui/material";

const AuthenticatedApp = () => {
  const { logout } = useUserContext();
  
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>User Management</Typography>
          <Button onClick={logout} variant="contained" color="secondary" sx={{ mb: 2 }}>Logout</Button>
          <UserForm />
          <UserList />
        </Paper>
      </Container>
    </Box>
  );
};

const App = () => {
  const { token } = useUserContext();
  return token ? <AuthenticatedApp /> : <LoginForm />;
};

const Root = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default Root;

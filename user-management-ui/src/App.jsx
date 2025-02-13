import { UserProvider } from "./context/UserContext";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { Container, Paper, Typography, Box } from "@mui/material";

const App = () => (
  <UserProvider>
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>User Management</Typography>
          <UserForm />
          <UserList />
        </Paper>
      </Container>
    </Box>
  </UserProvider>
);

export default App;

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize token from local storage (if it exists)
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5155/api/users");
      if (!response.ok) throw new Error("Failed to fetch users.");
      setUsers(await response.json());
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      if (!token) throw new Error("Unauthorized. Please log in.");
      const response = await fetch("http://localhost:5155/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          age: Number(newUser.age),
          passwordHash: newUser.password,
        }),
      });

      if (!response.ok) throw new Error("Failed to add user.");
      setUsers([...users, await response.json()]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      if (!token) throw new Error("Unauthorized.");
      const response = await fetch(`http://localhost:5155/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete user.");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, token, setToken, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

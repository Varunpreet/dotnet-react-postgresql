import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5155/api/users");
      if (!response.ok) throw new Error("Failed to fetch users.");
      setUsers(await response.json());
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
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

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage("Session expired. Please log in again.");
          logoutUser();
          return;
        }
        throw new Error("Failed to add user.");
      }
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorMessage(error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      if (!token) throw new Error("Unauthorized.");
      const response = await fetch(`http://localhost:5155/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage("Session expired. Please log in again.");
          logoutUser();
          return;
        }
        throw new Error("Failed to delete user.");
      }
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage(error.message);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        users,
        loading,
        addUser,
        deleteUser,
        logoutUser,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

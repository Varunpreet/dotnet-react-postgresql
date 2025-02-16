import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const UserContext = createContext();

const initialState = {
  users: [],
  loading: false,
  error: null,
  token: localStorage.getItem("token") || "", // ✅ Store JWT token persistently
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      localStorage.setItem("token", action.payload);
      return { ...state, token: action.payload };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, token: "" };
    case "FETCH_USERS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_USERS_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_USERS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "DELETE_USER":
      return { ...state, users: state.users.filter(user => user.id !== action.payload) };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (state.token) {
      fetchUsers();
    }
  }, [state.token]);

  const fetchUsers = async () => {
    dispatch({ type: "FETCH_USERS_START" });
    try {
      const response = await axios.get("http://localhost:5155/api/users", {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_ERROR", payload: error.message });
    }
  };

  const login = (token) => {
    dispatch({ type: "SET_TOKEN", payload: token });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post("http://localhost:5155/api/users", user, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch({ type: "ADD_USER", payload: response.data });
    } catch (error) {
      console.error("Error adding user:", error.response ? error.response.data : error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5155/api/users/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch({ type: "DELETE_USER", payload: id });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout, addUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

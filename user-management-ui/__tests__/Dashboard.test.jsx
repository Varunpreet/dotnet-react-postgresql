import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App.jsx";
import { UserProvider } from "../src/context/UserContext.jsx";

describe("Dashboard Component (Logout Functionality)", () => {
  beforeEach(() => {
    localStorage.setItem("token", "dummy-token");
    window.history.pushState({}, "Dashboard", "/dashboard");
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("clicking logout clears token and navigates to login", () => {
    render(
      <UserProvider>
        <App />
      </UserProvider>
    );
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Logout/i }));
    expect(localStorage.getItem("token")).toBeNull();
    expect(screen.getByText(/User Login/i)).toBeInTheDocument();
  });
});

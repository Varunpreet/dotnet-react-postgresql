import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../src/components/LoginForm.jsx";
import { UserProvider } from "../src/context/UserContext.jsx";
import { MemoryRouter } from "react-router-dom";

global.fetch = vi.fn();

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actualModule = await vi.importActual("react-router-dom");
  return {
    ...actualModule,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginForm Component", () => {
  beforeEach(() => {
    global.fetch.mockClear();
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("renders login form with email and password fields", () => {
    render(
      <UserProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </UserProvider>
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("displays error message when login fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    render(
      <UserProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </UserProvider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  test("successful login stores token and navigates to dashboard", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: "dummy-token" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      });

    render(
      <UserProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </UserProvider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "correctpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("dummy-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
    });
  });
});

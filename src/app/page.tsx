"use client";

import { useAtom } from "jotai";
import { authTokenAtom } from "../store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function LoginPage() {
  const [, setAuthToken] = useAtom(authTokenAtom);
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 👇 Theme state
  const [darkMode, setDarkMode] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password || (isSignup && !confirmPassword)) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAuthToken("my-secret-access-token");
      router.push("/dashboard");
    } catch (err) {
      setError(`${isSignup ? "Signup" : "Login"} failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: darkMode ? "#1e1e1e" : "#f5f5f5",
        transition: "all 0.3s ease",
      }}
    >
      <form
        onSubmit={handleAuth}
        style={{
          backgroundColor: darkMode ? "#2c2c2c" : "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          color: darkMode ? "white" : "black",
          transition: "all 0.3s ease",
        }}
      >
        {/* Theme Toggle Buttn */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Brightness7Icon style={{ color: "white" }} />
            ) : (
              <Brightness4Icon style={{ color: "black" }} />
            )}
          </IconButton>
        </div>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          {isSignup ? "Signup" : "Login"}
        </h2>

        {error && (
          <div
            style={{
              color: "#e74c3c",
              backgroundColor: darkMode ? "#4d1f1f" : "#fadbd8",
              padding: "0.75rem",
              borderRadius: "4px",
              marginBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              backgroundColor: darkMode ? "#3c3c3c" : "white",
              color: darkMode ? "white" : "black",
            }}
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              backgroundColor: darkMode ? "#3c3c3c" : "white",
              color: darkMode ? "white" : "black",
            }}
            disabled={isLoading}
          />
        </div>

        {/* Confirm Password */}
        {isSignup && (
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem",
                backgroundColor: darkMode ? "#3c3c3c" : "white",
                color: darkMode ? "white" : "black",
              }}
              disabled={isLoading}
            />
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: isLoading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
            marginBottom: "1rem",
          }}
        >
          {isLoading
            ? isSignup
              ? "Signing up..."
              : "Logging in..."
            : isSignup
            ? "Signup"
            : "Login"}
        </button>

        {/* Toggle login/signup */}
        <div style={{ textAlign: "center", fontSize: "0.9rem" }}>
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setIsSignup(false)}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setIsSignup(true)}
              >
                Signup here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { authTokenAtom, userAtom } from "store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setAuth] = useAtom(authTokenAtom);
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogin = () => {
    if (username && password) {
      // yahan real API call hogi → abhi ke liye fake token
      setAuth("fake-jwt-token");
      setUser({ name: username });
      router.push("/dashboard");
    } else {
      alert("Enter username & password");
    }
  };

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h1>Login / Signup</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "10px 0", padding: 8 }}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px 0", padding: 8 }}
      />
      <br />

      <button
        onClick={handleLogin}
        style={{ marginTop: 10, padding: "8px 15px" }}
      >
        Continue
      </button>
    </div>
  );
}

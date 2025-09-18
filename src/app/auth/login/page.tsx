"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-page-container">
      <h1>Log in</h1>
      <form>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="email"
          placeholder="Email"
          required
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="password"
          placeholder="Password"
          type="password"
          required
        ></input>
        <button type="submit">Log in</button>
        <p>
          Not a member? <a href="/auth/register">Register</a>
        </p>
      </form>
    </div>
  );
}

"use client";

import { dataProvider } from "@/app/data-provider";
import { useState } from "react";
import "../styles.auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-page-container">
      <div className="auth-page-form-container">
        <h1 style={{ width: "544px" }}>Log in</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="auth-text-input email"
          placeholder="Email"
          required
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="auth-text-input password"
          placeholder="Password *"
          type="password"
          required
        ></input>
        <button onClick={(e: any) => dataProvider.login(email, password)}>
          Log in
        </button>
        <p>
          Not a member? <a href="/auth/register">Register</a>
        </p>
      </div>
    </div>
  );
}

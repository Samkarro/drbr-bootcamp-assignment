"use client";

import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // Don't forget to add image state management

  return (
    <div className="auth-page-container">
      <h1>Register</h1>
      <h2>
        <i>(Add an image upload input)</i> {/* placeholder */}
      </h2>
      <form>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="username"
          placeholder="Username"
          required
        ></input>
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
        <input
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="password-confirmation"
          placeholder="Confirm password"
          type="password"
          required
        ></input>
        <button type="submit">Register</button>
        <p>
          Already a member? <a href="/auth/login">Log in</a>
        </p>
      </form>
    </div>
  );
}

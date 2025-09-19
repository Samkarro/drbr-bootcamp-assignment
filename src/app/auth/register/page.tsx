"use client";

import { dataProvider } from "@/app/data-provider";
import { FormEvent, useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [avatar, setAvatar] = useState(null);
  // Don't forget to add image state management

  const handleFileChange = (e: any) => {
    if (e !== null) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <div className="auth-page-container">
      <h1>Register</h1>
      <input
        className="user-image-upload"
        type="file"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
      />
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
      <button
        onClick={(e) =>
          dataProvider.register(
            avatar,
            email,
            password,
            passwordConfirmation,
            username
          )
        }
      >
        Register
      </button>
      <p>
        Already a member? <a href="/auth/login">Log in</a>
      </p>
    </div>
  );
}

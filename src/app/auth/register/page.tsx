"use client";

import { dataProvider } from "@/app/data-provider";
import { useState } from "react";
import "../styles.auth.css";
import AuthHeader from "../../../../components/header-auth";

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
      <AuthHeader />
      <main className="auth-main">
        <img
          alt="test"
          className="auth-page-image"
          src={"/images/authpage.png"}
        />
        <div className="auth-page-form-container">
          <h1 style={{ width: "544px", marginBottom: "48px" }}>Register</h1>
          <input
            className="user-image-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="auth-text-input username"
            placeholder="Username"
            required
          ></input>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="auth-text-input email"
            placeholder="Email"
            required
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="auth-text-input password"
            placeholder="Password"
            type="password"
            required
          ></input>
          <input
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="auth-text-input password-confirmation"
            placeholder="Confirm password"
            type="password"
            required
          ></input>
          <button
            className="cta-button"
            onClick={(e) =>
              dataProvider.register(
                avatar,
                email,
                password,
                passwordConfirmation,
                username
              )
            }
            style={{
              margin: "22px 0px 24px 0px",
            }}
          >
            Register
          </button>
          <p>
            Already a member? <a href="/auth/login">Log in</a>
          </p>
        </div>
      </main>
    </div>
  );
}

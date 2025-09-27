"use client";

import { useState, useRef } from "react";
import "../styles.auth.css";
import AuthHeader from "../../../../components/header-auth";
import { dataProvider } from "@/app/data-provider";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setAvatar(file);
      console.log(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setAvatar(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

          <div className="profile-upload-container">
            <div className="profile-picture-frame">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile preview" />
              ) : (
                <div className="placeholder-avatar">+</div>
              )}
            </div>

            <div className="profile-upload-buttons">
              <p className="upload-btn clickable" onClick={handleUploadClick}>
                Upload new
              </p>
              {avatar && (
                <p className="remove-btn clickable" onClick={handleRemove}>
                  Remove
                </p>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <input
            onChange={(e) => setUsername(e.target.value)}
            className="auth-text-input username"
            placeholder="Username"
            required
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="auth-text-input email"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="auth-text-input password"
            placeholder="Password"
            type="password"
            required
          />
          <input
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="auth-text-input password-confirmation"
            placeholder="Confirm password"
            type="password"
            required
          />

          <button
            className="cta-button"
            onClick={() =>
              dataProvider.register(
                avatar,
                email,
                password,
                passwordConfirmation,
                username
              )
            }
            style={{ margin: "22px 0px 24px 0px" }}
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

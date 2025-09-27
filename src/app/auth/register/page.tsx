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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <div className="input-with-icon">
            <svg
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
              className="eye-icon clickable"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.69556 10.2687C1.63799 10.0959 1.63794 9.90895 1.6954 9.73619C2.85237 6.2581 6.13326 3.75 9.99994 3.75C13.8648 3.75 17.1445 6.25577 18.3029 9.73134C18.3604 9.90406 18.3605 10.0911 18.303 10.2638C17.1461 13.7419 13.8652 16.25 9.99848 16.25C6.1336 16.25 2.85397 13.7442 1.69556 10.2687Z"
                stroke="#0F172A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.4993 10C12.4993 11.3807 11.38 12.5 9.99927 12.5C8.61856 12.5 7.49927 11.3807 7.49927 10C7.49927 8.61929 8.61856 7.5 9.99927 7.5C11.38 7.5 12.4993 8.61929 12.4993 10Z"
                stroke="#0F172A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="auth-text-input password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              required
            />
          </div>
          <div className="input-with-icon">
            <svg
              onMouseDown={() => setShowConfirmPassword(true)}
              onMouseUp={() => setShowConfirmPassword(false)}
              onMouseLeave={() => setShowConfirmPassword(false)}
              onTouchStart={() => setShowConfirmPassword(true)}
              onTouchEnd={() => setShowConfirmPassword(false)}
              className="eye-icon clickable"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.69556 10.2687C1.63799 10.0959 1.63794 9.90895 1.6954 9.73619C2.85237 6.2581 6.13326 3.75 9.99994 3.75C13.8648 3.75 17.1445 6.25577 18.3029 9.73134C18.3604 9.90406 18.3605 10.0911 18.303 10.2638C17.1461 13.7419 13.8652 16.25 9.99848 16.25C6.1336 16.25 2.85397 13.7442 1.69556 10.2687Z"
                stroke="#0F172A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.4993 10C12.4993 11.3807 11.38 12.5 9.99927 12.5C8.61856 12.5 7.49927 11.3807 7.49927 10C7.49927 8.61929 8.61856 7.5 9.99927 7.5C11.38 7.5 12.4993 8.61929 12.4993 10Z"
                stroke="#0F172A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="auth-text-input password-confirmation"
              placeholder="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              required
            />
          </div>

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

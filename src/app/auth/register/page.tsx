"use client";

import { useState, useRef } from "react";
import "../styles.auth.css";
import AuthHeader from "../../../../components/header-auth";
import { dataProvider } from "@/app/data-provider";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleRemove = () => {
    setAvatar(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRegister = () => {
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmationError(false);
    setRegisterErrorMessage("");

    dataProvider
      .register(avatar, email, password, passwordConfirmation, username)
      .then((result) => {
        if (result.success) {
          router.push("/products");
        } else {
          const errors = result.data?.errors || {};
          setUsernameError(true);
          setEmailError(true);
          setPasswordError(true);
          setPasswordConfirmationError(true);

          if (result.error) {
            setRegisterErrorMessage(result.error);
          } else if (
            errors.username ||
            errors.email ||
            errors.password ||
            errors.password_confirmation
          ) {
            setRegisterErrorMessage(
              errors.username?.[0] ||
                errors.email?.[0] ||
                errors.password?.[0] ||
                errors.password_confirmation?.[0] ||
                "Registration failed"
            );
          }
        }
      })
      .catch(() => {
        setRegisterErrorMessage("Error. Please try again.");
      });
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
                <div className="placeholder-avatar">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9297 3C12.5984 3 13.2228 3.33424 13.5938 3.89062L14.4062 5.10938C14.7772 5.66576 15.4016 5.99998 16.0703 6H17C18.1046 6 19 6.89543 19 8V15C19 16.1046 18.1046 17 17 17H3C1.89543 17 1 16.1046 1 15V8C1 6.89543 1.89543 6 3 6H3.92969C4.59837 5.99998 5.22283 5.66576 5.59375 5.10938L6.40625 3.89062C6.77717 3.33424 7.40163 3 8.07031 3H11.9297ZM10 6.5C7.51472 6.5 5.5 8.51472 5.5 11C5.5 13.4853 7.51472 15.5 10 15.5C12.4853 15.5 14.5 13.4853 14.5 11C14.5 8.51472 12.4853 6.5 10 6.5ZM10 8C11.6569 8 13 9.34315 13 11C13 12.6569 11.6569 14 10 14C8.34315 14 7 12.6569 7 11C7 9.34315 8.34315 8 10 8Z"
                      fill="#3E424A"
                    />
                  </svg>
                </div>
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
            className={`auth-text-input username ${
              usernameError ? "input-validation-error" : ""
            }`}
            placeholder="Username"
            required
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            className={`auth-text-input email ${
              emailError ? "input-validation-error" : ""
            }`}
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.4993 10C12.4993 11.3807 11.38 12.5 9.99927 12.5C8.61856 12.5 7.49927 11.3807 7.49927 10C7.49927 8.61929 8.61856 7.5 9.99927 7.5C11.38 7.5 12.4993 8.61929 12.4993 10Z"
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={`auth-text-input password ${
                passwordError ? "input-validation-error" : ""
              }`}
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
              style={{ top: "50%" }}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.69556 10.2687C1.63799 10.0959 1.63794 9.90895 1.6954 9.73619C2.85237 6.2581 6.13326 3.75 9.99994 3.75C13.8648 3.75 17.1445 6.25577 18.3029 9.73134C18.3604 9.90406 18.3605 10.0911 18.303 10.2638C17.1461 13.7419 13.8652 16.25 9.99848 16.25C6.1336 16.25 2.85397 13.7442 1.69556 10.2687Z"
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.4993 10C12.4993 11.3807 11.38 12.5 9.99927 12.5C8.61856 12.5 7.49927 11.3807 7.49927 10C7.49927 8.61929 8.61856 7.5 9.99927 7.5C11.38 7.5 12.4993 8.61929 12.4993 10Z"
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className={`auth-text-input password-confirmation ${
                passwordConfirmationError ? "input-validation-error" : ""
              }`}
              placeholder="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              style={{ marginBottom: "0px" }}
              required
            />
          </div>
          <div className="error-container">
            {registerErrorMessage && (
              <p className="error-message error-message-register">
                {registerErrorMessage}
              </p>
            )}
          </div>

          <div className="register-actions">
            <button
              className="cta-button"
              onClick={handleRegister}
              style={{ margin: "0px 0px 24px 0px" }}
            >
              Register
            </button>
            <p>
              Already a member? <a href="/auth/login">Log in</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

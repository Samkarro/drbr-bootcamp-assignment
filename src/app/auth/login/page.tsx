"use client";

import { dataProvider } from "@/app/data-provider";
import { useState } from "react";
import "../styles.auth.css";
import AuthHeader from "../../../../components/header-auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    setEmailError(false);
    setPasswordError(false);
    setLoginErrorMessage("");

    dataProvider.login(email, password).then((result) => {
      if (result.success) {
        router.push("/products");
      } else {
        setEmailError(true);
        setPasswordError(true);

        if (result.data.message === "Unauthenticated.") {
          setEmailError(true);
          setPasswordError(true);
          setLoginErrorMessage("Incorrect email or password.");
        } else {
          if (result.data.errors["email"]) {
            setEmailError(true);
            setLoginErrorMessage(result.data.errors.email[0]);
          }
          if (result.data.errors["password"]) {
            setPasswordError(true);
            setLoginErrorMessage(result.data.errors.password[0]);
          }
        }
      }
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
          <h1
            style={{ width: "544px", marginBottom: "48px", paddingTop: "89px" }}
          >
            Log in
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={`auth-text-input email ${
              emailError ? "input-validation-error" : ""
            }`}
            placeholder="Email"
            required
          ></input>
          <div className="input-with-icon">
            <svg
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
              style={{ top: "50%" }}
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
              style={{ marginBottom: "0px" }}
              required
            />
          </div>
          <div className="error-container">
            {loginErrorMessage && (
              <p className="error-message">{loginErrorMessage}</p>
            )}
          </div>

          <button
            className="cta-button"
            onClick={(e: any) => handleLogin()}
            style={{
              margin: "0px 0px 24px 0px",
            }}
          >
            Log in
          </button>
          <p>
            Not a member? <a href="/auth/register">Register</a>
          </p>
        </div>
      </main>
    </div>
  );
}

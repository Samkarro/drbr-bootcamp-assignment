"use client";

import { useEffect, useState } from "react";
import MainHeader from "../(components)/header-main";
import "./styles.checkout.css";
import CheckoutCart from "./checkout-cart";
import { dataProvider } from "../data-provider";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("redseam-token");
    setToken(storedToken);

    const storedEmail = localStorage.getItem("redseam-email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);
    setAddressError(false);
    setZipcodeError(false);
    setPaymentError("");

    dataProvider
      .pay(name, surname, email, address, zipcode, token)
      .then((result) => {
        if (result.success) {
          setPaymentSuccess(true);
        } else {
          const errors = result.data?.errors || {};

          if (errors.name) setNameError(true);
          if (errors.surname) setSurnameError(true);
          if (errors.email) setEmailError(true);
          if (errors.address) setAddressError(true);
          if (errors.zip_code) setZipcodeError(true);

          if (result.error) {
            setPaymentError(result.error);
          } else if (
            errors.name ||
            errors.surname ||
            errors.email ||
            errors.address ||
            errors.zip_code
          ) {
            setPaymentError(
              errors.name?.[0] ||
                errors.surname?.[0] ||
                errors.email?.[0] ||
                errors.address?.[0] ||
                errors.zip_code?.[0] ||
                "Payment failed"
            );
          } else {
            setPaymentError("Payment failed");
          }
        }
      })
      .catch(() => {
        setPaymentError("Network error. Please try again.");
      });
  };

  return (
    <div className="checkout-page-container">
      <MainHeader />
      <main className="checkout-main">
        <h1 className="checkout-page-title">Checkout</h1>
        <div className="checkout-sections-container">
          <div className="checkout-form">
            <h2 className="checkout-form-heading">Order details</h2>

            <div className="shorter-inputs-container">
              <input
                className={`checkout-text-input shorter ${
                  nameError ? "input-validation-error" : ""
                }`}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={`checkout-text-input shorter ${
                  surnameError ? "input-validation-error" : ""
                }`}
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>

            <div className="input-with-icon">
              <svg
                className="email-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.125 5.625V14.375C18.125 15.4105 17.2855 16.25 16.25 16.25H3.75C2.71447 16.25 1.875 15.4105 1.875 14.375V5.625M18.125 5.625C18.125 4.58947 17.2855 3.75 16.25 3.75H3.75C2.71447 3.75 1.875 4.58947 1.875 5.625M18.125 5.625V5.82726C18.125 6.47837 17.7872 7.08287 17.2327 7.42412L10.9827 11.2703C10.38 11.6411 9.61996 11.6411 9.01732 11.2703L2.76732 7.42412C2.21279 7.08287 1.875 6.47837 1.875 5.82726V5.625"
                  stroke="#3E424A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                className={`checkout-text-input ${
                  emailError ? "input-validation-error" : ""
                }`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="shorter-inputs-container">
              <input
                className={`checkout-text-input shorter ${
                  addressError ? "input-validation-error" : ""
                }`}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className={`checkout-text-input shorter ${
                  zipcodeError ? "input-validation-error" : ""
                }`}
                placeholder="Zipcode"
                value={zipcode}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  setZipcode(onlyNums);
                }}
              />
            </div>

            {paymentError && <p className="error-message">{paymentError}</p>}
          </div>

          <div className="checkout-cart-container">
            <CheckoutCart token={token} handlePayment={handlePayment} />
          </div>
        </div>
      </main>

      {paymentSuccess && (
        <div className="overlay">
          <div className="modal">
            <div className="x-button-container">
              <svg
                className="modal-x-button"
                onClick={() => router.push("/products")}
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5607 10.4393C11.9749 9.85355 11.0251 9.85355 10.4393 10.4393C9.85355 11.0251 9.85355 11.9749 10.4393 12.5607L17.8787 20L10.4393 27.4393C9.85355 28.0251 9.85355 28.9749 10.4393 29.5607C11.0251 30.1464 11.9749 30.1464 12.5607 29.5607L20 22.1213L27.4393 29.5607C28.0251 30.1464 28.9749 30.1464 29.5607 29.5607C30.1464 28.9749 30.1464 28.0251 29.5607 27.4393L22.1213 20L29.5607 12.5607C30.1464 11.9749 30.1464 11.0251 29.5607 10.4393C28.9749 9.85355 28.0251 9.85355 27.4393 10.4393L20 17.8787L12.5607 10.4393Z"
                  fill="#3E424A"
                />
              </svg>
            </div>

            <img
              className="checkmark-icon"
              src={"/images/check.png"}
              alt="checkmark"
            />
            <div className="modal-text-container">
              <h1>Congrats!</h1>
              <p>Your order is placed successfully!</p>
            </div>

            <button
              className="cta-button"
              onClick={() => router.push("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

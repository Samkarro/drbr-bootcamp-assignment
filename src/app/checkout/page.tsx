"use client";
import { useEffect, useState } from "react";
import MainHeader from "../(components)/header-main";
import "./styles.checkout.css";

export default function CheckoutPage() {
  let localEmail: string | null = "";
  useEffect(() => {
    const storedEmail = localStorage.getItem("redseam-email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState(localEmail);

  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  return (
    <div>
      <MainHeader></MainHeader>
      <main className="checkout-main">
        <h1 style={{ margin: "60px 0px 42px 0px" }}>Checkout</h1>
        <div className="checkout-sections-container">
          <div className="checkout-form">
            <h2 className="checkout-form-heading">Order details</h2>
            <div className="shorter-inputs-container">
              <input
                className="checkout-text-input shorter"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="checkout-text-input shorter"
                placeholder="Surname"
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
                className="checkout-text-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="shorter-inputs-container">
              <input
                className="checkout-text-input shorter"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="checkout-text-input shorter"
                placeholder="Zipcode"
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

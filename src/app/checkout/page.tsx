"use client";
import { useState } from "react";
import MainHeader from "../(components)/header-main";

export default function CheckoutPage() {
  const localEmail = localStorage.getItem("redseam-email");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState(localEmail);

  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  return (
    <div>
      <MainHeader></MainHeader>
      <main className="checkout-main">
        <h1>Checkout</h1>
        <div className="checkout-sections-container">
          <div className="checkout-form">
            <div style={{ display: "flex" }}>
              <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Surname"
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ display: "flex" }}>
              <input
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
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

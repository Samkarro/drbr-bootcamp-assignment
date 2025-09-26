"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { dataProvider } from "../data-provider";
import CartItem from "./cart-item";

export default function SidebarContent({
  token,
  setAmt,
}: {
  token: string | null;
  setAmt: Dispatch<SetStateAction<number>>;
}) {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    dataProvider.getCart(token).then(setCart);
    console.log(cart);
  }, [token]);

  if (!cart) {
    return (
      <div className="empty-cart-container">
        <div className="cart-image-container">
          <img
            src={"/images/big-cart.png"}
            style={{ width: "120.12", height: "97.79" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      {cart.items?.length ? (
        <div>
          (
          {cart.items.map((item: any) => (
            <CartItem key={item}></CartItem>
          ))}
          )
        </div>
      ) : (
        <div className="empty-cart-container">
          <div className="cart-image-container">
            <img
              src={"/images/big-cart.png"}
              style={{ width: "120.12", height: "97.79" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

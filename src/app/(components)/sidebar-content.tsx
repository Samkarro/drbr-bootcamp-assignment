"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { dataProvider } from "../data-provider";

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
    dataProvider.getCart(token).then((data) => {
      setCart(data);
      console.log(data);
    });
  }, [token]);

  useEffect(() => {
    if (cart?.length) {
      setAmt(cart.length);
    }
  }, [cart]);

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

  const handleRemove = async (productId: number) => {
    if (!token) return;
    try {
      await dataProvider.removeFromCart(productId, token);

      setCart((prev: any) => prev.filter((item: any) => item.id !== productId));
    } catch (err) {
      console.log("Failed to remove product:", err);
    }
  };

  return (
    <div>
      {cart?.length ? (
        <div
          style={{
            overflow: "scroll",
            height: "700px",
            padding: "1px 1px 1px 1px",
          }}
        >
          {cart.map((item: any) => (
            <div key={item.id} className="cart-item">
              <img src={item.cover_image} />
              <div className="cart-item-info">
                <div className="cart-item-info-top-text">
                  <p>{item.name}</p>
                  <p style={{ fontSize: "18px" }}>$ {item.price}</p>
                </div>
                <p>{item.color}</p>
                <p>{item.size}</p>
                <div className="cart-item-controls">
                  <div className="quantity-editor-container">
                    <svg
                      className={`decrease-quantity-button ${
                        item.quantity <= 1 ? "disabled" : "clickable"
                      }`}
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 7.75C3.33579 7.75 3 8.08579 3 8.5C3 8.91421 3.33579 9.25 3.75 9.25L12.25 9.25C12.6642 9.25 13 8.91421 13 8.5C13 8.08579 12.6642 7.75 12.25 7.75H3.75Z"
                        fill="#E1DFE1"
                      />
                    </svg>
                    <p className="quantity-number">{item.quantity}</p>
                    <svg
                      className={`increase-quantity-button ${
                        item.quantity >= 10 ? "disabled" : "clickable"
                      }`}
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.75 4.25C8.75 3.83579 8.41421 3.5 8 3.5C7.58579 3.5 7.25 3.83579 7.25 4.25V7.75H3.75C3.33579 7.75 3 8.08579 3 8.5C3 8.91421 3.33579 9.25 3.75 9.25L7.25 9.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V9.25L12.25 9.25C12.6642 9.25 13 8.91421 13 8.5C13 8.08579 12.6642 7.75 12.25 7.75H8.75V4.25Z"
                        fill="#3E424A"
                      />
                    </svg>
                  </div>
                  <p
                    className="cart-item-remover"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </p>
                </div>
              </div>
            </div>
          ))}
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

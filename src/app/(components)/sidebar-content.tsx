"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { dataProvider } from "../data-provider";
import { useRouter } from "next/navigation";

export default function SidebarContent({
  token,
  setAmt,
}: {
  token: string | null;
  setAmt: Dispatch<SetStateAction<number>>;
}) {
  const [cart, setCart] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    dataProvider.getCart(token).then((data) => {
      setCart(data);
      console.log(data);
    });
  }, [token]);

  useEffect(() => {
    setAmt(cart ? cart.length : 0);
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

  const handleRemove = async (id: number) => {
    if (!token) return;
    try {
      await dataProvider.removeFromCart(id, token);

      setCart((prev: any) => prev.filter((item: any) => item.id !== id));
    } catch (err) {
      console.log("Failed to remove product:", err);
    }
  };

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    if (!token) return;

    try {
      await dataProvider.updateCart(id, newQuantity, token);

      setCart((prev: any) =>
        prev.map((item: any) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.log("Failed to update product quantity:", err);
    }
  };

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const delivery = 5;
  const total = subtotal + delivery;

  return (
    <div>
      {cart?.length ? (
        <div>
          <div
            style={{
              overflow: "scroll",
              height: "540px",
              padding: "1px 1px 1px 1px",
            }}
          >
            {cart.map((item: any) => (
              <div key={item.id} className="cart-item">
                <img src={item.cover_image} />
                <div className="cart-item-info">
                  <div className="cart-item-info-top-text">
                    <p style={{ width: "285px" }}>{item.name}</p>
                    <p style={{ fontSize: "18px" }}>$ {item.price}</p>
                  </div>
                  <p>{item.color}</p>
                  <p>{item.size}</p>
                  <div className="cart-item-controls">
                    <div className="quantity-editor-container">
                      <svg
                        onClick={() => {
                          if (item.quantity > 1) {
                            handleUpdateQuantity(item.id, item.quantity - 1);
                          }
                        }}
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
                          fill={`${item.quantity <= 1 ? "#E1DFE1" : "#3E424A"}`}
                        />
                      </svg>
                      <p className="quantity-number">{item.quantity}</p>
                      <svg
                        onClick={() => {
                          if (item.quantity < 10) {
                            handleUpdateQuantity(item.id, item.quantity + 1);
                          }
                        }}
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
                          fill={item.quantity >= 10 ? "#E1DFE1" : "#3E424A"}
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
          <div className="totals-container">
            <div className="totals-labels">
              <p className="totals-small">Items subtotal</p>
              <p className="totals-small">Delivery</p>
              <p className="totals-big">Total</p>
            </div>
            <div className="totals-prices">
              <p className="totals-small">$ {subtotal}</p>
              <p className="totals-small">$ {delivery}</p>
              <p className="totals-big">$ {total}</p>
            </div>
          </div>
          <button
            className="cta-button"
            onClick={() => router.push("/checkout")}
            style={{ width: "460px", height: "59px", marginBottom: "40px" }}
          >
            Go to checkout
          </button>
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

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
                  <div className="quantity-editor-container"></div>
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

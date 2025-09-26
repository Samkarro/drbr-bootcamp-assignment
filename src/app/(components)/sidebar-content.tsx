"use client";
import { useEffect, useState } from "react";
import { dataProvider } from "../data-provider";

export default function SidebarContent({ token }: { token: string | null }) {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    dataProvider.getCart(token).then(setCart);
  }, [token]);

  if (!cart) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Cart</h2>
      {cart.items?.length ? (
        <ul>
          {cart.items.map((item: any) => (
            <li key={item.id}>
              {item.name} × {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Cart is empty.</p>
      )}
    </div>
  );
}

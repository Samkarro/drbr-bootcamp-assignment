"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("redseam-token");
    if (token) {
      router.replace("/products");
    } else {
      router.replace("/auth/login");
    }
  });
  return (
    <div
      className={styles.page}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          color: "var(--redseam-mid-gray)",
          fontSize: "90px",
          fontWeight: "600",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        ...
      </p>
    </div>
  );
}

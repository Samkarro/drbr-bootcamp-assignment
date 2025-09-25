"use client";
import { dataProvider } from "@/app/data-provider";
import MainHeader from "../../(components)/header-main";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import ProductPage from "./product-page";
import "../styles.products.css";

export default function ProductsID() {
  const id = usePathname().replace("/products/", "");
  const product = dataProvider.getProduct(id);
  console.log(usePathname());

  return (
    <div>
      <MainHeader></MainHeader>
      <main className="product-id-main">
        <p
          style={{
            width: "1720px",
            fontWeight: "300",
            marginTop: "30px",
            marginBottom: "49px",
          }}
        >
          Listing / Product
        </p>
        <Suspense>
          <ProductPage product={product}></ProductPage>
        </Suspense>
      </main>
    </div>
  );
}

"use client";
import { Suspense, useState } from "react";
import MainHeader from "../../../components/header-main";
import { dataProvider } from "../data-provider";
import "./styles.products.css";
import ProductList from "./product-list";

export default function Products() {
  const [page, setPage] = useState(1);

  let products = dataProvider.getProducts(page, 100, 500, "price");

  return (
    <div>
      <MainHeader />
      <main className="products-main">
        <div className="product-filter-bar-container">
          <h1>Products</h1>
        </div>

        <Suspense fallback={<h2>Loading...</h2>}>
          <ProductList products={products} setPage={setPage} />
        </Suspense>
      </main>
    </div>
  );
}

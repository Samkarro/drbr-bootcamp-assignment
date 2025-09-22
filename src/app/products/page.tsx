"use client";
import MainHeader from "../../../components/header-main";
import { dataProvider } from "../data-provider";
import "./styles.products.css";

export default function Products() {
  const data = dataProvider.getProducts(1, 100, 500, "price");
  return (
    <div>
      <MainHeader />
      <main className="products-main">
        <div className="product-filter-bar-container">
          <h1>Products</h1>
        </div>
      </main>
    </div>
  );
}

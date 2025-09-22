import { Suspense } from "react";
import MainHeader from "../../../components/header-main";
import ProductCard from "../../../components/product-card";

import { dataProvider } from "../data-provider";
import "./styles.products.css";
import ProductList from "./product-list";

export default function Products() {
  const products = dataProvider.getProducts(1, 100, 500, "price");

  return (
    <div>
      <MainHeader />
      <main className="products-main">
        <div className="product-filter-bar-container">
          <h1>Products</h1>
        </div>

        <Suspense fallback={<h2>Loading...</h2>}>
          <ProductList products={products} />
        </Suspense>
      </main>
    </div>
  );
}

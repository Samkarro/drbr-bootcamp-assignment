"use client";
import { use } from "react";
import ProductCard from "../../../components/product-card";

export default function ProductList({
  products,
}: {
  products: Promise<{
    data: [
      {
        id: number;
        image: string;
        name: string;
        price: number;
        release_year: string | Date;
      }
    ];
    links: {
      first: string;
      last: string;
      next: string;
      prev: string;
    };
    meta: {
      current_page: number;
      current_page_url: string;
      from: string;
      path: string;
      per_page: number;
      to: number;
    };
  }>;
}) {
  const allProducts = use(products);

  return (
    <div className="products-container">
      {allProducts.data.map((product) => (
        <ProductCard
          coverImage={product.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}

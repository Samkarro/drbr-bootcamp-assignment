"use client";
import { Dispatch, SetStateAction, use } from "react";
import ProductCard from "../../../components/product-card";

export default function ProductList({
  products,
  setPage,
}: {
  products: Promise<{
    data: [
      {
        id: number;
        images: [string];
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
      links: [{ url: string; label: string; active: boolean }];
      from: string;
      path: string;
      per_page: number;
      to: number;
    };
  }>;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const allProducts = use(products);
  console.log(allProducts);
  const changepage = (num: number) => {
    setPage(num);
  };

  return (
    <div className="product-cards-container">
      {allProducts.data.map((product) => (
        <ProductCard
          key={product.id}
          coverImage={product.images[0]}
          name={product.name}
          price={product.price}
        />
      ))}
      <nav className="page-nav-container">
        {allProducts.meta.links.map((page) => {
          if (
            page.label === allProducts.meta.links[0].label ||
            page.label ===
              allProducts.meta.links[allProducts.meta.links.length - 1].label
          ) {
            return;
          }
          return (
            <button
              key={page.label}
              className="page-nav-button"
              onClick={(e) => changepage(parseInt(page.label))}
            >
              {page.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

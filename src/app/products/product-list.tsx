"use client";
import { Dispatch, SetStateAction, use, useEffect } from "react";
import ProductCard from "../../../components/product-card";

export default function ProductList({
  products,
  setPage,
  page,
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
      current_page: string;
      current_page_url: string;
      links: [{ url: string; label: string; active: boolean }];
      from: string;
      path: string;
      per_page: number;
      to: string;
      total: string;
    };
  }>;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}) {
  const allProducts = use(products);
  console.log(allProducts.meta);
  const changepage = (num: number) => {
    if (num < 1) {
      console.log("too small");
      return;
    }
    if (num >= allProducts.meta.links.length - 1) {
      console.log("too big");
      return;
    }
    setPage(num);
  };

  useEffect(() => {
    const element = document.getElementById("showing-results-text");

    if (element) {
      element.innerText = "Showing - of ... results";
      let updatedText = element.innerText;

      updatedText = updatedText.replace(
        " - ",
        ` ${allProducts.meta.from.toString()} - ${allProducts.meta.to.toString()} `
      );
      updatedText = updatedText.replace(
        "...",
        allProducts.meta.total.toString()
      );
      element.innerText = updatedText;

      console.log("Updated text:", element.innerText);
    }
  }, [allProducts.meta.from, allProducts.meta.to]);

  return (
    <div className="products-container">
      <div className="product-cards-container">
        {allProducts.data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            coverImage={product.images[0]}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
      <div className="page-nav-container">
        <div
          className="page-nav-prev-next"
          onClick={(e) => changepage(page - 1)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.7803 5.21967C12.0732 5.51256 12.0732 5.98744 11.7803 6.28033L8.06066 10L11.7803 13.7197C12.0732 14.0126 12.0732 14.4874 11.7803 14.7803C11.4874 15.0732 11.0126 15.0732 10.7197 14.7803L6.46967 10.5303C6.17678 10.2374 6.17678 9.76256 6.46967 9.46967L10.7197 5.21967C11.0126 4.92678 11.4874 4.92678 11.7803 5.21967Z"
              fill="#10151F"
            />
          </svg>
        </div>
        {allProducts.meta.links.map((page) => {
          if (
            page.label === allProducts.meta.links[0].label ||
            page.label ===
              allProducts.meta.links[allProducts.meta.links.length - 1].label
          ) {
            return;
          }
          return (
            <div
              style={
                page.active === true
                  ? { outline: "1px solid #FF4000" }
                  : { outline: "1px solid #F8F6F7" }
              }
              key={page.label}
              className="page-nav-button"
              onClick={(e) => changepage(parseInt(page.label))}
            >
              <p
                style={
                  page.active === true
                    ? { color: "#FF4000" }
                    : { color: "#3E424A", opacity: "60%" }
                }
              >
                {page.label}
              </p>
            </div>
          );
        })}
        <div
          className="page-nav-prev-next"
          onClick={(e) => changepage(page + 1)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.21967 5.21967C8.51256 4.92678 8.98744 4.92678 9.28033 5.21967L13.5303 9.46967C13.8232 9.76256 13.8232 10.2374 13.5303 10.5303L9.28033 14.7803C8.98744 15.0732 8.51256 15.0732 8.21967 14.7803C7.92678 14.4874 7.92678 14.0126 8.21967 13.7197L11.9393 10L8.21967 6.28033C7.92678 5.98744 7.92678 5.51256 8.21967 5.21967Z"
              fill="#10151F"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

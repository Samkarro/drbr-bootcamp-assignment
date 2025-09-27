"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../(components)/product-card";

export default function ProductList({
  products,
  page,
}: {
  products: {
    data: {
      id: number;
      images: string[];
      name: string;
      price: number;
      release_year: string | Date;
    }[];
    links: {
      first: string;
      last: string;
      next: string | null;
      prev: string | null;
    };
    meta: {
      current_page: number;
      links: { url: string | null; label: string; active: boolean }[];
      from: number;
      to: number;
      total: number;
      per_page: number;
    };
  };
  page: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const changepage = (num: number) => {
    const totalPages = products.meta.links.length - 2;
    if (num < 1 || num > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", num.toString());

    router.push(`/products?${params.toString()}`);
  };

  const getVisiblePages = () => {
    const total = products.meta.links.length - 2;
    const current = page;
    const delta = 1;
    const pages: (number | string)[] = [];

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="products-container">
      <div className="product-cards-container">
        {products.data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            coverImage={product.images[0]}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>

      <div className="page-nav-container flex items-center gap-2 mt-4">
        <div
          className="page-nav-prev-next cursor-pointer p-2 hover:bg-gray-100 rounded"
          onClick={() => changepage(page - 1)}
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

        {visiblePages.map((p, idx) =>
          p === "..." ? (
            <div
              key={`dots-${idx}`}
              className="page-nav-button cursor-default p-2"
              style={{ outline: "1px solid #F8F6F7", borderRadius: "4px" }}
            >
              <p style={{ color: "#3E424A", opacity: 0.6 }}>...</p>
            </div>
          ) : (
            <div
              key={`page-${p}`}
              className="page-nav-button cursor-pointer p-2 rounded"
              onClick={() => changepage(Number(p))}
              style={{
                outline: p === page ? "1px solid #FF4000" : "1px solid #F8F6F7",
              }}
            >
              <p
                style={{
                  color: p === page ? "#FF4000" : "#3E424A",
                  opacity: p === page ? 1 : 0.6,
                }}
              >
                {p}
              </p>
            </div>
          )
        )}

        <div
          className="page-nav-prev-next cursor-pointer p-2 hover:bg-gray-100 rounded"
          onClick={() => changepage(page + 1)}
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

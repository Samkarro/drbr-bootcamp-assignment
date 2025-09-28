"use client";

import CustomSelect from "@/app/(components)/custom-select";
import { dataProvider } from "@/app/data-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage({
  product,
}: {
  product: {
    id: number;
    name: string;
    description: string;
    release_year: string;
    cover_image: string;
    images: string[];
    price: number;
    available_colors: string[] | null;
    available_sizes: string[] | null;
    brand: {
      id: number;
      name: string;
      image: string;
    };
  };
}) {
  const colorMap: { [key: string]: string } = {
    White: "#FFFFFF",
    Red: "#FF0000",
    Multi: "linear-gradient(90deg, red, yellow, green, blue)",
    Blue: "#0000FF",
    "Navy Blue": "#001F54",
    Grey: "#808080",
    Black: "#000000",
    Purple: "#800080",
    Orange: "#FFA500",
    Beige: "#F5F5DC",
    Pink: "#FFC0CB",
    Green: "#008000",
    Cream: "#FFFDD0",
    Maroon: "#800000",
    Brown: "#A52A2A",
    Peach: "#FFE5B4",
    "Off White": "#F8F8F0",
    Mauve: "#E0B0FF",
    Yellow: "#FFFF00",
    Magenta: "#FF00FF",
    Khaki: "#F0E68C",
    Olive: "#808000",
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.available_sizes?.[0] ?? null
  );
  const [selectedQuantity, setSelectedQuantity] = useState(3);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("redseam-token"));
  }, []);

  const addToCart = () => {
    dataProvider
      .addToCart(
        product.id,
        product.available_colors?.[selectedIndex] ?? "",
        selectedQuantity,
        selectedSize,
        token
      )
      .then(() => router.push("/products"));
  };

  return (
    <div className="product-info-container">
      <div className="all-product-pictures-container">
        {product.images.map((image, i) => {
          if (i !== selectedIndex) {
            return (
              <img
                key={image}
                className="small-side-product-image clickable"
                src={image}
                alt={product.name}
                style={{ marginBottom: "9px" }}
                onClick={() => setSelectedIndex(i)}
              />
            );
          }
        })}
      </div>

      <div className="product-info-main-section">
        <img
          className="product-details-image"
          src={product.images[selectedIndex]}
          alt={product.name}
        />

        <div className="product-details-container">
          <p
            className="product-name-and-pricing"
            style={{ marginBottom: "21px" }}
          >
            {product.name}
          </p>
          <p className="product-name-and-pricing">$ {product.price}</p>

          <div className="product-form">
            {product.available_colors &&
              product.available_colors.length > 0 && (
                <div className="color-picker-container">
                  <p className="option-label">
                    Color: {product.available_colors[selectedIndex]}
                  </p>
                  <div style={{ display: "flex", columnGap: "18px" }}>
                    {product.available_colors.map((color, i) => (
                      <div
                        key={color}
                        className={`product-color ${
                          selectedIndex === i ? "product-color-active" : ""
                        }`}
                        style={{ background: colorMap[color] ?? "#000" }}
                        onClick={() => setSelectedIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              )}
            {(!product.available_sizes ||
              product.available_sizes.length === 0 ||
              !product.available_colors ||
              product.available_colors.length === 0) && (
              <p
                style={{
                  color: "#ff4000",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                This item is unavailable
              </p>
            )}

            {product.available_sizes && product.available_sizes.length > 0 && (
              <div className="size-picker-container">
                <p className="option-label">Size: {selectedSize}</p>
                <div style={{ display: "flex", columnGap: "18px" }}>
                  {product.available_sizes.map((size) => (
                    <div
                      key={size}
                      className={`product-size ${
                        selectedSize === size ? "product-size-active" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.available_sizes &&
              product.available_sizes.length > 0 &&
              product.available_colors &&
              product.available_colors.length > 0 && (
                <>
                  <div className="quantity-picker-container">
                    <p
                      className="option-label"
                      style={{ marginBottom: "16px" }}
                    >
                      Quantity
                    </p>
                    <CustomSelect
                      value={selectedQuantity}
                      onChange={setSelectedQuantity}
                      options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    />
                  </div>

                  <button
                    className="cta-button"
                    onClick={() =>
                      token ? addToCart() : router.push("/auth/login")
                    }
                    style={{
                      width: "100%",
                      height: "59px",
                      fontSize: "18px",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <svg
                      style={{ marginRight: "10px" }}
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 3.5H3.63568C4.14537 3.5 4.59138 3.84265 4.7227 4.33513L5.1059 5.77209M7.5 14.75C5.84315 14.75 4.5 16.0931 4.5 17.75H20.25M7.5 14.75H18.7183C19.8394 12.4494 20.8177 10.0664 21.6417 7.6125C16.88 6.39646 11.8905 5.75 6.75 5.75C6.20021 5.75 5.65214 5.7574 5.1059 5.77209M7.5 14.75L5.1059 5.77209M6 20.75C6 21.1642 5.66421 21.5 5.25 21.5C4.83579 21.5 4.5 21.1642 4.5 20.75C4.5 20.3358 4.83579 20 5.25 20C5.66421 20 6 20.3358 6 20.75ZM18.75 20.75C18.75 21.1642 18.4142 21.5 18 21.5C17.5858 21.5 17.25 21.1642 17.25 20.75C17.25 20.3358 17.5858 20 18 20C18.4142 20 18.75 20.3358 18.75 20.75Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Add to cart
                  </button>
                </>
              )}
          </div>

          <hr style={{ margin: "56px 0px 56px 0px" }} />

          <div className="product-description-container">
            <div className="logo-detail-container">
              <h2>Details</h2>
              <img
                className="product-logo"
                src={product.brand.image}
                alt={product.brand.name}
              />
            </div>
            <p className="option-label" style={{ margin: "7px 0px 19px 0px" }}>
              Brand: {product.brand.name}
            </p>
            <p className="option-label">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

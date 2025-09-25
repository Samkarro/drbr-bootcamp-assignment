import Script from "next/script";
import { use, useEffect, useState } from "react";

export default function ProductPage({
  product,
}: {
  product: Promise<{
    id: number;
    name: string;
    description: string;
    release_year: string;
    cover_image: string;
    images: [string];
    price: number;
    available_colors: [string];
    available_sizes: [string];
    brand: {
      id: number;
      name: string;
      image: string;
    };
  }>;
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

  const returnedProduct = use(product);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    returnedProduct.available_colors[0]
  );

  return (
    <div className="product-info-container">
      <div className="all-product-pictures- ontainer">
        {returnedProduct.images.map((image) => {
          if (image !== returnedProduct.images[0]) {
            return (
              <img
                key={image}
                className="small-side-product-image"
                src={image}
              />
            );
          }
        })}
      </div>
      <div className="product-info-main-section">
        <img
          className="product-details-image"
          src={returnedProduct.cover_image}
        />
        <div className="product-details-container">
          <p className="product-name-and-pricing">{returnedProduct.name}</p>
          <p className="product-name-and-pricing">$ {returnedProduct.price}</p>
          <div className="color-picker-container">
            <p>Color: {selectedColor}</p>
            <div style={{ display: "flex", columnGap: "18px" }}>
              {returnedProduct.available_colors.map((color) => {
                return (
                  <div
                    key={color}
                    className={`product-color ${
                      selectedColor === color ? "product-color-active" : ""
                    }`}
                    style={{ background: colorMap[color] }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

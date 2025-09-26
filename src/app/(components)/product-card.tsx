"use client";
import { useRouter } from "next/navigation";

export default function ProductCard({
  id,
  coverImage,
  name,
  price,
}: {
  id: number;
  coverImage: string;
  name: string;
  price: number;
}) {
  const router = useRouter();
  const ProductByID = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="product-card" onClick={ProductByID}>
      <div className="product-list-image-container">
        <img className="product-list-image" src={coverImage} />
        <div className="product-card-info-container">
          <p style={{ fontSize: "18px" }}>{name}</p>
          <p style={{ fontSize: "16px" }}>$ {price}</p>
        </div>
      </div>
    </div>
  );
}

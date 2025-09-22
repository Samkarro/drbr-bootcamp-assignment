export default function ProductCard({
  coverImage,
  name,
  price,
}: {
  coverImage: string;
  name: string;
  price: number;
}) {
  return (
    <div className="product-card">
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

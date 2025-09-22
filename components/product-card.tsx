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
      <div className="product-image-container">
        <img src={coverImage} />
        <div className="product-card-info-container">
          <p>{name}</p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
}

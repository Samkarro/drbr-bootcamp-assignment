import MainHeader from "../../../components/header-main";
import "./styles.products.css";

export default function Products() {
  return (
    <div>
      <MainHeader />
      <main className="products-main">
        <div className="product-filter-bar-container">
          <h1>Products</h1>
        </div>
      </main>
    </div>
  );
}

import MainHeader from "../(components)/header-main";
import { dataProvider } from "../data-provider";
import "./styles.products.css";
import ProductList from "./product-list";

export default async function Products({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const filters = await searchParams;
  const page = parseInt((await filters.page) ?? "1");
  const products = await dataProvider.getProducts(page, 1, 5000, "price");

  return (
    <div>
      <MainHeader />
      <main className="products-main">
        <div className="product-filter-bar-container">
          <h1>Products</h1>
          <div className="product-filters-container">
            <p id="sort-by-button">Sort By</p>
            <p id="price-filter-button">Filter</p>

            <svg
              style={{ marginLeft: "32px" }}
              width="1"
              height="15"
              viewBox="0 0 1 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                y1="0.5"
                x2="0.499999"
                y2="14.5"
                stroke="#E1DFE1"
              />
            </svg>

            <div id="showing-results-text">
              Showing {products.meta.from} - {products.meta.to} of{" "}
              {products.meta.total} results
            </div>
          </div>
        </div>

        <ProductList products={products} page={page} />
      </main>
    </div>
  );
}

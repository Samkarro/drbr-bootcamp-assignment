import MainHeader from "../(components)/header-main";
import { dataProvider } from "../data-provider";
import "./styles.products.css";
import ProductList from "./product-list";
import Sorter from "./sorter";
import Filter, { ActiveInfo } from "./filter";

export default async function Products({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string };
}) {
  const filters = await searchParams;
  const page = parseInt((await filters.page) ?? "1");
  const sort = filters.sort ?? "";
  const priceFrom = parseInt((filters as any)["filter[price_from]"] ?? "0");
  const priceTo = parseInt((filters as any)["filter[price_to]"] ?? "5000");

  const products = await dataProvider.getProducts(
    page,
    priceFrom,
    priceTo,
    sort
  );

  return (
    <div>
      <MainHeader />
      <main className="products-main">
        <div className="product-filter-bar-container">
          <h1>Products</h1>
          <div className="product-filters-container">
            <Sorter />
            <Filter />
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

        <ActiveInfo />

        <ProductList products={products} page={page} />
      </main>
    </div>
  );
}

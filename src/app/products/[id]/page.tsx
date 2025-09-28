import { dataProvider } from "@/app/data-provider";
import MainHeader from "../../(components)/header-main";
import ProductPage from "./product-page";
import "../styles.products.css";

export default async function ProductsID({
  params,
}: {
  params: { id: string };
}) {
  const newParams = await params;
  const product = await dataProvider.getProduct(newParams.id);

  return (
    <div>
      <MainHeader />
      <main className="product-id-main">
        <p
          style={{
            width: "1720px",
            fontWeight: "300",
            marginTop: "110px",
            marginBottom: "49px",
          }}
        >
          Listing / Product
        </p>
        <ProductPage product={product} />
      </main>
    </div>
  );
}

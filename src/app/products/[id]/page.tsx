"use client";
import { dataProvider } from "@/app/data-provider";
import MainHeader from "../../../../components/header-main";
import { usePathname } from "next/navigation";

export default function ProductsID() {
  const id = usePathname().replace("/products/", "");
  const product = dataProvider.getProduct(id);
  console.log(usePathname());
  return (
    <div>
      <MainHeader></MainHeader>
    </div>
  );
}

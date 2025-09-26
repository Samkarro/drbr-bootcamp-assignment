import { dataProvider } from "../data-provider";

export default async function Sidebar() {
  const token: string | null = localStorage.getItem("redseam-token");
  const cart = await dataProvider.getCart(token);
  return <div className="sidebar-container"></div>;
}

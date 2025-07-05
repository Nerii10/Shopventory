import { useShop } from "../../../contexts/shopContext";

export default function Panel() {
  const { stats } = useShop();

  return (
    <section className="dashboard-page-wrapper">
      <h1>Panel Główny</h1>
      <p>Zarobki dzisiaj</p>
      <p>Całkowita sprzedaz: {stats?.today?.total}zł</p>
      <p>Zysk: {stats?.today?.profit}zł</p>
    </section>
  );
}

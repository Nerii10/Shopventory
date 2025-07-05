import { useShop } from "../../../contexts/shopContext";

export default function Panel() {
  const { stats } = useShop();

  return (
    <section className="dashboard-page-wrapper">
      <h1>Panel Główny</h1>
      <p>Zarobki <strong>dzisiaj</strong></p>
      <p>Całkowita sprzedaz: {stats?.today?.total}zł</p>
      <p>Zysk: {stats?.today?.profit}zł</p>

      <p>Zarobki <strong>od początku</strong></p>
      <p>Całkowita sprzedaz: {stats?.allTime?.total}zł</p>
      <p>Zysk: {stats?.allTime?.profit}zł</p>
    </section>
  );
}

import { DollarSign, ShoppingBag, ChartNoAxesCombined } from "lucide-react";
import { Link } from "react-router";
import Input from "../../components/Input";
import { useUser } from "../../hooks/useUser";

export default function Sidebar() {
  const pages = [
    { title: "Panel", icon: <ChartNoAxesCombined />, link: "panel" },
    { title: "Przedmioty", icon: <ShoppingBag />, link: "items" },
    { title: "Sprzedaże", icon: <DollarSign />, link: "sales" },
  ];

  const { logout } = useUser();

  return (
    <section className="dashboard-sidebar">
      <h1>Sidebar</h1>
      {pages.map((page) => (
        <Link to={page.link} className="sidebar_link">
          <p className="sidebar_link_p">
            {page.icon}
            {page.title}
          </p>
        </Link>
      ))}
      <Input
        type={"button"}
        children={"Wyloguj"}
        onClick={() => {
          logout();
        }}
      />

      <Link to={"/auth"} style={{ color: "white", textDecoration: "none" }}>
        {" "}
        <Input type={"button"} children={"Zaloguj"} />
      </Link>
    </section>
  );
}

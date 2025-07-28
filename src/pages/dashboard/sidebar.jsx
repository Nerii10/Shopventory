import {
  DollarSign,
  ShoppingBag,
  ChartNoAxesCombined,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import Input from "../../components/Input";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function Sidebar() {
  const pages = [
    {
      title: "Panel",
      icon: <ChartNoAxesCombined style={{ flexShrink: 0 }} />,
      link: "panel",
    },
    {
      title: "Przedmioty",
      icon: <ShoppingBag style={{ flexShrink: 0 }} />,
      link: "items",
    },
    {
      title: "Sprzedaże",
      icon: <DollarSign style={{ flexShrink: 0 }} />,
      link: "sales",
    },
  ];

  const { logout } = useUser();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setOpen(false);
    console.log(location);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 1000);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return mobile ? (
    <>
      <div
        className="dashboard-sidebar-mobile-toggle"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <motion.div
          animate={open ? { rotate: 180 } : { rotate: 0 }}
          style={{ placeItems: "center", display: "flex" }}
        >
          <ChevronRight />
        </motion.div>
      </div>
      <motion.section
        className={
          open
            ? "dashboard-sidebar-mobile-open"
            : "dashboard-sidebar-mobile-closed"
        }
      >
        <h1>Sidebar mobile</h1>
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
      </motion.section>{" "}
    </>
  ) : (
    <>
      <section className={"dashboard-sidebar"}>
        <h1>Sidebar Desk</h1>
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
      </section>{" "}
    </>
  );
}

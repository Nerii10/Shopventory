import { Outlet } from "react-router";
import "../../styles/Dashboard.css";
import Sidebar from "./sidebar";

export default function Dashboard({ children }) {
  return (
    <section className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-outlet">
        <Outlet />
      </div>
    </section>
  );
}

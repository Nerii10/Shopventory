import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Test from "./pages/test/test";
import Test2 from "./pages/test/test2";
import Panel from "./pages/dashboard/panel/panel";
import Items from "./pages/dashboard/items/items";
import Sales from "./pages/dashboard/sales/sales";
import Auth from "./pages/auth/auth";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Panel />} /> 
        <Route path="panel" element={<Panel />} />
        <Route path="items" element={<Items />} />
        <Route path="sales" element={<Sales />} />
      </Route>

      <Route path="*" element={<Auth />} />
    </Routes>
  );
}

export default App;

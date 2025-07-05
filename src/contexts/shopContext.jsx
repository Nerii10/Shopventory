import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // poprawny import
import { useFetch } from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";
import { useItems } from "../hooks/useItems";
import { useSales } from "../hooks/useSales";
import axios from "axios";

// 1. Tworzymy kontekst
const ShopContext = createContext();

// 2. Własny hook do łatwego użycia kontekstu
export const useShop = () => useContext(ShopContext);

// 3. Provider
export const ShopProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { token } = useUser();
  const { fetchData } = useFetch({ token });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [stats, setStats] = useState([]);

  //Fetching
  const fetchItems = async () => {
    const data = await fetchData(`${API_URL}/items/all`);
    setItems(data);
    console.log(data);
  };

  const fetchSales = async () => {
    const data = await fetchData(`${API_URL}/sales/all`);
    setSales(data);
    console.log(data);
  };

  const fetchStats = async () => {
    const data = await fetchData(`${API_URL}/stat/today`);
    setStats((prev) => ({ ...prev, today: data }));
    console.log(data);
  };

  //Sales
  async function addSale(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/sales/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      fetchSales();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  async function removeSale(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/sales/remove`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      fetchSales();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  //Items
  async function addItems(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/items/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      fetchItems();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  const location = useLocation();

  useEffect(() => {
    if (token) {
      fetchItems();
      fetchSales();
      fetchStats();
    }
  }, [location, token]);

  return (
    <ShopContext.Provider
      value={{ addSale, removeSale, addItems, items, sales, stats }}
    >
      {children}
    </ShopContext.Provider>
  );
};

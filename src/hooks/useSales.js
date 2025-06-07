import { useState } from "react";
import axios from "axios";
import { useUser } from "./useUser";

export function useSales({ token }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { API_URL } = useUser();

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
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  return { addSale, removeSale, loading, error };
}

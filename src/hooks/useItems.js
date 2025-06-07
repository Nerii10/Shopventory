import { useState } from "react";
import axios from "axios";
import { useUser } from "./useUser";

export function useItems({ token }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { API_URL } = useUser();

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
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  return { addItems, loading, error };
}

import { useState } from "react";
import axios from "axios";
import { useUser } from "./useUser";

export function useItems({ token }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { API_URL } = useUser();

  async function addItems(data) {
    console.log("Wywołanie items add");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/items/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Wywołanie items add sukces");
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log("Wywołanie items add błąd", err);
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  return { addItems, loading, error };
}

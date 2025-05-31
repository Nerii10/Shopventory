import { useState } from "react";
import axios from "axios";
import { useUser } from "./useUser";

export function useSales({ token }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { API_URL } = useUser();
  
  async function addSale(data) {
    console.log("Wywołanie sale add");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/sales/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Wywołanie sale add sukces");
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log("Wywołanie sale add błąd", err);
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  return { addSale, loading, error };
}

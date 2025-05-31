import { useState } from "react";
import axios from "axios";

export function useFetch({ token }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData(url) {
    console.log("Wywołanie data get");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Wywołanie data get sukces");
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log("Wywołanie data get  błąd", err);
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  return { fetchData, loading, error };
}

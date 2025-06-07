import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function useUser() {
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  async function register(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/users/register`, data);
      setLoading(false);
      location.reload();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  async function login(data) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/users/login`, data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Coś poszło nie tak");
      throw err;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("ShopventoryToken");
    if (token) {
      setToken(token);
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }
  }, []);

  return { register, login, token, userData, loading, error, API_URL };
}

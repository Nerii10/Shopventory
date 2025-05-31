import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { jwtDecode } from "jwt-decode";
import { useItems } from "../../hooks/useItems";
import { useSales } from "../../hooks/useSales";
import { useFetch } from "../../hooks/useFetch";

export default function Test() {
  const { register, login, token, userData, API_URL } = useUser();
  const { addItems, loading: ItemLoading } = useItems({ token });
  const { addSale, removeSale, loading: SaleLoading } = useSales({ token });
  const { fetchData } = useFetch({ token });

  const [authData, setAuthData] = useState({
    Login: "",
    Email: "",
    Password: "",
  });

  const [itemData, setItemData] = useState([]);

  const [saleDate, setSaleDate] = useState("");
  const [saleData, setSaleData] = useState([]);

  const [items, setItems] = useState();
  const [sales, setSales] = useState();

  useEffect(() => {
    console.log(saleDate);
  }, [authData, itemData, saleData]);

  useEffect(() => {
    console.log(API_URL);
    if (token && API_URL) {
      async function loadItems() {
        try {
          const response = await fetchData(`${API_URL}/items/all`);
          if (response) {
            setItems(response);
            console.log(response);
          }
        } catch (error) {
          console.error("Błąd fetch:", error);
        }
      }

      async function loadSales() {
        try {
          const response = await fetchData(`${API_URL}/sales/all`);
          if (response) {
            setSales(response);
            console.log(response);
          }
        } catch (error) {
          console.error("Błąd fetch:", error);
        }
      }

      loadItems();
      loadSales();
    }
  }, [token, ItemLoading, SaleLoading]);

  return (
    <>
      {!token ? (
        <div>
          <h1>REJESTRUJ</h1>
          <input
            placeholder="Login"
            onChange={(e) => {
              setAuthData((prev) => ({ ...prev, Login: e.target.value }));
            }}
          />
          <input
            placeholder="Email"
            onChange={(e) => {
              setAuthData((prev) => ({ ...prev, Email: e.target.value }));
            }}
          />
          <input
            placeholder="Haslo"
            onChange={(e) => {
              setAuthData((prev) => ({ ...prev, Password: e.target.value }));
            }}
          />
          <button
            onClick={async () => {
              if (authData.Email !== "" && authData.Email != null) {
                try {
                  const result = await register(authData);
                  console.log("Zarejestrowano:", result);
                } catch (err) {
                  console.error("Błąd rejestracji:", err);
                }
              } else {
                try {
                  const result = await login(authData);
                  console.log("Zalogowano:", result);
                  localStorage.setItem("ShopventoryToken", result.token);
                  location.reload();
                } catch (err) {
                  console.error("Błąd logowania:", err);
                }
              }
            }}
          >
            Wyślij
          </button>
        </div>
      ) : (
        <>
          <h1>Witaj! {userData?.login || "--"}</h1>
          <button
            onClick={() => {
              localStorage.removeItem("ShopventoryToken");
              location.reload();
            }}
          >
            Wyloguj
          </button>
        </>
      )}

      <hr></hr>

      <div>
        <h1>DODAJ PRZEDMIOT</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addItems(itemData);
          }}
        >
          {itemData.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                required
                placeholder="Kod przedmiotu"
                value={item.Code}
                onChange={(e) => {
                  setItemData((prev) => {
                    const newItems = [...prev];
                    newItems[index] = {
                      ...newItems[index],
                      Code: e.target.value,
                    };
                    return newItems;
                  });
                }}
              />
              <input
                placeholder="Nazwa przedmiotu"
                required
                value={item.Name}
                onChange={(e) => {
                  setItemData((prev) => {
                    const newItems = [...prev];
                    newItems[index] = {
                      ...newItems[index],
                      Name: e.target.value,
                    };
                    return newItems;
                  });
                }}
                style={{ marginLeft: "8px" }}
              />
              <input
                placeholder="Marka"
                required
                value={item.Brand}
                onChange={(e) => {
                  setItemData((prev) => {
                    const newItems = [...prev];
                    newItems[index] = {
                      ...newItems[index],
                      Brand: e.target.value,
                    };
                    return newItems;
                  });
                }}
                style={{ marginLeft: "8px" }}
              />
              <input
                placeholder="Cena zakupu"
                required
                value={item.BuyPrice}
                onChange={(e) => {
                  setItemData((prev) => {
                    const newItems = [...prev];
                    newItems[index] = {
                      ...newItems[index],
                      BuyPrice: e.target.value,
                    };
                    return newItems;
                  });
                }}
                style={{ marginLeft: "8px" }}
              />
              <input
                placeholder="Domyslna cena sprzedazy"
                required
                value={item.SellPrice}
                onChange={(e) => {
                  setItemData((prev) => {
                    const newItems = [...prev];
                    newItems[index] = {
                      ...newItems[index],
                      SellPrice: e.target.value,
                    };
                    return newItems;
                  });
                }}
                style={{ marginLeft: "8px" }}
              />
              <button
                type="button"
                onClick={() => {
                  setItemData((prev) => prev.filter((_, i) => i !== index));
                }}
                style={{ marginLeft: "8px", color: "red" }}
                aria-label="Usuń przedmiot"
              >
                -
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setItemData((prev) => [
                ...prev,
                { Code: "", Name: "", BuyPrice: "", SellPrice: "" },
              ]);
            }}
          >
            Dodaj nowy przedmiot +
          </button>

          <button type="submit">Zapisz Przedmioty</button>
        </form>
      </div>

      <hr></hr>

      <div>
        <h1>REJESTRUJ SPRZEDAŻ</h1>
        <a>data sprzedazy</a>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSale({ saleData, saleDate });
          }}
        >
          <input
            required
            type="date"
            onChange={(e) => setSaleDate(e.target.value)}
          />

          <br />
          {saleData.map((sale, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <select
                value={sale.Code}
                required
                onChange={(e) => {
                  setSaleData((prev) => {
                    const newSales = [...prev];
                    newSales[index] = {
                      ...newSales[index],
                      Code: e.target.value,
                    };
                    return newSales;
                  });
                }}
              >
                <option value="" disabled>
                  Wybierz kod
                </option>
                {items?.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code} - {item.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Cena sprzedaży"
                required
                value={sale.SellPrice}
                onChange={(e) => {
                  setSaleData((prev) => {
                    const newSales = [...prev];
                    newSales[index] = {
                      ...newSales[index],
                      SellPrice: e.target.value,
                    };
                    return newSales;
                  });
                }}
                style={{ marginLeft: "8px" }}
              />

              <button
                type="button"
                onClick={() => {
                  setSaleData((prev) => prev.filter((_, i) => i !== index));
                }}
                style={{ marginLeft: "8px", color: "red" }}
                aria-label="Usuń sprzedaż"
              >
                -
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setSaleData((prev) => [...prev, { Code: "", SellPrice: "" }]);
            }}
          >
            Dodaj sprzedaż +
          </button>

          <button type="submit">Zapisz Sprzedaz</button>
        </form>
      </div>

      <hr></hr>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50%" }}>
          <h1>Przedmioty</h1>
          {items &&
            items?.map((item) => {
              return (
                <p>
                  {item.code} ({item.brand})  - {item.name}
                </p>
              );
            })}
        </div>

        <div style={{ width: "50%" }}>
          <h1>Sprzedaze</h1>
          {sales &&
            sales?.map((sale) => {
              return (
                <div style={{ border: "1px gray solid" }}>
                  <p>
                    {sale.code} - {sale.name} - {sale.sellprice} -{" "}
                    {new Date(sale.created_at).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => {
                      removeSale(sale);
                    }}
                  >
                    Usun
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

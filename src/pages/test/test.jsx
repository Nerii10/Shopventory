import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { jwtDecode } from "jwt-decode";
import { useItems } from "../../hooks/useItems";
import { useSales } from "../../hooks/useSales";
import { useFetch } from "../../hooks/useFetch";
import Input from "../../components/Input";
import { LogIn } from "lucide-react";

import "../../styles/Test.css";
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

  useEffect(() => {}, [authData, itemData, saleData, items]);

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

  const [value, setValue] = useState("");
  const [select, setSelect] = useState();

  useEffect(() => {
    console.log(select);
  }, [select]);

  const inputConfigs = [
    {
      type: "button",
      children: "Click",
      width: "200px",
    },
    { type: "submit", children: "Submit", width: "200px" },
    { type: "number", children: "Number", value, width: "200px" },
    { type: "text", children: "Text", value, setValue, width: "200px" },
    { type: "date", children: "sub", width: "200px" },
    {
      type: "select",
      children: "sub",
      width: "200px",
      options: items?.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name} / ${item.brand}`,
      })),
    },
    {
      type: "select",
      children: "Search",
      width: "200px",
      value: select,
      setValue: setSelect,
      search: true,
      options: items?.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name} - ${item.brand}`,
      })),
    },
    {
      type: "select",
      children: "Search",
      width: "400px",
      value: select,
      setValue: setSelect,
      search: true,
      options: items?.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name} / ${item.brand}`,
      })),
    },
  ];

  return (
    <>
      {/* <h1>Input tests</h1>

      {inputConfigs.map((config, index) => (
        <div key={index}>
          <Input {...config} />
          <br />
        </div>
      ))}

      <hr></hr> */}
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
          <Input
            type={"button"}
            children={"Loguj"}
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
          ></Input>
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
          <div className="AddContainer">
            {itemData.map((item, index) => (
              <div key={index} className="Add">
                <Input
                  type={"text"}
                  required={true}
                  children="Kod"
                  value={item.Code}
                  setValue={(e) => {
                    setItemData((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        Code: e,
                      };
                      return newItems;
                    });
                  }}
                />

                <Input
                  type={"text"}
                  required={true}
                  children="Nazwa"
                  value={item.Name}
                  setValue={(e) => {
                    setItemData((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        Name: e,
                      };
                      return newItems;
                    });
                  }}
                />

                <Input
                  type={"text"}
                  required={true}
                  children="Marka"
                  value={item.Brand}
                  setValue={(e) => {
                    setItemData((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        Brand: e,
                      };
                      return newItems;
                    });
                  }}
                />

                <Input
                  type={"number"}
                  required={true}
                  children="Cena Zakupu"
                  value={item.BuyPrice}
                  setValue={(e) => {
                    setItemData((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        BuyPrice: e,
                      };
                      return newItems;
                    });
                  }}
                />

                <Input
                  type={"number"}
                  required={true}
                  children="Cena Sprzedarzy"
                  value={item.SellPrice}
                  setValue={(e) => {
                    setItemData((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        SellPrice: e,
                      };
                      return newItems;
                    });
                  }}
                />

                <Input
                  type={"button"}
                  children="X"
                  onClick={() => {
                    setItemData((prev) => prev.filter((_, i) => i !== index));
                  }}
                />
              </div>
            ))}
          </div>

          <br></br>
          <br></br>
          <div className="AddInputs">
            <Input
              type="button"
              onClick={() => {
                setItemData((prev) => [
                  ...prev,
                  { Code: "", Name: "", BuyPrice: "", SellPrice: "" },
                ]);
              }}
            >
              Dodaj nowy przedmiot +
            </Input>
            <Input type="submit">Zapisz Przedmioty</Input>
          </div>
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
          <Input required type="date" setValue={(e) => setSaleDate(e)} />

          <br />
          <br />
          {saleData.map((sale, index) => (
            <div key={index} className="Add">
              <Input
                type={"select"}
                search={true}
                required={true}
                children={"Przedmiot"}
                value={sale.Code}
                setValue={(e) => {
                  console.log(e);
                  setSaleData((prev) => {
                    const newSales = [...prev];
                    newSales[index] = {
                      ...newSales[index],
                      Code: e.code,
                    };
                    return newSales;
                  });
                }}
                options={items?.map((item) => ({
                  code: item.code,
                  label: `${item.code} - ${item.name} / ${item.brand}`,
                }))}
              ></Input>

              <Input
                type={"number"}
                children="Cena sprzedaży"
                required
                value={sale.SellPrice}
                setValue={(e) => {
                  setSaleData((prev) => {
                    const newSales = [...prev];
                    newSales[index] = {
                      ...newSales[index],
                      SellPrice: e,
                    };
                    return newSales;
                  });
                }}
              />

              <Input
                type="button"
                onClick={() => {
                  setSaleData((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                X
              </Input>
            </div>
          ))}
          <br />
          <br />

          <div className="AddInputs">
            <Input
              type="button"
              onClick={() => {
                setSaleData((prev) => [...prev, { Code: "", SellPrice: "" }]);
              }}
            >
              Dodaj sprzedaż +
            </Input>
            <Input type="submit">Zapisz Sprzedaz</Input>
          </div>
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
                  {item.code} ({item.brand}) - {item.name}
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

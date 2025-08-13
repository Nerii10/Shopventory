import { useEffect, useState } from "react";
import { useShop } from "../../../contexts/shopContext";
import Input from "../../../components/Input";
import { useItems } from "../../../hooks/useItems";
import { useUser } from "../../../hooks/useUser";

export default function Items() {
  const { items } = useShop();
  const [filteredItems, setFilteredItems] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <section className="dashboard-page-wrapper">
      <h1>Produkty</h1>

      <AddItemForm />

      <br></br>

      <Input
        type={"text"}
        width={"100%"}
        children={"Szukaj.."}
        value={search}
        setValue={(e) => {
          setSearch(e);

          const lowerSearch = e.toLowerCase();

          setFilteredItems(
            items.filter(
              (i) =>
                i.name.toLowerCase().includes(lowerSearch) ||
                i.code === e ||
                i.brand.toLowerCase().includes(lowerSearch)
            )
          );
        }}
      />

      {filteredItems?.map((item, index) => {
        return (
          <>
            <p>
              {item.code} - ({item.brand})-{item.name} / {item.sell_price}zł ({item.buy_price}zł)
            </p>
            <hr></hr>
          </>
        );
      })}
    </section>
  );
}

export function AddItemForm() {
  const [itemData, setItemData] = useState([]);
  const { token } = useUser();
  const { addItems } = useShop({ token });
  return (
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
  );
}

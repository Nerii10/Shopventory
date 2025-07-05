import { useState } from "react";
import { useShop } from "../../../contexts/shopContext";
import Input from "../../../components/Input";

export default function Sales() {
  const { sales, items, removeSale } = useShop();
  return (
    <section className="dashboard-page-wrapper">
      <h1>Produkty</h1>

      <AddSaleForm items={items} />

      {sales?.map((sale, index) => {
        return (
          <>
            <p>
              {new Date(sale.created_at).toLocaleDateString()} - ({sale.brand}) - {sale.name} /{" "}
              {sale.sellprice}zł
            </p>
            <Input type={'button'} children={"X"} onClick={()=>{removeSale(sale)}}/>
            <hr></hr>
          </>
        );
      })}
    </section>
  );
}

export function AddSaleForm({ items }) {
  const { addSale } = useShop();
  const [saleData, setSaleData] = useState([]);
  const [saleDate, setSaleDate] = useState();

  return (
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
  );
}

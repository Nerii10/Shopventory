import { useEffect, useState } from "react";
import Input from "./Input";
import "./StatsOverview.css";

export default function StatsOverview({ data }) {
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    if (data?.weekly?.length > 0) {
      const today = new Date();

      for (let i = 0; i < data.weekly.length - 1; i++) {
        const currentWeekStart = new Date(data.weekly[i].week_start);
        const nextWeekStart = new Date(data.weekly[i + 1].week_start);

        if (today >= currentWeekStart && today < nextWeekStart) {
          setCurrentData({
            week: data.weekly[i],
            totalMax: Math.max(
              ...data.weekly[i].days.map((day) => day.total)
            ),
          });

          break;
        }
      }
    }
  }, [data]);

  useEffect(() => {
    console.log(currentData);
  }, [currentData]);

  console.log(currentData);
  return (
    <>
      <h2>Statystyki</h2>

      <div className="stats_wrapper">
        <div className="stats_top">
          <Input
            type={"select"}
            width={"20%"}
            options={[
              { label: "Dzień", value: "Dzień" },
              { label: "Miesiąc", value: "Miesiąc" },
            ]}
          />
        </div>
        <hr></hr>
        <div className="stats_bottom">
          {currentData ? (
            <>
              {currentData.week.days.map((day, index) => {
                return (
                  <div
                    className="stat_bar"
                    style={{
                      height: `${(day.total / currentData?.totalMax) * 100}%`,
                    }}
                  >
                    <a className="stat_bar_amount">{day.total}</a>
                    </div>
                );
              })}
            </>
          ) : (
            <p>Wczytywanie</p>
          )}
        </div>
      </div>
    </>
  );
}

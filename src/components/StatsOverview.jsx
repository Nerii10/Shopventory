import { useEffect, useState } from "react";
import Input from "./Input";
import "./StatsOverview.css";

export default function StatsOverview({ data }) {
  const [currentData, setCurrentData] = useState();
  const [currentWeekIndex, setCurrentWeekIndex] = useState();

  const [currentYearData, setCurrentYearData] = useState();

  const [timePeriod, setTimePeriod] = useState("Dzień");

  function GetCurrentWeek() {
    if (data?.yearStats?.weekly?.length > 0) {
      const today = new Date();

      for (let i = 0; i < data.yearStats.weekly.length - 1; i++) {
        const currentWeekStart = new Date(data.yearStats.weekly[i].week_start);
        const nextWeekStart = new Date(data.yearStats.weekly[i + 1].week_start);

        if (today >= currentWeekStart && today < nextWeekStart) {
          setCurrentData({
            week: data.yearStats.weekly[i],
            totalMax: Math.max(
              ...data.yearStats.weekly[i].days.map((day) => day.total)
            ),
            index: i,
          });

          setCurrentWeekIndex(i);

          break;
        }
      }
    }
  }

  function GetCurrentYearData() {
    if (data?.yearStats?.monthly?.length > 0) {
      setCurrentYearData({
        month: data.yearStats.monthly,
        totalMax: Math.max(
          ...data.yearStats.monthly.map((month) => month.total)
        ),
      });
    }
  }

  function GetWeek(i) {
    const week = data?.yearStats?.weekly[i];
    if (week) {
      const weekStart = new Date(week.week_start);
      const today = new Date();

      if (weekStart > today) {
        return;
      }

      setCurrentData({
        week,
        totalMax: Math.max(...week.days.map((day) => day.total)),
        index: i,
      });
    }
  }

  useEffect(() => {
    if (data) {
      GetCurrentWeek();
      GetCurrentYearData();
    }
  }, [data]);

  useEffect(() => {
    if (currentYearData) {
      console.log(currentYearData);
    }
  }, [currentYearData]);

  return (
    <>
      <h2>Statystyki</h2>

      <div className="stats_wrapper">
        <p>
          Zarobki <strong>dzisiaj</strong>
        </p>

        <p>Całkowita sprzedaz: {data?.today?.total}zł</p>
        <p>Zysk: {data?.today?.profit}zł</p>

        <p>
          Zarobki <strong>od początku</strong>
        </p>
        <p>Całkowita sprzedaz: {data?.allTime?.total}zł</p>
        <p>Zysk: {data?.allTime?.profit}zł</p>

        <div className="stats_chart">
          <div className="stats_chart_top">
            <div className="stats_chart_top_left">
              <Input
                type={"select"}
                width={"100%"}
                value={timePeriod}
                setValue={(e) => setTimePeriod(e.value)}
                options={[
                  { label: "Dzień", value: "Dzień" },
                  { label: "Miesiąc", value: "Miesiąc" },
                ]}
              />
            </div>
            {timePeriod == "Dzień" && (
              <div className="stats_chart_top_right">
                <Input
                  type={"button"}
                  onClick={() => {
                    GetWeek(currentData.index - 1);
                  }}
                >
                  {"<"}
                </Input>
                <span style={{ color: "white" }}>
                  {currentWeekIndex && currentWeekIndex == currentData?.index
                    ? "Teraz"
                    : currentData?.week.week_start}
                </span>
                <Input
                  type={"button"}
                  onClick={() => {
                    GetWeek(currentData.index + 1);
                  }}
                >
                  {">"}
                </Input>
              </div>
            )}
          </div>
          <div className="stats_chart_bottom">
            {timePeriod == "Dzień"
              ? currentData?.totalMax != 0 &&
                currentData?.week?.days?.map((day, index) => {
                  const heighttotal = (day.total / currentData?.totalMax) * 100;
                  const heightprofit =
                    (day.profit / currentData?.totalMax) * 100;
                  const days = [
                    "Poniedziałek",
                    "Wtorek",
                    "Środa",
                    "Czwartek",
                    "Piątek",
                    "Sobota",
                    "Niedziela",
                  ];

                  if (day.total == 0) {
                    return;
                  }

                  return (
                    <div style={{ height: "90%" }}>
                      <div className="stat_chart_stat">
                        <div
                          className="stat_chart_stat_total"
                          style={{ height: `${heighttotal}%` }}
                        >
                          <p className="stat_chart_stat_total_value">
                            {day.total}
                          </p>
                        </div>

                        <div
                          className="stat_chart_stat_profit"
                          style={{ height: `${heightprofit}%` }}
                        >
                          <p className="stat_chart_stat_profit_value">
                            {day.profit}
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {days[index]}
                      </p>
                    </div>
                  );
                })
              : currentYearData &&
                currentYearData?.month?.map((month, index) => {
                  const heighttotal =
                    (month.total / currentYearData?.totalMax) * 100;
                  const heightprofit =
                    (month.profit / currentYearData?.totalMax) * 100;
                  const months = [
                    "Styczeń",
                    "Luty",
                    "Marzec",
                    "Kwiecień",
                    "Maj",
                    "Czerwiec",
                    "Lipiec",
                    "Sierpień",
                    "Wrzesień",
                    "Październik",
                    "Listopad",
                    "Grudzień",
                  ];

                  if (month.total == 0) {
                    return;
                  }

                  return (
                    <div style={{ height: "90%" }}>
                      <div className="stat_chart_stat">
                        <div
                          className="stat_chart_stat_total"
                          style={{ height: `${heighttotal}%` }}
                        >
                          <p className="stat_chart_stat_total_value">
                            {month.total}
                          </p>
                        </div>

                        <div
                          className="stat_chart_stat_profit"
                          style={{ height: `${heightprofit}%` }}
                        >
                          <p className="stat_chart_stat_profit_value">
                            {month.profit}
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {months[index]}
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

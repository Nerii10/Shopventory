import { useShop } from "../../../contexts/shopContext";
import Counter from "../../../components/AnimatedNumber";
import { useUser } from "../../../hooks/useUser";
import { useEffect, useState } from "react";
import StatsOverview from "../../../components/StatsOverview";
export default function Panel() {
  const { stats } = useShop();
  const { userData } = useUser();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // aktualizuj czas co sekundę
    const interval = setInterval(() => {
      setTime(new Date());
    }, 10000);

    // sprzątanie
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="dashboard-page-wrapper">
      
      <h1>Hej {userData?.login || "..."}</h1>
      <p style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <Counter
          fontSize={30}
          gap={0}
          places={[10, 1]}
          value={time.getHours()}
          horizontalPadding={0}
        />
        <a style={{ fontSize: 20 }}>:</a>
        <Counter
          fontSize={30}
          gap={0}
          places={[10, 1]}
          horizontalPadding={0}
          value={time.getMinutes()}
        />
      </p>

      <StatsOverview data={stats}/>
    </section>
  );
}

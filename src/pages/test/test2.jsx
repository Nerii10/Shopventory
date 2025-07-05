import { useEffect, useState } from "react";
import AnimatedNumber from "../../components/AnimatedNumber";
import Input from "../../components/Input";

export default function Test2() {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    console.log(currentNumber.toLocaleString().length);
    const numbers = currentNumber.toLocaleString().length;
    for (let i = 0; i < numbers; i++) {
      console.log(Math.pow(10, i));
    }
  }, [currentNumber]);
  return (
    <>
      <AnimatedNumber
        value={currentNumber}
        places={[100000, 10000, 1000, 100, 10, 1]}
      />

      <input
        type="range"
        max={100000}
        value={currentNumber}
        onChange={(e) => {
          setCurrentNumber(e.target.value);
        }}
      />
    </>
  );
}

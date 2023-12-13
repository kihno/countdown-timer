import { useRef, useState } from "react";

const CountdownTimer = () => {
  // new Date(year, monthIndex, day, hours, minutes)
  const fiveMinutes = new Date(0, 0, 0, 0, 5);
  const [timeRemaining, setTimeRemaining] = useState(fiveMinutes);

  const formatDate = (dateObject) => {
    // get minutes and seconds
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // padd seconds with preceding zero
    const paddedSeconds = seconds.toString().padStart(2, "0");

    // return formatted ate
    return `${minutes}:${paddedSeconds}`;
  }

  // store interval id as ref
  const intervalId = useRef<number | null>(null);

  const handleClickStart = () => {
    // update current value of the ref
    // does not trigger a rerender
    intervalId.current = window.setInterval(() => {
      // ...
    }, 1000);
  };


  return(
    <div>
      <h1>{formatDate(timeRemaining)}</h1>
      <div>
        <button>Start</button>
        <button>Stop</button>
        <button>Reset</button>
      </div>
    </div>
  )
};

export default CountdownTimer;

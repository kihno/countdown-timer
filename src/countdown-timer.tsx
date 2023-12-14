import { useEffect, useRef, useState } from "react";

const CountdownTimer = () => {
  // New Date(year, monthIndex, day, hours, minutes)
  const fiveMinutes = new Date(0, 0, 0, 0, 5);
  const [timeRemaining, setTimeRemaining] = useState(fiveMinutes);
  const intervalId = useRef<number | null>(null);

  // Clear the interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    }
  }, []);

  const formatDate = (dateObject) => {
    // Get minutes and seconds
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Pad seconds with preceding zero
    const paddedSeconds = seconds.toString().padStart(2, "0");

    // Return formatted ate
    return `${minutes}:${paddedSeconds}`;
  }

  const handleClickStart = () => {
    // If a timer is already running, no not start another one
    if (intervalId.current !== null) {
      return;
    }

    intervalId.current = window.setInterval(() => {
      setTimeRemaining(
        (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() - 1000)
      )
    }, 1000);
  };

  const handleClickStop = () => {
    // If timer is already stopped, do nothing
    if (intervalId.current === null) {
      return;
    }

    clearInterval(intervalId.current);
    // Clear current value of the ref, does not trigger rerender
    intervalId.current = null;
  }

  const handleReset = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }
    setTimeRemaining(fiveMinutes);
  }

  return(
    <div>
      <h1>{formatDate(timeRemaining)}</h1>
      <div>
        <button onClick={handleClickStart}>Start</button>
        <button onClick={handleClickStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
};

export default CountdownTimer;

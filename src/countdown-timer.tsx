import { useEffect, useRef, useState } from "react";
import './App.css';

const CountdownTimer = () => {
  // New Date(year, monthIndex, day, hours, minutes)
  const fiveMinutes = new Date(0, 0, 0, 0, 5);
  const tenMinutes = new Date(0, 0, 0, 0, 10);
  const fifteenMinutes = new Date(0, 0, 0, 0, 15);
  const [time, setTime] = useState(fiveMinutes)
  const [timeRemaining, setTimeRemaining] = useState(time);
  const intervalId = useRef<number | null>(null);

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
        (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() - 10)
      )
    }, 10);
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
    setTimeRemaining(time);
  }

  const handleClickFiveMinutes = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    setTimeRemaining(fiveMinutes);
  }

  const handleClickTenMinutes = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    setTimeRemaining(tenMinutes);
  }

  const handleClickFifteenMinutes = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    setTimeRemaining(fifteenMinutes);
  }

  // Clear the interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    }
  }, []);

  return(
    <div className="container">
      <div className="clockContainer">
      <div>
          <button onClick={handleClickFiveMinutes}>5 Minutes</button>
          <button onClick={handleClickTenMinutes}>10 Minutes</button>
          <button onClick={handleClickFifteenMinutes}>15 Minutes</button>
        </div>
        <h1>{formatDate(timeRemaining)}</h1>
        <div>
          <button onClick={handleClickStart}>Start</button>
          <button onClick={handleClickStop}>Stop</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  )
};

export default CountdownTimer;

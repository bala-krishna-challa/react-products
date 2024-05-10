import React, { useEffect, useRef } from "react";
import { useState } from "react";

const StopWatch = () => {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const timeRef = useRef(null);

  const handleTimeStart = () => {
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    clearInterval(timeRef.current);

    timeRef.current = setInterval(() => {
      setCurrentTime(Date.now());
    }, 10);
  };

  const handleTimeStop = () => {
    clearInterval(timeRef.current);
  };

  return (
    <>
      {((currentTime - startTime) / 1000).toFixed(3)}
      <button onClick={handleTimeStart}>Start</button>
      <button onClick={handleTimeStop}>Stop</button>
    </>
  );
};

export default StopWatch;

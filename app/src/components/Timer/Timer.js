import React, { useState, useEffect } from "react";
import "./Timer.css";

export const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (props.isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!props.isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.isActive, seconds]);

  return <div className="Timer-container">{seconds}s</div>;
};

export default Timer;

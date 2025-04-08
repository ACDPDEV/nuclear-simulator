import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const startStopTimer = () => {
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    if (isRunning) {
      const start = performance.now() - time * 1000;
      startTimeRef.current = start;

      const update = () => {
        if (startTimeRef.current !== null) {
          const elapsed = performance.now() - startTimeRef.current;
          setTime(parseFloat((elapsed / 1000).toFixed(2)));
          animationRef.current = requestAnimationFrame(update);
        }
      };

      animationRef.current = requestAnimationFrame(update);
    } else {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div>
      <div id="timeDisplay">Time: {time.toFixed(2)}s</div>
      <Button id="startStopButton" onClick={startStopTimer}>
        {isRunning ? "Stop" : "Start"}
      </Button>
    </div>
  );
};

export default Timer;

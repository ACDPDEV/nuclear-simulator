import { Pause, Play, RotateCcw } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { useTimerDispatch, useTimerState } from "../context/TimeContext";

const Timer: React.FC = () => {
  const { time, isRunning } = useTimerState();
  const dispatch = useTimerDispatch();

  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const startStopTimer = () => {
    dispatch({ type: "TOGGLE_RUNNING" });
  };

  const resetTimer = () => {
    dispatch({ type: "RESET" });
    startTimeRef.current = performance.now();
  };

  useEffect(() => {
    if (isRunning) {
      const start = performance.now() - time * 1000;
      startTimeRef.current = start;

      const update = () => {
        if (startTimeRef.current !== null) {
          const elapsed = performance.now() - startTimeRef.current;
          dispatch({
            type: "SET_TIME",
            payload: parseFloat((elapsed / 1000).toFixed(2)),
          });
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
    <div className="flex flex-row items-center gap-2">
      <div id="timeDisplay" className="font-mono font-medium">
        Tiempo: {time.toFixed(2)}s
      </div>
      <Button id="startStopButton" onClick={startStopTimer}>
        {isRunning ? <Pause /> : <Play />}
      </Button>
      <Button id="resetButton" onClick={resetTimer} variant={"outline"}>
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Timer;

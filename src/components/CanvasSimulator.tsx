import { useEffect, useRef } from "react";
import { Cell } from "../classes/cell";
import ParticleEmitter from "../classes/emmiter";
import Vector2D from "../classes/vector2D";
import { usePropertiesSimulation } from "../context/PropertiesContext";
import { useTimerState } from "../context/TimeContext";

const enrichedUranium = {
  activity: 1.8e5,
  averageEnergy: 4.68,
  qualityFactor: 20,
};
const irradiatedUranium = {
  activity: 3.7e13,
  averageEnergy: 0.75,
  qualityFactor: 1,
};

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 500;
const CELL_SIZE = 10;
const COLS = 30;
const ROWS = 30;

const CanvasSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const emitterRef = useRef<ParticleEmitter | null>(null);
  const cellsRef = useRef<Cell[]>([]);

  const { time, isRunning } = useTimerState();
  const { config } = usePropertiesSimulation();

  // Inicializar grilla y emisor solo una vez
  useEffect(() => {
    emitterRef.current = new ParticleEmitter(
      new Vector2D(200, CANVAS_HEIGHT / 2),
      1,
      255,
      "/emmiter.png"
    );

    const cellGrid: Cell[] = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        cellGrid.push(new Cell(x, y));
      }
    }
    cellsRef.current = cellGrid;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridOffsetX = CANVAS_WIDTH - CELL_SIZE * COLS - 150;
    const gridOffsetY = CANVAS_HEIGHT / 2 - (CELL_SIZE * ROWS) / 2;

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      emitterRef.current?.update();
      emitterRef.current?.show(ctx);

      for (const cell of cellsRef.current) {
        const px = gridOffsetX + cell.position.x * CELL_SIZE;
        const py = gridOffsetY + cell.position.y * CELL_SIZE;

        if (config.emmisorType === "enrichedUranium") {
          const dose = cell.calculateDose(
            enrichedUranium,
            config.mass,
            config.tissueWeight,
            time,
            config.regenerationFactor
          );
          cell.updateState(dose);
        } else if (config.emmisorType === "irradiatedUranium") {
          const dose = cell.calculateDose(
            irradiatedUranium,
            config.mass,
            config.tissueWeight,
            time,
            config.regenerationFactor
          );
          cell.updateState(dose);
        } else {
          const dose = cell.calculateDose(enrichedUranium, 1e-6, 0.25, time);
          cell.updateState(dose);
        }

        ctx.fillStyle = cell.color;
        ctx.beginPath();
        ctx.arc(px, py, CELL_SIZE / 2 - 1, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    if (isRunning) {
      draw();
    }

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRunning, time, config]);

  return (
    <div className="flex flex-row items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border"
      />
    </div>
  );
};

export default CanvasSimulator;

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SimulationConfig = {
  emmisorType: "enrichedUranium" | "irradiatedUranium";
  mass: number;
  tissueWeight: number;
  regenerationFactor: number;
};

const defaultConfig: SimulationConfig = {
  emmisorType: "enrichedUranium",
  mass: 1e-6,
  tissueWeight: 0.04,
  regenerationFactor: 0.25,
};

const PropertiesSimulationContext = createContext<{
  config: SimulationConfig;
  setConfig: (newConfig: SimulationConfig) => void;
}>({
  config: defaultConfig,
  setConfig: () => {},
});

export const PropertiesSimulationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [config, setConfig] = useState<SimulationConfig>(defaultConfig);

  return (
    <PropertiesSimulationContext.Provider value={{ config, setConfig }}>
      {children}
    </PropertiesSimulationContext.Provider>
  );
};

export const usePropertiesSimulation = () =>
  useContext(PropertiesSimulationContext);

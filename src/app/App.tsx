import CanvasSimulator from "@/components/CanvasSimulator";
import { Github } from "@/components/Github";
import { Info } from "@/components/Info";
import { Menu } from "@/components/Menu";
import Timer from "@/components/Timer";
import { PropertiesSimulationProvider } from "@/context/PropertiesContext";
import { TimerProvider } from "@/context/TimeContext";

function App() {
  return (
    <PropertiesSimulationProvider>
      <TimerProvider>
        <div className="flex w-full h-full flex-col">
          <div className="flex flex-col h-screen w-screen overflow-y-scroll">
            <div className="flex flex-row items-center w-full gap-4 max-h-fit p-4 shadow-md justify-between">
              <h1 className="font-mono text-2xl font-bold">
                Simulador Nuclear
              </h1>
              <Timer />
              <div className="flex flex-row gap-2">
                <Github />
                <Info />
                <Menu />
              </div>
            </div>
            <div className="flex justify-center items-center h-full w-full">
              <CanvasSimulator />
            </div>
          </div>
          <div className="flex flex-col items-center border border-gray-200">
            <span className="font-mono font-light">
              Hecho con fines educativos por{" "}
              <strong className="font-bold">Ahilton Díaz (@acdpdev)</strong>
            </span>
          </div>
        </div>
      </TimerProvider>
    </PropertiesSimulationProvider>
  );
}

export default App;

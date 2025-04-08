import CapsuleFormDialog from "@/components/Menu";
import Timer from "@/components/Timer";
import { TimerProvider } from "@/context/TimeContext";
import CanvasSimulator from "@/sketchs/CanvasSimulator";

function App() {
  return (
    <TimerProvider>
      <div className="flex flex-col items-center justify-center h-screen w-screen overflow-y-scroll background-slate-900">
        <div className="flex flex-row items-center justify-center h-screen">
          <Timer />
          <CapsuleFormDialog />
        </div>

        <CanvasSimulator />
      </div>
    </TimerProvider>
  );
}

export default App;

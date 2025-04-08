import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

type TimerState = {
  time: number;
  isRunning: boolean;
};

type TimerAction =
  | { type: "SET_TIME"; payload: number }
  | { type: "TOGGLE_RUNNING" }
  | { type: "RESET" };

const initialState: TimerState = {
  time: 0,
  isRunning: false,
};

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "SET_TIME":
      return { ...state, time: action.payload };
    case "TOGGLE_RUNNING":
      return { ...state, isRunning: !state.isRunning };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Creamos los contextos
const TimerStateContext = createContext<TimerState | undefined>(undefined);
const TimerDispatchContext = createContext<Dispatch<TimerAction> | undefined>(
  undefined
);

// Hook personalizado para usar el state
export function useTimerState() {
  const context = useContext(TimerStateContext);
  if (!context)
    throw new Error("useTimerState must be used within TimerProvider");
  return context;
}

// Hook personalizado para usar el dispatch
export function useTimerDispatch() {
  const context = useContext(TimerDispatchContext);
  if (!context)
    throw new Error("useTimerDispatch must be used within TimerProvider");
  return context;
}

// Provider global
export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  return (
    <TimerStateContext.Provider value={state}>
      <TimerDispatchContext.Provider value={dispatch}>
        {children}
      </TimerDispatchContext.Provider>
    </TimerStateContext.Provider>
  );
};

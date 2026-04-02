import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Mode = "human" | "machine";

interface ModeContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

const STORAGE_KEY = "portfolio-mode";

function getInitialMode(): Mode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "machine") {
      // Set attribute synchronously to prevent flicker
      document.documentElement.setAttribute("data-mode", "machine");
      return "machine";
    }
  } catch {
    // localStorage unavailable
  }
  document.documentElement.setAttribute("data-mode", "human");
  return "human";
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "human" ? "machine" : "human"));

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within a ModeProvider");
  return ctx;
}

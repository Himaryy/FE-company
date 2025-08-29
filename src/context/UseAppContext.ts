import { useContext } from "react";
import { AppContext } from "./AppContext";

export function UseAppContext() {
  const context = useContext(AppContext);

  if (!context) throw new Error("App COntext Provider is missing ");
  return context;
}

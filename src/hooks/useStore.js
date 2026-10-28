import { useContext } from "react";
import { StoreCtx } from "./storeContext";

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}

import { createContext } from "react";

type StockContextValue = {
  symbol?: string;
  onSymbolChange?: (symbol: string) => void;
};

const StockContext = createContext<StockContextValue>({});

export default StockContext;

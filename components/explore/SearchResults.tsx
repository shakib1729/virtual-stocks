// Libs
import { useContext } from "react";

// Contexts
import StockContext from "@/context/StockContext";

export const SearchResults = ({ results, setSearchResults }) => {
  const { onSymbolChange } = useContext(StockContext);

  return (
    <ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200 custom-scrollbar">
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200 transition duration-300"
            onClick={() => {
              onSymbolChange(item.symbol);
              setSearchResults([]);
            }}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

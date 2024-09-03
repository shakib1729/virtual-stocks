// Libs
import { useState } from "react";

// Components
import { XCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SearchResults } from "@/components/explore/SearchResults";

// Utils
import { searchSymbols } from "@/utils/actions";

// Types
import type { SymbolSearchResult } from "@/types/stockData";

export const Search = () => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SymbolSearchResult[]>([]);

  const handleSearch = async () => {
    try {
      const fetchedSymbols = await searchSymbols(input);
      if (fetchedSymbols.result) {
        setSearchResults(fetchedSymbols.result);
      } else {
        throw fetchedSymbols;
      }
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="relative flex items-center border-2 rounded-md w-96 bg-white border-neutral-200">
      <input
        type="text"
        value={input}
        className="w-full px-4 py-2 focus:outline-none rounded-md"
        placeholder="Search Stock..."
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {input ? (
        <button onClick={handleClear}>
          <XCircleIcon className="h-4 w-4 fill-gray-500 m-1" />
        </button>
      ) : null}

      <button
        onClick={handleSearch}
        className="h-8 w-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-md flex justify-center items-center m-1 p-2 transition duration-100 hover:ring-2 ring-purple-400"
      >
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
      </button>

      {input && searchResults.length > 0 ? (
        <SearchResults
          results={searchResults}
          setSearchResults={setSearchResults}
        />
      ) : null}
    </div>
  );
};

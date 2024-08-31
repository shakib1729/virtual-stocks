"use client";

import { useState } from "react";
import { XCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SearchResults } from "@/components/header/SearchResults";
import { searchSymbols } from "@/utils/actions";

export const Search = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200">
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
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
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

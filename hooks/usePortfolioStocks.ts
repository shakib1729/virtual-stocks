"use client";

import { useState, useEffect, useContext } from "react";

import {
  fetchQuote,
  fetchStockDetails,
  fetchTimeSeriesData,
} from "@/utils/actions";
import UserContext from "@/context/UserContext";

export const usePortfolioStocks = () => {
  const { user } = useContext(UserContext);
  const [portfolioStocks, setPortfolioStocks] = useState(null);

  const stocks = user?.stocks;

  useEffect(() => {
    const fetchAllQuotes = async () => {
      const fetchQuotePromises =
        stocks?.map((stock) => fetchQuote(stock.symbol)) ?? [];
      const quotes = await Promise.all(fetchQuotePromises);

      setPortfolioStocks(
        stocks?.map((stock, index) => ({
          ...stock,
          pricePerUnit: +quotes[index].c,
        }))
      );
    };

    fetchAllQuotes();
  }, [stocks]);

  return portfolioStocks;
};

"use client";

import { useState, useEffect } from "react";

import {
  fetchQuote,
  fetchStockDetails,
  fetchTimeSeriesData,
} from "@/utils/actions";

export const usePortfolioStocks = ({ stocks = [] }) => {
  const [portfolioStocks, setPortfolioStocks] = useState(null);

  useEffect(() => {
    const fetchAllQuotes = async () => {
      const fetchQuotePromises = stocks.map((stock) =>
        fetchQuote(stock.symbol)
      );
      const quotes = await Promise.all(fetchQuotePromises);

      setPortfolioStocks(
        stocks.map((stock, index) => ({
          ...stock,
          pricePerUnit: +quotes[index].c,
        }))
      );
    };

    fetchAllQuotes();
  }, [stocks]);

  return portfolioStocks;
};

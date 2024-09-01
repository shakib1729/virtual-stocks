// Libs
import { useState, useEffect } from "react";

// Hooks
import { useUser } from "@/hooks/useUser";

// Utils
import { fetchQuote } from "@/utils/actions";
import { StockWithPrice } from "@/types";

export const usePortfolioStocks = () => {
  const { user } = useUser();
  const [portfolioStocks, setPortfolioStocks] = useState<
    StockWithPrice[] | undefined
  >();

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
        })),
      );
    };

    fetchAllQuotes();
  }, [stocks]);

  return portfolioStocks;
};

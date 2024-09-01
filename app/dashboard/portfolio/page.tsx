"use client";

import Header from "@/components/header";
import { PriceOverview } from "@/components/PriceOverview";
import Chart from "@/components/chart";
import StockContext from "@/context/StockContext";
import { useMemo } from "react";
import { Details } from "@/components/Details";
import { PortfolioStocks } from "@/components/portfolio/PortfolioStocks";
import {
  fetchQuote,
  fetchStockDetails,
  fetchTimeSeriesData,
} from "@/utils/actions";
import { useDashboardState } from "@/hooks/useDashboardState";
import { useUser } from "@/hooks/useUser";
import { usePortfolioStocks } from "@/hooks/usePortfolioStocks";

export default function Home() {
  const { user, setUser } = useUser();
  const portfolioStocks = usePortfolioStocks({ stocks: user?.stocks });

  console.log("spi portfolioStocks: ", portfolioStocks);
  // fetch the pricePerUnit for each of the stock in user.stocks

  return portfolioStocks && user ? (
    <PortfolioStocks
      stocks={portfolioStocks}
      setUser={setUser}
      balance={user.balance}
    />
  ) : null;
}

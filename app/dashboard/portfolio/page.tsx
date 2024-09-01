"use client";
import React, { useState, useMemo, useContext } from "react";

import Header from "@/components/header";
import { PriceOverview } from "@/components/PriceOverview";
import Chart from "@/components/chart";
import StockContext from "@/context/StockContext";

import { Details } from "@/components/Details";
import { PortfolioStocks } from "@/components/portfolio/PortfolioStocks";
import {
  fetchQuote,
  fetchStockDetails,
  fetchTimeSeriesData,
} from "@/utils/actions";
import { useDashboardState } from "@/hooks/useDashboardState";
import UserContext from "@/context/UserContext";

import { usePortfolioStocks } from "@/hooks/usePortfolioStocks";

export default function Home() {
  const { user } = useContext(UserContext);

  const portfolioStocks = usePortfolioStocks();

  console.log("spi portfolioStocks: ", portfolioStocks);
  // fetch the pricePerUnit for each of the stock in user.stocks

  return portfolioStocks && user ? (
    <PortfolioStocks stocks={portfolioStocks} balance={user.balance} />
  ) : null;
}

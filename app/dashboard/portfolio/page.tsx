"use client";

// Components
import StocksPortfolio from "@/components/portfolio";
import { Loader } from "@/components/Loader";

// Hooks
import { useUser } from "@/hooks/useUser";
import { usePortfolioStocks } from "@/hooks/usePortfolioStocks";

export default function Home() {
  const { user } = useUser();
  const portfolioStocks = usePortfolioStocks();

  return portfolioStocks && user ? (
    <StocksPortfolio stocks={portfolioStocks} balance={user.balance} />
  ) : (
    <Loader />
  );
}

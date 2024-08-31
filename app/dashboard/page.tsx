"use client";

import Header from "@/components/header";
import { PriceOverview } from "@/components/PriceOverview";
import Chart from "@/components/chart";
import StockContext from "@/context/StockContext";
import { useMemo } from "react";
import { Details } from "@/components/Details";
import {
  fetchQuote,
  fetchStockDetails,
  fetchTimeSeriesData,
} from "@/utils/actions";
import { useDashboardState } from "@/hooks/useDashboardState";

export default function Home() {
  const {
    symbol,
    timeSeriesData,
    resolution,
    priceOverview,
    details,
    onSymbolChange,
    onResolutionChange,
  } = useDashboardState();

  const stockProviderValue = useMemo(
    () => ({ symbol, onSymbolChange }),
    [symbol, onSymbolChange],
  );

  return (
    <StockContext.Provider value={stockProviderValue}>
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 bg-neutral-100">
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
          <Header name={details.name} />
        </div>
        <div className="md:col-span-2 row-span-4">
          <Chart
            timeSeriesData={timeSeriesData}
            resolution={resolution}
            handleResolutionChange={onResolutionChange}
          />
        </div>
        <div className="row-span-2 xl:row-span-1">
          <PriceOverview
            symbol={symbol}
            price={priceOverview.c}
            change={priceOverview.d}
            changePercent={priceOverview.dp}
            currency={details.currency}
          />
        </div>
        <div className="row-span-2 xl:row-span-3">
          <Details details={details} />
        </div>
      </div>
    </StockContext.Provider>
  );
}

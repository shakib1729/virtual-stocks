// Libs
import { useState } from "react";

// Utils
import {
  fetchQuote,
  fetchStockDetails,
  fetchTimeSeriesData,
} from "@/utils/actions";
import {
  CompanyDetails,
  PriceOverview,
  Resolution,
  TimeSeriesData,
} from "@/types/stockData";

export const useDashboardState = () => {
  const [symbol, setSymbol] = useState<string>("");
  const [timeSeriesData, setTimeSeriesData] = useState<
    TimeSeriesData | undefined
  >();
  const [priceOverview, setPriceOverview] = useState<
    PriceOverview | undefined
  >();
  const [details, setDetails] = useState<CompanyDetails | undefined>();
  const [resolution, setResolution] = useState<Resolution>("Daily");

  const updateDetails = async (currSymbol: string) => {
    try {
      const result = await fetchStockDetails(currSymbol);
      setDetails(result);
    } catch (error) {
      setDetails(undefined);
      console.error(error);
    }
  };

  const updatePriceOverview = async (currSymbol: string) => {
    try {
      const result = await fetchQuote(currSymbol);
      setPriceOverview(result);
    } catch (error) {
      setPriceOverview(undefined);
      console.error(error);
    }
  };

  const updateTimeSeriesData = async ({
    currSymbol,
    currResolution,
  }: {
    currSymbol: string;
    currResolution: Resolution;
  }) => {
    try {
      const result = await fetchTimeSeriesData({
        symbol: currSymbol,
        resolution: currResolution,
      });
      setTimeSeriesData(result);
    } catch (error) {
      setTimeSeriesData([]);
      console.error(error);
    }
  };

  const handleSymbolChange = (currSymbol: string) => {
    setSymbol(currSymbol);
    updateDetails(currSymbol);
    updatePriceOverview(currSymbol);
    updateTimeSeriesData({ currSymbol, currResolution: resolution });
  };

  const handleResolutionChange = (currResolution: Resolution) => {
    setResolution(currResolution);
    updateTimeSeriesData({
      currSymbol: symbol,
      currResolution: currResolution,
    });
  };

  return {
    symbol,
    timeSeriesData,
    resolution,
    priceOverview,
    details,
    onSymbolChange: handleSymbolChange,
    onResolutionChange: handleResolutionChange,
  };
};

import { useState } from "react";
import {
  fetchQuote,
  fetchStockDetails,
  fetchTimeSeriesData,
} from "@/utils/actions";

export const useDashboardState = () => {
  const [symbol, setSymbol] = useState("FB");
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [priceOverview, setPriceOverview] = useState({});
  const [details, setDetails] = useState({});
  const [resolution, setResolution] = useState("Daily");

  const updateDetails = async (currSymbol) => {
    try {
      const result = await fetchStockDetails(currSymbol);
      setDetails(result);
    } catch (error) {
      setDetails({});
      console.error(error);
    }
  };

  const updatePriceOverview = async (currSymbol) => {
    try {
      const result = await fetchQuote(currSymbol);
      setPriceOverview(result);
    } catch (error) {
      setPriceOverview({});
      console.error(error);
    }
  };

  const updateTimeSeriesData = async ({ currSymbol, currResolution }) => {
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

  const handleSymbolChange = (currSymbol) => {
    setSymbol(currSymbol);
    updateDetails(currSymbol);
    updatePriceOverview(currSymbol);
    updateTimeSeriesData({ currSymbol, currResolution: resolution });
  };

  const handleResolutionChange = (currResolution) => {
    setResolution(currResolution);
    updateTimeSeriesData({
      symbol,
      currResolution: currResolution,
    });
  };

  return {
    symbol,
    onSymbolChange: handleSymbolChange,
    details,
    timeSeriesData,
    priceOverview,
    onResolutionChange: handleResolutionChange,
    resolution,
  };
};

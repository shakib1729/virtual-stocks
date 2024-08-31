import { Card } from "./Card";

const DETAILS_ID_VS_LABEL = {
  name: "Name",
  country: "Country",
  currency: "Currency",
  exchange: "Exchange",
  ipo: "IPO Date",
  marketCapitalization: "Market Capitalization",
  finnhubIndustry: "Industry",
};

export const Details = ({ details }) => {
  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  return (
    <Card className="overflow-y-scroll">
      <ul className="w-full h-full flex flex-col justify-between divide-y-1">
        {Object.keys(DETAILS_ID_VS_LABEL).map((item) => (
          <li key={item} className="flex-1 flex justify-between items-center">
            <span>{DETAILS_ID_VS_LABEL[item]}</span>
            <span className="font-bold">
              {item === "marketCapitalization" && details[item]
                ? `${convertMillionToBillion(details[item])}B`
                : details[item]}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

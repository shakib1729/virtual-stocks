// Components
import { Card } from "@/components/Card";

// Types
import type { CompanyDetails } from "@/types/stockData";

const DETAILS_ID_VS_LABEL = {
  name: "Name",
  country: "Country",
  currency: "Currency",
  exchange: "Exchange",
  ipo: "IPO Date",
  marketCapitalization: "Market Capitalization",
  finnhubIndustry: "Industry",
} as const;

const convertMillionToBillion = (number: number) => {
  return (number / 1000).toFixed(2);
};

type Props = { details?: CompanyDetails };

export const Details = ({ details }: Props) => {
  return (
    <Card className="overflow-y-scroll">
      <ul className="w-full h-full flex flex-col justify-between divide-y-1">
        {Object.keys(DETAILS_ID_VS_LABEL).map((item: string) => (
          <li key={item} className="flex-1 flex justify-between items-center">
            <span>
              {DETAILS_ID_VS_LABEL[item as keyof typeof DETAILS_ID_VS_LABEL]}
            </span>
            <span className="font-bold">
              {item === "marketCapitalization" && details?.[item]
                ? `${convertMillionToBillion(details[item])}B`
                : details?.[item as keyof typeof DETAILS_ID_VS_LABEL]}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

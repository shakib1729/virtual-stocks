// Libs
import Image from "next/image";
import {
  GlobeAmericasIcon,
  CalendarIcon,
  CurrencyYenIcon,
  BeakerIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

// Types
import type { CompanyDetails } from "@/types/stockData";

const DETAILS = [
  { id: "name", label: "Name", Icon: IdentificationIcon },
  { id: "exchange", label: "Exchange", Icon: GlobeAmericasIcon },
  { id: "ipo", label: "IPO Date", Icon: CalendarIcon },
  {
    id: "marketCapitalization",
    label: "Market Capitalization",
    Icon: CurrencyYenIcon,
  },
  {
    id: "finnhubIndustry",
    label: "Industry",
    Icon: BeakerIcon,
  },
];

const DEFAULT_LOGO =
  "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png";

const convertMillionToBillion = (number: number) => {
  return (number / 1000).toFixed(2);
};

type Props = { details?: CompanyDetails };

export const Details = ({ details }: Props) => {
  return (
    <div className="bg-white shadow-md p-6 h-full overflow-y-scroll rounded-lg custom-scrollbar">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Company Details
      </h3>
      <div className="flex items-center justify-center">
        <Image
          src={details?.logo ?? DEFAULT_LOGO}
          width={96}
          height={96}
          alt="Company Logo"
        />
      </div>
      <div className="space-y-3">
        {DETAILS.map(
          ({
            id,
            label,
            Icon,
          }: {
            id: string;
            label: string;
            Icon: typeof IdentificationIcon;
          }) => (
            <div key={id} className="flex items-center space-x-3">
              <Icon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-base font-semibold text-gray-900">
                  {id === "marketCapitalization" && details?.[id]
                    ? `${convertMillionToBillion(details[id])}B`
                    : details?.[id as keyof CompanyDetails]}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

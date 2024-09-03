// Libs
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Components
import { ChartFilter } from "@/components/explore/chart/ChartFilter";

// Constants
import { RESOLUTIONS } from "@/constants/resolutions";
import { Resolution, TimeSeriesData } from "@/types/stockData";

type Props = {
  timeSeriesData?: TimeSeriesData;
  resolution: Resolution;
  handleResolutionChange: (resolution: Resolution) => void;
};

export const Chart = ({
  timeSeriesData,
  resolution,
  handleResolutionChange,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 relative h-full w-full">
      <ul className="flex absolute top-2 right-2 z-40">
        {RESOLUTIONS.map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                isActive={resolution === item}
                onClick={() => {
                  handleResolutionChange(item);
                }}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={timeSeriesData}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgb(199 210 254)"
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor="rgb(168 85 247)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#600FA6"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

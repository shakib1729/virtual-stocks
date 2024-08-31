"use client";

import { useMemo, useState } from "react";
import { Card } from "../Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartFilter } from "@/components/chart/ChartFilter";
import { RESOLUTIONS } from "@/constants/resolutions";

export const Chart = ({
  timeSeriesData,
  resolution,
  handleResolutionChange,
}) => {
  return (
    <Card>
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
              <stop offset="95%" stopColor="rgb(199 210 254)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

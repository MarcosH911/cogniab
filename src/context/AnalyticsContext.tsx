"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import cleanChartData from "@/lib/cleanChartData";
import { GamesData } from "@/app/api/analytics/get-data/route";
import { ChartConfig } from "@/components/ui/chart";
import { ChartsConfig } from "@/types/analytics";

const charts = {
  level: {
    title: "Average level",
    description: "Showing the average level per day",
    names: ["level"],
    chartConfig: {
      level: {
        label: "Level",
        color: "rgb(var(--primary))",
      },
    } satisfies ChartConfig,
  },

  accuracy: {
    title: "Accuracy",
    description: "Showing the average accuracy per day",
    names: ["accuracy"],
    postfix: "%",
    chartConfig: {
      accuracy: {
        label: "Accuracy",
        color: "rgb(var(--primary))",
      },
    } satisfies ChartConfig,
  },

  stats: {
    title: "Stats",
    description: "Showing the average stats per day",
    names: ["correctHits", "incorrectHits", "missedHits"],
    chartConfig: {
      correctHits: {
        label: "Correct",
        color: "rgb(var(--green))",
      },
      incorrectHits: {
        label: "Incorrect",
        color: "rgb(var(--red))",
      },
      missedHits: {
        label: "Missed",
        color: "rgb(var(--yellow))",
      },
    } satisfies ChartConfig,
  },

  gamesPlayed: {
    title: "Games played",
    description: "Showing the number of games played per day",
    names: ["gamesPlayed"],
    chartConfig: {
      gamesPlayed: {
        label: "Games Played",
        color: "rgb(var(--primary))",
      },
    } satisfies ChartConfig,
  },

  timePlayed: {
    title: "Time played",
    description: "Showing the time played per day",
    names: ["timePlayed"],
    postfix: " min",
    chartConfig: {
      timePlayed: {
        label: "Time Played",
        color: "rgb(var(--primary))",
      },
    } satisfies ChartConfig,
  },
};

export type ChartMetrics =
  | "level"
  | "accuracy"
  | "stats"
  | "gamesPlayed"
  | "timePlayed";

interface AnalyticsContextValue {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  chartMetric: ChartMetrics;
  setChartMetric: Dispatch<SetStateAction<ChartMetrics>>;
  cleanData: GamesData | null;
  charts: ChartsConfig;
}

export const AnalyticsContext = createContext<AnalyticsContextValue>({
  date: undefined,
  setDate: () => {},
  chartMetric: "level",
  setChartMetric: () => {},
  cleanData: null,
  charts,
});

interface AnalyticsContextProviderProps {
  children: React.ReactNode;
  data: GamesData;
}

export default function AnalyticsContextProvider({
  children,
  data,
}: AnalyticsContextProviderProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [chartMetric, setChartMetric] = useState<ChartMetrics>("level");

  const cleanData =
    date && date.from && date.to && data && data.length > 0
      ? cleanChartData(data, date.from, date.to)
      : null;

  return (
    <AnalyticsContext.Provider
      value={{
        date,
        setDate,
        chartMetric,
        setChartMetric,
        cleanData,
        charts,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  return useContext(AnalyticsContext);
}

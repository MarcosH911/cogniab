import ChartNoData from "@/components/ChartNoData";
import AnalyticsChart from "./AnalyticsChart";

import { ChartMetrics } from "./Analytics";

import type { ChartConfig } from "@/components/ui/chart";
import { GamesData } from "@/app/api/analytics/get-data/route";

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

interface AnalyticsMetricsProps {
  chartMetric: ChartMetrics;
  data: GamesData | null;
}

export default function AnalyticsMetrics({
  chartMetric,
  data,
}: AnalyticsMetricsProps) {
  return (
    <>
      {chartMetric === null ? (
        <ChartNoData text="No metric selected" />
      ) : (
        <AnalyticsChart data={data} {...charts[chartMetric]} />
      )}
    </>
  );
}

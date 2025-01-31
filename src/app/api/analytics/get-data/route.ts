import getDataRequest from "@/lib/server/analytics/getDataRequest";
import { NextRequest, NextResponse } from "next/server";

export type GamesData = {
  userId: string;
  gamesPlayed: number;
  level: number;
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
  accuracy: number;
  timePlayed: number;
  date: string;
}[];

export const dynamic = "force-dynamic";

const validFrequencies = ["daily", "weekly", "monthly"];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const frequency = searchParams.get("frequency");

    if (
      typeof frequency !== "string" ||
      !validFrequencies.includes(frequency)
    ) {
      return NextResponse.json(
        { error: "Invalid frequency value" },
        { status: 400 },
      );
    }

    return await getDataRequest({
      frequency: frequency as "daily" | "weekly" | "monthly",
    });
  } catch (error) {
    console.error("Error getting data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { db } from "@/database/db";
import { settingsTable } from "@/database/schemas/settingsTable";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export default async function getSettingsRequest(): Promise<NextResponse> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    const settings = await db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.userId, userId))
      .then((res) => (res.length === 1 ? res[0] : null));
    if (settings === null) {
      return NextResponse.json(
        { error: "Failed to get settings" },
        { status: 400 },
      );
    }

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error("Error getting settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

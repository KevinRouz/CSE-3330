import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/utils/db";

export async function GET(req: NextRequest) {
  const db = await getDatabaseConnection();
  const { searchParams } = req.nextUrl;
  const itemId = searchParams.get("itemId");
  const itemIdStr = String(itemId);
  if (!itemId) {
    console.error("Item ID is missing in the request");
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }
  try {
    console.log("Querying database for itemId:", itemId);
    const item = await db.get(`SELECT * FROM item WHERE iId = ?`, [itemIdStr]);

    if (!item) {
      console.log("Item not found:", itemId);
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    console.log("Item found:", item);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("Database error:", error); 
    return NextResponse.json({ error: "Failed to retrieve item" }, { status: 500 });
  }
}
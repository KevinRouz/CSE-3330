import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/utils/db";

export async function GET(req: NextRequest) {
  const db = await getDatabaseConnection();
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query"); 

  if (!query) {
    console.error("Item ID or Name is missing in the request");
    return NextResponse.json({ message: "Item ID or Name is required", data: null }, { status: 400 });
  }

  try {
    let item;
    
    if (!isNaN(Number(query))) {
      const itemIdStr = String(query);
      console.log("Querying database for itemId:", itemIdStr);
      item = await db.get(`SELECT * FROM item WHERE iId = ?`, [itemIdStr]);
    } else {
      console.log("Querying database for name:", query);
      item = await db.get(`SELECT * FROM item WHERE Iname = ?`, [query]);
    }

    if (!item) {
      console.log("Item not found:", query);
      return NextResponse.json({ error: "Item not found",}, { status: 500 });
    }

    console.log("Item found:", item);
    return NextResponse.json({ message: "Item retrieved successfully", data: item }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Failed to retrieve item", data: null }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/utils/db";

export async function POST(req: NextRequest) {
  const db = await getDatabaseConnection();
  const body = await req.json();
  console.log("hi");
  const { name, price, description } = body;

  if (!name || !price || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    // Insert the new item into the database
    await db.run(
      `INSERT INTO item (Iname, Sprice, Idescription) VALUES (?, ?, ?)`,
      [name, price, description]
    );

    const url = new URL('/api/items', req.url);
    url.searchParams.append('query', name); 

    const insertedItemResponse = await fetch(url);
    const insertedItemData = await insertedItemResponse.json();

    if (insertedItemResponse.ok) {
      return NextResponse.json({
        message: "Item inserted and retrieved successfully!",
        data: insertedItemData.data, 
      }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Failed to retrieve inserted item." }, { status: 500 });
    }
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Failed to insert item." }, { status: 500 });
  }
}

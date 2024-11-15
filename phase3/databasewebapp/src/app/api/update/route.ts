import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/utils/db";

export async function PUT(req: NextRequest) {
  const db = await getDatabaseConnection();
  const body = await req.json();

  const { itemId, name, price, description } = body;

  if (!itemId || !name || !price || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    // Update the item in the database
    const result = await db.run(
      `UPDATE item SET Iname = ?, Sprice = ?, Idescription = ? WHERE iId = ?`,
      [name, price, description, itemId]
    );

    if (result.changes === 0) {
      return NextResponse.json({ error: "Item not found or no changes made." }, { status: 404 });
    }

    // Query the updated item from the database
    const updatedItem = await db.get(
      `SELECT iId, Iname, Sprice, Idescription FROM item WHERE iId = ?`,
      [itemId]
    );

    // Return the updated item along with the success message
    return NextResponse.json({
      message: "Item updated successfully!",
      data: updatedItem, // Include the updated item data
    }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update item." }, { status: 500 });
  }
}
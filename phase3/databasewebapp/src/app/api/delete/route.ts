import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/utils/db";

export async function DELETE(req: NextRequest) {
  const db = await getDatabaseConnection();
  const { searchParams } = req.nextUrl;
  const itemId = searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json({ error: "Item ID is required." }, { status: 400 });
  }

  try {
    const result = await db.run(`DELETE FROM item WHERE iId = ?`, [itemId]);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete item." }, { status: 500 });
  }
}
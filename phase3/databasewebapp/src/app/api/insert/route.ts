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
    await db.run(
      `INSERT INTO item (Iname, Sprice, Idescription) VALUES (?, ?, ?)`,
      [name, price, description]
    );
    return NextResponse.json({ message: "Item inserted successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ error: "Failed to insert item." }, { status: 500 });
  }
}

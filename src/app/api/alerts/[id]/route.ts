import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body as { id: string };

    if (!id) {
      return NextResponse.json(
        { error: "Missing 'id' in request body" },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, "alerts", id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete alert", details: String(error) },
      { status: 500 }
    );
  }
}

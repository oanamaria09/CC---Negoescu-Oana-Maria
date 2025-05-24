import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context : { params: { id: string } }
) {
  const { id } = context.params;
  await deleteDoc(doc(db, "alerts", id));
  return NextResponse.json({ success: true });
}

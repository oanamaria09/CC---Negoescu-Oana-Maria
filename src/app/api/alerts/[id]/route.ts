import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error Ignore params typing issue in App Router
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await deleteDoc(doc(db, "alerts", id));
  return NextResponse.json({ success: true });
}

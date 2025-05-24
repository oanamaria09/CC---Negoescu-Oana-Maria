import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { PagesRouteHandlerContext } from "next/dist/server/route-modules/pages/module.compiled";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context : PagesRouteHandlerContext <{id:string}>
) {
  const { id } = context.params;
  await deleteDoc(doc(db, "alerts", id));
  return NextResponse.json({ success: true });
}

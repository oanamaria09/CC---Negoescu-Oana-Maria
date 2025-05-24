import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const snap = await getDocs(collection(db, "alerts"));
  const alerts = snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { city: string; threshold: number }),
  }));

  return NextResponse.json(alerts);
}

export async function POST(req: NextRequest) {
  const { city, threshold } = await req.json();
  if (!city || typeof threshold !== "number") {
    return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  }

  await addDoc(collection(db, "alerts"), { city, threshold });
  return NextResponse.json({ success: true });
}

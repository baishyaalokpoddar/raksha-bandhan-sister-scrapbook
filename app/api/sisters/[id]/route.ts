import { NextResponse } from "next/server";
import { DEMO_SISTERS } from "@/lib/defaultData";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const demoFound = DEMO_SISTERS.find((s) => s.id.toLowerCase() === id.toLowerCase());
  if (demoFound) {
    return NextResponse.json(demoFound);
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ success: true, message: `Deleted ${params.id}` });
}

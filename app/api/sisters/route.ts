import { NextResponse } from "next/server";
import { DEMO_SISTERS } from "@/lib/defaultData";
import { SisterGreeting } from "@/lib/types";

// In-memory runtime cache for server-side persistence
const inMemoryCache = new Map<string, SisterGreeting>();

// Populate with default sisters
DEMO_SISTERS.forEach((sister) => {
  inMemoryCache.set(sister.id.toLowerCase(), sister);
});

export async function GET() {
  const sisters = Array.from(inMemoryCache.values());
  return NextResponse.json(sisters);
}

export async function POST(request: Request) {
  try {
    const data: SisterGreeting = await request.json();
    if (!data.id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }
    inMemoryCache.set(data.id.toLowerCase(), data);
    return NextResponse.json({ success: true, sister: data });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

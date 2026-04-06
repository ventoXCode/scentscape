import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync, writeFileSync, mkdirSync, appendFileSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const CLICKS_FILE = join(DATA_DIR, "affiliate-clicks.jsonl");

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const retailer = req.nextUrl.searchParams.get("retailer");
  const product = req.nextUrl.searchParams.get("product");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  // Log click server-side (works even when gtag is blocked)
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    const entry = JSON.stringify({
      retailer,
      product,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent")?.slice(0, 100),
    });
    appendFileSync(CLICKS_FILE, entry + "\n");
  } catch {
    // Don't block the redirect if logging fails
  }

  return NextResponse.redirect(url, 302);
}

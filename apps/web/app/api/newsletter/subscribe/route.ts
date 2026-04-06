import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const SUBSCRIBERS_FILE = join(DATA_DIR, "newsletter-subscribers.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
}

function getSubscribers(): Subscriber[] {
  if (!existsSync(SUBSCRIBERS_FILE)) return [];
  try {
    return JSON.parse(readFileSync(SUBSCRIBERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveSubscribers(subscribers: Subscriber[]) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email?.trim()?.toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const subscribers = getSubscribers();

    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json({ message: "You're already subscribed!" });
    }

    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    saveSubscribers(subscribers);

    return NextResponse.json({ message: "Welcome to the ScentScape community!" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

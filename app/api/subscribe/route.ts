import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers-storage";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email || !email.includes("@") || email.length < 5) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const success = await addSubscriber(email);
    if (!success) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    return NextResponse.json({ ok: true, message: "Subscription successful!" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to subscribe at this time." },
      { status: 500 }
    );
  }
}

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidatePayload = {
  event?: string;
  model?: {
    uid?: string;
  };
};

const WEBHOOK_SECRET = process.env.STRAPI_WEBHOOK_SECRET;

const ROUTE_BY_MODEL_UID: Record<string, string> = {
  "api::aposta.aposta": "/apostas-esportivas",
  "api::slot.slot": "/slots",
};

const ALLOWED_EVENTS = new Set([
  "entry.create",
  "entry.update",
  "entry.delete",
  "entry.publish",
  "entry.unpublish",
]);

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("x-strapi-webhook-token");

    if (!WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Missing STRAPI_WEBHOOK_SECRET on server" },
        { status: 500 },
      );
    }

    if (!token || token !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = (await request.json()) as RevalidatePayload;
    const event = payload?.event;
    const modelUid = payload?.model?.uid;

    if (!event || !modelUid) {
      return NextResponse.json(
        { error: "Invalid payload: event and model.uid are required" },
        { status: 400 },
      );
    }

    if (!ALLOWED_EVENTS.has(event)) {
      return NextResponse.json(
        { error: `Event not handled: ${event}` },
        { status: 400 },
      );
    }

    const pathToRevalidate = ROUTE_BY_MODEL_UID[modelUid];

    if (!pathToRevalidate) {
      return NextResponse.json(
        { error: `Model not handled: ${modelUid}` },
        { status: 400 },
      );
    }

    revalidatePath(pathToRevalidate);

    return NextResponse.json({
      revalidated: true,
      event,
      modelUid,
      paths: [pathToRevalidate],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidate route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

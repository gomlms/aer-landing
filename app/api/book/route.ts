import { WebClient } from "@slack/web-api";
import { NextResponse } from "next/server";

const slack = new WebClient(process.env.SLACK_API_KEY);
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID ?? "C0APCF8UDGW";

interface BookingRequest {
  name: string;
  company: string;
  email: string;
  industry: string;
  painPoint: string;
  teamSize: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingRequest;

    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: "Name, email, and company are required" },
        { status: 400 }
      );
    }

    const message = [
      `:incoming_envelope: *New Strategy Call Request*`,
      ``,
      `*Name:* ${body.name}`,
      `*Company:* ${body.company}`,
      `*Email:* ${body.email}`,
      `*Industry:* ${body.industry || "_Not specified_"}`,
      `*Team Size:* ${body.teamSize || "_Not specified_"}`,
      ``,
      `*What they want to automate:*`,
      body.painPoint || "_No details provided_",
    ].join("\n");

    await slack.chat.postMessage({
      channel: CHANNEL_ID,
      text: message,
      unfurl_links: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Slack post failed:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}

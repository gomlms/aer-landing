import { WebClient } from "@slack/web-api";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const slack = new WebClient(process.env.SLACK_API_KEY);
const CHANNEL_ID = "C0APCF8UDGW";

interface BookingRequest {
  name: string;
  company: string;
  email: string;
  industry: string;
  painPoint: string;
  teamSize: string;
  ref?: string;
  referrer?: string;
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

    // Resolve affiliate link if ref is present
    let affiliateLinkId: string | null = null;
    let affiliateName: string | null = null;

    if (body.ref) {
      const affiliate = await prisma.affiliateLink.findUnique({
        where: { code: body.ref },
      });
      if (affiliate) {
        affiliateLinkId = affiliate.id;
        affiliateName = affiliate.name;
      }
    }

    // Save booking to database
    await prisma.booking.create({
      data: {
        name: body.name,
        company: body.company,
        email: body.email,
        industry: body.industry || null,
        teamSize: body.teamSize || null,
        painPoint: body.painPoint || null,
        affiliateLinkId,
        referrer: body.referrer || null,
      },
    });

    // Send Slack notification
    const message = [
      `:incoming_envelope: *New Strategy Call Request*`,
      ``,
      `*Name:* ${body.name}`,
      `*Company:* ${body.company}`,
      `*Email:* ${body.email}`,
      `*Industry:* ${body.industry || "_Not specified_"}`,
      `*Team Size:* ${body.teamSize || "_Not specified_"}`,
      affiliateName ? `*Referred by:* ${affiliateName}` : null,
      ``,
      `*What they want to automate:*`,
      body.painPoint || "_No details provided_",
    ]
      .filter(Boolean)
      .join("\n");

    await slack.chat.postMessage({
      channel: CHANNEL_ID,
      text: message,
      unfurl_links: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking failed:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}

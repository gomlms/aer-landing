import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      ref?: string;
      path?: string;
      referrer?: string;
    };

    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      null;
    const userAgent = headersList.get("user-agent") ?? null;

    let affiliateLinkId: string | null = null;

    if (body.ref) {
      const affiliate = await prisma.affiliateLink.findUnique({
        where: { code: body.ref },
      });
      if (affiliate) {
        affiliateLinkId = affiliate.id;
      }
    }

    await prisma.visit.create({
      data: {
        affiliateLinkId,
        referrer: body.referrer ?? null,
        userAgent,
        ip,
        path: body.path ?? "/",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ ok: true }); // fail silently for tracking
  }
}

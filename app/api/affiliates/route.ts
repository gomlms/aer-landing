import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/affiliates — list all affiliates with stats
export async function GET() {
  try {
    const affiliates = await prisma.affiliateLink.findMany({
      include: {
        _count: {
          select: { visits: true, bookings: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ affiliates });
  } catch (error) {
    console.error("Affiliates list error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST /api/affiliates — create a new affiliate link
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      code: string;
      name: string;
      url?: string;
    };

    if (!body.code || !body.name) {
      return NextResponse.json(
        { error: "code and name are required" },
        { status: 400 }
      );
    }

    const affiliate = await prisma.affiliateLink.create({
      data: {
        code: body.code.toLowerCase().replace(/[^a-z0-9-]/g, ""),
        name: body.name,
        url: body.url ?? null,
      },
    });

    return NextResponse.json({ affiliate });
  } catch (error) {
    console.error("Affiliate create error:", error);
    return NextResponse.json(
      { error: "Failed to create affiliate" },
      { status: 500 }
    );
  }
}

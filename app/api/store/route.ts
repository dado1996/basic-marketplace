import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.stores.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  await prisma.stores.create({
    data: {
      name: body.name,
      user: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });

  return NextResponse.json({ message: "Created" });
}

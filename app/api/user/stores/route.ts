import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await prisma.stores.findMany({
    where: {
      user: {
        email: session?.user.email as string,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(result);
}

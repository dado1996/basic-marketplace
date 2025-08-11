import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const store = request.nextUrl.searchParams.get("store");

  if (!store) {
    return NextResponse.json({});
  }

  const result = await prisma.products.findMany({
    where: {
      storeId: parseInt(store),
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  return NextResponse.json(result);
}

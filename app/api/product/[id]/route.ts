import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const result = await prisma.products.findFirst({
    where: {
      id: parseInt(id),
    },
    select: {
      name: true,
      description: true,
      img: true,
      price: true,
      store: {
        select: {
          name: true,
        },
      },
      updatedAt: true,
    },
  });

  return NextResponse.json(result ?? {});
}

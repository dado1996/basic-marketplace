import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.stores.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(result);
}

export async function POST() {
  await prisma.products.create({
    data: {
      name: "",
      price: 0,
      storeId: 1,
    },
  });

  return NextResponse.json({ message: "Created" });
}

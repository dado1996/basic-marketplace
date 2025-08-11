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
      img: true,
    },
  });

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const { name, price, description, storeId, img } = await request.json();
  await prisma.products.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      img,
      storeId: parseInt(storeId),
    },
    select: {
      name: true,
      price: true,
      img: true,
    },
  });

  return NextResponse.json({ message: "Created" });
}

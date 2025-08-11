import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!["BUSINESS", "CLIENTE"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const existsUser = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existsUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({
      message: "User registered",
      user: { ...user, password: undefined },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error has ocurred" });
  }
}

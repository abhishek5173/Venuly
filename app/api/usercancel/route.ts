import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Fetch the list of users (GET request)
export async function GET(req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true, 
      },
    });

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    await prisma.booking.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.account.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return new NextResponse(JSON.stringify({ message: "User deleted" }), { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to delete user" }), { status: 500 });
  }
}
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const venue = await prisma.venues.findMany();
    return NextResponse.json(venue)
}
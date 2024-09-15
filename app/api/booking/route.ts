import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body = await req.json();
    const {venueId,date} = body;
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if(!session){
        return new NextResponse(JSON.stringify({error:"Unauthorized"}),{status:403});
    }
    try {
        const existingbooking = await prisma.booking.findFirst({
            where:{
                venueId: parseInt(venueId),
                date: new Date(date),
            }
        })
        if (existingbooking){
            return new NextResponse(JSON.stringify({error:"Venue already booked for this date"}),{status:400})
        }
        const newbooking = await prisma.booking.create({
            data:{
                venueId: parseInt(venueId),
                userId: session.user.id,
                date: new Date(date),
            }
        })
        return new NextResponse(JSON.stringify({message:"Booking successfull"}),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({error:"failed to create booking"}),{status:500})
    }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  try {
    const newbooking = await prisma.booking.findMany({
      include: {
        venue: true,
      },
    });
    
    return new NextResponse(JSON.stringify(newbooking), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch booking" }), { status: 500 });
  }
}
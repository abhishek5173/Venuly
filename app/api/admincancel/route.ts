import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { bookingId } = body; 
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    
    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    try {
      
        const existingBooking = await prisma.booking.findFirst({
            where: {
                id: parseInt(bookingId),
                userId: session.user.id,
            },
        });

        if (!existingBooking) {
            return new NextResponse(JSON.stringify({ error: "Booking not found or not authorized" }), { status: 404 });
        }

        // Delete the booking
        await prisma.booking.delete({
            where: {
                id: parseInt(bookingId),
            },
        });

        return new NextResponse(JSON.stringify({ message: "Booking canceled successfully" }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to delete booking" }), { status: 500 });
    }
}

export async function POST(req: NextRequest){
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  const body = await req.json();
  const {name,description,image,location} = body;
  if(!session){
    return new NextResponse(JSON.stringify({error:"Unauthorized"}),{status:403});
}
  try {
    const newvenue = await prisma.venues.create({
      data:{
        name: name,
        description: description,
        image: image,
        location: location,
      }
    })
    return new NextResponse(JSON.stringify({message:"Venue Added successfully"}),{status:200})
  } catch (error) {
    return new NextResponse(JSON.stringify({error:"failed to create Venue"}),{status:500})
  }
}
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    try {
        // Fetch bookings for the logged-in user
        const bookings = await prisma.booking.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                venue: true, // Include related venue details
            },
        });

        // Return the bookings in a JSON response
        return new NextResponse(JSON.stringify(bookings), { status: 200 });
    } catch (error) {
        // Handle errors that occur while fetching the bookings
        return new NextResponse(JSON.stringify({ error: "Error fetching bookings" }), { status: 500 });
    }
}
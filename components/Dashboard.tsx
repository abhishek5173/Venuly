"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Venue {
  name: string;
}

interface Booking {
  id: number;
  date: string;
  venue: Venue;
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get<Booking[]>("/api/booking");
        setBookings(response.data);
      } catch (error) {
        toast.error("Error fetching bookings");
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold font-mono py-2">All Booked Venues</div>
      <div className="py-4">
        <div className="max-h-80 overflow-y-auto">
          <table className="border-2 table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Venue Name</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="px-4 py-2 border">{booking.venue.name}</td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

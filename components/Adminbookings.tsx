"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Venue {
  name: string;
}

interface Booking {
  id: number;
  date: Date;
  venue: Venue; 
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  
  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get<Booking[]>("/api/admincancel");
        setBookings(response.data);
      } catch (error) {
        toast.error("Error fetching bookings");
      }
    }
    fetchBookings();
  }, []);

 
  async function handleClick(bookingId: number) {
    const userConfirmed = window.confirm("Are you sure you want to cancel this booking?");
    
    if (!userConfirmed) {
      return;
    }
    try {
      const response = await axios.delete("/api/admincancel", {
        data: { bookingId },
      });

      if (response.status === 200) {
        
        toast.success("Booking canceled successfully!");

    
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== bookingId)
        );
      } else {
        toast.error("Error canceling booking.");
      }
    } catch (error) {
      toast.error("Error canceling booking.");
    }
  }

  return (
    <div className="overflow-x-auto w-full">
     
      <table className="min-w-full table-auto border-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Venue Name</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td className="px-4 py-2 border">{booking.venue.name}</td>
              <td className="px-4 py-2 border">
                {new Date(booking.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">
                <div className="flex justify-center items-center">
                 
                  <button
                    onClick={() => handleClick(booking.id)}
                    className="text-white bg-red-600 p-1 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

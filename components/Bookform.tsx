"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Venue{
    id:number;
    name:string;
}


export default function Bookform(){
    const [venuedata,setvenuedata] = useState<Venue []>([])
    const [venueId,setvenueId] = useState("")
    const [date,setdate] = useState("")
    const router = useRouter();

    useEffect(()=>{
        async function fetchvenue(){
            const response = await axios.get("/api/venues")
            setvenuedata(response.data)
        }
        fetchvenue()
    },[])
    async function handlesubmit(event: React.FormEvent) {
        event.preventDefault();
      
        if (!venueId || !date) {
          toast.error("Please select a venue and date");
          return;
        }
        const userConfirmed = window.confirm("Are you sure you want to book this Venue?");
    
        if (!userConfirmed) {
          return;
        }
        try {
          const response = await axios.post("/api/booking", {
            venueId,
            date,
          });
      
          if (response.status === 200) {
            toast.success("Booking successful!");
            router.push("/dashboard/mybookings");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 400 && error.response?.data?.error === "Venue already booked for this date") {
              toast.error("Venue already booked for this date.");
            } else {
              toast.error("Error booking venue.");
              console.error("Error booking venue:", error.response?.data);
            }
          } else {
            toast.error("Failed to submit booking.");
            console.error("Error submitting booking:", error);
          }
        }
      }
    return (
      <div className="items-center  p-10 py-4 h-screen">
        <div className=" w-full  bg-white">
          <form onSubmit={handlesubmit}>
            <div className="">
              <label className="mb-2 block text-base font-medium text-[#07074D]">
                Venue
              </label>
              <Link href="/Venues">
                <button className="text-xs bg-indigo-500 rounded-lg text-white p-2 mb-1">
                  See all Venues
                </button>
              </Link>
              <select
                onChange={(e) => setvenueId(e.target.value)}
                name="venueId"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="" disabled selected>
                  Select a venue
                </option>
                {venuedata.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.id}. {venue.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:full">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Date
                  </label>
                  <input
                    onChange={(e) => {
                      setdate(e.target.value);
                    }}
                    type="date"
                    name="date"
                    id="date"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Book Venue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
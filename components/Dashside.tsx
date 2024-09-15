import { IconAddressBook, IconBrandBooking } from "@tabler/icons-react";
import { BookImageIcon, CopyCheck, FilePlus2, Home, MemoryStick } from "lucide-react";
import Link from "next/link";


export default function Dashside(){
    return (
        <div className="bg-gradient-to-b from-indigo-500 to-indigo-700 w-16 sm:w-2/12 h-screen flex justify-center py-8 shadow-2xl rounded-e-md">
        <div className="w-full px-4 space-y-6">
          <Link className="flex flex-col sm:flex-row gap-4 items-center text-white font-semibold p-4 rounded-xl hover:bg-indigo-800/75 hover:scale-105 transition-transform duration-300 ease-in-out shadow-md" href='/dashboard'>
            <Home className="text-2xl" />
            <span className="hidden sm:inline-block text-lg">Home</span>
          </Link>
          <Link className="flex flex-col sm:flex-row gap-4 items-center text-white font-semibold p-4 rounded-xl hover:bg-indigo-800/75 hover:scale-105 transition-transform duration-300 ease-in-out shadow-md" href='/dashboard/bookingform'>
            <FilePlus2 className="text-2xl" />
            <span className="hidden sm:inline-block text-lg">Book A Venue</span>
          </Link>
          <Link className="flex flex-col sm:flex-row gap-4 items-center text-white font-semibold p-4 rounded-xl hover:bg-indigo-800/75 hover:scale-105 transition-transform duration-300 ease-in-out shadow-md" href='/dashboard/mybookings'>
            <CopyCheck className="text-2xl" />
            <span className="hidden sm:inline-block text-lg">My Bookings</span>
          </Link>
        </div>
      </div>      
    )
}
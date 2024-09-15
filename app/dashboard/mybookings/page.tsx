import Bookings from "@/components/Bookings";
import Dashside from "@/components/Dashside";

export default function mybooking(){
    return (
        <div className="flex lg:flex-row h-screen">
        <Dashside/>
        <Bookings/>
        </div>
    );
}
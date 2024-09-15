import Bookform from "@/components/Bookform";
import Dashside from "@/components/Dashside";

export default function BookingForm() {
    return (
        <div className="flex lg:flex-row h-screen">
        <Dashside/>
        <Bookform />
        </div>
    );
}

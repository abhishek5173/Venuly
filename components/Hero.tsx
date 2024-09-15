import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

export default function Hero() {
    return (
        <BackgroundBeamsWithCollision>
            <div className="flex flex-col justify-center items-center bg-slate-200/35 h-screen w-screen">
                <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                    <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                            {/* Add any additional content or text here */}
                        </div>
                        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                            {/* Add any additional content or text here */}
                        </div>
                    </div>
                </h2>
                <div className="font-bold text-center md:text-6xl text-3xl">
                    VEN<span className="text-indigo-500 rounded-lg ml-1">ULY</span>&#8594;Your One Stop <br />
                    <span className="">Destination To Book A Venue</span>
                </div>
                <Link
                    href='/Venues'
                    className="text-xs mt-8 text-white bg-indigo-500 rounded-full p-2 hover:scale-110 w-1/5 text-center animate-pulse bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-500"
                >
                    Venues Available
                </Link>
            </div>
        </BackgroundBeamsWithCollision>
    );
}

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

interface Venue {
  id: number; // or string depending on your database schema
  name: string;
  description: string;
  location: string;
  image: string | null; // Allow null for image
}

async function allvenues(): Promise<Venue[]> {
  const venues = await prisma.venues.findMany();
  return venues;
}

export default async function Venues() {
  const venuedata: Venue[] = await allvenues(); // Explicitly type venuedata

  return (
    <div className="flex flex-col items-center justify-center bg-slate-200/35 w-full min-h-screen">
      <BackgroundBeamsWithCollision>
        <div className="py-8 px-4 mt-4 w-full">
          <div className="text-center font-bold text-3xl md:text-4xl lg:text-5xl mb-8">
            Venues
          </div>

          {/* Grid layout on large screens and scrollable vertical layout on smaller screens */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 pb-4 h-[75vh] w-full items-center">
            {venuedata.map((venue: Venue) => (
              <CardContainer key={venue.id} className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[260px] md:w-[300px] lg:w-[350px] h-auto rounded-xl p-4 sm:p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {venue.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm sm:text-base max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {venue.description}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-indigo-500 text-sm sm:text-base max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {venue.location}
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    rotateX={20}
                    rotateZ={-10}
                    className="w-full mt-4"
                  >
                    {venue.image ? (
                      <Image
                      src={venue.image}
                      height={1000}
                      width={1000}
                      className="w-full object-cover rounded-xl"
                      alt="thumbnail"
                      unoptimized
                    />
                    
                    ) : (
                      <div className="h-40 sm:h-48 md:h-60 w-full bg-gray-200 rounded-xl flex items-center justify-center">
                        <span className="text-gray-500">No Image Available</span>
                      </div>
                    )}
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

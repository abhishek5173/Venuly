import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import Hero from "@/components/Hero";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (session) {
    redirect("/dashboard");
  }
 return (
  <div>
 <Hero/></div>
 )
}
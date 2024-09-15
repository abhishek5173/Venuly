
import Dashboard from "@/components/Dashboard";
import Dashside from "@/components/Dashside";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"
async function getUser() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    return session;
  }

export default async function dashboard() {
    const session = await getUser();
    return (
       
        <div className="flex h-screen w-screen">
           <Dashside/>
            <div className="w-screen h-screen flex justify-center"><Dashboard/></div>
        </div>
    )
}
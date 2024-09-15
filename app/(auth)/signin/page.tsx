
import Signin from "@/components/Signin"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function signin(){
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  if(session?.user){
    redirect('/');
  }
    return (
    <Signin/>
    )
} 
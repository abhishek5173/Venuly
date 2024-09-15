"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface NavbarProps {
  session: Session | null;
  isAdmin: boolean;
}

export default function Navbar({ session, isAdmin }:NavbarProps) {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    })
  };

  const handleRedirect = async () => {
    if (!session) {
      await signIn("google", {
        callbackUrl: "/dashboard/bookingform",
      });
    } else {
      router.push("/dashboard/bookingform");
    }
  };
  
  const handlehomeredirect = async () =>{
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname; // Get current path (e.g., /dashboard/admin)
  
      if (session) {
        // If the current URL starts with /dashboard/admin
        if (currentPath.startsWith('/dashboard/admin')) {
          // Redirect to /dashboard/admin
          router.push('/dashboard/admin');
        } else {
          // Otherwise, redirect to /dashboard
          router.push('/dashboard');
        }
      } else {
        // If no session, redirect to the home page
        router.push('/');
      }
    }
  }

  return (
    <div className="sticky z-[100] h-14 inset-x-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all flex justify-center">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 w-11/12">
        <button onClick={handlehomeredirect}  className="flex z-40 font-semibold hover:scale-110 text-xl">
          VEN<span className="text-indigo-500">ULY</span>
        </button>
        <div className="h-full flex items-center space-x-4">
          {session?.user ? (
            <>
              <button className="text-xs bg-indigo-500 rounded-lg text-white p-2 hover:scale-110" onClick={handleSignOut}>
                Sign out
              </button>
              {isAdmin ? (
                <Link href="/dashboard/admin" className="text-base pl-2 hover:scale-110">
                  Dashboard ✨
                </Link>
              ) : null}
            </>
          ) : (
            <>
              <button className="text-xs bg-indigo-500 rounded-lg text-white p-2 hover:scale-110" onClick={() => signIn()}>
                Sign In/Sign Up
              </button>
              <button onClick={handleRedirect} className="text-white text-xs bg-indigo-500 p-2 rounded-lg flex items-center space-x-1 hover:scale-110">
                <span>Book A Venue</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

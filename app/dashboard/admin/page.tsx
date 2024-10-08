import { getServerSession } from 'next-auth';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

async function fetchSession() {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    // Ensure the session exists and the email matches the ADMIN_EMAIL
    if (!session || session.user?.email !== ADMIN_EMAIL) {
      throw new Error('Unauthorized');
    }
    return session;
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
}

export default async function AdminPage() {
  let session;
  
  try {
    session = await fetchSession();
  } catch {
    // Redirect to a 403 page or return unauthorized message
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
        <p className="text-lg text-gray-700 mt-4">You do not have access to this page.</p>
        <Link href="/" className="text-blue-500 mt-6">Return to homepage</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-10">
      <div className="flex justify-center py-4">
        <h1 className="font-semibold text-3xl text-gray-800">Welcome to the Admin Panel</h1>
      </div>

      <div className="flex flex-col w-full max-w-3xl space-y-6">
        {/* Manage Users Section */}
        <div className="w-full p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300 ease-in-out">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Manage Users</h2>
            <Link href='/dashboard/admin/users' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              Manage
            </Link>
          </div>
        </div>

        {/* Manage Bookings Section */}
        <div className="w-full p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300 ease-in-out">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Manage Bookings</h2>
            <Link href='/dashboard/admin/bookings' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              Manage
            </Link>
          </div>
        </div>

        {/* Add Venue Section */}
        <div className="w-full p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300 ease-in-out">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Add Venue</h2>
            <Link href='/dashboard/admin/venueadd' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              Add
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="w-full p-6 shadow-lg rounded-xl hover:shadow-2xl transition duration-300 ease-in-out">
          <div className="flex justify-between items-center">
            <Link href='/dashboard' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              USER HOMEPAGE
            </Link>
            <Link href='/Venues' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              See All Venues
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

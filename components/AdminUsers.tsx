"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get<User[]>("/api/usercancel");
        setUsers(response.data);
      } catch (error) {
        toast.error("Error fetching users");
      }
    }
    fetchUsers();
  }, []);

  async function handleDelete(userId: number) {
    const userConfirmed = window.confirm("Are you sure you want to delete this user?");

    if (!userConfirmed) {
      return;
    }

    try {
      const response = await axios.delete("/api/usercancel", {
        data: { userId },
      });

      if (response.status === 200) {
        toast.success("User deleted successfully!");

        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        toast.error("Error deleting user.");
      }
    } catch (error) {
      toast.error("Error deleting user.");
    }
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto border-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">User Name</th>
            <th className="px-4 py-2 border">User Id</th>
            <th className="px-4 py-2 border">Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-white bg-red-600 p-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

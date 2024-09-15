"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

// Define Zod schema
const venueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Invalid URL").min(1, "Image URL is required"),
  location: z.string().min(1, "Location is required"),
});

export default function AddVenue() {
    const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form submission with async
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { name, description, image, location };
    const result = venueSchema.safeParse(formData);

    if (result.success) {
      setErrors({});

      try {
        const response = await axios.post("/api/admincancel", formData);
        if (response.status === 200) {
          router.push('/dashboard/admin')
          toast.success("venue added successfully!");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if( error.response?.status === 400) {
            toast.error("Error adding venue.");
            console.error("Error adding venue:", error.response?.data);
          }
        } else {
          toast.error("Failed to submit venue.");
          console.error("Error submitting venue:", error);
        }
      }
    } else {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path && error.path[0]) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name">Venue Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Venue Name"
            type="text"
            className="block w-full border-gray-300 rounded-md h-9"
          />
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the venue"
            className="block w-full border-gray-300 rounded-md h-24"
          />
          {errors.description && (
            <span className="text-red-600">{errors.description}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/venue.jpg"
            type="text"
            className="block w-full border-gray-300 rounded-md h-9"
          />
          {errors.image && <span className="text-red-600">{errors.image}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            type="text"
            className="block w-full border-gray-300 rounded-md h-9"
          />
          {errors.location && (
            <span className="text-red-600">{errors.location}</span>
          )}
        </div>

        <button
          className="w-full text-white rounded-md h-10 font-medium bg-indigo-500 transition hover:scale-110  ease-in-out "
          type="submit"
        >
          Add Venue &rarr;
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

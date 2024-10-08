"use client";
import { useState } from "react";

import { logger } from '@/lib/logger';
const log = logger.child({ module: "profile" , isClient: true});


const SaveFeed = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSaveFeed = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, userId: "your_user_id_here" }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Feed saved successfully!");
        setName("");
        setDescription("");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      log.error(err)
      setError("Failed to save the feed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto border border-gray-300 p-6 rounded-lg shadow-lg mt-8 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Save a New Feed</h2>
      <form onSubmit={handleSaveFeed}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-bold">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold text-white rounded-md transition-colors ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Saving..." : "Save Feed"}
        </button>
      </form>
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default SaveFeed;

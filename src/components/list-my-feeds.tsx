"use client";
import { useEffect, useState } from "react";

const DisplayFeeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const res = await fetch("/api/feeds");
        const data = await res.json();

        if (res.ok) {
          setFeeds(data.body.feeds);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch feeds.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-4">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center ">Your Feeds</h2>
      <ul>
        {feeds.length > 0 ? (
          feeds.map((feed) => (
            <li key={feed.id} className="border-b border-gray-200 py-4">
              <h3 className="text-xl font-bold">{feed.name}</h3>
              <p className="text-gray-700">{feed.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                <strong>ID:</strong> {feed.id}
              </p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No feeds found.</p>
        )}
      </ul>
    </div>
  );
};

export default DisplayFeeds;

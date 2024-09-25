"use client";
import { useEffect, useState } from "react";

const DisplayFeeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const res = await fetch("/api/feeds/get_user_feeds");
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Your Feeds</h2>
      <ul>
        {feeds.length > 0 ? (
          feeds.map((feed) => (
            <li key={feed.id}>
              <h3>{feed.name}</h3>
              <p>{feed.description}</p>
            </li>
          ))
        ) : (
          <p>No feeds found.</p>
        )}
      </ul>
    </div>
  );
};

export default DisplayFeeds;

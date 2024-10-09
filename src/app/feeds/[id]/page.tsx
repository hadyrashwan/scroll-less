"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicWidget from "@/components/dynamic-feed-widget";
import Link from "next/link";

const FeedPage = () => {
  const { id } = useParams();
  const [feed, setFeed] = useState<{ name: string; description: string } | null>(null);
  const [posts, setPosts] = useState<{ type: string; url: string; id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Updated the type


  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`/api/feeds/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFeed(data.body.feed);
        setPosts(data.body.posts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Assign the error message as a string
        } else {
          setError(String(error)); // Fallback for non-Error objects
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFeed();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <Navbar></Navbar> */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Feed Details
        </h2>
        <p className="text-gray-700">Name: {feed?.name}</p>
        <p className="text-gray-700">Description: {feed?.description}</p>
        <div className="mt-4 flex justify-center">
      <a
        href={`/api/feeds/${id}/rss`}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        RSS Feed
      </a>
    </div>
        <p>
          <Link
            href="/profile"
            className="dark:text-gray-300 text-blue-500 hover:underline"
          >
            Go back to Profile
          </Link>

        </p>
        <h3 className="text-xl font-semibold mt-6">Posts</h3>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="mb-2">
                <DynamicWidget type={post.type} url={post.url} />
                <p>
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-blue-500 hover:underline m-4"
                  >
                    Post URL
                  </Link>
                </p>{" "}
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found for this feed.</p>
        )}
      </div>
    </div>
  );
};

export default FeedPage;

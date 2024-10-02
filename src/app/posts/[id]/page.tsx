"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import DynamicWidget from '@/components/dynamic-feed-widget';

const FeedPage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log('feed_in');

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPosts(data.body.posts);
      } catch (error) {
        setError(error.message);
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
      <h2 className="text-2xl font-semibold mb-4 text-center">Post Details</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id} className="mb-2">
              <DynamicWidget type={post.type} url={post.url} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
    </div>
  );
};

export default FeedPage;

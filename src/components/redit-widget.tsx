// components/RedditEmbed.js
"use client"
import { useEffect, useState } from 'react';

const RedditEmbed = ({ url }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  if (!isClient) {
    return null; // Prevents rendering during SSR
  }

  return (
    <div>
      <blockquote className="reddit-card" data-card-created="true">
        <a href={url}>View Reddit Post</a>
      </blockquote>
      <script async src="https://embed.redditmedia.com/widgets/platform.js"></script>
    </div>
  );
};

export default RedditEmbed;

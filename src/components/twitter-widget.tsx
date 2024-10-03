"use client"
// components/TwitterEmbed.js
import { useEffect, useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const TwitterEmbed = ({ url }:{url:string}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure the code runs on the client
  }, []);

  // Extract the tweet ID from the URL
  const getTweetId = (tweetUrl:string) => {
    const tweetId = tweetUrl.split('/').pop()?.split('?')[0] ?? '';
    return tweetId;
  };

  if (!isClient) {
    return null; // Prevents SSR issues by rendering nothing on the server
  }

  return (
    <div>
      <TwitterTweetEmbed tweetId={getTweetId(url)} />
    </div>
  );
};

export default TwitterEmbed;

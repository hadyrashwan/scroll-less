
"use client"
// components/TikTokEmbed.js
import { useEffect, useState } from 'react';


const TikTokEmbed = ({ url }:{url:string}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (window.tiktokEmbed) {
      window.tiktokEmbed.load();
    } else {
      // Load TikTok embed script
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <blockquote className="tiktok-embed" cite={url} data-video-id={url.split('/').pop()}>
      <section></section>
    </blockquote>
  );
};

export default TikTokEmbed;

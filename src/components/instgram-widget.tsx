'use client'; // This marks the component as a Client Component

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const InstagramEmbed = ({ url }:{ url: string }) => {
  useEffect(() => {
    // Only runs on the client-side after the component mounts
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.instagram.com/embed.js';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ width: '100%', margin: 'auto', maxWidth: '500px' }}
    />
  );
};

// Use dynamic import to disable SSR for this component
export default dynamic(() => Promise.resolve(InstagramEmbed), { ssr: false });

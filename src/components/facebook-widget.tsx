"use client";

import { useEffect, useState } from 'react';

type FacebookEmbedProps = {
  url: string;
};

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: () => void };
      init: (options: { xfbml: boolean; version: string }) => void;
    };
    tiktokEmbed?: {
      load: () => void;
    };
    fbAsyncInit?: () => void;
  }
}

const FacebookEmbed = ({ url }: FacebookEmbedProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      // Load Facebook SDK
      window.fbAsyncInit = function () {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v12.0',
          });
        }
      };

      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;

        const js = d.createElement(s) as HTMLScriptElement; // Explicitly cast to HTMLScriptElement
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0';
        fjs.parentNode?.insertBefore(js, fjs); // Optional chaining to ensure parentNode exists
      })(document, 'script', 'facebook-jssdk');
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <div className="fb-post" data-href={url} data-width="500"></div>
    </div>
  );
};

export default FacebookEmbed;

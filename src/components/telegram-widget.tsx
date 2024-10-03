'use client'; // This marks the component as a Client Component

import { useEffect } from 'react';

const TelegramWidget = ( { url }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-post', url.replace('https://t.me/', ''));
    script.setAttribute('data-width', '100%');
    document.body.appendChild(script);
  }, [url]);

  return null; // This component doesn't render any UI
};

export default TelegramWidget;

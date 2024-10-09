"use client";

import TelegramWidget from './telegram-widget';
import InstagramWidget from './instgram-widget';
import TwitterWidget from './twitter-widget';
import TikTokWidget from './tiktok-widget';
import YoutubeWidget from './video-player';
import RedditWidget from './redit-widget';
import { FacebookEmbed } from 'react-social-media-embed';

type Widget = {
  type: string;
  url: string;
};

const DynamicWidget = ({ type, url }:Widget) => {
  // Determine which widget to render based on the type
  switch (type) {
    case 'FACEBOOK':
      return <FacebookEmbed url={url} />;            
    case 'INSTAGRAM':
      return <InstagramWidget url={url} />;
    case 'TWITTER':
      return <TwitterWidget url={url} />;
    case 'TIKTOK':
      return <TikTokWidget url={url} />;
    case 'YOUTUBE':
      return <YoutubeWidget url={url} />;
    case 'REDDIT':
      return <RedditWidget url={url} />;
    case 'TELEGRAM':
      return <TelegramWidget url={url} />;
    case 'REDDIT':
      return <RedditWidget url={url} />;
    default:
      return null; // Or you can return a fallback UI
  }
};

export default DynamicWidget;

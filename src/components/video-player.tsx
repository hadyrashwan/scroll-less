"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });



const VideoPlayer = ({url}) => {
// Video path
const videoSrc = url;

const [userStream, setUserStream] = useState<MediaStream | undefined>(undefined);

const get_user_stream = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  setUserStream(stream);
};


  return (
    <div>
      <ReactPlayer
        width="500px"
        height="400px"
        url={videoSrc}
        controls
        light={false}
        pip
      />

    </div>
  );
};

export default VideoPlayer;

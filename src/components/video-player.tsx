"use client";
import React from "react";
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });



const VideoPlayer = ({url}) => {
// Video path
const videoSrc = url;


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

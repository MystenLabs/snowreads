import React, { useRef, useState, useEffect } from "react";

interface AudioSummaryProps {
  src: string;
}

const AudioSummaryContainer: React.FC<AudioSummaryProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to format the duration in minutes and seconds
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}min ${remainingSeconds}sec`;
  };

  return (
    <div className="bg-white border border-black rounded-xl py-3 px-4 space-y-3 mt-2 min-w-[200px] h-fit">
      <div>
        <h2 className="text-lg font-normal p-1">{"Audio Summary"}</h2>
      </div>
      <audio
        ref={audioRef}
        className="w-full h-[40px] p-0 m-0" // Setting a smaller height, removing padding/margin
        controls
      >
        <source src={src} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <p className="text-xs p-1 text-gray-500">
        Summaries of content on SnowReads have been generated using artificial
        intelligence (AI) technology and may not fully reflect the original
        source material in its entirety. AI-generated content may contain
        inaccuracies, omissions, or interpretations that differ from the
        original work.
      </p>
    </div>
  );
};

export default AudioSummaryContainer;

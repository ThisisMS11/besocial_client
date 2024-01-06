import React, { useRef, useEffect } from 'react';

const VideoElement: React.FC<{ stream: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video ref={videoRef} autoPlay className='rounded-xl h-[22rem] my-1' />
    );
};

export default VideoElement;

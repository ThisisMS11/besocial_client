import React, { useRef, useEffect } from 'react';

const VideoElement: React.FC<{ stream: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div>
            <video ref={videoRef} autoPlay className='rounded-xl my-2 h-2/4'/>
        </div>
    );
};

export default VideoElement;

"use client"


import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Options from './Options';

export default function VideoPlayer(): JSX.Element {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = isMuted;
            video.addEventListener('ended', handleVideoEnd);
        }

        // Start playing video from the beginning on popstate event (navigation back)
        const handlePopstate = () => {
            if (video) {
                video.currentTime = 0;
                video.play();
            }
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            if (video) {
                video.removeEventListener('ended', handleVideoEnd);
            }

            // Cleanup event listener
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [isMuted]);

    const handleVideoEnd = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className='relative'>
            <div className=''>
                <video ref={videoRef} playsInline width="100%" height="100%" autoPlay muted className='h-[552px] md:h-[810px] object-cover ' >
                    <source src="/porsche-turbo-web.mov" type="video/mp4" />
                </video>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <div className="z-40 absolute bottom-0 left-0 w-full h-[236px] bg-gradient-to-b from-transparent to-[#F2F6F8] flex justify-center items-center">
                <Options />
            </div>
            <div style={{ position: 'absolute', bottom: '15px', right: '20px' }}>
                <button onClick={toggleMute} style={{ background: 'none', border: 'none' }}>
                    {isMuted ? (
                        <Image width={40} height={40} src="./svg/sound-muted.svg" alt="sound muted" />
                    ) : (
                        <Image width={40} height={40} src="./svg/sound-loud.svg" alt="sound loud" />
                    )}
                </button>
            </div>
        </div>
    );
}

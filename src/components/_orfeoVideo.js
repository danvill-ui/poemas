'use client'; // Necesario si usas el App Router

import { useRef, useEffect } from 'react';


export default function OrfeoVideo({videoUrl}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Forzamos el mute para el autoplay
      video.play().catch((err) => {
        console.log("Autoplay bloqueado, el usuario debe interactuar: ", err);
      });
    }
  }, []);

  console.log(videoUrl)
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-cover"
    >
      <source src={videoUrl} type="video/mp4" />
      Tu navegador no soporta el video.
    </video>
  );
}
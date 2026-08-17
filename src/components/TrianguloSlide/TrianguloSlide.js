import React, { useState, useEffect } from 'react';
import './TrianguloSlide.css'; // Moveremos el CSS aquí

const TrianguloSlide = () => {
  const [isTriangle, setIsTriangle] = useState(false);

  // Manejador de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight') {
        setIsTriangle(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`slide ${isTriangle ? 'is-triangle' : ''}`}>
      <div className="slide-content">
        <h1>Orfeo.io</h1>
        <p>{isTriangle ? "El mito se contrae." : "Presiona ESPACIO para transformar."}</p>
      </div>
    </div>
  );
};

export default TrianguloSlide;
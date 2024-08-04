import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import QuestionsList from '../test/Test';
import SecondSection from '../test/SecondSection';

const TestCarousel: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(300); 
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    // Configura un temporizador para contar hacia atrás
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {

          if (carouselRef.current) {
            carouselRef.current.next();
            setTimeLeft(300);
          }
          return 300; 
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  // Cambio de seccion
  const handleAfterChange = (current: number) => {
    setCurrentSlide(current);
    setTimeLeft(300); 
  };

  // Función para formatear el tiempo en Min:Seg
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h3>Time Left: {formatTime(timeLeft)}</h3>
      </div>
      <Carousel
        ref={carouselRef}
        afterChange={handleAfterChange}
      >
        <div>
          <h3>Parte 1</h3>
          <QuestionsList />
        </div>
        <div>
          <h3>Parte 2</h3>
          <SecondSection />
        </div>
        <div>
          <h3>Parte 3</h3>
          <p>Contenido parte 3</p>
        </div>
        <div>
          <h3>Parte 4</h3>
          <p>Contenido parte 4</p>
        </div>
      </Carousel>
    </div>
  );
};

export default TestCarousel;

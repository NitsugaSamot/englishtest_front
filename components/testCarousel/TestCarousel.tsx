import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { CarouselRef } from 'antd/es/carousel';
import QuestionsList from '../test/Test';
import SecondSection from '../test/SecondSection';
import ThirdSection from '../test/ThirdSection';

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

  // Cambio de sección
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
    <div className="relative max-w-4xl mx-auto p-4">
      {/* Temporizador */}
      <div className="mb-4 text-center text-lg font-semibold">
        Time Left: {formatTime(timeLeft)}
      </div>
      <Carousel
        ref={carouselRef}
        afterChange={handleAfterChange}
        dots={false}
        arrows={true}
        prevArrow={<Button className="absolute left-0 top-1/2 transform -translate-y-1/2" icon={<LeftOutlined />} />}
        nextArrow={<Button className="absolute right-0 top-1/2 transform -translate-y-1/2" icon={<RightOutlined />} />}
      >
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Choose the correct answer</h3>
          <QuestionsList />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Choose the correct option</h3>
          <SecondSection />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Read the text and then answer the questions</h3>
          <ThirdSection />
        </div>
      </Carousel>
    </div>
  );
};

export default TestCarousel;

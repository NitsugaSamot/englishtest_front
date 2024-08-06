import React, { useState, useEffect } from 'react';
import { Steps, Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import QuestionsList from '../test/Test';
import SecondSection from '../test/SecondSection';
import ThirdSection from '../test/ThirdSection';

const { Title } = Typography;

const { Step } = Steps;

const TestCarousel: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          const nextStep = (currentStep + 1) % 3;
          setCurrentStep(nextStep);
          setTimeLeft(300);
          return 300;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep]);

  const handleChange = (step: number) => {
    setCurrentStep(step);
    setTimeLeft(300); 
  };

  const handlePrev = () => {
    setCurrentStep(prevStep => (prevStep - 1 + 3) % 3);
  };

  const handleNext = () => {
    setCurrentStep(prevStep => (prevStep + 1) % 3);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ width: '70%', margin: '0 auto' }}>
      <div className="mb-4 text-center text-lg font-semibold">
        Time Left: {formatTime(timeLeft)}
      </div>
      <Steps current={currentStep} onChange={handleChange} style={{ marginBottom: '20px' }}>
        <Step title="Complete the sentence with the correct option" />
        <Step title="Read and answer" />
        <Step title="Read and Answer" />
      </Steps>
      <div className="step-content">
        {currentStep === 0 && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Title level={3}>Choose the correct option</Title>
            <QuestionsList />
          </div>
        )}
        {currentStep === 1 && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Title level={3}>Choose the correct option</Title>
            <SecondSection />
          </div>
        )}
        {currentStep === 2 && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Title level={3}>Read the text and then answer the questions</Title>
            <ThirdSection />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button 
          onClick={handlePrev} 
          icon={<LeftOutlined />} 
          disabled={currentStep === 0}
        />
        <Button 
          onClick={handleNext} 
          icon={<RightOutlined />} 
          disabled={currentStep === 2}
        />
      </div>
    </div>
  );
};

export default TestCarousel;


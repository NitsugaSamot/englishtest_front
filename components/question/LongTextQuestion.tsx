import React, { useState } from 'react';
import { Card, Typography, Checkbox, Divider } from 'antd';
import SendButton from './SendButton'; 
import { LongTextQuestionType } from '@/types';
import './styles.css';

const { Title, Paragraph } = Typography;

interface LongTextQuestionProps {
  question: LongTextQuestionType;
}

const LongTextQuestion: React.FC<LongTextQuestionProps> = ({ question }) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(optionId)) {
        newSelection.delete(optionId);
      } else {
        newSelection.add(optionId);
      }
      return newSelection;
    });
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Title level={4}>Category: {question.category}</Title>
      <Paragraph>{question.text}</Paragraph>
      <Divider />
      {question.relatedQuestions.map(relatedQuestion => (
        <div key={relatedQuestion._id} style={{ marginBottom: '20px' }}>
          <Title level={5}>{relatedQuestion.text}</Title>
          {relatedQuestion.options.map(option => (
            <Checkbox
              key={option._id}
              checked={selectedOptions.has(option._id)}
              onChange={() => handleOptionChange(option._id)}
            >
              {option.text}
            </Checkbox>
          ))}
        </div>
      ))}
      <SendButton tooltipText="The evaluation part is in progress. You can only view the questions for now." />
    </Card>
  );
};

export default LongTextQuestion;

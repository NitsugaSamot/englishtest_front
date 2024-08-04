import React, { useState } from 'react';
import { Card, Radio, Typography, Divider } from 'antd';
import './styles.css';

const { Title, Paragraph } = Typography;

interface QuestionType {
  _id: string;
  questionText: string;
  correctAnswer: 'A' | 'B' | 'Both';
}

interface TwoParagraphsQuestionProps {
  question: QuestionType;
}

const TwoParagraphsQuestion: React.FC<TwoParagraphsQuestionProps> = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Card className="question-card">
      <Title level={4}>{question.questionText}</Title>
      <Radio.Group onChange={handleOptionChange} value={selectedOption}>
        <Radio value="A">Paragraph A</Radio>
        <Radio value="B">Paragraph B</Radio>
        <Radio value="Both">Both</Radio>
      </Radio.Group>
    </Card>
  );
};

export default TwoParagraphsQuestion;

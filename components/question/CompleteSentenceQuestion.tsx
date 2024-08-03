import React, { useState } from 'react';
import { Card, Radio, Typography, Divider } from 'antd';
import './styles.css'

const { Title, Paragraph } = Typography;

interface QuestionType {
  _id: string;
  questionText: string;
  language: string;
  options: string[];
}

interface CompleteSentenceQuestionProps {
  question: QuestionType;
}

const CompleteSentenceQuestion: React.FC<CompleteSentenceQuestionProps> = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Card className="question-card" title={<Title level={4}>{question.questionText}</Title>}>
      <Paragraph className="question-language">Language: {question.language}</Paragraph>
      <Divider />
      <div className="options-container">
        {question.options && question.options.length > 0 ? (
          question.options.map((option, index) => (
            <Radio
              key={index}
              className="option-radio"
              id={`${question._id}-${index}`}
              name={`question-${question._id}`}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            >
              {option}
            </Radio>
          ))
        ) : (
          <Paragraph>No options available</Paragraph>
        )}
      </div>
    </Card>
  );
};

export default CompleteSentenceQuestion;

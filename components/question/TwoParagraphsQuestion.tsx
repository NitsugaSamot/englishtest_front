import React, { useState } from 'react';
import { Option, Paragraph } from '../../types';

interface TwoParagraphsQuestionProps {
  question: {
    _id: string;
    paragraphs?: Paragraph[]; 
    options?: Option[];
    category: string;
  };
}

const TwoParagraphsQuestion: React.FC<TwoParagraphsQuestionProps> = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionChange = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div>
      {question.paragraphs?.map((paragraph, index) => (
        <p key={index}>{paragraph.text}</p>
      ))}
      <div>
        {question.options?.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`${question._id}-${index}`}
              name={`question-${question._id}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionChange(index)}
            />
            <label htmlFor={`${question._id}-${index}`}></label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwoParagraphsQuestion;

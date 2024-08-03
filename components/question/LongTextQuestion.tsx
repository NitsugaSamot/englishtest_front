import React, { useState } from 'react';
import { Option, Paragraph, RelatedQuestion } from '../../types'; // Importa los tipos necesarios

interface LongTextQuestionProps {
  question: {
    _id: string;
    paragraphs?: Paragraph[]; // Cambiar a opcional
    relatedQuestions?: RelatedQuestion[]; // Cambiar a opcional
    category: string;
  };
}

const LongTextQuestion: React.FC<LongTextQuestionProps> = ({ question }) => {
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
        {question.relatedQuestions?.map((relatedQuestion, index) => (
          <div key={index}>
            <h3>{relatedQuestion.text}</h3>
            {relatedQuestion.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  id={`${question._id}-${index}-${optionIndex}`}
                  name={`related-question-${question._id}-${index}`}
                  value={optionIndex}
                  checked={selectedOption === optionIndex}
                  onChange={() => handleOptionChange(optionIndex)}
                />
                <label htmlFor={`${question._id}-${index}-${optionIndex}`}>{option.text}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LongTextQuestion;

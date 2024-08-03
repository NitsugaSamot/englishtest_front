import React, { useEffect, useState } from 'react';
import CompleteSentenceQuestion from '../question/CompleteSentenceQuestion';
import config from '@/config/config';

interface QuestionType {
  _id: string;
  questionText: string;
  language: string;
  options: string[];
}

const QuestionsList: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(`${config.WEB_API_URL}/api/question`);
        if (!response) {
          throw new Error('Failed to fetch questions');
        }
        const data: QuestionType[] = await response.json();
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions');
        console.error('Error loading questions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {questions.length > 0 ? (
        questions.map(question => (
          <CompleteSentenceQuestion key={question._id} question={question} />
        ))
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};

export default QuestionsList;

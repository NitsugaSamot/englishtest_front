import React, { useEffect, useState } from 'react';
import { Typography, Spin } from 'antd';
import LongTextQuestion from '../question/LongTextQuestion';
import config from '@/config/config';
import { LongTextQuestionType } from '@/types';

const { Paragraph } = Typography;

const ThirdSection: React.FC = () => {
  const [data, setData] = useState<LongTextQuestionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(`${config.WEB_API_URL}/api/thirdSection`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const result: LongTextQuestionType[] = await response.json();
        setData(result);
      } catch (err) {
        setError('Failed to load questions');
        console.error('Error loading questions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Paragraph>{error}</Paragraph>;

  return (
    <div>
      {data.length > 0 ? (
        data.map(item => (
          <LongTextQuestion key={item._id} question={item} />
        ))
      ) : (
        <Paragraph>No questions available</Paragraph>
      )}
    </div>
  );
};

export default ThirdSection;

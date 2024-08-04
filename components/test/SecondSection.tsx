import React, { useEffect, useState } from 'react';
import { Card, Typography, Divider, Spin } from 'antd';
import TwoParagraphsQuestion from '../question/TwoParagraphsQuestion';
import config from '@/config/config';

const { Title, Paragraph } = Typography;

interface QuestionType {
  _id: string;
  questionText: string;
  correctAnswer: 'A' | 'B' | 'Both';
}

interface ParagraphComparisonData {
  _id: string;
  paragraphA: string;
  paragraphB: string;
  questions: QuestionType[];
}

const SecondSection: React.FC = () => {
  const [data, setData] = useState<ParagraphComparisonData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(`${config.WEB_API_URL}/api/second-section`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const result: ParagraphComparisonData[] = await response.json();
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
          <Card key={item._id} style={{ marginBottom: '20px' }}>
            <Title level={3}>Comparison</Title>
            <Divider />
            <div id="parrafoUno">
              <Title level={4}>Paragraph A</Title>
              <Paragraph>{item.paragraphA}</Paragraph>
            </div>
            <div id="parrafoDos">
              <Title level={4}>Paragraph B</Title>
              <Paragraph>{item.paragraphB}</Paragraph>
            </div>
            <Divider />
            {item.questions.map(question => (
              <TwoParagraphsQuestion key={question._id} question={question} />
            ))}
          </Card>
        ))
      ) : (
        <Paragraph>No questions available</Paragraph>
      )}
    </div>
  );
};

export default SecondSection;

import axios from 'axios';
import { ParagraphComparisonQuestionType } from '@/types';
import config from '@/config/config';

export async function fetchQuestions() {
  try {
    const response = await axios.get(`${config.WEB_API_URL}/api/second-section`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export const createQuestion = async (questionData: ParagraphComparisonQuestionType) => {
  try {
    const response = await axios.post(`${config.WEB_API_URL}/api/second-section`, questionData);
    return response.data;
  } catch (error) {
    console.error('Error creating question: ', error);
    throw error;
  }
};

export async function updateQuestion(id: string, question: ParagraphComparisonQuestionType) {
  try {
    const response = await axios.put(`${config.WEB_API_URL}/api/second-section/${id}`, question);
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
}

export async function deleteQuestion(id: string) {
  try {
    const response = await axios.delete(`${config.WEB_API_URL}/api/second-section/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
}

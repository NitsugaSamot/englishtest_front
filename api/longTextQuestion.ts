import axios from 'axios';
import { LongTextQuestionType } from '@/types';
import config from '@/config/config';

export async function fetchLongTextQuestions() {
  try {
    const response = await axios.get(`${config.WEB_API_URL}/api/thirdSection`);
    return response.data;
  } catch (error) {
    console.error('Error fetching long text questions:', error);
    throw error;
  }
}

export const createLongTextQuestion = async (questionData: LongTextQuestionType) => {
  try {
    const response = await axios.post(`${config.WEB_API_URL}/api/thirdSection`, questionData);
    return response.data;
  } catch (error) {
    console.error('Error creating long text question:', error);
    throw error;
  }
};

export async function updateLongTextQuestion(id: string, question: LongTextQuestionType) {
  try {
    const response = await axios.put(`${config.WEB_API_URL}/api/thirdSection/${id}`, question);
    return response.data;
  } catch (error) {
    console.error('Error updating long text question:', error);
    throw error;
  }
}

export async function deleteLongTextQuestion(id: string) {
  try {
    const response = await axios.delete(`${config.WEB_API_URL}/api/thirdSection/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting long text question:', error);
    throw error;
  }
}

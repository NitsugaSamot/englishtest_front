import axios from 'axios';
import { TransformedQuestionType } from '@/types';
import config from '@/config/config';

export async function fetchQuestions() {
  try {
    const response = await axios.get(`${config.WEB_API_URL}/api/question`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export async function fetchLanguages() {
  try {
    const response = await axios.get(`${config.WEB_API_URL}/api/question/languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

export const createQuestion = async (questionData: TransformedQuestionType) => {
  try {
    const response = await axios.post(`${config.WEB_API_URL}/api/question`, questionData);
    return response.data;
  } catch (error) {
    console.error('Error creating question: ', error);
    throw error;
  }
};


export async function updateQuestion(id: string, question: TransformedQuestionType) {
  try {
    const response = await axios.put(`${config.WEB_API_URL}/api/question/${id}`, question);
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
}


export async function deleteQuestion(id: string) {
  try {
    const response = await axios.delete(`${config.WEB_API_URL}/api/question/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
}

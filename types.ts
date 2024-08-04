
export interface Option {
  option: string;
}


export interface Paragraph {
  text: string;
}

export interface RelatedQuestion {
  text: string;
  options: Option[];
}


export interface QuestionType {
  _id: string;
  questionText?: string;
  paragraphs?: Paragraph[];
  relatedQuestions?: RelatedQuestion[];
  options?: Option[];
  correctOptionIndex?: number;
  category: string;
  questionType: string;
  language: string;
}


export interface TransformedQuestionType {
  _id: string;
  questionText?: string;
  paragraphs?: Paragraph[];
  relatedQuestions?: RelatedQuestion[];
  options: string[];  
  correctOptionIndex?: number;
  category: string;
  questionType: string;
  language: string;
}

export interface ParagraphComparisonQuestionType {
  _id: string;
  paragraphA: string;
  paragraphB: string;
  questions: {
    questionText: string;
    correctAnswer: 'A' | 'B' | 'Both';
  }[];
}

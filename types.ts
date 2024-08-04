
export interface Option {
  option: string;
}


export interface Paragraph {
  _id: string;
  text: string;
}

export interface RelatedQuestion {
  text: string;
  options: Option[];
}


export interface Option {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface RelatedQuestion {
  _id: string;
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

export interface LongTextQuestionType {
  _id: string;
  paragraphs: Paragraph[];
  relatedQuestions: RelatedQuestion[];
  category: string;
}

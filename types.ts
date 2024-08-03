
export interface Option {
    text: string;
    isCorrect: boolean;
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
  

export interface CompleteSentenceQuestionData {
  _id: string;
  questionText: string;
  options: string[];
  correctOption: string;
  language: string;
  questionType: string;
}

  
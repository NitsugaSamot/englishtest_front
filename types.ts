// Define la interfaz Option con la propiedad option
export interface Option {
  option: string;
}

// Define las interfaces Paragraph y RelatedQuestion
export interface Paragraph {
  text: string;
}

export interface RelatedQuestion {
  text: string;
  options: Option[];
}

// Define la interfaz QuestionType
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

// Define una interfaz para el payload que se enviará a la API
export interface TransformedQuestionType {
  _id: string;
  questionText?: string;
  paragraphs?: Paragraph[];
  relatedQuestions?: RelatedQuestion[];
  options: string[];  // Las opciones se transforman en un array de strings
  correctOptionIndex?: number;
  category: string;
  questionType: string;
  language: string;
}

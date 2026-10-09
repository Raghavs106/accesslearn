export type LearningFormat = "Read" | "Listen" | "Captions" | "Sign Language";

export interface LessonSection {
  heading: string;
  content: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  sections: LessonSection[];
  quiz: QuizQuestion;
  transcript: string;
  signLanguageAvailable: boolean;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}
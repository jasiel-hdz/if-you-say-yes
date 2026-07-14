export type LetterSection =
  | IntroSection
  | StorySection
  | StatementSection
  | GallerySection
  | ClosingSection
  | QuestionSection;

export interface IntroSection {
  type: "intro";
  title: string;
  date?: string;
  content: string[];
  hint?: string;
}

export interface StorySection {
  type: "story";
  title?: string;
  content: string[];
}

export interface StatementSection {
  type: "statement";
  content: string[];
}

export interface GallerySection {
  type: "gallery";
  images: string[];
  captions?: string[];
}

export interface ClosingSection {
  type: "closing";
  content: string[];
  hint?: string;
}

export interface QuestionSection {
  type: "question";
  name: string;
  title: string;
  yesResponse: {
    lines: string[];
  };
  noResponse: {
    lines: string[];
  };
}

export interface LetterData {
  title: string;
  date: string;
  sections: LetterSection[];
}

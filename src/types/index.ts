export interface User {
  id: string;
  name: string;
  avatar: Avatar;
  points: number;
  level: number;
}

export interface Avatar {
  body: string;
  face: string;
  accessories: string[];
  mood: string;
}

export interface RoutineItem {
  id: string;
  title: string;
  icon: string;
  time?: string;
  completed: boolean;
  order: number;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  emoji: string;
  notes?: string;
}

export interface CommunicationSymbol {
  id: string;
  text: string;
  icon: string;
  category: 'emotions' | 'needs' | 'requests' | 'actions';
}

export interface Story {
  id: string;
  title: string;
  description: string;
  chapters: StoryChapter[];
}

export interface StoryChapter {
  id: string;
  text: string;
  choices: StoryChoice[];
  image?: string;
}

export interface StoryChoice {
  id: string;
  text: string;
  nextChapter: string;
  points: number;
}
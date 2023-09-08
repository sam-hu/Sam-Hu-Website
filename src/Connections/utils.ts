export type ConnectionCategory = {
  description: string;
  id: number;
  words: string[];
  solved?: boolean;
};

export type ConnectionCategories = ConnectionCategory[];

export type RecordedGuess = {
  words: string[];
  correct: boolean;
  off: number
};

export type CategoriesState = { [id: number]: ConnectionCategory };

export type WordState = {
  solved: boolean;
  difficulty: number; // 0, 1, 2, 3
};

export const checkWordsUnique = (categories: ConnectionCategories): boolean => {
  const allWords = categories.flatMap(cat => cat.words).map(word => word.toLowerCase());
  const uniqueWords = new Set(allWords);
  return uniqueWords.size === allWords.length;
};

export const validateCategories = (categories: ConnectionCategories): boolean => {
  if (categories?.length !== 4 || !categories.every((cat) => cat.words?.length === 4)) {
    return false;
  }

  return checkWordsUnique(categories);
}

export const normalizeCategories = (categories: ConnectionCategories, reset = false): ConnectionCategories => {
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    c.id = i;
    c.description = c.description.trim();
    c.words = c.words.map((word) => word.trim().toUpperCase());
    if (reset) {
      delete c.solved;
    }
  }
  return categories;
};

export const generateLink = (categories: ConnectionCategories): string => {
  const startingCategories = normalizeCategories(categories, true);
  const jsonString = JSON.stringify(startingCategories);
  const encodedBase64String = encodeURIComponent(btoa(jsonString));
  return `/connections/play?categories=${encodedBase64String}`;
};

export function shuffleArray(array: string[]): string[] {
  const shuffledArray = [...array]; // Create a copy of the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index

    // Swap elements at i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export const decodeCategories = (encodedValue: string | null): ConnectionCategories | null => {
  if (!encodedValue) {
    return null;
  }

  let parsedCategories;
  try {
    const decodedCategories = atob(decodeURIComponent(encodedValue));
    parsedCategories = JSON.parse(decodedCategories);
  } catch {
    return null;
  }

  if (!validateCategories(parsedCategories)) {
    return null;
  }

  return parsedCategories;
};

export const correctFontSize = (str: string, elementWidth: number, originalSize = 16) => {
  const { length } = str;
  const mult = elementWidth / (originalSize * length);
  let fontSize = originalSize * mult * 2.5;
  if (fontSize > originalSize) fontSize = originalSize;
  return Math.round(fontSize);
};

export const isMobile = () => window.innerWidth < 768;

export const COLORS_BY_DIFFICULTY = ['#e3bf02', '#84a63a', '#719eeb', '#bd70c4'];
export const ICONS_BY_DIFFICULTY = ['🟨', '🟩', '🟦', '🟪'];
export const BODIED_TEXTS = ['Damn bruh 💀', 'Down bad 😔', 'Try harder', 'Shameful', 'So close!', '😬😬😬', 'Come on now', 'Is that you Prath?'];

const PUZZLE_STATES_KEY = 'puzzle_states';

type PuzzleState = {
  categoriesState?: CategoriesState,
  guesses?: RecordedGuess[],
};

type PuzzleStates = { [id: string]: PuzzleState };

export const getPuzzleStates = (): PuzzleStates => {
  const puzzleStates = window.localStorage.getItem(PUZZLE_STATES_KEY);
  if (puzzleStates) {
    return JSON.parse(puzzleStates) as PuzzleStates;
  }
  return {};
};

export const getPuzzleState = (id: string): PuzzleState => {
  const puzzleStates = getPuzzleStates();
  if (puzzleStates[id]) {
    return puzzleStates[id];
  }
  return {};
};

export const isSolved = (categoriesState?: CategoriesState): boolean => {
  if (!categoriesState) {
    return false;
  }

  return Object.values(categoriesState).every((category) => category.solved);
};

export const setPuzzleState = (id: string, guesses?: RecordedGuess[], categoriesState?: CategoriesState): void => {
  const puzzleStates = getPuzzleStates();
  const puzzleState = puzzleStates[id];
  puzzleStates[id] = {
    guesses: guesses || puzzleState.guesses,
    categoriesState: categoriesState || puzzleState.categoriesState,
  };
  window.localStorage.setItem(PUZZLE_STATES_KEY, JSON.stringify(puzzleStates));
};

const FIRST_DAY = new Date(2023, 5, 12);

export const daysBetween = (now: Date, then: Date): number => {
  const timeDifference = now.getTime() - then.getTime();
  const numberOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return numberOfDays;
};
export const getTodayOffset = (): number => daysBetween(new Date(), FIRST_DAY);

export const formatDate = (date: Date): string => date.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export const getDateString = (offset: number): string => {
  const newDate = new Date(FIRST_DAY);
  newDate.setDate(FIRST_DAY.getDate() + offset);
  return formatDate(newDate);
};

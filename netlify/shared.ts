import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { ConnectionCategory, ConnectionsGame } from '../src/Connections/utils';

const firebaseApp = initializeApp({
  apiKey: process.env.FIRESTORE_KEY,
  authDomain: `${process.env.FIRESTORE_PROJECT}.firebaseapp.com`,
  projectId: process.env.FIRESTORE_PROJECT,
  storageBucket: `${process.env.FIRESTORE_PROJECT}.appspot.com`,
  messagingSenderId: '690303112259',
  appId: '1:690303112259:web:d5331dcec578b687c5b0f6',
  measurementId: 'G-3TEM8CLL4P',
});

export const db = getFirestore(firebaseApp);

export const gamesCollection = () => (isProd() ? 'games' : 'games-dev');

export const isProd = () => process.env.ENV === 'prod';

export type NYTGroup = {
  level: 0 | 1 | 2 | 3;
  members: string[];
};

export type NYTPuzzle = {
  groups: { [groupName: string]: NYTGroup; };
  startingGroups: string[][];
};

export type NYTPuzzles = NYTPuzzle[];

export const ParseGame = (nytData: NYTPuzzle): ConnectionsGame => {
  const connectionGame: ConnectionsGame = { categories: [] };
  for (const groupName in nytData.groups) {
    const group = nytData.groups[groupName];
    const category: ConnectionCategory = {
      description: groupName,
      id: group.level,
      words: group.members,
    };
    connectionGame.categories.push(category);
  }
  return { categories: connectionGame.categories.sort((a, b) => a.id - b.id) };
};

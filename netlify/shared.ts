import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

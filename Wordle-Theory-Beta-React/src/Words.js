import wordBank from "./wordle-bank.txt";
  // would rather pull from .api though 

export const MAX_ATTEMPTS = 6;
export const WORD_LENGTH = 5;

export const createEmptyBoard = () =>
  Array.from({ length: MAX_ATTEMPTS }, () => Array(WORD_LENGTH).fill(""));

export const boardDefault = createEmptyBoard();

export const generateWordSet = async () => {
  const response = await fetch(wordBank);
  const result = await response.text();
  const wordArr = result
    .split("\n")
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean);

  const todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];

  return {
    wordSet: new Set(wordArr),
    todaysWord,
  };
};

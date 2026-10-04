import wordBank from "./wordle-bank.txt";

// Would eventually prefer to retrieve words from an API.

export const MAX_ATTEMPTS = 6;
export const WORD_LENGTH = 5;

export const createEmptyBoard = () =>
  Array.from(
    { length: MAX_ATTEMPTS },
    () => Array(WORD_LENGTH).fill("")
  );

export const boardDefault = createEmptyBoard();

export const generateWordSet = async () => {
  const response = await fetch(wordBank);
  const wordBankText = await response.text();

  const wordList = wordBankText
    .split("\n")
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean);

  const targetWord =
    wordList[Math.floor(Math.random() * wordList.length)];

  return {
    wordSet: new Set(wordList),
    targetWord,
  };
};
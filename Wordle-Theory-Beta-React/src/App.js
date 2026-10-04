import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import {
  createEmptyBoard,
  generateWordSet,
  MAX_ATTEMPTS,
  WORD_LENGTH,
} from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letter: 0,
  });
  
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [notice, setNotice] = useState(
    "Guess the five-letter word."
  );

  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const loadPuzzle = () => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.targetWord.toUpperCase());
    });
  };

  useEffect(() => {
    loadPuzzle();
  }, []);

  const restartGame = () => {
    setBoard(createEmptyBoard());
    setCurrentAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });
    setNotice("New puzzle loaded. Start guessing.");
    loadPuzzle();
  };

  const readCurrentGuess = () =>
    board[currentAttempt.attempt].join("");

  const onEnter = () => {
    if (currentAttempt.letter !== WORD_LENGTH) {
      setNotice(
        `${WORD_LENGTH - currentAttempt.letter} more letter${
          WORD_LENGTH - currentAttempt.letter === 1 ? "" : "s"
        } needed.`
      );
      return;
    }

    const currentGuess = readCurrentGuess();

    if (!wordSet.has(currentGuess.toLowerCase())) {
      setNotice("Word not found. Try another five-letter word.");
      return;
    }

    if (currentGuess === correctWord) {
      setGameOver({
        gameOver: true,
        guessedWord: true,
      });
      setNotice("Correct! You solved the word.");
      return;
    }

    if (currentAttempt.attempt === MAX_ATTEMPTS - 1) {
      setGameOver({
        gameOver: true,
        guessedWord: false,
      });
      setNotice("No attempts remaining.");
      return;
    }

    setCurrentAttempt({
      attempt: currentAttempt.attempt + 1,
      letter: 0,
    });

    setNotice("Guess submitted. Try again.");
  };

  const onDelete = () => {
    if (currentAttempt.letter === 0) return;

    const updatedBoard = board.map((row) => [...row]);

    updatedBoard[currentAttempt.attempt][
      currentAttempt.letter - 1
    ] = "";

    setBoard(updatedBoard);

    setCurrentAttempt({
      ...currentAttempt,
      letter: currentAttempt.letter - 1,
    });
  };

  const onSelectLetter = (key) => {
    if (currentAttempt.letter >= WORD_LENGTH) return;

    const updatedBoard = board.map((row) => [...row]);

    updatedBoard[currentAttempt.attempt][
      currentAttempt.letter
    ] = key;

    setBoard(updatedBoard);

    setCurrentAttempt({
      attempt: currentAttempt.attempt,
      letter: currentAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <main className="terminal-shell">
        <header className="hero-panel">
          <p className="eyebrow">Wordle Theory Beta</p>
          <h1>Guess the Word</h1>

          <p className="hero-copy">
            Six attempts. Five letters. Use the feedback grid to
            determine the correct word.
          </p>
        </header>

        <AppContext.Provider
          value={{
            board,
            setBoard,
            currentAttempt,
            setCurrentAttempt,
            correctWord,
            onSelectLetter,
            onDelete,
            onEnter,
            setDisabledLetters,
            disabledLetters,
            gameOver,
            restartGame,
          }}
        >
          <section
            className="game-card"
            aria-label="Wordle Theory Beta game board"
          >
            <div className="status-bar">
              <span>{notice}</span>

              <span className="attempt-chip">
                Attempt{" "}
                {Math.min(
                  currentAttempt.attempt + 1,
                  MAX_ATTEMPTS
                )}{" "}
                / {MAX_ATTEMPTS}
              </span>
            </div>

            <Board />

            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </section>
        </AppContext.Provider>
      </main>
    </div>
  );
}

export default App;
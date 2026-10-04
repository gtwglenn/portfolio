import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createEmptyBoard, generateWordSet, MAX_ATTEMPTS, WORD_LENGTH } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [notice, setNotice] = useState("Decrypt the five-letter access code.");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const loadPuzzle = () => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
    });
  };

  useEffect(() => {
    loadPuzzle();
  }, []);

  const restartGame = () => {
    setBoard(createEmptyBoard());
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });
    setNotice("New encrypted vault loaded. Begin decoding.");
    loadPuzzle();
  };

  const readCurrentGuess = () => board[currAttempt.attempt].join("");

  const onEnter = () => {
    if (currAttempt.letter !== WORD_LENGTH) {
      setNotice(`${WORD_LENGTH - currAttempt.letter} more signal${WORD_LENGTH - currAttempt.letter === 1 ? "" : "s"} needed.`);
      return;
    }

    const currWord = readCurrentGuess();

    if (!wordSet.has(currWord.toLowerCase())) {
      setNotice("Unknown cipher. Try a valid five-letter word.");
      return;
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      setNotice("Vault unlocked. Access granted.");
      return;
    }

    if (currAttempt.attempt === MAX_ATTEMPTS - 1) {
      setGameOver({ gameOver: true, guessedWord: false });
      setNotice("Lockout triggered. Failed to decrypt cipher.");
      return;
    }

    setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    setNotice("Pattern logged. Continue the breach.");
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";

    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter >= WORD_LENGTH) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[currAttempt.attempt][currAttempt.letter] = key;

    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <main className="terminal-shell">
        <header className="hero-panel">
          <p className="eyebrow">Project: Cipher Vault</p>
          <h1>Decode the Lock</h1>
          <p className="hero-copy">
            Six attempts. Five letters. Use the feedback grid to crack the encrypted passphrase before the vault seals.
          </p>
        </header>

        <AppContext.Provider
          value={{
            board,
            setBoard,
            currAttempt,
            setCurrAttempt,
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
          <section className="game-card" aria-label="Cipher Vault game board">
            <div className="status-bar">
              <span>{notice}</span>
              <span className="attempt-chip">Attempt {Math.min(currAttempt.attempt + 1, MAX_ATTEMPTS)} / {MAX_ATTEMPTS}</span>
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


// test for git
// test again
// I might just recreate branches / repo if this doesn't work


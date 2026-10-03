import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const submitted = currAttempt.attempt > attemptVal;
  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const letterState = submitted ? (correct ? "correct" : almost ? "almost" : "error") : "";

  useEffect(() => {
    if (submitted && letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => (prev.includes(letter) ? prev : [...prev, letter]));
    }
  }, [submitted, letter, correct, almost, setDisabledLetters]);

  return <div className={`letter ${letterState}`}>{letter}</div>;
}

export default Letter;

import React, { useContext, useEffect } from "react";
import { AppContext } from "../App.js";

function Letter({ letterPosition, attemptIndex }) {
  const { board, setDisabledLetters, currentAttempt, correctWord } = useContext(AppContext);
  const letter = board[attemptIndex][letterPosition];
  const isSubmitted = currentAttempt.attempt > attemptIndex;
  const isCorrect = correctWord[letterPosition] === letter;
  const isPresent = !isCorrect && letter !== "" && correctWord.includes(letter);
  const letterStatus = isSubmitted ? 
        (isCorrect ? "correct" : isPresent ? "almost" : "error") : "";

  useEffect(() => {
    if (isSubmitted && letter !== "" && !isCorrect && !isPresent) {
      setDisabledLetters((previousLetters) =>
        previousLetters.includes(letter)
          ? previousLetters
          : [...previousLetters, letter]
      );
    }
  }, [isSubmitted, letter, isCorrect, isPresent, setDisabledLetters]);

  return <div className={`letter ${letterStatus}`}>{letter}</div>;
}

export default Letter;

import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { currentAttempt, gameOver, correctWord, restartGame } =
    useContext(AppContext);

  const attemptsUsed = gameOver.guessedWord
    ? currentAttempt.attempt + 1
    : currentAttempt.attempt;

  return (
    <div className="game-over">
      <p className="eyebrow">Game Complete</p>

      <h2>
        {gameOver.guessedWord ? "Word Solved" : "Game Over"}
      </h2>

      <p>
        {gameOver.guessedWord
          ? `Word solved in ${attemptsUsed} attempt${
              attemptsUsed === 1 ? "" : "s"
            }.`
          : `The correct word was ${correctWord}.`}
      </p>

      <button
        className="reset-button"
        type="button"
        onClick={restartGame}
      >
        Start New Puzzle
      </button>
    </div>
  );
}

export default GameOver;
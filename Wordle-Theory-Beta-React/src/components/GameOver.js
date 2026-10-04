import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { currAttempt, gameOver, correctWord, restartGame } = useContext(AppContext);
  const attemptsUsed = gameOver.guessedWord ? currAttempt.attempt + 1 : currAttempt.attempt;

  return (
    <div className="game-over">
      <p className="eyebrow">Transmission Complete</p>
      <h2>{gameOver.guessedWord ? "Vault Unlocked" : "Access Denied"}</h2>
      <p>
        {gameOver.guessedWord
          ? `Cipher solved in ${attemptsUsed} attempt${attemptsUsed === 1 ? "" : "s"}.`
          : `The access code was ${correctWord}.`}
      </p>
      <button className="reset-button" type="button" onClick={restartGame}>
        Load New Cipher
      </button>
    </div>
  );
}

export default GameOver;

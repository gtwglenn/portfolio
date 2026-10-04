import React from "react";
import Letter from "./Letter";
import { MAX_ATTEMPTS, WORD_LENGTH } from "../Words";

function Board() {
  return (
    <div className="board" aria-label="Guess grid">
      {Array.from({ length: MAX_ATTEMPTS }).map((_, attemptIndex) => (
        <div className="row" key={`attempt-${attemptIndex}`}>
          {Array.from({ length: WORD_LENGTH }).map((_, letterIndex) => (
            <Letter
              key={`${attemptIndex}-${letterIndex}`}
              letterPosition={letterIndex}
              attemptIndex={attemptIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
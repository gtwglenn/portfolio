import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function Keyboard() {
  const {
    disabledLetters,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext);

  const validLetters = keyboardRows.flat();

  // Flatten the keyboard rows into one array for validating physical keyboard input.
  const handleKeyDown = useCallback(
    (event) => {
      if (gameOver.gameOver) return;

      if (event.key === "Enter") {
        onEnter();
        return;
      }

      if (event.key === "Backspace") {
        onDelete();
        return;
      }

      const typedLetter = event.key.toUpperCase();

      if (validLetters.includes(typedLetter)) {
        onSelectLetter(typedLetter);
      }
    },
    [validLetters, gameOver.gameOver, onDelete, onEnter, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="keyboard" aria-label="On-screen keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div className="key-line" key={`keyboard-row-${rowIndex}`}>
          {rowIndex === 2 && <Key keyValue="ENTER" isWideKey />}

          {row.map((key) => (
            <Key
              key={key}
              keyValue={key}
              disabled={disabledLetters.includes(key)}
            />
          ))}

          {rowIndex === 2 && <Key keyValue="DELETE" isWideKey />}
        </div>
      ))}
    </div>
  );
}

// rowIndex identifies which row of keyboardRows is currently being rendered.

export default Keyboard;
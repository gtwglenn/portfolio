import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function Keyboard() {
  const { disabledLetters, gameOver, onSelectLetter, onEnter, onDelete } = useContext(AppContext);
  const allLetters = keyboardRows.flat();
      // use .flat() to clean arrays 

  const handleKeyboard = useCallback(
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
      if (allLetters.includes(typedLetter)) {
        onSelectLetter(typedLetter);
      }
    },
    [allLetters, gameOver.gameOver, onDelete, onEnter, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard]);

  return (
    <div className="keyboard" aria-label="On-screen keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div className="key-line" key={`keyboard-row-${rowIndex}`}>
          {rowIndex === 2 && <Key keyVal="ENTER" bigKey />}
          {row.map((key) => (
            <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
          ))}
          {rowIndex === 2 && <Key keyVal="DELETE" bigKey />}
        </div>
      ))}
    </div>
  );
}
            // rowIndex creates index of 'keyboardRows' ie rows: 1, 2, 3 

export default Keyboard;

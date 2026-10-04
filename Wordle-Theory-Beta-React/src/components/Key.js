import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyValue, isWideKey, disabled }) {

  const { gameOver, onSelectLetter, onDelete, onEnter } = useContext(AppContext);

  const handleKeyClick = () => {
    
    if (gameOver.gameOver) return;

    if (keyValue === "ENTER") {
      onEnter();
    } else if (keyValue === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyValue);
    }
  };

  return (
    <button
      className={`key ${isWideKey ? "big-key" : ""} ${
        disabled ? "disabled-key" : ""
      }`}
      onClick={handleKeyClick}
      type="button"
    >
      {keyValue === "DELETE" ? "DEL" : keyValue}
    </button>
  );
}

export default Key;

// "big-key" --> CSS 
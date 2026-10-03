import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled }) {
  const { gameOver, onSelectLetter, onDelete, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;

    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <button
      className={`key ${bigKey ? "big-key" : ""} ${disabled ? "disabled-key" : ""}`}
      onClick={selectLetter}
      type="button"
    >
      {keyVal === "DELETE" ? "DEL" : keyVal}
    </button>
  );
}

export default Key;

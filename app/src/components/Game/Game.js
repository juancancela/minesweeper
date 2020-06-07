import React, { useContext, useState } from "react";
import quit from "./quit.png";
import "./Game.css";
import { resetStorage, getPosKeyCodes } from "../../utils";
import { AppContext } from "../AppContext/AppContext";
import { Redirect } from "react-router-dom";

export default function Game() {
  const [state, setState] = useContext(AppContext);
  const [proceedToHome, setProceedToHome] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ x: 0, y: 0 });
  const { rows, cols } = state;

  const handleQuit = () => {
    resetStorage();
    setProceedToHome(true);
  };

  if (proceedToHome) {
    return <Redirect to="/" />;
  }

  const handlePosition = (e) => {
    const { keyCode } = e;
    const { DOWN, UP, RIGHT, LEFT, Q, W, E } = getPosKeyCodes();
    const { x, y } = selectedCell;
    switch (keyCode) {
      case UP:
        if (x - 1 >= 0) return setSelectedCell({ x: x - 1, y });
        break;
      case DOWN:
        if (x + 1 < rows) return setSelectedCell({ x: x + 1, y });
        break;
      case RIGHT:
        if (y + 1 < cols) return setSelectedCell({ x, y: y + 1 });
        break;
      case LEFT:
        if (y - 1 >= 0) return setSelectedCell({ x, y: y - 1 });
        break;
      case Q:
        console.log("presionada la Q");
        break;
      case W:
        console.log("presionada la W");
        break;
      case E:
        console.log("presionada la E");
        break;
    }
  };

  const handleUncover = (e, r, c) => {
    console.log(`UNCOVER ${r} ${c}`);
    return;
  };

  const handleMark = (e, r, c) => {
    console.log(`MARK ${r} ${c}`);
    return;
  };

  function Board() {
    let board = [];
    const { x, y } = selectedCell;
    for (let r = 0; r < rows; r++) {
      board.push(<div></div>);
      for (let c = 0; c < cols; c++) {
        board.push(
          <span
            className={`Game-content-board-item${
              x === r && y === c ? "-selected" : ""
            }`}
          >
            ▩
          </span>
        );
      }
    }
    return board;
  }

  return (
    <div
      className="Game-container"
      tabIndex="0"
      onKeyDown={(e) => handlePosition(e)}
    >
      <div className="Game-bar">
        <div>Minesweeper Project</div>
        <div>User: Juan Carlos Cancela</div>
        <div className="Game-bar-quit-btn" onClick={handleQuit}>
          <img src={quit} width="30px" />
        </div>
      </div>
      <div className="Game-content">
        <div>contextual</div>
        <div className="Game-content-board">
          <Board />
        </div>
      </div>
    </div>
  );
}

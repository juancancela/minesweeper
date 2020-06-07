import React, { useContext, useState, useEffect } from "react";
import quit from "./quit.png";
import "./Game.css";
import { resetStorage, getPosKeyCodes } from "../../utils";
import { AppContext } from "../AppContext/AppContext";
import { Redirect } from "react-router-dom";

//⬛

const CellState = {
  UNCOVERED: "UNCOVERED",
  COVERED: "COVERED",
  FLAGGED_RED: "FLAGGED_RED",
  FLAGGED_QUESTION: "FLAGGED_QUESTION",
};

export default function Game() {
  const [state, setState] = useContext(AppContext);
  const [proceedToHome, setProceedToHome] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ x: 0, y: 0 });
  const [cells, setCells] = useState(
    new Array(state.rows)
      .fill(CellState.COVERED)
      .map(() => new Array(state.cols).fill(CellState.COVERED))
  );
  const { rows, cols } = state;

  const handleQuit = () => {
    resetStorage();
    setProceedToHome(true);
  };

  useEffect(() => {
    document.getElementById("game-board").focus();
  });

  if (proceedToHome) {
    return <Redirect to="/" />;
  }

  const handlePosition = (e) => {
    const { keyCode } = e;
    const { DOWN, UP, RIGHT, LEFT, Q, W, E } = getPosKeyCodes();
    const { x, y } = selectedCell;
    let updatedCells = cells;

    const updateCellState = (cellState) => {
      updatedCells[x][y] = cellState;
      setCells(updatedCells);
      setSelectedCell({ x, y });
    };

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
        return updateCellState(CellState.UNCOVERED);
      case W:
        return updateCellState(CellState.FLAGGED_QUESTION);
      case E:
        return updateCellState(CellState.FLAGGED_RED);
    }
  };

  function Board() {
    let board = [];
    const { x, y } = selectedCell;

    const renderCellIcon = (x, y) => {
      switch (cells[x][y]) {
        case CellState.UNCOVERED:
          return "□";
        case CellState.FLAGGED_QUESTION:
          return "?";
        case CellState.FLAGGED_RED:
          return "⚑";
        case CellState.COVERED:
        default:
          return "▣";
      }
    };

    for (let r = 0; r < rows; r++) {
      board.push(<div></div>);
      for (let c = 0; c < cols; c++) {
        board.push(
          <span
            className={`Game-content-board-item${
              x === r && y === c ? "-selected" : ""
            }`}
          >
            {renderCellIcon(r, c)}
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
      id="game-board"
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

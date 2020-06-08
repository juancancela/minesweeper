import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Game.css";
import { getPosKeyCodes, fill2DArray } from "../../utils";
import { resetStorage } from "../../store";
import api from "../../api";
import { AppContext } from "../AppContext/AppContext";

export function fromServerCells(serverCells, rows, cols) {
  let cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!cells[row]) cells[row] = [];
      cells[row][col] = serverCells[row][col].state;
    }
  }
  return cells;
}

export const CellState = {
  UNCOVERED: 0,
  COVERED: 1,
  FLAGGED_RED: 2,
  FLAGGED_QUESTION: 3,
};

export default function Game() {
  const [state] = useContext(AppContext);
  const [proceedToHome, setProceedToHome] = useState(false);
  const [proceedToGameSetup, setProceedToGameSetup] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ x: 0, y: 0 });
  const [cells, setCells] = useState(
    fill2DArray(CellState.COVERED, state.rows, state.cols)
  );
  const [player, setPlayer] = useState(null);
  const { rows, cols } = state;

  const { UNCOVERED, COVERED, FLAGGED_RED, FLAGGED_QUESTION } = CellState;

  useEffect(() => {
    const gameBoard = document.getElementById("game-board");
    if (gameBoard) gameBoard.focus();
    api.getMatchById().then((result) => {
      const { board } = result.response;
      setCells(fromServerCells(board.cells, board.rows, board.cols));
    });
  }, []);

  const handleQuit = () => {
    resetStorage();
    setProceedToHome(true);
  };

  const handleRestart = () => {
    setProceedToGameSetup(true);
  };

  const handlePosition = async (e) => {
    const { keyCode } = e;
    const { DOWN, UP, RIGHT, LEFT, Q, W, E } = getPosKeyCodes();
    const { x, y } = selectedCell;
    const currentCell = cells[x][y];
    let updatedCells = cells;

    const updateCellState = async (cellState) => {
      updatedCells[x][y] = cellState;
      setCells(updatedCells);
      setSelectedCell({ x, y });
      await api.exec(x, y, cellState);
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
        return updateCellState(UNCOVERED);
      case W:
        if (currentCell === UNCOVERED) return;
        return updateCellState(FLAGGED_QUESTION);
      case E:
        if (currentCell === UNCOVERED) return;
        return updateCellState(FLAGGED_RED);
      default:
        break;
    }
  };

  function Board() {
    const board = [];
    const { x, y } = selectedCell;

    const getStateIcon = (x, y) => {
      if (!cells) return;
      const currentCell = cells[x][y];
      switch (currentCell) {
        case UNCOVERED:
          return "□";
        case FLAGGED_QUESTION:
          return "?";
        case FLAGGED_RED:
          return "⚑";
        case COVERED:
        default:
          return "▣";
      }
    };

    for (let r = 0; r < rows; r++) {
      board.push(<div key={`board-row-${r}`}></div>);
      for (let c = 0; c < cols; c++) {
        const key = `board-c-${c}-r-${r}}`;
        const isSelected = x === r && y === c;
        const cName = `Game-content-board-item ${
          isSelected ? "Item-selected" : ""
        }`;
        board.push(
          <span key={key} className={cName}>
            {getStateIcon(r, c)}
          </span>
        );
      }
    }
    return board;
  }

  if (proceedToHome) return <Redirect to="/" />;
  if (proceedToGameSetup) return <Redirect to="/game" />;

  return (
    <div
      className="Game-container"
      tabIndex="0"
      onKeyDown={async (e) => await handlePosition(e)}
      id="game-board"
    >
      <div className="Game-bar">
        <div>Minesweeper Project</div>
        <div>Player: Juan Cancela</div>
      </div>
      <div className="Game-content">
        <div className="Game-content-menu">
          <button className="Login-play-now-btn" onClick={api.saveMatch}>
            Save Match
          </button>
          <button className="Login-play-now-btn" onClick={handleQuit}>
            Logout
          </button>
          <button className="Login-play-now-btn" onClick={handleRestart}>
            Restart
          </button>
        </div>
        <div className="Game-content-board">
          <Board />
        </div>
      </div>
    </div>
  );
}

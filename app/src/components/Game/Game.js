import React, { useContext, useState, useEffect } from "react";
import api from "minesweeper-sdk-jc";
import "./Game.css";
import { getPosKeyCodes, fill2DArray, redirectTo } from "../../utils";
import { resetStorage } from "../../store";
import { AppContext } from "../AppContext/AppContext";
import { Timer } from "../Timer/Timer";

//TODO This function shouldn`t be needed, workaround. Main issue is that
//cells, both on APP and API would have the same schema.
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

export const MatchState = {
  INITIAL: 0,
  IN_PROGRESS: 1,
  PAUSED: 2,
  WON: 3,
  LOST: 4,
};

export default function Game() {
  const { UNCOVERED, COVERED, FLAGGED_RED, FLAGGED_QUESTION } = CellState;
  const [state] = useContext(AppContext);
  const [proceedToHome, setProceedToHome] = useState(false);
  const [proceedToGameSetup, setProceedToGameSetup] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ x: 0, y: 0 });
  const [matchStatus, setMatchStatus] = useState({ state: "", result: "" });
  const [cells, setCells] = useState(
    fill2DArray(COVERED, state.rows, state.cols)
  );
  const [srvCells, setSrvCells] = useState(null);
  const { rows, cols } = state;

  useEffect(() => {
    const gameBoard = document.getElementById("game-board");
    if (gameBoard) gameBoard.focus();
    console.log(JSON.stringify(api));
    api.getMatchById().then((result) => {
      const board = result.response.board;
      if (
        result.response.state === MatchState.WON ||
        result.response.state === MatchState.LOST
      ) {
        setMatchStatus({ isFinished: true, result: result.response.state });
      }
      setSrvCells(board.cells);
      setCells(fromServerCells(board.cells, board.rows, board.cols));
    });
  }, []);

  const handleQuit = () => {
    resetStorage();
    setProceedToHome(true);
  };

  const handleRestart = () => setProceedToGameSetup(true);

  const handlePosition = async (e) => {
    const { keyCode } = e;
    const { DOWN, UP, RIGHT, LEFT, Q, W, E } = getPosKeyCodes();
    const { x, y } = selectedCell;
    const currentCell = cells[x][y];

    const updateCellState = async (cellState) => {
      const response = await api.exec(x, y, cellState);
      const status = response.response.state;
      switch (status) {
        case MatchState.WON:
          setMatchStatus({ isFinished: true, result: MatchState.WON });
          await api.saveMatch();
          break;
        case MatchState.LOST:
          setMatchStatus({ isFinished: true, result: MatchState.LOST });
          await api.saveMatch();
          break;
      }
      const { board } = response.response;
      setSrvCells(board.cells);
      setCells(fromServerCells(board.cells, board.rows, board.cols));
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
    const graphicalBoard = [];
    const { x, y } = selectedCell;

    const getStateIcon = (x, y) => {
      if (!cells || !srvCells) return;
      const currentCell = cells[x][y];
      switch (currentCell) {
        case UNCOVERED:
          if (srvCells[x][y].hasBomb) return "💣";
          return srvCells[x][y].adjacentBombs;
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
      graphicalBoard.push(
        <div key={`board-row-${r}`} disabled={matchStatus.isFinished}></div>
      );
      for (let c = 0; c < cols; c++) {
        const key = `board-c-${c}-r-${r}}`;
        const isSelected = x === r && y === c;
        const cName = `Game-content-board-item ${
          isSelected ? "Item-selected" : ""
        }`;
        graphicalBoard.push(
          <span key={key} className={cName}>
            {getStateIcon(r, c)}
          </span>
        );
      }
    }
    return graphicalBoard;
  }

  if (proceedToHome) return redirectTo("");
  if (proceedToGameSetup) return redirectTo("setup");

  return (
    <div
      className="Game-container"
      tabIndex="0"
      onKeyDown={async (e) =>
        !matchStatus.isFinished && (await handlePosition(e))
      }
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
          <div className="Game-instructions">
            <div>How to play?</div>
            <div>Press ←, →, ↓, ↑ to move through the board</div>
            <div>
              Press <b>q</b> to uncover a cell
            </div>
            <div>
              Press <b>w</b> to flag a cell with a ? mark
            </div>
            <div>
              Press <b>e</b> to flag red a cell
            </div>
          </div>
          <Timer isActive={!matchStatus.isFinished} />
        </div>
        <div className="Game-content-board">
          <>
            <Board />
            {matchStatus.isFinished && (
              <div>
                {matchStatus.result === MatchState.WON
                  ? "Congratz, you won!"
                  : "Better luck next time!"}
                Thanks for playing!{" "}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

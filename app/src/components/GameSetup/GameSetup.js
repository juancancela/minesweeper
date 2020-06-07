import React, { useState, useContext } from "react";
import axios from "axios";
import "./GameSetup.css";
import { getApiUrl, getPlayerId, getUserToken } from "../../utils";
import { AppContext } from "../AppContext/AppContext";
import { Redirect } from "react-router-dom";

export default function GameSetup() {
  const [error, setError] = useState(null);
  const [state, setState] = useContext(AppContext);
  const { rows, cols, bombs, matchId } = state;

  const handleCreateMatch = async (rows, cols, bombs) => {
    try {
      const data = {
        rows,
        cols,
        bombs,
      };
      const headers = { "user-token": getUserToken() };
      const result = await axios.post(
        `${getApiUrl()}player/${getPlayerId()}/match`,
        data,
        headers
      );
      const { response, success } = result.data;
      if (success) {
        const matchId = response.id;
        setState((state) => ({
          ...state,
          matchId,
          rows,
          cols,
          bombs,
        }));
      } else {
        setError(
          "Invalid User and Password. (Hint: Have you tried with juan@dev.com / 123 ? ;)"
        );
      }
    } catch (err) {
      setError(
        `It Looks something is not ok on our end. Please try again later. Details: ${err}`
      );
    }
  };

  console.log(JSON.stringify(state));

  if (matchId) {
    return <Redirect to={`/game/${matchId}`} />;
  }
  return (
    <>
      <div className="GameSetup-container">
        <div className="Login-item">
          <label className="Login-item-label">Number Of Rows</label>
          <input
            name="rows"
            type="number"
            defaultValue={rows}
            onChange={(e) => {
              const rows = parseInt(e.target.value);
              setState((state) => ({
                ...state,
                rows,
              }));
            }}
          />
        </div>
        <div className="Login-item">
          <label className="Login-item-label">Number Of Columns</label>
          <input
            name="cols"
            type="number"
            defaultValue={cols}
            onChange={(e) => {
              const cols = parseInt(e.target.value);
              setState((state) => ({
                ...state,
                cols,
              }));
            }}
          />
        </div>
        <div className="Login-item">
          <label className="Login-item-label">Number Of Bombs</label>
          <input
            name="bombs"
            type="number"
            defaultValue={bombs}
            onChange={(e) => {
              const bombs = parseInt(e.target.value);
              setState((state) => ({
                ...state,
                bombs,
              }));
            }}
          />
        </div>
        <button
          className="Login-play-now-btn"
          onClick={async () => handleCreateMatch(rows, cols, bombs)}
        >
          Play!
        </button>
      </div>
      {error && <div className="Login-error-msg">{error}</div>}
    </>
  );
}

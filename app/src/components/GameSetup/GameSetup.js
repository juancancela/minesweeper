import React, { useState, useContext, useEffect } from "react";
import _ from "lodash";
import "./GameSetup.css";
import api from "../../api";
import { errorMsg, redirectTo } from "../../utils";
import { AppContext } from "../AppContext/AppContext";

export default function GameSetup() {
  const [error, setError] = useState(null);
  const [matches, setMatches] = useState([]);
  const [state, setState] = useContext(AppContext);
  const { rows, cols, bombs, matchId } = state;

  const ITEMS = [
    {
      name: "rows",
      defaultValue: rows,
    },
    {
      name: "cols",
      defaultValue: cols,
    },
    {
      name: "bombs",
      defaultValue: cols,
    },
  ];

  useEffect(() => {
    api.getMatchesOfPlayer().then((result) => setMatches(result.response));
  }, []);

  const handleCreateMatch = async (rows, cols, bombs) => {
    try {
      const { response, success } = await api.createMatch(rows, cols, bombs);
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
        setError(response.message);
      }
    } catch (err) {
      setError(errorMsg(err));
    }
  };

  const ListOfSavedGames = () => {
    if (_.isEmpty(matches) || !matches.slice)
      return <div>Loading saved matches...</div>;
    return (
      <div className="GameSetup-match-list">
        <>
          <div className="GameSetup-match-list-title">Saved matches:</div>
          {matches.slice(0, 10).map((m, idx) => (
            <a
              key={`saved-games-${idx}`}
              className="GameSetup-match-list-item"
              href={`/game/${m.id}`}
            >
              Match with Id {m.id}
            </a>
          ))}
          {matches.length === 0 && <div>No matches saved yet for user</div>}
        </>
      </div>
    );
  };

  if (matchId) return redirectTo(`game/${matchId}`);
  return (
    <>
      <div className="GameSetup-container">
        {ITEMS.map((item, idx) => {
          return (
            <div key={`gamesetup-i-${idx}`} className="Login-item">
              <label className="Login-item-label">Number {item.name}</label>
              <input
                name={item.name}
                type="number"
                defaultValue={item.defaultValue}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setState((state) => ({
                    ...state,
                    [item.name]: value,
                  }));
                }}
              />
            </div>
          );
        })}
        <button
          className="Login-play-now-btn"
          onClick={async () => handleCreateMatch(rows, cols, bombs)}
        >
          Play!
        </button>
        <ListOfSavedGames />
      </div>
      {error && <div className="Login-error-msg">{error}</div>}
    </>
  );
}

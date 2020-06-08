import React, { useState } from "react";
const AppContext = React.createContext([{}, () => {}]);

const DEFAULT_NUMBER_OF_ROWS = 10;
const DEFAULT_NUMBER_OF_COLS = 10;
const DEFAULT_NUMBER_OF_BOMBS = 10;

const AppProvider = (props) => {
  const [state, setState] = useState({
    rows: localStorage.getItem("rows") || DEFAULT_NUMBER_OF_ROWS,
    cols: localStorage.getItem("cols") || DEFAULT_NUMBER_OF_COLS,
    bombs: localStorage.getItem("bombs") || DEFAULT_NUMBER_OF_BOMBS,
    matchId: localStorage.getItem("matchId"),
    matchStatus: localStorage.getItem("matchStatus"),
    player: localStorage.getItem("playerId"),
    time: localStorage.getItem("time") || 0,
  });
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

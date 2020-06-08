import React, { useState } from "react";
const ls = localStorage;
const AppContext = React.createContext([{}, () => {}]);

const DEFAULT_NUMBER_OF_ROWS = 10;
const DEFAULT_NUMBER_OF_COLS = 10;
const DEFAULT_NUMBER_OF_BOMBS = 10;

const AppProvider = (props) => {
  const [state, setState] = useState({
    rows: ls.getItem("rows") || DEFAULT_NUMBER_OF_ROWS,
    cols: ls.getItem("cols") || DEFAULT_NUMBER_OF_COLS,
    bombs: ls.getItem("bombs") || DEFAULT_NUMBER_OF_BOMBS,
    matchId: ls.getItem("matchId"),
    matchStatus: ls.getItem("matchStatus"),
    player: ls.getItem("playerId"),
    time: ls.getItem("time") || 0,
  });
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

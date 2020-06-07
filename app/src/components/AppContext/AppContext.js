import React, { useState } from "react";
const AppContext = React.createContext([{}, () => {}]);

const DEFAULT_NUMBER_OF_ROWS = 10;
const DEFAULT_NUMBER_OF_COLS = 10;
const DEFAULT_NUMBER_OF_BOMBS = 10;

const AppProvider = (props) => {
  const [state, setState] = useState({
    rows: 10,
    cols: 10,
    bombs: 10,
    matchId: 0,
    time: 0,
  });
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

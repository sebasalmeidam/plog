import React, { useReducer, useEffect } from 'react';

let reducer = (state, action) => {
  switch (action.type) {
    case "grantAccess":
      return { ...state, access: true};
    case "cancelContinue":
      return { ...state, continue: false };
    case "continueTrue":
      return { ...state, continue: true };
    default:
      return;
  }
};

const initialState = {
  access: false,
  continue: false,
}

const ActivityContext = React.createContext(initialState);

function StateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ActivityContext.Provider>
  );
}

export { ActivityContext, StateProvider };
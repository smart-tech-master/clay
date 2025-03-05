import React, {createContext} from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const value = {

  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
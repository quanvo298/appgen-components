import React, { createContext, useContext } from 'react';

export const GridCtx = createContext();

const GridProvider = ({ context, children }) => (
  <GridCtx.Provider value={context}>{children}</GridCtx.Provider>
);

export const useGridCtx = () => useContext(GridCtx);

export default GridProvider;

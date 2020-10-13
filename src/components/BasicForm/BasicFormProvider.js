import React, { createContext, useContext } from 'react';

export const BasicFormCtx = createContext();

const BasicFormProvider = ({ basicFormContext, children }) => (
  <BasicFormCtx.Provider value={basicFormContext}>{children}</BasicFormCtx.Provider>
);

export const useBasicFormCtx = () => useContext(BasicFormCtx);

export default BasicFormProvider;

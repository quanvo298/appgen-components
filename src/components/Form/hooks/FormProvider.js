import React, { createContext, useContext } from 'react';

export const FormCtx = createContext();

const FormProvider = ({ formContext, children }) => (
  <FormCtx.Provider value={formContext}>{children}</FormCtx.Provider>
);

export const useFormCtx = () => useContext(FormCtx);

export default FormProvider;

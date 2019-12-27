import React, { createContext, useContext } from 'react';
import Polyglot from 'node-polyglot';
import phrases from 'locales';

export const LocalProviderCtx = createContext();

const LocalProvider = ({ children, locale }) => {
  const polyglot = new Polyglot({
    locale,
    phrases: phrases[locale],
  });
  return (
    <LocalProviderCtx.Provider value={polyglot}>
      {React.Children.only(children)}
    </LocalProviderCtx.Provider>
  );
};

export default LocalProvider;

export const usePolyglot = () => useContext(LocalProviderCtx);

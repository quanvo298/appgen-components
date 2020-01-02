import React, { createContext, useContext } from 'react';
import Polyglot from 'node-polyglot';
import defaultPhares from '../locales';

export const LocalProviderCtx = createContext();

const LocalProvider = ({ children, locale, phrases }) => {
  const polyglot = new Polyglot({
    locale,
    phrases: phrases ? phrases[locale] : defaultPhares[locale],
  });
  return (
    <LocalProviderCtx.Provider value={polyglot}>
      {React.Children.only(children)}
    </LocalProviderCtx.Provider>
  );
};

export default LocalProvider;

LocalProvider.defaultProperties = {
  phrases: defaultPhares,
};

export const usePolyglot = () => useContext(LocalProviderCtx);

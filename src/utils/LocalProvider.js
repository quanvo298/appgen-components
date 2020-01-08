import React, { createContext, useContext } from 'react';
import Polyglot from 'node-polyglot';
import defaultPhares from '../locales';

export const LocalProviderCtx = createContext();

const LocalProvider = ({ children, locale, phrases }) => {
  const correctPhrases = phrases || defaultPhares;
  let mergeredPhrases = correctPhrases[locale];
  const genPhrases = correctPhrases[`gen${locale.toUpperCase()}`];
  if (genPhrases) {
    mergeredPhrases = { ...mergeredPhrases, ...genPhrases };
  }
  const polyglot = new Polyglot({
    locale,
    phrases: mergeredPhrases,
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

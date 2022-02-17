import { useRef } from 'react';
import { isArray } from '../utils';

const useGetSetRef = (initialRef = null) => {
  const currentRef = useRef(initialRef);

  const getRef = () => currentRef.current;
  const setRef = ref => {
    currentRef.current = ref;
  };

  const setPropRef = (name, value) => {
    if (currentRef.current) {
      currentRef.current[name] = value;
    }
  };
  const getPropRef = name => (currentRef.current ? currentRef.current[name] : null);

  const removePropRef = name => {
    if (!currentRef.current) {
      return;
    }
    if (isArray(currentRef.current)) {
      setRef(currentRef.current.slice(name + 1, 1));
      return;
    }
    delete currentRef.current[name];
  };

  const clearPropsRef = () => {
    if (!currentRef.current) {
      return;
    }
    Object.keys(propName => {
      delete currentRef.current[propName];
    });
    currentRef.current = initialRef;
  };

  return {
    get: getRef,
    set: setRef,
    ref: currentRef,
    setProp: setPropRef,
    getProp: getPropRef,
    removeProp: removePropRef,
    clearProps: clearPropsRef,
  };
};

export default useGetSetRef;

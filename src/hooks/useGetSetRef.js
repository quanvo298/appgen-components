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

  return {
    get: getRef,
    set: setRef,
    ref: currentRef,
    setProp: setPropRef,
    getProp: getPropRef,
    removeProp: removePropRef,
  };
};

export default useGetSetRef;

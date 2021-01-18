import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

export const DialogCtx = createContext();

const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState([]);

  return (
    <DialogCtx.Provider
      value={{
        close: id => {
          const newDialogs = dialogs.filter(dialog => dialog.key !== id);
          setDialogs(newDialogs);
        },
        openDialog: (ComponentDialog, props) => {
          const id = new Date().getTime().toString();
          const dialog = createPortal(
            <ComponentDialog {...props} id={id} key={id} />,
            document.body,
            id
          );

          setDialogs([...dialogs, dialog]);
        },
      }}
    >
      {dialogs}
      {children}
    </DialogCtx.Provider>
  );
};

export const useDialogCtx = () => useContext(DialogCtx);

export default DialogProvider;

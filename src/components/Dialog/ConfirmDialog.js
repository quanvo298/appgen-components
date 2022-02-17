import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import BasicButton from '../Button/BasicButton';
import { usePolyglot } from '../../utils/LocaleProvider';
import { useDialogCtx } from '../../hocs/DialogProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ButtonsBox = ({ handleAgree, handleDisagree }) => {
  const polyglot = usePolyglot();
  return (
    <Fragment>
      <BasicButton onClick={handleDisagree}>{polyglot.t('btn.disagree')}</BasicButton>
      <BasicButton onClick={handleAgree}>{polyglot.t('btn.agree')}</BasicButton>
    </Fragment>
  );
};

const ConfirmDialog = props => {
  const { onConfirm, content, id } = props;
  const { close } = useDialogCtx();

  const handleAgree = () => {
    close(id);
    onConfirm();
  };

  const handleClose = () => {
    close(id);
  };
  return (
    <Dialog open TransitionComponent={Transition} keepMounted onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonsBox handleAgree={handleAgree} handleDisagree={handleClose} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

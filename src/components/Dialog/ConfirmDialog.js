import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import BasicButton from 'components/Button/BasicButton';
import { usePolyglot } from 'utils/LocalProvider';

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

class ConfirmDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
  }

  show = () => {
    this.setState({ openDialog: true });
  };

  close = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { onConfirm, content } = this.props;
    const { openDialog } = this.state;
    return (
      <Dialog open={openDialog} TransitionComponent={Transition} keepMounted onClose={this.close}>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonsBox handleAgree={onConfirm} handleDisagree={this.close} />
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDialog;
